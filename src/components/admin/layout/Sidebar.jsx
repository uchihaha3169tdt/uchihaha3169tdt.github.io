import React from "react";
import { NavLink } from "react-router-dom";

const navLinksConfig = {
  ROLE_ADMIN: [
    { to: "/admin/trip", text: "Trip Management" },
    { to: "/admin/route", text: "Route Management" },
    { to: "/admin/pickup", text: "Pickup Management" },
    { to: "/admin/bus-station", text: "Bus Station Management" },
    { to: "/admin/province", text: "Province Management" },
    { to: "/admin/bus", text: "Bus Management" },
    { to: "/admin/ticket", text: "Ticket Management" },
    { to: "/admin/employee", text: "Employee Management" },
    { to: "/admin/news", text: "News Management" },
    { to: "/admin/shipment", text: "Shipment Management" },
    { to: "/admin/customer", text: "Customer Management" },
  ],
  ROLE_OPERATOR: [
    { to: "/admin/trip", text: "Trip Management" },
    { to: "/admin/route", text: "Route Management" },
    { to: "/admin/pickup", text: "Pickup Management" },
    { to: "/admin/bus-station", text: "Bus Station Management" },
    { to: "/admin/bus", text: "Bus Management" },
    { to: "/admin/shipment", text: "Shipment Management" },
  ],
  ROLE_RECEPTION: [
    { to: "/admin/ticket", text: "Ticket Management" },
    { to: "/admin/shipment", text: "Shipment Management" },
    { to: "/admin/customer", text: "Customer Management" },
  ],
  ROLE_DRIVER: [{ to: "/admin/my-trip", text: "My Trip" }],
};

const Sidebar = ({ userRole }) => {
  // onLogout không còn cần thiết ở đây
  const roleNameMap = {
    ROLE_ADMIN: "Manager",
    ROLE_OPERATOR: "Operator",
    ROLE_RECEPTION: "Customer Service",
    ROLE_DRIVER: "Driver",
  };

  const navLinks = navLinksConfig[userRole] || [];
  const roleName = roleNameMap[userRole] || "Admin";

  const baseLinkClasses =
    "relative flex items-center rounded-lg py-3 px-4 font-medium duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800";
  const activeLinkClasses = "bg-blue-500 text-white dark:bg-blue-600";
  const inactiveLinkClasses = "text-gray-800 dark:text-gray-200";

  return (
    // ClassName được đơn giản hóa, vì việc ẩn hiện đã do DashboardLayout quản lý
    <aside className="static flex h-screen w-72 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-gray-900">
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/admin/home">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {roleName}
          </h1>
        </NavLink>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
              MENU
            </h3>
            <ul className="mb-6 flex flex-col gap-1.5">
              <li>
                <NavLink
                  to="/admin/home"
                  end
                  className={({ isActive }) =>
                    `${baseLinkClasses} ${
                      isActive ? activeLinkClasses : inactiveLinkClasses
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </li>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `${baseLinkClasses} ${
                        isActive ? activeLinkClasses : inactiveLinkClasses
                      }`
                    }
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
