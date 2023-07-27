import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function ListingBasics() {
  const { propertyDetails } = useSelector((state) => state);
  const[editTitle,setEditTitle]=useState(false)
  // Check if propertyDetails is available before rendering
  if (!propertyDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h5 className='mt-3'>Listing Basics</h5>
      <div className='mt-3'>
        <div className='mt-3'>
          <h6>
            Listing title
            <a href='#'  className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.title}</p>
          <hr />
        </div>
        <div className='mt-3'>
          <div className='border'>
            <h6>
              listing Title
            </h6>
          </div>
          <hr />
        </div>
        <div className='mt-3'>
          <h6>
            Listing description
            <a href='#' className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.description}</p>
          <hr />
        </div>
        <div className='mt-3'>
          <h6>
            Number of Guests
            <a href='#' className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.floorPlan.find((plan) => plan.type === 'Guest')?.count}</p>
          <hr />
        </div>
        <div className='mt-3'>
          <h6>
            Listing status
            <a href='#' className='text-black hover:underline float-right'>
              Edit
            </a>
          </h6>
          <p>{propertyDetails.status}</p>
          <hr />
        </div>
      </div>
    </div>
  );
}

export default ListingBasics;
