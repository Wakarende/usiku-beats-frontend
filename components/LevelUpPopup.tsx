import React from "react";
import PropTypes from "prop-types";
import { useRouter } from 'next/router';

const LevelUpPopup = ({ isOpen, closePopup, newLevel }) => {
  const router = useRouter();
  if (!isOpen) return null;

  const handleSeeMore = () => {
    router.push('/levelinfo');
    closePopup();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center max-w-md mx-auto">
        <div className="relative  w-96 h-96 flex items-center justify-center">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 64 64"
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: 'scale(1.3)' }}
          >
            <path d="M32 49.09l-13.16 8.24 3.52-14.48-11.4-10.11 14.9-1.29L32 17.34l6.14 14.11 14.9 1.29-11.4 10.11 3.52 14.48z" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white mt-5">
            <span className="text-xl font-bold mt-5">You've reached Level</span>
            <span className="text-2xl font-bold mt-2"> {newLevel}!</span>
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleSeeMore}
            className="px-6 py-3 bg-blue-500 text-white font-semibold text-xl rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
          >
            See More
          </button>
          <button
            onClick={closePopup}
            className="px-6 py-3 bg-gray-500 text-white font-semibold text-xl rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

LevelUpPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  newLevel: PropTypes.number.isRequired,
};

export default LevelUpPopup;
