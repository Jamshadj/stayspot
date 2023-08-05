// ReserveRooms.js
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import Details from './Details';
import { Button } from "@material-tailwind/react";
import { getListingById, postCheckout } from '../../../api/userApi';
import { useSelector } from 'react-redux';
import axios from '../../../axios'
function ReserveRooms() {
  const { user } = useSelector((state) => state);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const checkInDate = new Date(queryParams.get('checkIn'));
  const checkOutDate = new Date(queryParams.get('checkOut'));
  const listingId = queryParams.get('listingId');
  const guests = queryParams.get('guests');
  const checkInDay = checkInDate.getDate();
  const checkOutDay = checkOutDate.getDate();
  const checkInMonth = checkInDate.toLocaleString('default', { month: 'short' });
  const checkOutMonth = checkOutDate.toLocaleString('default', { month: 'short' });
  const [listing, setListing] = useState(null);
  console.log(checkInDate,"checking date");
  const handleStripePay = async () => {
    try {
      const details = {
        userId:user.details._id,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
        listingId,
        guests,
        numberOfNights: calculateNumberOfNights(),
        totalAmount: calculateTotalAmount() // Ensure this value is a valid numeric value
      };
      
      
  
      const response = await postCheckout(details);
      console.log(response,"ew");
      // Redirect to the Stripe checkout page
      window.location = response.data.URL ;
    } catch (error) { 
      console.error(error);
    }
  }
  const handleRazroPay = async () => {
    const { data } = await axios.post("/payment", { amount: calculateTotalAmount() });
    if (!data.err) {
        razroPay(data.order);
    }
};


   const razroPay=async()=>{
    try {
      
    } catch (error) {
      
    }
   }
  
  useEffect(() => {
    async function fetchListing() {
      try {
        const fetchedListing = await getListingById(listingId);
        setListing(fetchedListing.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchListing();
  }, [listingId]);
  let dateDisplay;

  if (checkInMonth === checkOutMonth) {
    dateDisplay = `${checkInDay}-${checkOutDay} ${checkInMonth}`;
  } else {
    dateDisplay = `${checkInDay} ${checkInMonth}-${checkOutDay} ${checkOutMonth}`;
  }

  const calculateNumberOfNights = () => {
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const timeDiff = Math.abs(checkOutDate - checkInDate);
    const numberOfNights = Math.ceil(timeDiff / oneDay);
    return numberOfNights;
  };

  const calculateTotalAmount = () => {
    const pricePerNight = listing && listing.pricePerNight;
    const numberOfNights = calculateNumberOfNights();

    return pricePerNight * numberOfNights;
  };

  return (
    <div>
      <div>
        <Navbar reservation={true} />

      </div>

      <div className='pb-20 pt-20'>
        <div className='m-20 mx-28'>
          <div className='flex'>
            <div className='w-1/2'>

              <Details dateDisplay={dateDisplay} guests={guests} />
              <hr />
              <div>
                <span className='ml-4 text-xl font-medium text-black'>
                  Required for your trip
                </span>
              </div>
              <div className='mt-3  text-black flex'>
                <div>
                  <div>
                    <span className='text-base font-medium ml-4  '>
                      Message the host
                    </span>
                  </div>
                  <div>
                    <span className='text-base font-normal text-gray-700 ml-4  '>
                      Let the host know why you're travelling and when you'll check in.
                    </span>
                  </div>
                </div>
                <div className='ml-auto'>
                  <Button variant="outlined">Add</Button>
                </div>


              </div>
              <div className='mt-3  text-black flex'>
                <div>
                  <div>
                    <span className='text-base font-medium ml-4  '>
                      Phone Number
                    </span>
                  </div>
                  <div>
                    <span className='text-base font-normal text-gray-700 ml-4  '>
                      Add and confirm your phone number to get trip updates.
                    </span>
                  </div>
                </div>
                <div className='ml-auto'>
                  <Button variant="outlined">Add</Button>
                </div>
              </div>
              <hr />
              <div>
                Ground rues
              </div>
              <hr />
              <div className='mt-3  text-black '>
                <div>
                  <span className='ml-4 text-xl font-medium text-black'>
                    Pay With
                  </span>
                </div>
                <div className='flex'>
                  <div>
                    <div className='mt-4'>
                      <span className='text-base font-medium ml-4  '>
                        Pay using card
                      </span>
                    </div>
                    <div>
                      <span className='text-base font-normal text-gray-700 ml-4  '>
                        Let the host know why you're travelling and when you'll check in.
                      </span>
                    </div>
                  </div>
                  <div className='ml-auto'>
                    <Button onClick={handleStripePay} variant="outlined">Pay now</Button>
                  </div>
                </div>
                <div className='flex'>
                  <div>
                    <div className='mt-4'>
                      <span className='text-base font-medium ml-4  '>
                        Pay using upi
                      </span>
                    </div>
                    <div>
                      <span className='text-base font-normal text-gray-700 ml-4  '>
                        Let the host know why you're travelling and when you'll check in.
                      </span>
                    </div>
                  </div>
                  <div className='ml-auto'>
                    <Button onClick={handleRazroPay} variant="outlined">Pay now</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-1/2'>
              <div className='m-8 flex'>
                <div className='flex -mr-11'>
                  <div className='w-1/3 ml-28 '>
                    {listing && listing.images && listing.images.length > 0 && (
                      <img className='max-w-[66%] border-r-2 rounded-md' src={listing.images[0]} alt="" />
                    )}
                  </div>
                  <div>
                    <div>
                      <span>
                        {listing && listing.title} {/* Removed the unnecessary curly braces */}
                      </span>
                    </div>
                    <div>
                      <span>
                        {listing && listing.location}
                      </span>
                    </div>

                  </div>
                </div>
              </div>
              <hr className='ml-32' />
              <div className='ml-32'>
                <span className='text-lg font-semibold ml-4'>
                  Price details
                </span>
              </div>
              <div className='ml-32'>
                <span className='text-sm ml-4'>
                  ₹ {listing && listing.pricePerNight} x {calculateNumberOfNights()} nights
                </span>
                <span className='text-sm ml-4'>
                  Total: ₹ {calculateTotalAmount()}
                </span>
              </div>
              <hr className='ml-32'/>
              <div className='ml-32'>
                Total: ₹ {calculateTotalAmount()}
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReserveRooms;
