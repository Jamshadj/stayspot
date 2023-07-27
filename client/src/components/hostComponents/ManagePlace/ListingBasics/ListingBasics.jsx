import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../../../axios';
import {GrClose} from 'react-icons/gr'
function ListingBasics() {
  const { propertyDetails } = useSelector((state) => state);
  const [editTitle, setEditTitle] = useState(false);
  const [changedValue, setChangedValue] = useState('');

  // Check if propertyDetails is available before rendering
  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

  const handleTitleEdit = () => {
    setEditTitle(true);
    setChangedValue(propertyDetails.title); // Initialize the changedValue state with the current title value
  };

  const handleTitleChange = (event) => {
    setChangedValue(event.target.value); // Update the changedValue state with the new value
  };

  const handleTitleSave = async () => {
    try {
      // Send the updated title to the backend using Axios (replace '/host/edit-title' with the actual endpoint URL)
      const response = await axios.post('/host/edit-title', { title: changedValue });
      console.log('Title update response:', response.data);

      // If the title update is successful, set the edited title in the propertyDetails
      if (response.data.success) {
        setEditTitle(false);
      }
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  const handleTitleCancel = () => {
    setEditTitle(false);
    setChangedValue(propertyDetails.title); // Reset the changedValue state to the original title value
  };

  return (
    <div>
      <h5 className='mt-3'>Listing Basics</h5>
      <div className='mt-3'>
        <div className='mt-3'>
          
            {!editTitle && (
              <h6>
            Listing title
              <p href='#' onClick={handleTitleEdit} className='text-black hover:underline float-right'>
                Edit
              </p>
          </h6>
            )}
          {!editTitle ? (
            <p>{propertyDetails.title}</p>
          ) : (
            <div className='border'>
              <h6 className='pl-4 pt-3 mb-0'>
                Listing Title
                <p  onClick={handleTitleCancel} className='text-black hover:underline float-right mr-1rem'>
                <GrClose/>
                </p>
              </h6>
              <p className='pl-4 text-sm'>Your listing title should highlight what makes your place special.</p>
              <div className='m-4'>
                <input
                  type='text'
                  value={changedValue}
                  onChange={handleTitleChange}
                  className='w-full mx-1 py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
              </div>
              <div className='flex'>
                <p onClick={handleTitleCancel} className='ml-4 mt-3 text-black hover:underline'>
                  Cancel
                </p>
                <button
                  onClick={handleTitleSave}
                  className='ml-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mr-4 mb-4'
                >
                  Save
                </button>
              </div>

            </div>
          )}
          <hr />
        </div>
        <div className='mt-3'>
          <h6>
            Listing description
            <a href='#' className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.description}</p>
          <hr />
        </div>
        <div className='mt-3'>
          <h6>
            Number of Guests
            <a href='#' className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.floorPlan.find((plan) => plan.type === 'Guest')?.count}</p>
          <hr />
        </div>
        <div className='mt-3'>
          <h6>
            Listing status
            <a href='#' className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.status}</p>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default ListingBasics;
