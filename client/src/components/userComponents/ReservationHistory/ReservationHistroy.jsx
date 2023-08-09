import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Card, Typography } from '@material-tailwind/react';
import { getReservationById } from '../../../api/userApi';
import { useSelector } from 'react-redux';

function ReservationHistory() {
  const { user } = useSelector((state) => state);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const response = await getReservationById(user.details._id);
        console.log(response.data.bookings, 'res');
        if (response && response.data.bookings) {
          setBookings(response.data.bookings);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchReservations();
  }, [user.details._id]);

  const TABLE_HEAD = ['ID', 'Check-in', 'Check-out', 'Nights', 'Amount', 'Booking Date'];

  return (
    <div>
      <div>
        <Navbar reservation={'reservation'} />
      </div>
      <div className="pt-28">
        <div>
          <Card className="w-full h-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings.map(({ _id, checkInDate, checkOutDate, numberOfNights, totalAmount, bookingDate }) => (
                  <tr key={_id}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {_id}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                      {new Date(checkInDate).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                      {new Date(checkOutDate).toLocaleDateString()}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {numberOfNights}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {totalAmount}
                      </Typography>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {new Date(bookingDate).toLocaleDateString()}
                      </Typography>     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ReservationHistory;
