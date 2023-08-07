import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { getListings } from '../../../api/userApi';

function MatchingListing() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchLatitude = parseFloat(searchParams.get('latitude'));
  const searchLongitude = parseFloat(searchParams.get('longitude'));
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getListings("Listed");
        if (response && Array.isArray(response.data.listings)) {
          const listingWithDistances = response.data.listings.map((list) => {
            const distance = calculateDistance(
              searchLatitude,
              searchLongitude,
              list.coordinates.latitude,
              list.coordinates.longitude
            );
            return { ...list, distance };
          });
          const nearbyListings = listingWithDistances.filter(item => item.distance <= 10); // Filter by distance
          nearbyListings.sort((a, b) => a.distance - b.distance);
          setFilteredListings(nearbyListings);
          console.log("Filtered listings:", nearbyListings);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [searchLatitude, searchLongitude]);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  }

  function degToRad(deg) {
    return deg * (Math.PI / 180);
  }

  return (
    <div>
      <Navbar />
      <div className='pt-48'>
        Latitude: {searchLatitude}, Longitude: {searchLongitude}
        {filteredListings.map((item, index) => (
          <p key={index}>Distance: {item.title}</p>
        ))}
      </div>
    </div>
  );
}

export default MatchingListing;
