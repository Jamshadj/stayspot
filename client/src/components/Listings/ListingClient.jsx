import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios'; // Import axios to make API requests
import Container from '../userComponents/Container';
import ListingHead from './ListingHead';
import categories from '../hostComponents/AddProperty/StructureData';
import ListingInfo from './ListingInfo';
import { getHostById } from '../../api/userApi';

function ListingClient({ listing, currentUser }) {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.structure);
  }, [listing.structure]);
  const [locationData, setLocationData] = useState(null);
  const [host, setHost] = useState(null);

  useEffect(() => {
    // Fetch the region and label using reverse geocoding
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${listing.coordinates.longitude},${listing.coordinates.latitude}.json`,
          {
            params: {
              access_token: 'pk.eyJ1IjoiamFtc2hhZDEiLCJhIjoiY2xrOXc0cXM1MDFkYjNtcWQ3NDVmZmh4ciJ9.GCP7IIfzt1ms84ZeOr7uag', // Replace with your Mapbox access token
            },
          }
        );
        setLocationData(response.data.features[0]);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocationData();
  }, [listing.coordinates]);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        // Assuming you have a function getHostById to fetch guest data by hostId
        const response = await getHostById(listing.hostId);
        setHost(response.data); // Assuming response.data contains the guest information
      } catch (error) {
        console.error('Error fetching guest data:', error);
      }
    };

    fetchGuestData();
  }, [listing.hostId]);
  console.log("host",host);
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
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={currentUser}
              category={category}
              description={listing.description}
              floorplan={listing.floorPlan}
              locationValue={locationData}
             host={host}
            />
          </div>
          <div>
            hehe
          </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;
