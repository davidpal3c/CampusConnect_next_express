import React from 'react';
import EventsCalendar from '../../../components/Calendar/EventsCalendar';

const events = [
  {
    title: 'Meeting',
    start: new Date(2025, 0, 25, 10, 0), // Month is 0-indexed
    end: new Date(2025, 0, 25, 11, 0),
  },
  {
    title: 'Lunch Break',
    start: new Date(2025, 0, 25, 12, 0),
    end: new Date(2025, 0, 25, 13, 0),
  },
];

const Events = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg p-6 w-full max-w-7xl gap-6">
        {/* Left Section - Event Details */}
        <div className="bg-white rounded-lg shadow p-6 flex-1">
          <h2 className="text-2xl font-bold mb-4">Grad Portraits</h2>
          <img
            src="https://via.placeholder.com/400x200" // Replace with whatever image we want will make it dynamic at some point
            alt="Grad Portrait"
            className="rounded-lg mb-4"
          />
          <div className="space-y-2 text-gray-600">
            <p>
              📅 <strong>Date:</strong> Oct 10, 2024
            </p>
            <p>
              ⏰ <strong>Time:</strong> 12:00PM - 1:00PM
            </p>
            <p>
              📍 <strong>Location:</strong> Stan Grad
            </p>
            <p>
              🎯 <strong>Target Department(s):</strong> All
            </p>
            <p>
              📋 <strong>Spots Available:</strong> 500
            </p>
            <p>
              🎙 <strong>Host:</strong> SAIT
            </p>
          </div>
          <p className="mt-4 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua...
          </p>
          <p className="mt-4 text-black">
            Register <a href="#" className="text-blue-500 font-bold">Here!</a>
          </p>
        </div>

        {/* Right Section - Event Analytics */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow p-6 flex flex-col gap-6">
          <div>
            <h3 className="font-bold mb-4">Event Analytics</h3>
            {/* Placeholder Pie Chart */}
            <div className="flex justify-center">
              <img
                src="https://via.placeholder.com/150x150" // Replace with chart image
                alt="Analytics Chart"
                className="mb-4"
              />
            </div>
            <div className="space-y-2 text-gray-600">
              <p>
                🔵 <strong>60%</strong> Current Students
              </p>
              <p>
                🔹 <strong>25%</strong> Not Viewed
              </p>
              <p>
                🔷 <strong>15%</strong> Alumni
              </p>
            </div>
          </div>
          {/* Buttons */}
          <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg font-semibold">
            View More Notification Analytics
          </button>
          <button className="w-full bg-orange-400 text-white py-2 rounded-lg font-semibold">
            View Form
          </button>
          <button className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold">
            Delete Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default Events;
