import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { eachDayOfInterval, differenceInDays } from 'date-fns';
import Container from '../userComponents/Container';
import ListingHead from './ListingHead';
import categories from '../hostComponents/AddProperty/StructureData';
import amenities from '../hostComponents/AddProperty/AmenitiesData';
import ListingInfo from './ListingInfo';
import ListingReservation from './ListingReservation';
import { getHostById } from '../../api/userApi'; // Make sure to have the getHostById function implemented in the userApi file or elsewhere.
import { fetchLocationData } from '../../constant/Mapbox';
import {IoIosArrowDropdown} from 'react-icons/io'
function ListingClient({ listing, currentUser }) {
  const category = categories.find((item) => item.label === listing.structure);
  const amenitiess = amenities.filter((item) => listing.amenities.includes(item.label));
  console.log(category, "category");
  console.log(amenitiess, "amenties");
  const [locationData, setLocationData] = useState(null);
  const [host, setHost] = useState(null);

  useEffect(() => {
    const fetchListingLocationData = async () => {
      const locationData = await fetchLocationData(listing.coordinates);
      setLocationData(locationData);
    };

    fetchListingLocationData();
  }, [listing.coordinates]);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await getHostById(listing.hostId);
        setHost(response.data);
      } catch (error) {
        console.error('Error fetching guest data:', error);
      }
    };

    fetchGuestData();
  }, [listing.hostId])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div>
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listing.title}
              imageSrc={listing.images}
              locationValue={locationData}
              id={listing._id}
              currentUser={currentUser}
            />
            <div className="flex">
              <div className="w-1/2 mt-6">
                <ListingInfo
                  user={currentUser}
                  category={category}
                  amenities={amenitiess}
                  description={listing.description}
                  floorplan={listing.floorPlan}
                  locationValue={listing.coordinates}
                  host={host}
                />
              </div>
              <div className="relative w-1/3 ml-[8%] mr-0">
      <div className='sticky top-0 z-10 h-[200px] w-full inline-block'>
        <div className='pb-12'>
          <div className='mt-12'>
            <div className="border border-gray-300 rounded-lg p-6 shadow-md">
              <div className="text-gray-700 font-sans font-normal text-base leading-5">
                <div className="flex flex-wrap justify-between items-baseline mb-6 gap-x-2 gap-y-4">
                  <div className="flex items-baseline">
                    <span className="font-bold">₹ {listing.pricePerNight}</span>
                    <span className="ml-2">night</span>
                  </div>
                  <div className="text-right">
                    Ratings
                  </div>
                </div>
              </div>
              <div className='mb-4'>
                <div className='grid grid-cols-2 '>
                  <div className="relative border-2 p-2 overflow-hidden">
                    <div className='text-xs font-bold'>
                      CHECK-IN
                    </div>
                    <div>
                      19/04/2004
                    </div>
                  </div>
                  <div className="relative border-2 p-2 overflow-hidden">
                    <div className='text-xs font-bold'>
                      CHECKOUT
                    </div>
                    <div>
                      19/04/2004
                    </div>
                  </div>
                </div>
                <div className='flex relative border-2 p-2 overflow-hidden'>
                  <div>
                  <div className='text-xs font-bold'>
                    Guests
                  </div>
                  <div>
                    1 guest
                  </div>
                  </div>
                  <div className='ml-auto'>
                    <IoIosArrowDropdown/>
                  </div>
                </div>
              </div>
              <div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            </div>
          </div>
        </div>
        <div className='mt-[100rem]'>
          hello
        </div>
      </div>
    </Container>
  );
}

export default ListingClient;
