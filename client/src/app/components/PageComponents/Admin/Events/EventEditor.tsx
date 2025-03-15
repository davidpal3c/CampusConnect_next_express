import React, { useState } from 'react';

type EventData = {
  name: string,
  date: string,
  location: string,
  departments: string,
  programs: string,
  description: string,
  host: string,
  capacity: string
}

type EventProps = EventData & {
  updateFields: (fields: Partial<EventData>) => void
}


function EventEditor(
  {
  name, date, location, departments,
  description, host, capacity,
  updateFields
  }: EventProps){

  return (
    <div className="flex p-4 gap-4 bg-gray-100 min-h-screen">
      {/* Preview Panel */}
      <div className="w-1/4 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Preview</h2>
        
        <p className="font-medium mt-4">Name:</p>
        <p className="text-gray-600">{name || 'Name field is required.'}</p>
        
        <p className="font-medium mt-4">Date:</p>
        <p className="text-gray-600">{date || 'Date field is required.'}</p>
        
        <p className="font-medium mt-4">Location:</p>
        <p className="text-gray-600">{location || 'Location is required.'}</p>
        
        <p className="font-medium mt-4">Departments:</p>
        <p className="text-gray-600">{departments}</p>
        
        {/* This is gotta work like the articles as well */}
        <p className="font-medium mt-4">Programs:</p>
        {/* <p className="text-gray-600">{programs}</p> */}    
        
        <p className="font-medium mt-4">Description:</p>
        <p className="text-gray-600">{description || 'Default description is empty.'}</p>
        
        {/* Has nothing right now */}
        <p className="font-medium mt-4">Host:</p>
        <p className="text-gray-600">{host}</p>
        
        <p className="font-medium mt-4">Capacity:</p>
        <p className="text-gray-600">{capacity || 'Capacity is required.'}</p>
        
        {/* Have to make this work as well */}
        <p className="font-medium mt-4">Image File:</p>
        <p className="text-gray-600">Default Image File is empty.</p>
      </div>
      
      {/* Form */}
      <div className="w-3/4 bg-white p-6 rounded-lg shadow">
        <div className="grid grid-cols-2 gap-6">
          {/* Name and Image */}
          <div>
            <label className="block mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={e => updateFields({name: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Image</label>
              <button className="bg-blue-400 text-white p-2 rounded w-full">Upload File</button>
            </div>
            <div>
              <label className="block mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="date"
                  placeholder="Start Date - End Date"
                  value={date}
                  onChange={e => updateFields({date: e.target.value})}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="absolute right-2 top-2 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location and Target Department */}
          <div>
            <label className="block mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="Enter Location"
              value={location}
              onChange={e => updateFields({location: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2">Target Department(s)</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select Target Department(s)"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <div className="absolute right-2 top-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Target Program */}
          <div>
            <label className="block mb-2">Target Program(s)</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select Target Program(s)"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <div className="absolute right-2 top-2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="col-span-2">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter Description"
              value={description}
              onChange={e => updateFields({description: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 h-40"
            ></textarea>
          </div>

          {/* Host and Capacity in their own row */}
          <div>
            <label className="block mb-2">Host</label>
            <input
              type="text"
              name="host"
              placeholder="Enter Host Name"
              value={host}
              onChange={e => updateFields({host: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2">
              Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="capacity"
              placeholder="Enter Number"
              value={capacity}
              onChange={e => updateFields({capacity: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventEditor;