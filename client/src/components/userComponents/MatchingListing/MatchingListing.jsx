import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { getListings } from '../../../api/userApi';
import ListingCard from '../ListingCard/ListingCard';
import { useSelector } from 'react-redux';
import Container from '../Container';

function MatchingListing() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchLatitude = parseFloat(searchParams.get('latitude'));
  const searchLongitude = parseFloat(searchParams.get('longitude'));
  const checkInDate = searchParams.get('checkInDate'); // Corrected variable name
  const checkOutDate = searchParams.get('checkOutDate'); // Corrected variable name
  const { user } = useSelector((state) => state);
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
            const isAvailable = checkAvailability(checkInDate, checkOutDate, list.availableDates);
            return { ...list, distance, isAvailable };
          });
          const nearbyListings = listingWithDistances.filter(item => item.distance <= 10 && item.isAvailable);
          nearbyListings.sort((a, b) => a.distance - b.distance);
          setFilteredListings(nearbyListings);
          console.log(filteredListings,"filter");
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
  
    fetchListings();
  }, [searchLatitude, searchLongitude]);
  
  function checkAvailability(checkIn, checkOut, availableDates) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const startDate = new Date(availableDates.startDate);
    const endDate = new Date(availableDates.endDate);
  
    return checkInDate >= startDate && checkOutDate <= endDate;
  }
  

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
      <div>
      <Navbar />
      </div>
      <div className='pb-20 pt-20'>
      <Container>
      <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {filteredListings.map((item, index) => (
          <ListingCard key={item.id} data={item} currentUser={user}/>
        ))}
        </div>
      </Container>
      </div>
    </div>
  );
}

export default MatchingListing;
