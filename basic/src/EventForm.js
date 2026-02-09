import React, { useState } from "react";

const EventForm = ({ onEventAdded }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      title,
      date,
      location,
      remainder: false
    };

    try {
      const res = await fetch("http://localhost:5000/api/events/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent)
      });

      if (!res.ok) {
        throw new Error("Failed to add event");
      }

      setTitle("");
      setDate("");
      setLocation("");

      if (onEventAdded) onEventAdded();
    } catch (err) {
      console.error(err);
      alert("Error adding event");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow bg-blue-400 ">
      <h1 className="text-lg  mb-3 font-bold">➕ Add Event</h1>

      <input
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2  border rounded text-xl font-bold text-black-200 "
        required
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full mb-2 p-2 border rounded font-bold text-xl
        text-pink-400"
        required
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full mb-4 p-2 border rounded font-bold text-xl"
        required
      />

      <button
        type="submit"
        className="bg-red-500 text-black font-bold px-4 py-2 rounded hover:bg-blue-700  "
      >
        Add Event
      </button>
      </form>
      
  );
};

export default EventForm;
