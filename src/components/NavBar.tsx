import React, { useState } from "react";
import {
  FaTasks,
  FaCalendar,
  FaCheck,
  FaClock,
  FaCalendarAlt,
  FaListUl
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const listItems = [
    { icon: FaTasks, name: "Events", path: "", counter: 5 },
    { icon: FaCalendarAlt, name: "Today", path: "/today", counter: 5 },
    { icon: FaClock, name: "Passed", path: "/overdue", counter: 5 },
    { icon: FaCheck, name: "Attended", path: "/attended", counter: 5 },
    { icon: FaCalendar, name: "Calendar", path: "/calendar", counter: 5 }
  ];

  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    console.log("cac");
    setShowMenu(false);
  };

  return (
    <nav className="relative w-full p-4 bg-gray-800 lg:w-64">
      {/* For desktop view, show the list items */}
      <ul className="hidden space-y-3 lg:block">
        {listItems.map((item, index) => (
          <li
            key={index}
            className={`transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md ${
              location.pathname === `/eventsme${item.path}` ? "bg-gray-700" : ""
            }`}
          >
            <Link
              to={`/eventsme${item.path}`}
              className={`flex items-center justify-between text-gray-100 hover:underline p-2 rounded border border-gray-700 ${
                location.pathname === `/eventsme${item.path}` ? "bg-gray-700" : ""
              }`}
            >
              <div className="flex items-center">
                {React.createElement(item.icon, { className: "mr-2" })}
                {item.name}
              </div>
              {index !== listItems.length && (
                <div
                  className={`mx-2 h-5 text-gray-${
                    location.pathname === `/eventsme${item.path}` ? "300" : "600"
                  }`}
                >
                  {item.counter}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* For mobile view, show only the "ToDo" button */}
      <div
        className="flex items-center justify-center lg:hidden"
        onClick={toggleMenu}
      >
        <div className="text-gray-100">
          <button className="flex items-center justify-center text-gray-100 hover:underline ">
            {React.createElement(FaListUl, { className: "text-xl" })}
          </button>
        </div>
      </div>

      {/* For mobile view, show the full menu when "ToDo" is clicked */}
      {showMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center lg:hidden">
          <div className="flex flex-col items-center w-full h-full p-4 text-gray-100 bg-gray-800">
            <ul className="w-full space-y-3">
              {listItems.map((item, index) => (
                <li
                  key={index}
                  className={`transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md ${
                    location.pathname === `/eventsme${item.path}`
                      ? "bg-gray-700"
                      : ""
                  }`}
                >
                  <Link
                    to={`/eventsme${item.path}`}
                    className={`flex items-center justify-between text-gray-100 hover:underline p-2 rounded border border-gray-700 ${
                      location.pathname === `/eventsme${item.path}`
                        ? "bg-gray-700"
                        : ""
                    }`}
                    onClick={closeMenu}
                  >
                    <div className="flex items-center">
                      {React.createElement(item.icon, { className: "mr-2" })}
                      {item.name}
                    </div>
                    {index !== listItems.length && (
                      <div
                        className={`mx-2 h-5 text-gray-${
                          location.pathname === `/eventsme${item.path}`
                            ? "300"
                            : "600"
                        }`}
                      >
                        {item.counter}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            {/* "ToDo" item in the footer of the mobile menu */}
            <div className="mt-auto">
              <button className="flex items-center justify-center p-2 text-gray-100 hover:underline ">
                {React.createElement(FaListUl, { className: "mr-2" })}
                EventMe
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 hidden p-4 text-gray-100 bg-gray-800 lg:flex lg:items-center lg:justify-center">
        {React.createElement(FaListUl, { className: "mr-2 text-2xl" })}
        <span className="text-2xl">EventMe</span>
      </div>
    </nav>
  );
};

export default NavBar;
