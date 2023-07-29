import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function PricePerNight() {
  const { propertyDetails } = useSelector((state) => state);

  // State to manage the modal for price per night
  const [showPriceModal, setShowPriceModal] = useState(false);

  // State to manage the edited price per night
  const [editedPricePerNight, setEditedPricePerNight] = useState(propertyDetails.pricePerNight);

  // Function to handle opening the price per night modal and pre-filling the price field
  const handleEditPrice = () => {
    setEditedPricePerNight(propertyDetails.pricePerNight); // Set the edited price per night to the current value
    setShowPriceModal(true); // Show the price per night modal
  };

  // Function to handle changes in the price per night field
  const handlePricePerNightChange = (event) => {
    const { value } = event.target;
    setEditedPricePerNight(value);
  };

  // Function to handle saving the edited price per night
  const handleSavePricePerNight = () => {
    // Perform any validation you need here before saving the price per night
    // For example, checking if the field is not empty and is a valid number.

    // Save the edited price per night to the backend or do whatever you need to do with it
    // Here, you can use axios or any other library to make an API call to save the price per night.

    // After successfully saving the price per night, close the modal and show a success message
    setShowPriceModal(false);

    Swal.fire({
      icon: 'success',
      title: 'Price per night updated successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='mt-3'>
        <div>
          <h6>
            Price Per Night
            <a href='#' onClick={handleEditPrice} className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.pricePerNight}</p>
          <hr />
        </div>
      </div>

      {/* Modal for editing the price per night */}
      {showPriceModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg'>
            <h6 className='font-bold'>Edit Price Per Night</h6>
            <div>
              <label>Price Per Night</label>
              <input
                type='number'
                name='pricePerNight'
                value={editedPricePerNight}
                onChange={handlePricePerNightChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div className='flex justify-end mt-4'>
              <button onClick={() => setShowPriceModal(false)} className='mr-2'>
                Cancel
              </button>
              <button onClick={handleSavePricePerNight} className='bg-blue-500 text-white rounded px-4 py-2'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PricePerNight;
