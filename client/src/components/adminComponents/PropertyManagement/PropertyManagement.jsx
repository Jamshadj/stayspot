import React, { useEffect, useState } from 'react';
import { getListingById } from '../../../api/userApi';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { updateListingStatus } from '../../../api/adminApi';

function PropertyManagement() {
  const { propertyId } = useParams();
  const [listing, setListing] = useState(null);
  const [status, setStatus] = useState('');

  
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getListingById(propertyId);
        console.log(response);
        if (response && response.data) {
          setListing(response.data); // Set the fetched listing in the state
          setStatus(response.data.status); // Set the initial status in the state
        }
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [propertyId]);

  const handleStatusChange = async () => {
    try {
      // Show SweetAlert with three options
      const result = await Swal.fire({
        title: 'Select an option',
        input: 'radio',
        inputOptions: {
          Reject: 'Reject',
          Listed: 'Listed',
          Unlisted: 'Unlisted',
        },
        inputValidator: (value) => {
          if (!value) {
            return 'You must choose one option!';
          }
        },
      });

      if (result.isConfirmed) {
        const selectedOption = result.value;
        // Assuming you have an API function to update the status of the listing
        const response = await updateListingStatus(propertyId, { status: selectedOption });
        console.log(response); // Log the response for debugging purposes

        // Update the status in the state and the listing data
        setStatus(selectedOption);
        setListing((prevListing) => ({ ...prevListing, status: selectedOption }));

        // Show the API response in a new Swal
        await Swal.fire({
          title: 'Success',
          text: response.data.message, // Assuming the API returns { message: 'Listing status updated successfully!' }
          icon: 'success',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      // Show an error Swal in case of API failure
      await Swal.fire({
        title: 'Error',
        text: 'Failed to update listing status',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      {listing ? (
        <div className="container mx-auto py-8">
          <h2 className="text-3xl font-bold mb-4">Listing Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl font-semibold">Basic Details</h3>
              <p>Structure: {listing.structure}</p>
              <p>Privacy Type: {listing.privacyType}</p>
              <p>Location: {listing.location}</p>
              <p>Coordinates: {JSON.stringify(listing.coordinates)}</p>
              <p>Title: {listing.title}</p>
              <p>Description: {listing.description}</p>
              <h3 className="text-xl font-semibold mt-4">Address</h3>
              <p>Country: {listing.address.country}</p>
              <p>City: {listing.address.city}</p>
              <p>Post Code: {listing.address.postCode}</p>
              <p>Region: {listing.address.region}</p>
              <p>House Number: {listing.address.houseNumber}</p>
              <p>Area: {listing.address.area}</p>
              <p>Street Address: {listing.address.streetAddress}</p>
              <p>Landmark: {listing.address.landMark}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Floor Plan</h3>
              {listing.floorPlan.map((plan, index) => (
                <p key={index}>
                  Type: {plan.type}, Count: {plan.count}
                </p>
              ))}
              <h3 className="text-xl font-semibold mt-4">Amenities</h3>
              {listing.amenities.map((amenity, index) => (
                <p key={index}>{amenity}</p>
              ))}
              {/* <h3 className="text-xl font-semibold mt-4">Availability</h3>
              <p>Minimum Stay: {listing.minimumStay}</p>
              <p>Maximum Stay: {listing.maximumStay}</p> */}
            </div>
          </div>
          <h2 className="text-2xl font-bold mt-4">Status: {status}</h2>
          {/* Display the updated status here */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Render the images */}
            {listing.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className="max-w-sm rounded-md"
              />
            ))}
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600"
            onClick={handleStatusChange}
          >
            Change Status
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default PropertyManagement;
