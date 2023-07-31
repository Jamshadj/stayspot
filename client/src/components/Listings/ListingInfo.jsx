import React from 'react';
import { RxAvatar } from 'react-icons/rx';
import ListingCategory from './ListingCategory';

function ListingInfo({ user, category, description, floorplan, locationValue, host }) {
  return (
    <div className='col-span-4 flex flex-col gap-8 overflow-y-auto'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold flex flex-row items-center gap-2'>
          <div>
            Hosted by {host?.firstName} {host?.lastName}
            {host?.image ? (
              <img src={host?.image} alt='Host Avatar' className='w-8 h-8 rounded-full' />
            ) : (
              <RxAvatar />
            )}
          </div>
          <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
            {floorplan.map((item, index) => (
              <div key={index}>
                {item.count} {item.type}
              </div>
            ))}
          </div>
        </div>
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
      <div className="
      text-lg font-light text-neutral-500">
        <h6>Decription</h6>
        {description}
      </div>
      <hr />
    </div>
  );
}

export default ListingInfo;
