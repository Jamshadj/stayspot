import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../../../axios';
import { GrClose } from 'react-icons/gr';
import Swal from 'sweetalert2';

function ListingBasics() {
  const { propertyDetails } = useSelector((state) => state);
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editGuests, setEditGuests] = useState(false);
  const [editStatus, setEditStatus] = useState(false);

  const [changedTitle, setChangedTitle] = useState('');
  const [changedDescription, setChangedDescription] = useState('');
  const [changedGuests, setChangedGuests] = useState('');
  const [changedStatus, setChangedStatus] = useState('');

  // Check if propertyDetails is available before rendering
  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

  const handleTitleEdit = () => {
    setEditTitle(true);
    setChangedTitle(propertyDetails.title); // Initialize the changedTitle state with the current title value
  };

  const handleDescriptionEdit = () => {
    setEditDescription(true);
    setChangedDescription(propertyDetails.description); // Initialize the changedDescription state with the current description value
  };

  const handleGuestsEdit = () => {
    setEditGuests(true);
    setChangedGuests(propertyDetails.floorPlan.find((plan) => plan.type === 'Guest')?.count || ''); // Initialize the changedGuests state with the current guests value
  };

  const handleStatusEdit = () => {
    setEditStatus(true);
    setChangedStatus(propertyDetails.status); // Initialize the changedStatus state with the current status value
  };

  const handleTitleChange = (event) => {
    // Limit the title to 50 characters
    if (event.target.value.length <= 50) {
      setChangedTitle(event.target.value); // Update the changedTitle state with the new value
    }
  };

  const handleDescriptionChange = (event) => {
    // Handle description change here (if needed)
    setChangedDescription(event.target.value); // Update the changedDescription state with the new value
  };

  const handleGuestsChange = (event) => {
    // Handle number of guests change here (if needed)
    setChangedGuests(event.target.value); // Update the changedGuests state with the new value
  };

  const handleStatusChange = (event) => {
    // Handle listing status change here (if needed)
    setChangedStatus(event.target.value); // Update the changedStatus state with the new value
  };

  const handleSave = async () => {
    try {
      // Send the updated data to the backend using Axios (replace '/host/edit-data' with the actual endpoint URL)
      const response = await axios.post('/host/edit-data', {
        title: changedTitle,
        description: changedDescription,
        guests: changedGuests,
        status: changedStatus,
      });

      console.log('Data update response:', response.data);

      // If the data update is successful, set the edited data in the propertyDetails
      if (response.data.success) {
        setEditTitle(false);
        setEditDescription(false);
        setEditGuests(false);
        setEditStatus(false);

        Swal.fire({
          icon: 'success',
          title: 'Data updated successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error('Error updating data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleCancel = () => {
    setEditTitle(false);
    setEditDescription(false);
    setEditGuests(false);
    setEditStatus(false);

    setChangedTitle(propertyDetails.title); // Reset the changedTitle state to the original title value
    setChangedDescription(propertyDetails.description); // Reset the changedDescription state to the original description value
    setChangedGuests(propertyDetails.floorPlan.find((plan) => plan.type === 'Guest')?.count || ''); // Reset the changedGuests state to the original guests value
    setChangedStatus(propertyDetails.status); // Reset the changedStatus state to the original status value
  };

  return (
    <div>
      <h5 className='mt-3'>Listing Basics</h5>
      <div className='mt-3'>
        {/* Edit Title */}
        {editTitle ? (
          <div className='border'>
            <h6 className='pl-4 pt-3 mb-0'>
              Listing Title
              <p onClick={() => setEditTitle(false)} className='text-black hover:underline float-right mr-1rem'>
                <GrClose />
              </p>
            </h6>
            <p className='pl-4 text-sm'>Your listing title should highlight what makes your place special.</p>
            <div className='m-4'>
              <input
                type='text'
                value={changedTitle}
                onChange={handleTitleChange}
                className='w-full mx-1 py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='pl-4 text-xs text-gray-500 mt-[-27px]'>
              <p className='ml-4 mt-3 text-black'>
                {changedTitle.length}/50
                {changedTitle.length > 50 && (
                  <span className='text-red-600'> (Exceeded 50 characters limit)</span>
                )}
              </p>
            </div>
            <div className='flex'>
              <p onClick={handleCancel} className='ml-4 mt-3 text-black hover:underline'>
                Cancel
              </p>
              <button
                onClick={handleSave}
                disabled={!changedTitle || changedTitle === propertyDetails.title}
                className={`ml-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mr-4 mb-4 ${
                  !changedTitle || changedTitle === propertyDetails.title ? 'cursor-not-allowed' : ''
                }`}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h6>
              Listing Title
              <a href='#' onClick={handleTitleEdit} className='text-black hover:underline float-right'>
                Edit
              </a>
            </h6>
            <p>{propertyDetails.title}</p>
            <hr />
          </div>
        )}

        {/* Edit Description */}
        {editDescription ? (
          <div className='border'>
            <h6 className='pl-4 pt-3 mb-0'>
              Listing Description
              <p onClick={() => setEditDescription(false)} className='text-black hover:underline float-right mr-1rem'>
                <GrClose />
              </p>
            </h6>
            <div className='m-4'>
              <textarea
                value={changedDescription}
                onChange={handleDescriptionChange}
                className='w-full mx-1 py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                rows={4}
              />
            </div>
            <div className='flex'>
              <p onClick={handleCancel} className='ml-4 mt-3 text-black hover:underline'>
                Cancel
              </p>
              <button
                onClick={handleSave}
                disabled={!changedDescription || changedDescription === propertyDetails.description}
                className={`ml-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mr-4 mb-4 ${
                  !changedDescription || changedDescription === propertyDetails.description ? 'cursor-not-allowed' : ''
                }`}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h6>
              Listing Description
              <a href='#' onClick={handleDescriptionEdit} className='text-black hover:underline float-right'>
                Edit
              </a>
            </h6>
            <p>{propertyDetails.description}</p>
            <hr />
          </div>
        )}

        {/* Edit Number of Guests */}
        {editGuests ? (
          <div className='border'>
            <h6 className='pl-4 pt-3 mb-0'>
              Number of Guests
              <p onClick={() => setEditGuests(false)} className='text-black hover:underline float-right mr-1rem'>
                <GrClose />
              </p>
            </h6>
            <div className='m-4'>
              <input
                type='number'
                value={changedGuests}
                onChange={handleGuestsChange}
                className='w-full mx-1 py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='flex'>
              <p onClick={handleCancel} className='ml-4 mt-3 text-black hover:underline'>
                Cancel
              </p>
              <button
                onClick={handleSave}
                disabled={!changedGuests || changedGuests === propertyDetails.floorPlan.find((plan) => plan.type === 'Guest')?.count}
                className={`ml-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mr-4 mb-4 ${
                  !changedGuests || changedGuests === propertyDetails.floorPlan.find((plan) => plan.type === 'Guest')?.count
                    ? 'cursor-not-allowed'
                    : ''
                }`}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h6>
              Number of Guests
              <a href='#' onClick={handleGuestsEdit} className='text-black hover:underline float-right'>
                Edit
              </a>
            </h6>
            <p>{propertyDetails.floorPlan.find((plan) => plan.type === 'Guest')?.count}</p>
            <hr />
          </div>
        )}

        {/* Edit Listing Status */}
        {editStatus ? (
          <div className='border'>
            <h6 className='pl-4 pt-3 mb-0'>
              Listing Status
              <p onClick={() => setEditStatus(false)} className='text-black hover:underline float-right mr-1rem'>
                <GrClose />
              </p>
            </h6>
            <div className='m-4'>
              <select
                value={changedStatus}
                onChange={handleStatusChange}
                className='w-full mx-1 py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
              >
                <option value='Active'>Active</option>
                <option value='Inactive'>Inactive</option>
                <option value='Under Review'>Under Review</option>
              </select>
            </div>
            <div className='flex'>
              <p onClick={handleCancel} className='ml-4 mt-3 text-black hover:underline'>
                Cancel
              </p>
              <button
                onClick={handleSave}
                disabled={!changedStatus || changedStatus === propertyDetails.status}
                className={`ml-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mr-4 mb-4 ${
                  !changedStatus || changedStatus === propertyDetails.status ? 'cursor-not-allowed' : ''
                }`}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h6>
              Listing Status
              <a href='#' onClick={handleStatusEdit} className='text-black hover:underline float-right'>
                Edit
              </a>
            </h6>
            <p>{propertyDetails.status}</p>
            <hr />
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingBasics;
