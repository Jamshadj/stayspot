import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function RoomManage() {
  const { propertyDetails } = useSelector((state) => state);

  // State to manage the modal for structure
  const [showStructureModal, setShowStructureModal] = useState(false);

  // State to manage the modal for floor plan
  const [showFloorPlanModal, setShowFloorPlanModal] = useState(false);

  // State to manage the modal for privacy type
  const [showPrivacyTypeModal, setShowPrivacyTypeModal] = useState(false);

  // State to manage the edited structure
  const [editedStructure, setEditedStructure] = useState(propertyDetails.structure);

  // State to manage the edited floor plan
  const [editedFloorPlan, setEditedFloorPlan] = useState(propertyDetails.floorPlan);

  // State to manage the edited privacy type
  const [editedPrivacyType, setEditedPrivacyType] = useState(propertyDetails.privacyType);

  // Function to handle opening the structure modal and pre-filling the structure field
  const handleEditStructure = () => {
    setEditedStructure(propertyDetails.structure); // Set the edited structure to the current structure value
    setShowStructureModal(true); // Show the structure modal
  };

  // Function to handle changes in the structure field
  const handleStructureChange = (event) => {
    const { value } = event.target;
    setEditedStructure(value);
  };

  // Function to handle opening the floor plan modal and pre-filling the floor plan field
  const handleEditFloorPlan = () => {
    setEditedFloorPlan([...propertyDetails.floorPlan]); // Create a copy of the current floor plan
    setShowFloorPlanModal(true); // Show the floor plan modal
  };

  // Function to handle changes in the floor plan
  const handleFloorPlanChange = (index, event) => {
    const { value } = event.target;
    const updatedFloorPlan = [...editedFloorPlan];
    updatedFloorPlan[index].count = Number(value); // Assuming the floor plan count is a number
    setEditedFloorPlan(updatedFloorPlan);
  };

  // Function to handle opening the privacy type modal and pre-filling the privacy type field
  const handleEditPrivacyType = () => {
    setEditedPrivacyType(propertyDetails.privacyType); // Set the edited privacy type to the current privacy type value
    setShowPrivacyTypeModal(true); // Show the privacy type modal
  };

  // Function to handle changes in the privacy type field
  const handlePrivacyTypeChange = (event) => {
    const { value } = event.target;
    setEditedPrivacyType(value);
  };

  // Function to handle saving the edited structure
  const handleSaveStructure = () => {
    // Perform any validation you need here before saving the structure
    // For example, checking if the field is not empty.

    // Save the edited structure to the backend or do whatever you need to do with it
    // Here, you can use axios or any other library to make an API call to save the structure.

    // After successfully saving the structure, close the modal and show a success message
    setShowStructureModal(false);

    Swal.fire({
      icon: 'success',
      title: 'Structure updated successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Function to handle saving the edited floor plan
  const handleSaveFloorPlan = () => {
    // Perform any validation you need here before saving the floor plan
    // For example, checking if the fields are not empty.

    // Save the edited floor plan to the backend or do whatever you need to do with it
    // Here, you can use axios or any other library to make an API call to save the floor plan.

    // After successfully saving the floor plan, close the modal and show a success message
    setShowFloorPlanModal(false);

    Swal.fire({
      icon: 'success',
      title: 'Floor plan updated successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Function to handle saving the edited privacy type
  const handleSavePrivacyType = () => {
    // Perform any validation you need here before saving the privacy type
    // For example, checking if the field is not empty.

    // Save the edited privacy type to the backend or do whatever you need to do with it
    // Here, you can use axios or any other library to make an API call to save the privacy type.

    // After successfully saving the privacy type, close the modal and show a success message
    setShowPrivacyTypeModal(false);

    Swal.fire({
      icon: 'success',
      title: 'Privacy type updated successfully!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h5 className='mt-3'>Property and rooms</h5>
      <div className='mt-3'>
        <div>
          <h6>
            Structure
            <a href='#' onClick={handleEditStructure} className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.structure}</p>
          <hr />
        </div>
      </div>
      <div className='mt-3'>
        <div>
          <h6>
            Floor plan
            <a href='#' onClick={handleEditFloorPlan} className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          {/* Display floor plan details */}
          {propertyDetails.floorPlan.map((item, index) => (
            <p key={item._id}>
              {item.type}: {item.count}
            </p>
          ))}
          <hr />
        </div>
      </div>
      <div className='mt-3'>
        <div>
          <h6>
            Privacy Type
            <a href='#' onClick={handleEditPrivacyType} className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.privacyType}</p>
          <hr />
        </div>
      </div>

      {/* Modal for editing the structure */}
      {showStructureModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg'>
            <h6 className='font-bold'>Edit Structure</h6>
            <div>
              <label>Structure</label>
              <input
                type='text'
                name='structure'
                value={editedStructure}
                onChange={handleStructureChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div className='flex justify-end mt-4'>
              <button onClick={() => setShowStructureModal(false)} className='mr-2'>
                Cancel
              </button>
              <button onClick={handleSaveStructure} className='bg-blue-500 text-white rounded px-4 py-2'>
                Save
              </button>
              </div>
          </div>
        </div>
      )}

      {/* Modal for editing the floor plan */}
      {showFloorPlanModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg'>
            <h6 className='font-bold'>Edit Floor Plan</h6>
            {/* Additional inputs for editing floor plan, you can customize this part as needed */}
            {editedFloorPlan.map((item, index) => (
              <div key={index}>
                <label>{item.type}</label>
                <input
                  type='number'
                  name={`floorPlan[${index}].count`}
                  value={item.count}
                  onChange={(e) => handleFloorPlanChange(index, e)}
                  className='w-full border rounded-lg p-2'
                />
              </div>
            ))}
            <div className='flex justify-end mt-4'>
              <button onClick={() => setShowFloorPlanModal(false)} className='mr-2'>
                Cancel
              </button>
              <button onClick={handleSaveFloorPlan} className='bg-blue-500 text-white rounded px-4 py-2'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing the privacy type */}
      {showPrivacyTypeModal && (
        <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded-lg'>
            <h6 className='font-bold'>Edit Privacy Type</h6>
            <div>
              <label>Privacy Type</label>
              <input
                type='text'
                name='privacyType'
                value={editedPrivacyType}
                onChange={handlePrivacyTypeChange}
                className='w-full border rounded-lg p-2'
              />
            </div>
            <div className='flex justify-end mt-4'>
              <button onClick={() => setShowPrivacyTypeModal(false)} className='mr-2'>
                Cancel
              </button>
              <button onClick={handleSavePrivacyType} className='bg-blue-500 text-white rounded px-4 py-2'>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomManage;
