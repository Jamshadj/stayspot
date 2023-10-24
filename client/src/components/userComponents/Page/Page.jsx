import React, { useEffect, useState } from 'react';
import Container from '../Container';
import { getListings } from '../../../api/userApi';
import ListingCard from '../ListingCard/ListingCard';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { Box, CircularProgress } from '@mui/material';

function Page() {
  const [listings, setListings] = useState([]);
  const { user } = useSelector((state) => state);
  const currentUser = user;

  const location = useLocation(); // Get the current location object
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category'); // Get the selected category from the URL parameter
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Pass the selected category to the getListings function
        const response = await getListings(selectedCategory);

        if (response && Array.isArray(response.data.listings)) {
          setListings(response.data.listings);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [selectedCategory]); // Trigger the effect whenever the selected category changes

  return (
    <Container>
    {listings.length === 0 ? (
      <div className="flex justify-center mt-8">
        <Box sx={{ display: 'flex' }}>
          <CircularProgress />
        </Box>
      </div>
    ) : (
      <div className="pt-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
        ))}
      </div>
    )}
  </Container>
  );
}

export default Page;
