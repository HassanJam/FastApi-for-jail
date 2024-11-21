import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Jail Management</h2>
      <ul>
        <li className="mb-4">
          <Link to="/" className="block text-lg py-2 px-4 rounded hover:bg-gray-700">
            Home
          </Link>
        </li>
        {/* 
        <li>
          <Link to="/create" className="block text-lg py-2 px-4 rounded hover:bg-gray-700">
            Add Jail
          </Link>
        </li> 
        */}
      </ul>
    </div>
  );
};

export default Sidebar;
