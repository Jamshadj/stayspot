import React, { useState } from "react";
import PropertyNavbar from "./PropertyNavbar";
import Footer from "./Footer";
import axios from "axios";
import map from '../../../assets/Map/GoogleMaps.jpg';
import LocationIcon from '../../../assets/Map/LocationIcon.png';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { validateAddress } from "../../../validations/addressValidation";

function Location() {
  const [suggestions, setSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const [city, setCity] = useState('')
  const [postCode, setPostCode] = useState('')
  const [region, setRegion] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [area, setArea] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [landMark, setLandMark] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Address = {
    country,
    houseNumber,
    area,
    streetAddress,
    landMark,
    city,
    region,
    postCode,
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validateAddress),
  });

  const handleSearchChange = (e) => {
    const { value } = e.target;

    setSearchValue(value);
    fetchSuggestions(value);
  };

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=pk.eyJ1IjoiamFtc2hhZDEiLCJhIjoiY2xrOXc0cXM1MDFkYjNtcWQ3NDVmZmh4ciJ9.GCP7IIfzt1ms84ZeOr7uag`
      );
      console.log(response.data.features);
      const suggestions = response.data.features.map((feature) => ({
        location: feature.place_name,
        coordinates: feature.center,
      }));
      // Extracting the country from the first feature's properties
      const country = response.data.features[0]?.context?.find((item) => item.id.includes('country'));
      const city = response.data.features[0]?.context?.find((item) => item.id.includes('locality'));
      const postcode = response.data.features[0]?.context?.find((item) => item.id.includes('postcode'));
      const region = response.data.features[0]?.context?.find((item) => item.id.includes('region'));
      const countryName = country ? country.text : null;
      const cityName = city ? city.text : null;
      const postCodeName = postcode ? postcode.text : null;
      const regionName = region ? region.text : null;
      setCountry(countryName)
      setCity(cityName)
      setPostCode(postCodeName)
      setRegion(regionName)
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

  const handleNext = async () => {
    try {
      await validateAddress.validate(Address, { abortEarly: false });
      // Validation succeeded, proceed to the next step
      dispatch({ type: 'propertyDetails', payload: { location: searchValue, coordinates: coordinates, address: Address } });
      navigate('/host/floor-plan');
    } catch (validationErrors) {
      // Validation failed, update the form errors
      const errors = {};
      validationErrors.inner.forEach((error) => {
        errors[error.path] = error.message;
      });
      setError(errors);
    }
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
              <form onSubmit={handleSubmit(handleNext)}>
                   <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  className="mb-5"
                  style={{ border: "solid 1px", width: "100%" }}
                  disabled
                  onChange={(e)=>setCountry(e.target.value)}
                />

                <label htmlFor="house-flat">House No, Flat No, etc</label>
                <input
                  {...register("houseNumber")}
                  type="text"
                  id="house-flat"
                  required
                  onChange={(e)=>setHouseNumber(e.target.value)}
                  aria-describedby="house-flat-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="House, flat, etc"
                />
                {errors.houseNumber && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.houseNumber.message}
                  </p>
                )}

                <label htmlFor="area-village">Area or Village (if applicable)</label>
                <input
                  {...register("area")}
                  onChange={(e)=>setArea(e.target.value)}
                  type="text"
                  id="area-village"
                  aria-describedby="area-village-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Area or village (if applicable)"
                />
                {errors.area && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.area.message}
                  </p>
                )}

                <label htmlFor="street-address">Street Address</label>
                <input
                  {...register("streetAddress")}
                  type="text"
                  id="street-address"
                  onChange={(e)=>setStreetAddress(e.target.value)}
                  required
                  aria-describedby="street-address-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Street address"
                />
                {errors.streetAddress && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.streetAddress.message}
                  </p>
                )}

                <label htmlFor="nearby-landmark">Nearby Landmark (if applicable)</label>
                <input
                  {...register("landMark")}
                  type="text"
                  onChange={(e)=>setLandMark(e.target.value)}
                  id="nearby-landmark"
                  aria-describedby="nearby-landmark-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nearby landmark (if applicable)"
                />
                {errors.landMark && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.landMark.message}
                  </p>
                )}

                <label htmlFor="city-town">City or Town</label>
                <input
                  {...register("city")}
                  type="text"
                  id="city-town"
                  onChange={(e)=>setCity(e.target.value)}
                  aria-describedby="city-town-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="City or town"
                  required
                  value={city}
                />
                {errors.city && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.city.message}
                  </p>
                )}

                <label htmlFor="state">State</label>
                <input
                  {...register("region")}
                  type="text"
                  id="state"
                  required
                  aria-describedby="state-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="State"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
                {errors.region && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.region.message}
                  </p>
                )}

                <label htmlFor="post-code">Post Code</label>
                <input
                  {...register("postCode")}
                  type="text"
                  id="post-code"
                  required
                  aria-describedby="post-code-explanation"
                  className="bg-gray-50 border mb-24 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Post Code"
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
                />
                {errors.postCode && (
                  <p className="text-red-500 mt-1 mb-2">
                    {errors.postCode.message}
                  </p>
                )}

                
              </form>
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
                className="absolute top-0 left-0 m-4 px-4 py-2 rounded-md border bg-white border-gray-300 focus:outline-none"
                placeholder="   Enter your location..."
              />
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg" style={{
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
