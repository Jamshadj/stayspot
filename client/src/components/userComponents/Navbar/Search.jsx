import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios'; // Import axios for API requests
import { getMatchingListings } from '../../../api/userApi';

function Search() {
  const [showInput, setShowInput] = useState(false);
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleSearchClick = () => {
    setShowInput(true);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutDateChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  const handleInputBlur = () => {
    setShowInput(false);
    setLocation('');
  };

  const searchListingsByLocation = async () => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
        {
          params: {
            access_token: 'pk.eyJ1IjoiamFtc2hhZDEiLCJhIjoiY2xrOXc0cXM1MDFkYjNtcWQ3NDVmZmh4ciJ9.GCP7IIfzt1ms84ZeOr7uag', // Replace with your Mapbox access token
          },
        }
      );
console.log(response);
      const coordinates = response.data.features[0].geometry.coordinates;
       console.log(coordinates,"coord");
      // Fetch matching listings using coordinates
      const listingsResponse = await getMatchingListings(coordinates); // Replace with your backend API call
      if (listingsResponse && Array.isArray(listingsResponse.data.listings)) {
        setListings(listingsResponse.data.listings);
      }
    } catch (error) {
      console.error('Error fetching matching listings:', error);
    }
  };

  return (
    <div
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={handleSearchClick}
    >
      {showInput ? (
        <div className="flex flex-row items-center">
          <input
            type="text"
            className="w-1/3 px-4 py-1 text-sm outline-none"
            placeholder="Location"
            value={location}
            onChange={handleLocationChange}
          />
          <label className="px-4 py-1 text-sm text-gray-600">Check-in</label>
          <input
            type="date"
            className="w-1/3 px-2 py-1 text-sm outline-none"
            value={checkInDate}
            onChange={handleCheckInDateChange}
          />
          <label className="px-4 py-1 text-sm text-gray-600">Check-out</label>
          <input
            type="date"
            className="w-1/3 px-2 py-1 text-sm outline-none"
            value={checkOutDate}
            onChange={handleCheckOutDateChange}
          />
          <div
            className="p-2 bg-rose-500 rounded-full text-black"
            onClick={searchListingsByLocation}
          >
            <FaSearch size={18} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm font-semibold px-6">Anywhere</div>
          <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
            Anywheek
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block">Add Guest</div>
            <div className="p-2 bg-rose-500 rounded-full text-black">
              <FaSearch size={18} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
