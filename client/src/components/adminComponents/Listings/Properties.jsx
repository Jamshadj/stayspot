import React, { useEffect, useState } from 'react';
import { getProperties } from '../../../api/adminApi';
import Sidebar from '../Sidebar/Sidebar';
import { Card, Typography } from '@material-tailwind/react';
import {  Link } from 'react-router-dom';
import SideDrawer from '../Sidebar/SideDrawer';

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties()
      .then((response) => {
        setProperties(response.data); // Assuming the API response is an array of properties
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const TABLE_HEAD = ["No", "Property", "Title", "Location", "Structure", "PricePerNight", "Status","Details"];

  return (
    <div>
     {properties.length > 0 && <SideDrawer data={properties} host={'propertis'} tableHead={TABLE_HEAD} />}
   </div>
  );
}

export default Properties;
