import React, { useEffect, useState } from 'react'
import {AiOutlineSelect} from "react-icons/ai"
import { useSelector } from 'react-redux';
import { getBookingById } from '../../../api/adminApi';
import { getListingById } from '../../../api/userApi';

function TodayReversation() {
  const { host } = useSelector((state) => state);
  const [bookingData,setBookingData]=useState([])
  const getBookingData = async () => {
    try {
        const response = await getListingById(host.details._id);
        setBookingData(response.data);

    } catch (error) {
        console.error(error);
    }
};
  useEffect(() => {
    getBookingData();
}, [host.details._id]);
{bookingData && console.log(bookingData,"boo");}
  return (
    <div className="card w-5/6 mx-auto  mt-8 " style={{backgroundColor:" rgb(243 243 243)",height:"17rem"}}>
    <div className="card-body ">
      <h2 className="card-title mx-auto  pt-16"><AiOutlineSelect/></h2>
      <p className='mx-auto'>You dont have any guest tommorow</p>
    </div>
  </div>
  )
}

export default TodayReversation