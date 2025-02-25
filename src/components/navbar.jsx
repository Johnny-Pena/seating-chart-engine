import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './buttons/logoutButton';

export default function Navbar() {
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/seatingChartHomePage" className="btn btn-ghost">Home</Link>
            </li>
            <li>
              <Link to="/addClass" className="btn btn-ghost">Add Class</Link>
            </li>
          </ul>
        </div>
        <Link to="/seatingChartHomePage" className="btn btn-ghost text-xl">Seating Chart 2.0</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/seatingChartHomePage" className="btn btn-ghost text-xl">Home</Link>
          </li>
          <li>
            <Link to="/addClass" className="btn btn-ghost text-xl">Add Class</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <LogoutButton />
      </div>
    </div>
  );
}