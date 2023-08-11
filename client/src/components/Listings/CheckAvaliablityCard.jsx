import React, { useEffect, useState } from 'react';
import { Button } from "@material-tailwind/react";
import { IoIosArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { getBookingByPropertyId } from '../../api/userApi';

function CheckAvailabilityCard({ listing }) {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [isDatesSelected, setIsDatesSelected] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await getBookingByPropertyId(listing._id);
        console.log(response,"respos");
        setBooking(response.data.booking);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooking();
  }, []);
  const [isGuestCountVisible, setIsGuestCountVisible] = useState(false);
  const [count, sentCount] = useState(false);
  const handleCheckInChange = (event) => {
    setCheckInDate(event.target.value);
    setIsDatesSelected(false);
  };

  const handleCheckOutChange = (event) => {
    const selectedCheckOutDate = new Date(event.target.value);
    const selectedCheckInDate = new Date(checkInDate);
    const availableStartDate = new Date(listing.availableDates.startDate);
    const availableEndDate = new Date(listing.availableDates.endDate);

    if (
      selectedCheckOutDate >= selectedCheckInDate &&
      selectedCheckOutDate >= availableStartDate &&
      selectedCheckOutDate <= availableEndDate
    ) {
      setCheckOutDate(event.target.value);
      setIsDatesSelected(true);
    }
  };

  const getPrice = () => {
    const pricePerNight = Number(listing.pricePerNight);
    const numberOfNights = calculateNumberOfNights();

    return pricePerNight * numberOfNights;
  };

  const calculateNumberOfNights = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      const timeDifference = checkOut.getTime() - checkIn.getTime();
      const numberOfNights = timeDifference / (1000 * 3600 * 24);

      return Math.ceil(numberOfNights);
    }
    return 0;
  };

  const navigate = useNavigate();

  const handleCheckAvailability = () => {
    const numberOfNights = calculateNumberOfNights();

    if (numberOfNights >= listing.minimumStay && numberOfNights <= listing.maximumStay) {
      setIsDatesSelected(true);

      const queryParams = new URLSearchParams({
        listingId: listing._id,
        nights: numberOfNights,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guestCount
      });

      navigate(`/reserve?${queryParams}`);
    } else {
      console.log("re");
      // Display an error message to the user or handle it as appropriate for your UI
    }
  };
 
  

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className='sticky top-0 z-10 h-[200px] w-full inline-block'>
      <div className='pb-12'>
        <div className='mt-12'>
          <div className="border border-gray-300 rounded-lg p-6 shadow-md">
            <div className="text-gray-700 font-sans font-normal text-base leading-5">
              <div className="flex flex-wrap justify-between items-baseline mb-6 gap-x-2 gap-y-4">
                <div className="flex items-baseline">
                  <span className="font-bold">₹ {listing.pricePerNight}</span>
                  <span className="ml-2">night</span>
                </div>
                <div className="text-right">
                  Ratings
                </div>
              </div>
            </div>
            <div className='mb-4'>
              <div className='grid grid-cols-2 '>
                <div className="relative border-2 p-2 overflow-hidden">
                  <div className='text-xs font-bold'>
                    CHECK-IN
                  </div>
                  <div>
                    <input type="date" className='w-full' min={today} value={checkInDate} onChange={handleCheckInChange} />
                  </div>
                </div>
                <div className="relative border-2 p-2 overflow-hidden">
                  <div className='text-xs font-bold'>
                    CHECKOUT
                  </div>
                  <div>
                    <input type="date" className='w-full' value={checkOutDate} min={checkInDate || new Date().toISOString().split('T')[0]} onChange={handleCheckOutChange} />
                  </div>
                </div>
              </div>
              <div>
                <div onClick={() => sentCount(!count)} className='flex relative border-2 p-2 overflow-hidden'>
                  <div>
                    <div className='text-xs font-bold'>
                      Guests
                    </div>
                    <div>
                      {guestCount} guests
                    </div>
                  </div>
                  <div className='ml-auto'>
                    <IoIosArrowDropdown />
                  </div>
                </div>
                {count && (
                  <div className='flex'>
                    <input
                      type="number"
                      value={guestCount}
                      onChange={(event) => setGuestCount(event.target.value)}
                      className='w-9 border-2'
                    />
                    <div>
                      guestCount
                    </div>
                  </div>
                )}

              </div>
            </div>
            <div>
              <Button className='w-full' color='blue' onClick={handleCheckAvailability}>
                {isDatesSelected ? 'Reserve' : 'Check Availability'}
              </Button>
              {isDatesSelected && (
                <div className='mt-3'>
                  <span className='font-normal'>₹ {listing.pricePerNight} x {calculateNumberOfNights()} nights</span>
                  <span className='ml-2'>Total: ₹ {getPrice()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckAvailabilityCard;
