import React, { useEffect, useState } from 'react';
import { getProperties } from '../../../api/adminApi';
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
console.log(properties);
  return (
    <div>
     {properties.length > 0 && <SideDrawer data={properties} properties={'properties'} tableHead={TABLE_HEAD} />}
   </div>
  );
}

export default Properties;
