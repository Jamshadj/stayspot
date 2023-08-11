import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiamFtc2hhZDEiLCJhIjoiY2xrOXc0cXM1MDFkYjNtcWQ3NDVmZmh4ciJ9.GCP7IIfzt1ms84ZeOr7uag';

function MapboxComponent({ locations }) {
  useEffect(() => {
    console.log(locations,"locations");
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [locations[0]?.coordinates.longitude, locations[0]?.coordinates.latitude], // Center on the first location
      zoom: 10,
    });

    // Add markers for each location
    locations.forEach((location) => {
      new mapboxgl.Marker()
        .setLngLat([location.coordinates.longitude, location.coordinates.latitude])
        .addTo(map);
    });

    return () => map.remove();
  }, [locations]);

  return <div id="map" className="map-container h-[30rem] m-10" />;
}

export default MapboxComponent;
