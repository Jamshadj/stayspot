import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import Navbar from '../Navbar/Navbar';
import { getWishlists, getListingById } from '../../../api/userApi';
import HeartButton from '../ListingCard/HeartButton';

function Favorites() {
  const { user } = useSelector((state) => state);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const fetchWishlist = async () => {
    try {
      const response = await getWishlists(user.details._id);
      setWishlist(response.data.wishlist);

      const listingDetails = await Promise.all(
        response.data.wishlist.map(async (itemId) => {
          const listingResponse = await getListingById(itemId);
          return listingResponse.data;
        })
      );
      setWishlist(listingDetails);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const removeFromWishlist = (listingId) => {
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== listingId));
  };

  const navigateToDetails = (listingId) => {
    navigate(`/rooms/${listingId}`);
  };

  return (
    <div>
      <Navbar reservation={"reservation"} />
      <div className='pt-24'>
        <div className='m-10' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }}>
          {wishlist.length === 0 ? (
            <Typography className="text-center mt-4">Your wishlist is empty.</Typography>
          ) : (
            wishlist.map((item) => (
              <Card className="w-96" key={item._id}>
                <CardHeader color="blue-gray" className="relative h-56">
                  {item.images && item.images[0] && (
                    <img src={item.images[0]} alt="card-image" />
                  )}
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {item.title || 'Title not available'}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex" >
                  <Button onClick={() => navigateToDetails(item._id)}>
                    Show more
                  </Button>
                  <div className='ml-auto'>
                    <HeartButton
                      listingId={item._id}
                      currentUser={user}
                      favorites={true}
                      updateWishlist={removeFromWishlist} // Pass the callback function
                    />
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Favorites;
