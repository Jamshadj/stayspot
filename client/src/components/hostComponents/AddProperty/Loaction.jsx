import React, { useState, useEffect } from 'react';
import PropertyNavbar from './PropertyNavbar';
import { Footer } from 'flowbite-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { GeolocateControl } from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

function Location() {
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
  });
  const [address, setAddress] = useState('');

  const handleViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  const handleGeocoderViewportChange = (newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  };

  const handleGeocoderResult = (event) => {
    const selectedAddress = event.result.place_name;
    setAddress(selectedAddress);
    const coordinates = event.result.geometry.coordinates;
    console.log('Coordinates:', coordinates);
    // Save the coordinates to your MongoDB database
  };    

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setViewport((prevState) => ({
            ...prevState,
            latitude,
            longitude,
          }));
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10 bg-white">
        <PropertyNavbar />
      </header>
      <main className="flex-grow mx-auto max-w-screen-xl mt-24 px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Which of these best describes your place?</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ReactMapGL
            {...viewport}
            width="100%"
            height="300px"
            mapboxApiAccessToken={mapboxgl.accessToken}
            onViewportChange={handleViewportChange}
          >
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              showUserLocation={true}
              fitBoundsOptions={{ maxZoom: 15 }}
            />
            <Geocoder
              mapboxApiAccessToken={mapboxgl.accessToken}
              onViewportChange={handleGeocoderViewportChange}
              onResult={handleGeocoderResult}
              placeholder="Start typing your location..."
              position="top-left"
            />
          </ReactMapGL>
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer />
      </footer>
    </div>
  );
}

export default Location;
