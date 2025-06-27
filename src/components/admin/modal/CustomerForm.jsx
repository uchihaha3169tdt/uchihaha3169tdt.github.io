/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../../configs/env";
import { useNavigate } from "react-router-dom";

const CustomerForm = ({ func, customerId }) => {
  const navigate = useNavigate();

  // Input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  useEffect(() => {
    if (customerId !== "") {
      axios
        .get(API_URL + `employee/customer/${customerId}`, {
          headers: {
            Authorization: "Bearer" + sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          setInput(res.data.customer);
        })
        .catch((err) => {
          if (err.response.status === 401) navigate("/admin");
        });
    }
  }, [customerId, navigate]);

  const sendRequestCreateCustomer = async () => {
    let data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email,
      address,
      gender,
      date_of_birth: dateOfBirth,
    };
    await axios
      .post(API_URL + "employee/customer", data, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((res) => {
        func.closeModal();
        func.setMessage(res.data.message);
        func.openSuccessModal();
        func.refresh();
      })
      .catch((err) => {
        func.closeModal();
        func.setMessage(
          err.response?.data?.message || "Failed to create customer"
        );
        func.openFailureModal();
      });
  };

  const sendRequestUpdateCustomer = async () => {
    let data = {
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email,
      address,
      gender,
      date_of_birth: dateOfBirth,
    };
    await axios
      .put(API_URL + `employee/customer/${customerId}`, data, {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((res) => {
        func.closeModal();
        func.setMessage(res.data.message);
        func.openSuccessModal();
        func.refresh();
      })
      .catch((err) => {
        func.closeModal();
        func.setMessage(
          err.response?.data?.message || "Failed to update customer"
        );
        func.openFailureModal();
      });
  };

  const setInput = (data) => {
    setFirstName(data.first_name);
    setLastName(data.last_name);
    setPhoneNumber(data.phone_number);
    setEmail(data.email);
    setAddress(data.address);
    setGender(data.gender);
    setDateOfBirth(data.date_of_birth);
  };

  const labelClasses =
    "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300";
  const inputClasses =
    "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";

  return (
    <div className="fixed z-50 top-0 left-0 bg-black/50 w-full h-full flex justify-center items-center">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {customerId === "" ? "Create New Customer" : "Update Customer"}
            </h3>
            <button
              onClick={() => func.closeModal()}
              type="button"
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className="p-4 md:p-5">
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className={labelClasses}>
                    First Name
                  </label>
                  <input
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    id="first_name"
                    className={inputClasses}
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className={labelClasses}>
                    Last Name
                  </label>
                  <input
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    id="last_name"
                    className={inputClasses}
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone_number" className={labelClasses}>
                    Phone Number
                  </label>
                  <input
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    type="text"
                    id="phone_number"
                    className={inputClasses}
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    id="email"
                    className={inputClasses}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="gender" className={labelClasses}>
                    Gender
                  </label>
                  <select
                    onChange={(e) => setGender(e.target.value)}
                    value={gender}
                    id="gender"
                    className={inputClasses}
                  >
                    <option>Select Gender</option>
                    <option value={"1"}>Male</option>
                    <option value={"0"}>Female</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className={labelClasses}>
                    Date of Birth
                  </label>
                  <input
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    type="date"
                    id="dateOfBirth"
                    className={inputClasses}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="address" className={labelClasses}>
                  Address
                </label>
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  type="text"
                  id="address"
                  className={inputClasses}
                  placeholder="Address"
                  required
                />
              </div>
              <button
                className="mt-4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                onClick={
                  customerId === ""
                    ? sendRequestCreateCustomer
                    : sendRequestUpdateCustomer
                }
              >
                {customerId === "" ? "Add" : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
