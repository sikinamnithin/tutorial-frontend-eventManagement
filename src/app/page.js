"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`)
      .then((response) => {
        setEvents(response.data);
      });
  }, []);

  const addEvent = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events`, newEvent)
      .then((response) => {
        setEvents([...events, response.data]);
      });
    setNewEvent({ title: "", date: "", location: "", description: "" });
  };

  const deleteEvent = (id) => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}`)
      .then(() => {
        setEvents(events.filter((event) => event.id !== id));
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Event Management</h1>

      <form onSubmit={addEvent} className="mb-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <input
            type="text"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
            className="border p-2"
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Location"
            value={newEvent.location}
            onChange={(e) =>
              setNewEvent({ ...newEvent, location: e.target.value })
            }
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
            className="border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-4">
          Add Event
        </button>
      </form>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold">{event.title}</h2>
            <p>{event.date}</p>
            <p>{event.location}</p>
            <p>{event.description}</p>
            <button
              onClick={() => deleteEvent(event.id)}
              className="bg-red-500 text-white py-1 px-3 mt-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
