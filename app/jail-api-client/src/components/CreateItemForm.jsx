import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateItemForm = () => {
  const [ip, setIp] = useState('');
  const [jailName, setJailName] = useState('');
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);  // State to manage modal visibility
  const [errorMessage, setErrorMessage] = useState('');  // State for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to create a new item
      await axios.post('http://localhost:8000/items/', {
        ip,
        jail_name: jailName,
        status,
      });
      
      // Show success modal
      setShowModal(true);
      
      // After a short delay (for the user to see the message), redirect to the home page
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        setErrorMessage(error.response.data.detail);  // Display the error message from backend
      } else {
        setErrorMessage('There was an error creating the item. Please try again.');  // Generic error message
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">Create New Jail</h1>

      {/* Modal for success message */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Jail Added Successfully!</h2>
            <p>Your Jail Data has been successfully added.</p>
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
            <p>{errorMessage}</p>
            <button
              onClick={() => setErrorMessage('')}
              className="mt-4 bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Form for creating an item */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">IP Address</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Jail Name</label>
          <input
            type="text"
            value={jailName}
            onChange={(e) => setJailName(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Status</option>
            <option value="Up">Up</option>
            <option value="Down">Down</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Create Item
        </button>
      </form>
    </div>
  );
};

export default CreateItemForm;
