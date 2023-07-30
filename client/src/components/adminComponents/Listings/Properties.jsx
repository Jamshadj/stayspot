import React, { useEffect, useState } from 'react';
import { getProperties } from '../../../api/adminApi';
import Sidebar from '../Sidebar/Sidebar';
import { Card, Typography } from '@material-tailwind/react';

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

  // Ensure that the properties data has been fetched before rendering the table
  if (properties.length === 0) {
    // Display a loading message or spinner while the data is being fetched
    return <div>Loading...</div>;
  }

  const TABLE_HEAD = ["No", "Property", "Title", "Location", "Structure", "PricePerNight", "Status"];
  const TABLE_ROWS = properties.map((property, index) => (
    <tr key={property._id} className="even:bg-blue-gray-50/50">
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {index + 1}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {property.structure}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {property.title}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {property.location}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {property.structure}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {property.pricePerNight}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {property.status}
        </Typography>
      </td>
    </tr>
  ));

  return (
    <div className="flex flex-col lg:flex-row">
     <div className=' h-full' style={{"height":"49rem"}}>
        <Sidebar />
      </div>
      <div  style={{width:"80%", margin:"30px"}}>
        <h2 className="mb-4">Property Management</h2>
        <Card className="overflow-scroll h-full w-full">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{TABLE_ROWS}</tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

export default Properties;
