/** @format */

import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { API_URL } from "../../../configs/env";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({ func, employeeId, roleForNewEmployee }) => {
  const navigate = useNavigate();

  // Fields
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [identityNumber, setIdentityNumber] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseClass, setLicenseClass] = useState("");
  const [licenseIssuedDate, setLicenseIssuedDate] = useState("");
  const [licenseExpiryDate, setLicenseExpiryDate] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const formatDateForInput = (isoDateString) =>
    isoDateString ? new Date(isoDateString).toISOString().split("T")[0] : "";
  const formatDateForAPI = (dateString) =>
    dateString ? new Date(dateString).toISOString() : null;

  const resetFormFields = useCallback(() => {
    setUsername("");
    setFullName("");
    setPhoneNumber("");
    setAddress("");
    setGender("");
    setDateOfBirth("");
    setIdentityNumber("");
    setLicenseNumber("");
    setLicenseClass("");
    setLicenseIssuedDate("");
    setLicenseExpiryDate("");
    setVehicleType("");
    setEmployeeType(roleForNewEmployee || "");
  }, [roleForNewEmployee]);

  const setInput = useCallback(
    (data) => {
      resetFormFields(); // Start with a clean slate
      if (data) {
        setUsername(data.username || "");
        setFullName(data.details?.fullName || "");
        setPhoneNumber(data.details?.phoneNumber || "");
        setAddress(data.details?.address || "");
        setGender(data.details?.gender || "");
        setDateOfBirth(formatDateForInput(data.details?.dateOfBirth));
        setIdentityNumber(data.details?.identityNumber || "");
        setEmployeeType(data.role || "");

        if (data.driverInfo) {
          setLicenseNumber(data.driverInfo.licenseNumber || "");
          setLicenseClass(data.driverInfo.licenseClass || "");
          setLicenseIssuedDate(
            formatDateForInput(data.driverInfo.licenseIssuedDate)
          );
          setLicenseExpiryDate(
            formatDateForInput(data.driverInfo.licenseExpiryDate)
          );
          setVehicleType(data.driverInfo.vehicleType || "");
        }
      }
    },
    [resetFormFields]
  );

  useEffect(() => {
    if (employeeId) {
      const token = sessionStorage.getItem("adminAccessToken");
      axios
        .get(`${API_URL}api/v1/employees/${employeeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setInput(res.data.data);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            navigate("/admin");
          } else {
            func.setMessage(
              err.response?.data?.message || "Failed to fetch employee data."
            );
            func.openFailureModal();
          }
        });
    } else {
      resetFormFields();
    }
  }, [
    employeeId,
    roleForNewEmployee,
    navigate,
    func,
    setInput,
    resetFormFields,
  ]);

  const handleSubmit = async () => {
    let payload = {
      username: username,
      details: {
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address,
        gender: gender,
        dateOfBirth: formatDateForAPI(dateOfBirth),
        identityNumber: identityNumber,
      },
      role: employeeType,
    };

    if (employeeType === "ROLE_DRIVER") {
      payload.driverInfo = {
        licenseNumber: licenseNumber,
        licenseClass: licenseClass,
        licenseIssuedDate: formatDateForAPI(licenseIssuedDate),
        licenseExpiryDate: formatDateForAPI(licenseExpiryDate),
        vehicleType: vehicleType,
      };
    }

    const token = sessionStorage.getItem("adminAccessToken");
    const endpoint = employeeId
      ? `${API_URL}api/v1/employees/${employeeId}`
      : `${API_URL}api/v1/employees`;
    const method = employeeId ? "put" : "post";

    axios({
      method,
      url: endpoint,
      data: payload,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        func.setMessage(
          res.data.message ||
            `Employee ${employeeId ? "updated" : "created"} successfully!`
        );
        func.openSuccessModal();
        func.refresh();
        func.closeModal();
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/admin");
        } else {
          func.setMessage(err.response?.data?.message || "An error occurred.");
          func.openFailureModal();
        }
      });
  };

  const inputFieldClasses =
    "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  const readOnlyFieldClasses =
    "shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-600 dark:text-gray-400";

  return (
    <div className="fixed z-50 top-0 left-0 bg-black/50 w-full h-full">
      <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-full">
        <div className="relative p-4 w-full max-w-3xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {employeeId
                  ? "Update Employee"
                  : `Create New ${
                      employeeType === "ROLE_DRIVER" ? "Driver" : "Receptionist"
                    }`}
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
            <div className="p-4 md:p-5 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                {/* Common Fields */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="fullName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Full Name
                    </label>
                    <input
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                      type="text"
                      id="fullName"
                      className={inputFieldClasses}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Username (Email)
                    </label>
                    <input
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      type="email"
                      id="username"
                      className={inputFieldClasses}
                      placeholder="employee@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Phone Number
                    </label>
                    <input
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
                      type="text"
                      id="phoneNumber"
                      className={inputFieldClasses}
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="identityNumber"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Identity Number
                    </label>
                    <input
                      onChange={(e) => setIdentityNumber(e.target.value)}
                      value={identityNumber}
                      type="text"
                      id="identityNumber"
                      className={inputFieldClasses}
                      placeholder="Identity Number"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Address
                  </label>
                  <input
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    type="text"
                    id="address"
                    className={inputFieldClasses}
                    placeholder="Address"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Gender
                    </label>
                    <select
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                      id="gender"
                      className={inputFieldClasses}
                    >
                      <option value="">Select Gender</option>
                      <option value={"MALE"}>Male</option>
                      <option value={"FEMALE"}>Female</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="dateOfBirth"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Date Of Birth
                    </label>
                    <input
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      value={dateOfBirth}
                      type="date"
                      id="dateOfBirth"
                      className={inputFieldClasses}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="employeeTypeDisplay"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Employee Role
                  </label>
                  <input
                    type="text"
                    id="employeeTypeDisplay"
                    value={
                      employeeType === "ROLE_DRIVER" ? "Driver" : "Receptionist"
                    }
                    className={readOnlyFieldClasses}
                    readOnly
                  />
                </div>

                {/* Driver Specific Fields */}
                {employeeType === "ROLE_DRIVER" && (
                  <>
                    <hr className="my-4 dark:border-gray-700" />
                    <h4 className="text-md font-semibold text-gray-700 dark:text-gray-200 mb-2">
                      Driver Specific Information
                    </h4>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label
                          htmlFor="licenseNumber"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          License Number
                        </label>
                        <input
                          onChange={(e) => setLicenseNumber(e.target.value)}
                          value={licenseNumber}
                          type="text"
                          id="licenseNumber"
                          className={inputFieldClasses}
                          placeholder="License Number"
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="licenseClass"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          License Class
                        </label>
                        <input
                          onChange={(e) => setLicenseClass(e.target.value)}
                          value={licenseClass}
                          type="text"
                          id="licenseClass"
                          className={inputFieldClasses}
                          placeholder="e.g., B2, C"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label
                          htmlFor="licenseIssuedDate"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          License Issued Date
                        </label>
                        <input
                          onChange={(e) => setLicenseIssuedDate(e.target.value)}
                          value={licenseIssuedDate}
                          type="date"
                          id="licenseIssuedDate"
                          className={inputFieldClasses}
                        />
                      </div>
                      <div className="flex-1">
                        <label
                          htmlFor="licenseExpiryDate"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          License Expiry Date
                        </label>
                        <input
                          onChange={(e) => setLicenseExpiryDate(e.target.value)}
                          value={licenseExpiryDate}
                          type="date"
                          id="licenseExpiryDate"
                          className={inputFieldClasses}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="vehicleType"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Vehicle Type
                      </label>
                      <input
                        onChange={(e) => setVehicleType(e.target.value)}
                        value={vehicleType}
                        type="text"
                        id="vehicleType"
                        className={inputFieldClasses}
                        placeholder="e.g., CAR, MOTORCYCLE"
                      />
                    </div>
                  </>
                )}

                <button
                  onClick={handleSubmit}
                  className="mt-6 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  {employeeId ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
