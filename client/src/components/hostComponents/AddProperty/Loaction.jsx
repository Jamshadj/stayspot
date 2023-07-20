import React, { useState } from "react";
import PropertyNavbar from "./PropertyNavbar";
import Footer from "./Footer";
import axios from "axios";
import map from '../../../assets/Map/GoogleMaps.jpg';
import LocationIcon from '../../../assets/Map/LocationIcon.png';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";
function Location() {
  const [suggestions, setSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
    fetchSuggestions(value);
  };
console.log("country",searchValue.context);
  const handleNext = () => {
    dispatch({ type: 'propertyDetails', payload: { location: searchValue, coordinates: coordinates } });
    navigate('/host/floor-plan');
  }

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=pk.eyJ1IjoiamFtc2hhZDEiLCJhIjoiY2xrOXc0cXM1MDFkYjNtcWQ3NDVmZmh4ciJ9.GCP7IIfzt1ms84ZeOr7uag`
      );
  
      const suggestions = response.data.features.map((feature) => ({
        location: feature.place_name,
        coordinates: feature.center,
      }));
  
      // Extracting the country from the first feature's properties
      const country = response.data.features[0]?.context?.find((item) => item.id.includes('country'));
      const countryName = country ? country.text : null;
  
     
  
      setSuggestions(suggestions);
      setCoordinates(response.data.features[0].center);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion.location);
    setSuggestions([]);
    setCoordinates(suggestion.coordinates);
    setSelectedLocation(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PropertyNavbar />
      <div className="flex-grow mx-auto max-w-screen-xl px-4">
        {selectedLocation ? (
          <>
          <div>
          <h2 className="pt-16 text-2xl font-bold">Confirm your address</h2>
          <p className="text-gray-500">Your address is only shared with guests after they’ve made a reservation.</p>
        </div>
        <div className="w-full">
          <input type="text" value={countryName } className="mb-5" style={{border:"solid 1px",width:"100%"}}  />
      <Input  label="House,flat,etc" />
      <Input label="Area or village (if applicable)"/>
      <Input  label="Street address"/>
      <Input label="Nearby landmark (if applicable)"/>
      <Input label="City or town" />
    </div>
  
        </>
        ) : (
          <>
          <div>
            <h2 className="pt-16 text-2xl font-bold">Where is your place located?</h2>
            <p className="text-gray-500">Your address is only shared with guests after they’ve made a reservation.</p>
          </div>
          <div className="relative mt-6" style={{ width: "32rem" }}>
            <img src={map} alt="" style={{ height: "24rem" }} />
            <input
              type="text"
              value={searchValue}
              style={{
                width: "29rem",
                backgroundImage: `url(${LocationIcon})`,
                backgroundSize: "1.5rem",
                backgroundPosition: "8px 50%",
                backgroundRepeat: "no-repeat",
              }}
              onChange={handleSearchChange}
              className="absolute top-0 left-0 m-4 px-4 py-2 rounded-md border bg-white border-gray-300 focus:outline-none "
              placeholder="   Enter your location..."
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300  rounded-md shadow-lg" style={{
                marginLeft: "21px", marginTop: "-19rem", width: "29rem"
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
        </>
         
        )}
      </div>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} />
      </footer>
    </div>
  );
}

export default Location;
