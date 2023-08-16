import React, { useEffect, useState } from 'react';
import { getUsers, getHosts, getBookings } from "../../../api/adminApi";
import GroupIcon from '@mui/icons-material/Group';
import BookIcon from '@mui/icons-material/Book';
import RevenueCharts from '../Charts/RevenueCharts';
function Home() {
  const [userCount, setUserCount] = useState(0);
  const [hostCount, setHostCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0); // Add state for booking count

  useEffect(() => {
    const getUsersData = () => {
      getUsers()
        .then((response) => {
          setUserCount(response.data.length);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getHostsData = () => {
      getHosts()
        .then((response) => {
          setHostCount(response.data.length);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getBookingsData = () => {
      getBookings()
        .then((response) => {
          setBookingCount(response.data.length); // Set booking count
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getUsersData();
    getHostsData();
    getBookingsData();
  }, []);

  return (
    <div className='m-10 ml-24'>
      <div className='flex gap-4'>
        <div className=' bg-blue-gray-200 rounded-lg '>
          <div className='m-8'>
            <div>
              <GroupIcon />
            </div>
            <div>
              Total User: {userCount}
            </div>
          </div>
        </div>
        <div className=' bg-blue-gray-200 rounded-lg '>
          <div className='m-8'>
            <div>
              <GroupIcon />
            </div>
            <div>
              Total Hosts: {hostCount}
            </div>
          </div>
        </div>
        <div className=' bg-blue-gray-200 rounded-lg '>
          <div className='m-8'>
            <div>
              <BookIcon />
            </div>
            <div>
              Total Bookings: {bookingCount}
            </div>
          </div>
        </div>
      </div>
      <div className='flex mt-28'>
        <div className='w-1/2 h-full w-full'>
          <RevenueCharts/>
        </div>
        <div className='w-1/2'>

        </div>
      </div>
    </div>
  );
}

export default Home;
