import React from 'react'
import { useSelector } from 'react-redux';

function RoomManage() {
    const { propertyDetails } = useSelector((state) => state);

  return (
    <div>
         <h5 className='mt-3'>Property and rooms</h5>
    </div>
  )
}

export default RoomManage