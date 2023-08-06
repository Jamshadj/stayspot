import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Navbar from '../Navbar/Navbar';
import { getListingById, getWishlists } from '../../../api/userApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const { user } = useSelector((state) => state);
  const [wishlist, setWishlist] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await getWishlists(user.details._id);
        setWishlist(response.data.wishlist);
        
        // Fetch listing details for each wishlist item
        const listingDetails = await Promise.all(
          response.data.wishlist.map(async (itemId) => {
            const listingResponse = await getListingById(itemId);
            return listingResponse.data;
          })
        );
        setWishlist(listingDetails); // Update wishlist with listing details
      } catch (error) {
        console.error(error);
      }
    };
    fetchWishlist();
  }, [user]);

  const navigateToDetails = (listingId) => {
    navigate(`/rooms/${listingId}`)
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
                <CardFooter className="pt-0">
                  <Button onClick={() => navigateToDetails(item._id)}>
                    Read More
                  </Button>
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
