import React from 'react';

function Footer({ onNext }) {
  return (
    <div>
      <hr />
      <div className="flex justify-end">
        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Footer;
