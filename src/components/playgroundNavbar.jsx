import React from 'react';
import { Link } from 'react-router-dom';

export default function PlaygroundNavbar() {
    return (
        <div className="navbar bg-base-300 shadow-sm">
  <div className="navbar-start">
    <a className="btn btn-ghost text-xl">Seating Chart Ninja</a>
  </div>
  <div className="navbar-end">
        <Link to="/login" className="btn btn-secondary text-sm btn-sm sm:text-xl btn-md">
          Go to Login
        </Link>
  </div>
</div>
    )
}