import React from "react";
import logo from "../assets/images/Gigs_hub.png"
import { NavLink } from "react-router-dom";

const Navbar = ({Slogan="Built for Every Hustle"}) => {
  const linkClass = ({ isActive }) => 
    isActive
      ? "text-white bg-black hover:text-white rounded-md px-3 py-2 mt-3"
      : "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 mt-3";
  ;

  return (
    <>
      <nav className="bg-indigo-900 bg-opacity-90 shadow-lg sticky top-0 z-50 border-hidden">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <NavLink className="flex flex-shrink-0 items-center mr-4"  to="/">
                <img
                  className="object-cover h-20 w-auto "
                  //   src="images/logo.png"
                  src={logo}
                  alt="React Jobs"
                />
                <span className="hidden md:block text-white text-xl font-bold ml-2">
                  {Slogan}
                </span>
              </NavLink>
              <div className="md:ml-auto">
                <div className="flex space-x-2">
                  <NavLink to="/" className={linkClass}>
                    Home
                  </NavLink>
                  <NavLink to="/jobs" className={linkClass}>
                    Jobs
                  </NavLink>
                  <NavLink to="/add-job" className={linkClass}>
                    Add Job
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
