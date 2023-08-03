import React from 'react';
import { RxAvatar } from 'react-icons/rx';
import ListingCategory from './ListingCategory';
import Map from './Map';
import ListingAmentie from './ListingAmentie';

function ListingInfo({ user,amenities, category, description, floorplan, locationValue, host }) {
  console.log("am",amenities);
  return (
    <div className='col-span-4 flex flex-col gap-8 overflow-y-auto'>
      <div className='flex items-center gap-4'>
        {host?.image ? (
          <img src={host?.image} alt='Host Avatar' className='w-8 h-8 rounded-full' />
        ) : (
          <RxAvatar />
        )}
        <div className='flex flex-col'>
          <span className='text-xl font-semibold'>
            Hosted by {host?.firstName} {host?.lastName}
          </span>
        </div>
      </div>
          <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
            {floorplan.map((item, index) => (
              <div key={index}>
                {item.count} {item.type}
              </div>
            ))}
          </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      {amenities && (
      <ListingAmentie
      amenities={amenities}
      />
      )}
      {/* 
        <Listi
          icon={amenities.icon}
          label={amenities?.label}
          description={amenities?.description}
        />
       
      */}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        <h6>Decription</h6>
        {description}
      </div>
      <hr />
      <Map center={locationValue} />
    </div>
  );
}

export default ListingInfo;
