import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import GenericModal from "../../base-components/GenericModal";

interface EventCardProps {
  event: {
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();

    console.log("Deleting event from your list:", event.name);
    //TODO: HERE YOU SHOULD AUTOMATICALLY SET THE STATUS TU DECLINED
    setShowDeleteModal(true);
  };

  return (
    <div className="relative p-4 mb-4 bg-white rounded shadow-lg">
      <h2 className="mb-4 text-lg font-semibold">{event.name}</h2>
      <p className="mb-4 text-gray-600">{event.description}</p>
      <div className="flex justify-between text-gray-600">
        <div>Due Date: {event.dueDate}</div>
        <div>Priority: {event.priority}</div>
        <div className="mb-2 text-gray-600">Status: {event.status}</div>
      </div>
      <div className="absolute top-0 right-0 p-2 mt-2 mr-2">
        <button
          className="text-gray-400 hover:text-red-500 focus:outline-none"
          onClick={handleDeleteClick}
        >
          <FaTrash />
        </button>
      </div>

      {/* Delete Modal */}
      <GenericModal
        isOpen={showDeleteModal}
        onDismiss={() => {
          setShowDeleteModal(false);
        }}
        modalName="Confirm Delete"
        buttonText="Delete"
        onButtonClick={() => {
          setShowDeleteModal(false);
          // You can perform additional actions on delete confirmation
        }}
      >
        <p className="mb-4 text-gray-600">
          Are you sure you want to delete this event?
        </p>
      </GenericModal>
    </div>
  );
};

export default EventCard;
