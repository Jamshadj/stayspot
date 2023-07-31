import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { eachDayOfInterval, differenceInDays } from 'date-fns';
import Container from '../userComponents/Container';
import ListingHead from './ListingHead';
import categories from '../hostComponents/AddProperty/StructureData';
import ListingInfo from './ListingInfo';
import ListingReservation from './ListingReservation';
import { getHostById } from '../../api/userApi'; // Make sure to have the getHostById function implemented in the userApi file or elsewhere.

function ListingClient({ listing, currentUser }) {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.structure);
  }, [listing.structure]);

  const [locationData, setLocationData] = useState(null);
  const [host, setHost] = useState(null);
  // const [dateRange, setDateRange] = useState({
  //   startDate: listing.availableDates.startDate,
  //   endDate: listing.availableDates.endDate,
  //   key: 'selection',
  // });
  // const [totalPrice, setTotalPrice] = useState(listing.pricePerNight);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${listing.coordinates.longitude},${listing.coordinates.latitude}.json`,
          {
            params: {
              access_token: 'pk.eyJ1IjoiamFtc2hhZDEiLCJhIjoiY2xrOXc0cXM1MDFkYjNtcWQ3NDVmZmh4ciJ9.GCP7IIfzt1ms84ZeOr7uag',
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
        const response = await getHostById(listing.hostId);
        setHost(response.data);
      } catch (error) {
        console.error('Error fetching guest data:', error);
      }
    };

    fetchGuestData();
  }, [listing.hostId]);

  // useEffect(() => {
  //   if (dateRange.startDate && dateRange.endDate) {
  //     const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
  //     if (dayCount && listing.price) {
  //       setTotalPrice(dayCount * listing.price);
  //     } else {
  //       setTotalPrice(listing.price);
  //     }
  //   }
  // }, [dateRange, listing.price]);

  // Define reservations (replace this with actual reservation data)
  // const reservations = [];

  // const disabledDates = useMemo(() => {
  //   let dates = [];

  //   reservations.forEach((reservation) => {
  //     const range = eachDayOfInterval({
  //       start: new Date(reservation.startDate),
  //       end: new Date(reservation.endDate),
  //     });

  //     dates = [...dates, ...range];
  //   });

  //   return dates;
  // }, [reservations]);

  // const onCreateReservation = async () => {
    // Implement the create reservation logic here
    // This function should handle the API call to create a new reservation
    // and update the reservations state with the new reservation data.
  // };

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
                locationValue={listing.coordinates}
                host={host}
              />
              {/* <div className="order-first mb-10 md:order-last md:col-span-3"> */}
                {/* <ListingReservation
                  price={listing.pricePerNight}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  // disabledDates={disabledDates}
                /> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;
