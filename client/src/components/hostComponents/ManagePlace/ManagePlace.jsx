import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HostNavbar from '../HostNavbar/HostNavbar';
import SideBarListing from '../Deatails/DetailsSideBar/SideBarListing';
import axios from '../../../axios'; // Import axios to make API requests

function ManagePlace() {
  // Access the propertyId parameter using useParams()
  const { propertyId } = useParams();

  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`/host/property/${propertyId}`);
        console.log(response.data);
        setProperties(response.data.property);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchProperties();
  }, [propertyId]);

  console.log("properties", properties);

  return (
    <div>
      <div>
        <HostNavbar />
      </div>
      <div className='flex'>
        <SideBarListing activeItem="Listing Details" />
        <div className='w-full m-28'>
          <div className='flex items-center justify-between'>
            <h5>Photos</h5>
            <a href='#' className='text-black hover:underline'>
              Edit
            </a>
          </div>
          <div className='flex overflow-x-auto gap-4'>
            {properties.map((property) => (
              <React.Fragment key={property._id}>
                <img
                  src={property.images[0].secure_url}
                  alt=""
                  className='w-64 h-56 object-cover'
                />
                <img
                  src={property.images[1].secure_url}
                  alt=""
                  className='w-64 h-56 object-cover'
                />
                <img
                  src={property.images[2].secure_url}
                  alt=""
                  className='w-64 h-56 object-cover'
                />
                <img
                  src={property.images[3].secure_url}
                  alt=""
                  className='w-64 h-56 object-cover'
                />
                <img
                  src={property.images[4].secure_url}
                  alt=""
                  className='w-64 h-56 object-cover'
                />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagePlace;
