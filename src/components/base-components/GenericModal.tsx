import React, { ReactNode } from "react";

interface GenericModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  modalName: string;
  buttonText: string;
  onButtonClick?: () => void;
  children: ReactNode;
}

const GenericModal: React.FC<GenericModalProps> = ({
  isOpen,
  onDismiss,
  modalName,
  buttonText,
  onButtonClick,
  children
}) => {
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      e.preventDefault();

      onDismiss();
    }
  };

  const handleDismissClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onDismiss();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleBackdropClick}
        >
          <div className="p-4 bg-white rounded shadow-md w-80">
            <p className="mb-4 text-lg font-semibold">{modalName}</p>
            {children}
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                onClick={handleDismissClick}
              >
                Dismiss
              </button>
              <button
                className="px-4 py-2 ml-2 text-white bg-red-500 rounded hover:bg-red-600"
                onClick={onButtonClick}
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GenericModal;
