/** @format */

import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../../configs/env";
import { useNavigate } from "react-router-dom";
import WarningNotification from "../Noti/WarningNotification";
import SuccessNotification from "../Noti/SuccessNotification";
import FailureNotification from "../Noti/FailureNotification";
import ChangeTicketNotification from "../Noti/ChangeTicketNotification";

const TicketManagement = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [trip, setTrip] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [failureModal, setFailureModal] = useState(false);
  const [changeTicketModal, setChangeTicketModal] = useState(false);
  const [message, setMessage] = useState("");
  const [tempId, setTempId] = useState("");
  const [changeTicketId, setChangeTicketId] = useState("");
  const [ticket, setTicket] = useState({});
  const [phone_number, setPhoneNumber] = useState("");
  const [ticket_id, setTicketId] = useState("");

  // --- LOGIC ĐƯỢC HOÀN THIỆN ---
  const getTicket = async () => {
    if (!phone_number.trim() || !ticket_id.trim()) {
      setMessage("Please enter both Phone Number and Ticket ID.");
      openFailureModal();
      return;
    }
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("adminAccessToken");
      const response = await axios.post(
        `${API_URL}api/v1/tickets/lookup`,
        { phoneNumber: phone_number, ticketId: ticket_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data && response.data.data) {
        setTicket(response.data.data);
      } else {
        setMessage("Ticket not found.");
        openFailureModal();
        setTicket({});
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to find ticket.");
      openFailureModal();
      setTicket({});
    } finally {
      setIsLoading(false);
    }
  };

  const getTrip = async () => {
    if (!ticket.Details || ticket.Details.length === 0) return;
    setIsLoading(true);
    try {
      const token = sessionStorage.getItem("adminAccessToken");
      // Assuming we need to find alternative trips on the same route
      const routeId = ticket.Details[0].RouteID;
      const response = await axios.get(
        `${API_URL}api/v1/trips/by-route/${routeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrip(response.data.data || []);
      setChangeTicketId(ticket.TicketID);
      setChangeTicketModal(true); // Open the modal to show alternative trips
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to find alternative trips."
      );
      openFailureModal();
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTicket = () => {
    if (!ticket.TicketID) return;
    setTempId(ticket.TicketID); // Set the ID for the warning modal
    setDeleteModal(true); // Open confirmation modal
  };

  const refresh = () => {
    setPhoneNumber("");
    setTicketId("");
    setTicket({});
    setTrip([]);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
    setTempId("");
  };
  const closeSuccessModal = () => setSuccessModal(false);
  const openSuccessModal = () => setSuccessModal(true);
  const closeFailureModal = () => setFailureModal(false);
  const openFailureModal = () => setFailureModal(true);
  const closeChangeTicketModal = () => setChangeTicketModal(false);
  // --- KẾT THÚC LOGIC HOÀN THIỆN ---

  return (
    <div className="w-full p-2">
      <h1 className="ml-16 lg:ml-0 h-14 font-bold text-2xl text-gray-800 dark:text-white">
        Ticket Management
      </h1>
      <div className="w-full p-2 flex flex-col lg:flex-row -mx-1">
        <div className="w-full lg:w-4/12 px-1">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
            <div className="mb-4">
              <label
                htmlFor="phone_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Phone Number
              </label>
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phone_number}
                type="text"
                id="phone_number"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="e.g., 09xxxxxxxx"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="ticket_id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Ticket ID
              </label>
              <input
                onChange={(e) => setTicketId(e.target.value)}
                value={ticket_id}
                type="text"
                id="ticket_id"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="e.g., VNP123XYZ"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={getTicket}
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "View"}
              </button>
              <button
                className="flex-1 text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700"
                onClick={refresh}
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-8/12 px-1 mt-4 lg:mt-0">
          {ticket && ticket.TicketID ? (
            <div className="text-sm w-full mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-800 w-full text-center p-3 text-lg font-semibold text-gray-800 dark:text-white">
                Ticket Information
              </div>
              <div className="flex flex-col-reverse md:flex-row border-t border-gray-200 dark:border-gray-700">
                <div className="w-full md:w-5/12 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-500 dark:text-gray-400">
                        Name:
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {ticket.CustomerName || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-500 dark:text-gray-400">
                        Phone:
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {ticket.Phone || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-500 dark:text-gray-400">
                        Email:
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {ticket.Email || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-500 dark:text-gray-400">
                        Price:
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {ticket.Price != null
                          ? ticket.Price.toLocaleString() + " VND"
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-500 dark:text-gray-400">
                        Payment:
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {ticket.PaymentMethod || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      className="flex-1 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
                      onClick={getTrip}
                      disabled={!ticket.TicketID}
                    >
                      Change Trip
                    </button>
                    <button
                      className="flex-1 text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
                      onClick={deleteTicket}
                      disabled={!ticket.TicketID}
                    >
                      Cancel Ticket
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-7/12 p-5 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-500 dark:text-gray-400">
                      Ticket ID:
                    </span>
                    <span className="font-semibold text-green-700 dark:text-green-400">
                      {ticket.TicketID || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-500 dark:text-gray-400">
                      Route:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {ticket.Details && ticket.Details.length > 0
                        ? `${ticket.Details[0].PickupLocation} - ${ticket.Details[0].DropoffLocation}`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-500 dark:text-gray-400">
                      Booking Time:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {ticket.BookingTime
                        ? new Date(ticket.BookingTime).toLocaleString("vi-VN")
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-500 dark:text-gray-400">
                      Seats:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {ticket.SeatTickets?.map((st) => st.SeatID).join(", ") ||
                        "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-500 dark:text-gray-400">
                      Pickup:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {ticket.Details && ticket.Details.length > 0
                        ? ticket.Details[0].PickupLocation
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-500 dark:text-gray-400">
                      Dropoff:
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {ticket.Details && ticket.Details.length > 0
                        ? ticket.Details[0].DropoffLocation
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md p-6">
              <p className="text-gray-500 dark:text-gray-400">
                Please search for a ticket to view details.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Modals */}
      {deleteModal && (
        <WarningNotification
          id={tempId}
          func={{
            refresh,
            closeModal: closeDeleteModal,
            openSuccessModal,
            openFailureModal,
            setMessage,
          }}
          type={"ticket"}
          action={"ticket"}
        />
      )}
      {successModal && (
        <SuccessNotification
          func={{ closeModal: closeSuccessModal }}
          message={message}
        />
      )}
      {failureModal && (
        <FailureNotification
          func={{ closeModal: closeFailureModal }}
          message={message}
        />
      )}
      {changeTicketModal && (
        <ChangeTicketNotification
          func={{
            closeModal: closeChangeTicketModal,
            openSuccessModal,
            openFailureModal,
            setMessage,
            refresh,
          }}
          tripAll={trip}
          ticketId={changeTicketId}
        />
      )}
    </div>
  );
};

export default TicketManagement;
