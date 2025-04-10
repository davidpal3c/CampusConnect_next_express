import React from 'react';

type EventData = {
  name: string;
  date: string;
  location: string;
  audience: string;
  programs: string;
  description: string;
  host: string;
  contact: string;
  capacity: number;
};

type EventProps = EventData & {
  updateFields: any;
};

function EventEditor({
  name,
  date,
  location,
  audience,
  description,
  programs,
  host,
  capacity,
  contact,
  updateFields,
}: EventProps) {
  const dummyAud = ['Software Dev', 'Human Resources', 'Business', 'Marketing'];
  const dummyContact = ['Software Dev', 'Human Resources', 'Business', 'Marketing'];
  const dummyPrograms = ['Program A', 'Program B', 'Program C', 'Program D'];

  const handleDateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value; // Already in the correct format for datetime-local
    const isoDate = new Date(selectedDate).toISOString(); // Convert to ISO-8601 for the backend
    updateFields({ date: isoDate });
  };

  // Format the date for the datetime-local input
  const formattedDate = date ? new Date(date).toISOString().slice(0, 16) : '';

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
        
        <p className="font-medium mt-4">Audience:</p>
        <p className="text-gray-600">{audience}</p>
        
        <p className="font-medium mt-4">Programs:</p>
        <p className="text-gray-600">{programs}</p>
        
        <p className="font-medium mt-4">Description:</p>
        <p className="text-gray-600">{description || 'Default description is empty.'}</p>
        
        <p className="font-medium mt-4">Host:</p>
        <p className="text-gray-600">{host}</p>
        
        <p className="font-medium mt-4">Capacity:</p>
        <p className="text-gray-600">{capacity || 'Capacity is required.'}</p>
        
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
              onChange={(e) => updateFields({ name: e.target.value })}
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
                  type="datetime-local"
                  name="date"
                  value={formattedDate} // Use the formatted date
                  onChange={handleDateTimeChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
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
              onChange={(e) => updateFields({ location: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label className="block mb-2">Target Audience(s)</label>
            <select
              value={audience}
              onChange={(e) => updateFields({ audience: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Department</option>
              {dummyAud.map((aud, index) => (
                <option key={index} value={aud}>{aud}</option>
              ))}
            </select>
          </div>
          
          {/* Target Program */}
          <div>
            <label className="block mb-2">Target Program(s)</label>
            <select
              value={programs}
              onChange={(e) => updateFields({ programs: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Program</option>
              {dummyPrograms.map((prog, index) => (
                <option key={index} value={prog}>{prog}</option>
              ))}
            </select>
          </div>

          {/* Contact */}
          <div>
            <label className="block mb-2">Contact(s)</label>
            <select
              value={contact}
              onChange={(e) => updateFields({ contact: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Select Department</option>
              {dummyContact.map((aud, index) => (
                <option key={index} value={aud}>{aud}</option>
              ))}
            </select>
          </div>
          
          {/* Description */}
          <div className="col-span-2">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => updateFields({ description: e.target.value })}
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
              onChange={(e) => updateFields({ host: e.target.value })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block mb-2">
              Capacity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="capacity"
              placeholder="Enter Number"
              value={capacity}
              onChange={(e) => updateFields({ capacity: parseInt(e.target.value, 10) })}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventEditor;