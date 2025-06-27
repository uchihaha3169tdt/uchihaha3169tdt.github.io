/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShipmentForm from "./modal/ShipmentForm"; // Form thêm/sửa
import SuccessNotification from "../Noti/SuccessNotification";
import FailureNotification from "../Noti/FailureNotification";
import axios from "axios";
import { API_URL } from "../../configs/env";
import dayjs from "dayjs";

const ShipmentManagement = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Dùng chung cho cả trips và shipments
  const [shipments, setShipments] = useState([]);
  const [trips, setTrips] = useState([]); // State để lưu danh sách trips cho dropdown
  const [selectedTripId, setSelectedTripId] = useState(""); // State để lưu trip_id đã chọn

  // Modals and notifications states
  const [shipmentModal, setShipmentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [failureModal, setFailureModal] = useState(false);
  const [message, setMessage] = useState("");

  // 1. Lấy danh sách tất cả các trips để điền vào dropdown khi component được tải lần đầu
  useEffect(() => {
    const fetchAllTrips = async () => {
      setIsLoading(true);
      try {
        const token = sessionStorage.getItem("adminAccessToken");
        if (!token) {
          navigate("/admin");
          return;
        }
        const response = await axios.get(`${API_URL}api/v1/trips`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allTrips = response.data?.data || [];
        
        // Lọc chỉ giữ lại các chuyến đi trong tương lai để lựa chọn
        const now = dayjs();
        const upcomingTrips = allTrips.filter((trip) => {
          const departureDateTime = dayjs(
            `${trip.departureDate}T${trip.departureTime}`
          );
          return departureDateTime.isAfter(now);
        });

        setTrips(upcomingTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
        setMessage("Failed to fetch the list of trips.");
        setFailureModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllTrips();
  }, [navigate]);

  // 2. Lấy danh sách shipments BẤT CỨ KHI NÀO selectedTripId thay đổi
  useEffect(() => {
    const fetchShipmentsByTrip = async () => {
      // Nếu chưa chọn trip thì không làm gì cả
      if (!selectedTripId) {
        setShipments([]); // Xóa danh sách shipment cũ nếu có
        return;
      }

      setIsLoading(true);
      try {
        const token = sessionStorage.getItem("adminAccessToken");
        const response = await axios.get(
          `${API_URL}api/v1/tripsshipments/${selectedTripId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // API của bạn có thể trả về data trong `response.data` hoặc `response.data.data`
        setShipments(response.data || []);
      } catch (error) {
        console.error("Error fetching shipments:", error);
        setMessage("Failed to fetch shipments for the selected trip.");
        setShipments([]); // Đảm bảo bảng trống khi có lỗi
        setFailureModal(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShipmentsByTrip();
  }, [selectedTripId]); // Dependency array, effect này sẽ chạy lại mỗi khi selectedTripId thay đổi

  const handleViewInvoice = (shipmentId) => {
    navigate(`/admin/shipment/${shipmentId}/invoice`);
  };

  const openShipmentModal = () => setShipmentModal(true);
  const closeShipmentModal = () => setShipmentModal(false);
  const openSuccessModal = () => setSuccessModal(true);
  const closeSuccessModal = () => setSuccessModal(false);
  const openFailureModal = () => setFailureModal(true);
  const closeFailureModal = () => setFailureModal(false);

  // Hàm refresh được gọi lại sau khi thêm mới thành công
  const refreshShipments = () => {
    if (selectedTripId) {
      // Chỉ cần gọi lại fetch shipments cho trip hiện tại là đủ
      const fetchShipmentsByTrip = async () => {
        setIsLoading(true);
        try {
          const token = sessionStorage.getItem("adminAccessToken");
          const response = await axios.get(
            `${API_URL}api/v1/tripsshipments/${selectedTripId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setShipments(response.data || []);
        } catch (error) {
          console.error("Error fetching shipments:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchShipmentsByTrip();
    }
  };

  return (
    <div className="w-full p-2">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="ml-2 lg:ml-0 font-bold text-2xl text-gray-800 dark:text-white">
            Shipment Management
          </h1>
          <button
            onClick={openShipmentModal}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Add Shipment
          </button>
        </div>

        {/* Dropdown để chọn Trip */}
        <div className="mb-4 max-w-sm">
          <label
            htmlFor="trip-select"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Trip to View Shipments
          </label>
          <select
            id="trip-select"
            value={selectedTripId}
            onChange={(e) => setSelectedTripId(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          >
            <option value="">-- All Trips --</option>
            {trips.map((trip) => (
              <option key={trip.id} value={trip.id}>
                {`Trip #${trip.id}: ${trip.route.start.name} → ${trip.route.end.name} (${trip.departureDate})`}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              {/* Thead không thay đổi */}
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Item Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Receiver
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {shipments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      {selectedTripId
                        ? "No shipments found for this trip."
                        : "Please select a trip to see its shipments."}
                    </td>
                  </tr>
                ) : (
                  shipments.map((shipment) => (
                    <tr
                      key={shipment.id}
                      className="odd:bg-white even:bg-gray-50 border-b dark:odd:bg-gray-900 dark:even:bg-gray-800"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {shipment.id}
                      </td>
                      <td className="px-6 py-4">{shipment.item_name}</td>
                      <td className="px-6 py-4">{shipment.sender_name}</td>
                      <td className="px-6 py-4">{shipment.receiver_name}</td>
                      <td className="px-6 py-4">{shipment.status}</td>
                      <td className="px-6 py-4 flex space-x-2">
                        <button
                          onClick={() => handleViewInvoice(shipment.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          View Invoice
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals không thay đổi */}
      {shipmentModal && (
        <ShipmentForm
          func={{
            closeModal: closeShipmentModal,
            openSuccessModal,
            openFailureModal,
            setMessage,
            refresh: refreshShipments, // Truyền hàm refresh mới
          }}
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
    </div>
  );
};

export default ShipmentManagement;
