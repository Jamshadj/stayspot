import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { postAddProperty } from '../../../api/hostApi';

function PropertyDetails() {
  const propertyDetails = useSelector((state) => state.propertyDetails);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigation = () => {
    Swal.fire({
      title: 'Sorry, some of the data is incomplete',
      text: 'You need to add more details',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, continue!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, navigate to '/host/step-1'
        navigate('/host/step-1');
      } else {
        // User canceled, navigate to '/host'
        navigate('/host');
      }
    });
  };

  const complete = async () => {
    try {
      // Show a SweetAlert popup indicating that the API call is in progress
      Swal.fire({
        title: 'Please wait',
        text: 'Saving your property...',
        allowOutsideClick: false,
        showConfirmButton: false,
        onOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await postAddProperty(propertyDetails);
      console.log('response', response);
      if (response && response.data.error === false) {
        // Property added successfully, close the loading modal
        Swal.close();
        dispatch({ type: 'refresh' });
        navigate('/host');
      } else {
        // Handle error scenario
        Swal.fire({
          title: 'Error',
          text: 'Error occurred during saving the property',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      // Handle API call error
      Swal.fire({
        title: 'Error',
        text: 'Error occurred during API call',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.log('Error occurred during API call:', error);
    }
  }

  if (!propertyDetails.structure) {
    // Property details are null, show SweetAlert and confirm navigation
    handleNavigation();
    return null; // or you can render a loading spinner or any other message
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-4">Property Details</h2>
      <div className="grid grid-cols-2 gap-4">
      <div>
          <h3 className="text-xl font-semibold">Basic Details</h3>
          <p>Structure: {propertyDetails.structure}</p>
          <p>Privacy Type: {propertyDetails.privacyType}</p>
          <p>Location: {propertyDetails.location}</p>
          <p>Coordinates: {JSON.stringify(propertyDetails.coordinates)}</p>
          <p>Title: {propertyDetails.title}</p>
          <p>Description: {propertyDetails.description}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Address</h3>
          <p>Country: {propertyDetails.address.country}</p>
          <p>City: {propertyDetails.address.city}</p>
          <p>Post Code: {propertyDetails.address.postCode}</p>
          <p>Region: {propertyDetails.address.region}</p>
          <p>House Number: {propertyDetails.address.houseNumber}</p>
          <p>Area: {propertyDetails.address.area}</p>
          <p>Street Address: {propertyDetails.address.streetAddress}</p>
          <p>Landmark: {propertyDetails.address.landMark}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Floor Plan</h3>
          {propertyDetails.floorPlan.map((plan, index) => (
            <p key={index}>
              Type: {plan.type}, Count: {plan.count}
            </p>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold">Amenities</h3>
          {propertyDetails.amenities.map((amenity, index) => (
            <p key={index}>{amenity}</p>
          ))}
        </div>
        <div>
          <h3 className="text-xl font-semibold">Availability</h3>
          <p>Minimum Stay: {propertyDetails.minimumStay}</p>
          <p>Maximum Stay: {propertyDetails.maximumStay}</p>
          <p>
            Availability Dates between:
            Start: {JSON.stringify(propertyDetails.availability[0])}
            End: {JSON.stringify(propertyDetails.availability[1])}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Images</h3>
          {propertyDetails.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="max-w-sm rounded-md"
            />
          ))}
        </div>                
      </div>
      <button
        onClick={complete}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
      >
        Confirm
      </button>
    </div>
  );
}

export default PropertyDetails;
