import React, { useEffect, useState } from "react";
import EventItem from "./EventItem";
import EventForm from "./EventForm";

const EventList = () => {
  // ✅ Hooks ALWAYS at top level
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events/");
      const data = await res.json();

      // ✅ Handles both array & { events: [] }
      setEvents(Array.isArray(data) ? data : data.events || []);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-black text-center">Events</h1>

      <p className="text-black mt-2 font-bold text-center">
        Events count: {events.length}
      </p>

      <EventForm onEventAdded={fetchEvents} />

      {events.length === 0 && (
        <p className="text-center text-black mt- font-bold ">
          No events found. Add one above 👆
        </p>
      )}

      <div className="space-y-4 mt-4 ">
        {events.map((event) => (
          <EventItem
            key={event._id}
            event={event}
            onEventUpdated={fetchEvents}
            onEventDeleted={fetchEvents}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;

