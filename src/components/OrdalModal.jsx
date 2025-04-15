import React from "react";

export default function OrdalModal({ status, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-xl text-center">
        {status === "processing" ? (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-orange-500">
              {" "}
              Processing Order...
            </h2>
            <p className="text-black">
              Please wait while we complete your order.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-2 text-green-600">
              Order Complete!
            </h2>
            <p className="text-black">Thank you for shopping with us!</p>

            <button
              onClick={onClose}
              className="bg-green-600 text-white px-4 py-2 rounded-lg mt-4"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
