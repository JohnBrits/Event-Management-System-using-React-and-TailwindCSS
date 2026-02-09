import React, { useEffect, useState } from "react";

const EventItem = ({ event, onEventUpdated, onEventDeleted }) => {
  // ✅ Hooks first — ALWAYS
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDate(event.date || "");
    }
  }, [event]);

  // ✅ Conditional render AFTER hooks
  if (!event) return null;

  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/api/events/${event._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, date }),
      });

      setIsEditing(false);
      onEventUpdated();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this event?")) return;

    try {
      await fetch(`http://localhost:5000/api/events/${event._id}`, {
        method: "DELETE",
      });
      onEventDeleted();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow border flex justify-between items-center gap-6">
      {isEditing ? (
        <div className="w-full space-y-3">
          <input
            className="w-full border rounded px-3 py-2 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <div className="flex gap-6">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-1 rounded font-bold "
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-black text-yellow-300
               px-4 py-1 rounded font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h1 className="font-semibold text-2xl ">{event.title}</h1>
            <p className="text-sm text-gray-600 font-bold">{event.date}</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-3 py-1 rounded
              font-bold "
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-3 py-1 rounded font-bold "
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventItem;


