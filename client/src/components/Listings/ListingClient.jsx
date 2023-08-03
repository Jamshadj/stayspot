import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { eachDayOfInterval, differenceInDays } from 'date-fns';
import Container from '../userComponents/Container';
import ListingHead from './ListingHead';
import categories from '../hostComponents/AddProperty/StructureData';
import amenities from '../hostComponents/AddProperty/AmenitiesData';
import ListingInfo from './ListingInfo';
import ListingReservation from './ListingReservation';
import { getHostById } from '../../api/userApi'; // Make sure to have the getHostById function implemented in the userApi file or elsewhere.
import { fetchLocationData } from '../../constant/Mapbox';

function ListingClient({ listing, currentUser }) {
  const category = categories.find((item) => item.label === listing.structure);
  const amenitiess = amenities.filter((item) => listing.amenities.includes(item.label));
  
  console.log(category,"category");
  console.log(amenitiess,"amenties");
  const [locationData, setLocationData] = useState(null);
  const [host, setHost] = useState(null); 

  useEffect(() => {
    const fetchListingLocationData = async () => {
      const locationData = await fetchLocationData(listing.coordinates);
      setLocationData(locationData);
    };

    fetchListingLocationData();
  }, [listing.coordinates]);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await getHostById(listing.hostId);
        setHost(response.data);
      } catch (error) {
        console.error('Error fetching guest data:', error);
      }
    };

    fetchGuestData();
  }, [listing.hostId]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div>
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listing.title}
              imageSrc={listing.images}
              locationValue={locationData}
              id={listing._id}
              currentUser={currentUser}
            />
            <div className="flex">
              <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                <ListingInfo
                  user={currentUser}
                  category={category}
                  amenities={amenitiess}
                  description={listing.description}
                  floorplan={listing.floorPlan}
                  locationValue={listing.coordinates}
                  host={host}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;
