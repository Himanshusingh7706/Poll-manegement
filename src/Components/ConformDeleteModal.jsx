import React from 'react';
import { IoClose } from 'react-icons/io5';

const ConfirmationDeleteModal = ({
  modalTitle,
  modalSubTitle,
  btnDeleteText = 'Delete',
  btnCancelText = 'Cancel',
  onBtnOkClick,
  onBtnCancelClick,
  btnColor = 'bg-red-500'
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-10">
      <div className="modal-overlay fixed inset-0 bg-gray-500 opacity-50"></div>
      <div className="modal-container bg-white md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto flex flex-col items-center">
        <div className="modal-content py-6 text-left px-10">
          <div className="flex justify-between items-center pb-3 mb-2">
            <p className="text-2xl font-bold">{modalTitle}</p>
            {btnCancelText && (
              <IoClose
                className="text-2xl cursor-pointer"
                onClick={onBtnCancelClick}
                aria-label="Close modal"
              />
            )}
          </div>
          <p className="mb-3">{modalSubTitle}</p>
          <div
            className={`mt-7 flex gap-4 ${
              onBtnCancelClick ? 'justify-between' : 'justify-end'
            }`}
          >
            {btnCancelText && (
              <button
                onClick={onBtnCancelClick}
                className="px-4 py-2 text-gray-800 rounded-md border hover:bg-gray-400"
              >
                {btnCancelText}
              </button>
            )}
            <button
              onClick={onBtnOkClick}
              className={`px-4 py-2 rounded-md ${btnColor} text-white`}
            >
              {btnDeleteText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDeleteModal;
