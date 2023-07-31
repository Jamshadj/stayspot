import React, { useEffect, useState } from 'react';
import Container from '../Container';
import { getListings } from '../../../api/userApi';
import ListingCard from '../ListingCard/ListingCard';
import { useSelector } from 'react-redux';



function Page() {
  const [listings, setListings] = useState([]);
  const { user } = useSelector((state) => state);
  const currentUser=user;
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await getListings("Listed");
        
        if (response && Array.isArray(response.data.listings)) {
          setListings(response.data.listings);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  console.log(listings);

  return (
    <Container>
      <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map(listing => (
          // Render ListingCard with individual listing data and provide a unique key prop.
          <ListingCard key={listing.id} data={listing} currentUser={currentUser}/>
        ))}
      </div>
    </Container>
  );
}

export default Page;
