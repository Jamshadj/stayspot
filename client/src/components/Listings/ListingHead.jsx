import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from './Heading';

function ListingHead({ title, locationValue, imageSrc }) {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    // Fetch the region and label using reverse geocoding
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationValue.longitude},${locationValue.latitude}.json`,
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
  }, [locationValue]);

  return (
    <>
      <Heading title={title} subtitle={`${locationData?.text}, ${locationData?.label}`} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative flex">
        <img
          src={imageSrc[0].secure_url}
          alt={`Image 1`}
          className="object-cover h-full w-1/2"
        />
        <div className="flex w-1/2 gap-2">
          {imageSrc.slice(1).map((image, index) => (
            <img
              key={index + 1}
              src={image.secure_url}
              alt={`Image ${index + 2}`}
              className="object-cover h-[30vh] w-1/2"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ListingHead;
