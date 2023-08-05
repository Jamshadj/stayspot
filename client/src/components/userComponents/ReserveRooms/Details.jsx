// Details.js
import React from 'react';

function Details({ dateDisplay, guests }) {
  return (
    <div>
      <div>
        <span className='text-2xl ml-5 font-semibold'>
          Book Your Stay
        </span>
      </div>
      <div className='ml-8 mt-10'>
        <div>
          <span className='text-xl font-semibold'>
            Your trip
          </span>
        </div>
        <div className='mt-6'>
          <div className='flex'>
            <div>
              <span className='text-base font-semibold'>
                Dates
              </span>
            </div>
            <div className='ml-auto'>
              <span className='text-base pl-auto font-semibold'>
                Edit
              </span>
            </div>
          </div>
          <span>
            {dateDisplay}
          </span>
        </div>
        <div className='mt-6'>
          <div className='flex'>
            <div>
              <span className='text-base font-semibold'>
                Guests
              </span>
            </div>
            <div className='ml-auto'>
              <span className='text-base pl-auto font-semibold'>
                Edit
              </span>
            </div>
          </div>
          <span>
            {guests} guest
          </span>
        </div>
      </div>
    </div>
  );
}

export default Details;
