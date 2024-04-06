import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const CreateEvent: React.FC = () => {
  const navigate = useNavigate()
  
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "white"
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#1f2937"
        : state.isFocused
        ? "#D8DCE2"
        : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "#D8DCE2"
      }
    })
  };

  
  const [priorityOptions] = useState([
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" }
  ]);

  const [statusOptions] = useState([
    { value: "Pending", label: "Pending" },
    { value: "Going", label: "Going" },
    { value: "Not Going", label: "Not Going" }
  ]);

  const [connections, setConnections] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    // Add more connections fetched from the backend
  ]);

  const [eventDetails, setEventDetails] = useState({
    eventName: "",
    priority: "",
    status: "",
    description: "",
    dueDate: null,
    invitedPeople: [] as number[] // Specify the type explicitly as an array of numbers
  });
  
  

  const handleCreateEvent = () => {
    // Implement your logic for creating the event and sending emails to invited people
    console.log("Event created:", eventDetails);
    console.log("Invited people:", eventDetails.invitedPeople);
    // Reset form fields if needed
    setEventDetails({
      eventName: "",
      priority: "",
      status: "",
      description: "",
      dueDate: null,
      invitedPeople: []
      // Add more fields as needed
    });
  };
  const handleUndo = () => {
   navigate("/eventsme")
  };

  return (
    <div className="h-full p-8 mx-auto bg-white rounded shadow-md max-w-screen">
      <h2 className="mb-4 text-2xl font-bold">Create Event</h2>
      <form>
            {/* Event Name */}
          <div className="mb-4">
          <label className="block mb-2 font-semibold text-md">Event Name:</label>
          <input
            type="text"
            className="w-full p-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
            value={eventDetails.eventName}
            onChange={(e) =>
              setEventDetails({ ...eventDetails, eventName: e.target.value })
            }
          />
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-md">Priority:</label>
          <Select
            options={priorityOptions}
            value={priorityOptions.find(
              (option) => option.value === eventDetails.priority
            )}
            onChange={(selectedOption) =>
              setEventDetails({
                ...eventDetails,
                priority: selectedOption ? selectedOption.value : ""
              })
            }
            styles={customStyles} 
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-md">
            Description:
          </label>
          <textarea
            className="w-full p-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
            value={eventDetails.description}
            onChange={(e) =>
              setEventDetails({
                ...eventDetails,
                description: e.target.value
              })
            }
          />
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-md">Due Date:</label>
          <DatePicker
            selected={eventDetails.dueDate}
            onChange={(date) =>
              setEventDetails({
                ...eventDetails,
              })
            }
            dateFormat="yyyy-MM-dd"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Invite People Section */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold text-md">
            Invite People:
          </label>
          <Select
            options={connections.map((connection) => ({
              value: connection.id,
              label: connection.name
            }))}
            isMulti
            value={eventDetails.invitedPeople.map((personId) => ({
              value: personId,
              label: connections.find((conn) => conn.id === personId)?.name
            }))}
            onChange={(selectedOptions) =>
              setEventDetails({
                ...eventDetails,
                invitedPeople: selectedOptions.map(
                  (option) => option.value as number
                )
              })
            }
            className="react-select-container"
            classNamePrefix="react-select"
            styles={customStyles} 

          />
        </div>

        {/* Submit Button */}
        <button
          type="button" 
          className="px-4 py-2 mt-6 text-white rounded"
          style = {{ backgroundColor: "#9bcf53"}}
          onClick={handleCreateEvent}
        >
          Create Event
        </button> <button
          type="button" 
          className="px-4 py-2 mt-6 ml-4 text-white rounded"
          style = {{ backgroundColor: "#4a5568"}}
          onClick={handleUndo}
        >
          Close without saving
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;