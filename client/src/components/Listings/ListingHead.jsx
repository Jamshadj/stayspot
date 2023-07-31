import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Heading from './Heading';

function ListingHead({ title, locationValue, imageSrc }) {
 

  return (
    <>
      <Heading title={title} subtitle={`${locationValue?.text}`} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative flex">
        <img
          src={imageSrc[0].secure_url}
          alt={`Image 1`}
          className="object-cover h-full w-1/2"
        />
        <div >
          <div className='w-2/2 ml-2 '>

            <div className="flex gap-2 ">
              {imageSrc.slice(1, 3).map((image, index) => (
                <img
                  key={index + 1}
                  src={image.secure_url}
                  alt={`Image ${index + 2}`}
                  className="object-cover h-[30vh] w-1/2"
                />
              ))}
            </div>
          </div>
          <div className='w-2/2 ml-2'>

<div className="flex gap-2 mt-2">
              {imageSrc.slice(3, 5).map((image, index) => (
                <img
                  key={index + 1}
                  src={image.secure_url}
                  alt={`Image ${index + 2}`}
                  className="object-cover h-[30vh] w-1/2"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingHead;
