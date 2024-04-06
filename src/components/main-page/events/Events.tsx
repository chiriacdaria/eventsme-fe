import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EventCard from "./EventCard";

const Events: React.FC = () => {
  const navigate = useNavigate();

  const eventsData = [
    {
      id: 1,
      name: "event 1",
      description: "Description for event 1",
      dueDate: "2024-03-01",
      priority: "High",
      status: "Pending"
    },
    {
      id: 2,
      name: "event 2",
      description: "Description for event 2",
      dueDate: "2024-03-05",
      priority: "Medium",
      status: "Going"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = eventsData.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateEvent = () => {
    // Navigate to the /events/create route
    navigate("create");
  };
  
  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search events..."
        className="w-full p-2 mb-4 rounded-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredEvents.map((event) => (
        // Use Link to navigate to the /events/:eventId route
        <Link key={event.id} to={`${event.id}`}>
          <EventCard event={event} />
        </Link>
      ))}
      <button
        className="px-4 py-2 bg-transparent rounded"
        style={{ color: "#4a5568" }}
        onClick={handleCreateEvent}
      >  
        Create event
      </button>
    </div>
  );
};

export default Events;
