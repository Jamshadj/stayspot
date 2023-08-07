import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Search() {
  const [showInput, setShowInput] = useState(false);
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setShowInput(true);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=pk.eyJ1IjoiamFtc2hhZDEiLCJhIjoiY2xrOXc0cXM1MDFkYjNtcWQ3NDVmZmh4ciJ9.GCP7IIfzt1ms84ZeOr7uag`
      );
      const suggestions = response.data.features.map((feature) => ({
        location: feature.place_name,
        coordinates: feature.center,
      }));
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("jejeeeeee");
    const latitude = suggestion.coordinates[1];
    const longitude = suggestion.coordinates[0];
    const queryString = `?latitude=${latitude}&longitude=${longitude}`;
    // navigate(`/matchingListing${queryString}`);
    setSuggestions([]);
  };

  const handleSearchChange = (e) => {
    console.log("ded");
    const { value } = e.target;

    setLocation(value);
    fetchSuggestions(value);
  };

  const handleInputBlur = () => {
    setShowInput(false);
    setLocation('');
  };

  const handleCheckInDateChange = (e) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutDateChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  // Function to disable dates before today
  const disablePastDates = (currentDate) => {
    const now = new Date();
    return currentDate < now;
  };

  // Function to disable dates before the check-in date
  const disableBeforeCheckIn = (currentDate) => {
    const checkInDateObject = new Date(checkInDate);
    return currentDate <= checkInDateObject;
  };

  const hell=()=>{
    console.log("ggg");
  }

  const searchListingsByLocation = async () => {
    try {
      console.log("wdwed");
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json`,
        {
          params: {
            access_token: 'pk.eyJ1IjoiamFtc2hhZDEiLCJhIjoiY2xrOXc0cXM1MDFkYjNtcWQ3NDVmZmh4ciJ9.GCP7IIfzt1ms84ZeOr7uag',
          },
        }
      );
    console.log(response);
      const coordinates = response.data.features[0].geometry.coordinates;
      const latitude = coordinates[1];
      const longitude = coordinates[0];
     
      const queryString = `?latitude=${latitude}&longitude=${longitude}`;
      navigate(`/matchingListing${queryString}`);
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
            className="w-[22%] px-4 py-1 text-sm outline-none"
            placeholder="Location"
            value={location}
            onChange={handleSearchChange}
            onBlur={handleInputBlur}
          />
           <label className="px-4 py-1 text-sm text-gray-600">Check-in</label>
          <input
            type="date"
            className="w-[22%] px-2 py-1 text-sm outline-none"
            value={checkInDate}
            onChange={handleCheckInDateChange}
            min={new Date().toISOString().split('T')[0]} // Disable past dates
          />
          <label className="px-4 py-1 text-sm text-gray-600">Check-out</label>
          <input
            type="date"
            className="w-[22%] px-2 py-1 text-sm outline-none"
            value={checkOutDate}
            onChange={handleCheckOutDateChange}
            min={checkInDate || new Date().toISOString().split('T')[0]} // Disable before check-in date
            disabled={!checkInDate} // Disable until check-in date is selected
          />
          <div
            className="p-2 bg-rose-500 rounded-full text-black"
            onClick={searchListingsByLocation}
          >
            <FaSearch onClick={hell} size={18} />
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-between">
          <div className="text-sm font-semibold px-6">Anywhere</div>
          <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
            Anywhere
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block">Add Guest</div>
            <div className="p-2 bg-rose-500 rounded-full text-black">
              <FaSearch size={18} />
            </div>
          </div>
        </div>
      )}
      {/* Suggestions dropdown */}
      {showInput && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg" style={{
          marginLeft: "21px", width: "29rem"
        }}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.location}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
