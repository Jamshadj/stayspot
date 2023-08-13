import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { getReservationById } from '../../../api/userApi';
import { useSelector } from 'react-redux';
import ReservationHistoryCard from './ReservationHistoryCard';

function ReservationHistory() {
  const { user } = useSelector((state) => state);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await getReservationById(user.details._id);
        console.log(response.data.bookings, 'res');
        if (response.data.bookings) {
          setBookings(response.data.bookings);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchReservations();
  }, [user.details._id]);

  return (
    <div>
      <Navbar reservation={'reservation'} />
      <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {bookings.length === 0 ? (
          <p>No bookings.</p>
        ) : (
          bookings.map(booking => (
            <ReservationHistoryCard key={booking.id} data={booking} currentUser={user} />
          ))
        )}
      </div>
    </div>
  );
}

export default ReservationHistory;