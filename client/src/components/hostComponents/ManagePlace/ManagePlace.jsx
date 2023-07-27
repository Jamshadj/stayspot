import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom';

import HostNavbar from '../HostNavbar/HostNavbar';
import SideBarListing from '../Deatails/DetailsSideBar/SideBarListing';
import axios from '../../../axios';
import ListingImages from './ListingImages/ListingImages';
import ListingBasics from './ListingBasics/ListingBasics';

function ManagePlace() {
  // Get the propertyId from the URL params
  const { propertyId } = useParams();

  // Local state to manage the loading status
  const [loading, setLoading] = useState(true);

  // Access the Redux store using useDispatch hook
  const dispatch = useDispatch();

  // Fetch property details when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Fetch property details from the API
        const response = await axios.get(`/host/property/${propertyId}`);
        const propertyDetails = response.data.propertyDetails;
console.log("pr",propertyDetails);
        // Dispatch an action to set property details in Redux store
        dispatch({ type: 'propertyDetails', payload: propertyDetails });

        // Set loading to false after successfully fetching data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    // Call the fetchPropertyDetails function
    fetchProperties();
  }, [propertyId, dispatch]);

  // If loading is true, display a loading message (optional: you can add a loading spinner)
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {/* HostNavbar component goes here */}
        <HostNavbar />
      </div>
      <div className='flex'>
        {/* SideBarListing component goes here */}
        <SideBarListing activeItem="Listing Details" />
        <div className='w-full m-28'>
          {/* ListingImages component goes here */}
          <ListingImages />
          {/* ListingBasics component goes here */}
          <ListingBasics />
        </div>
      </div>
    </div>
  );
}

export default ManagePlace;
