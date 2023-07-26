import React from 'react';
import { useParams } from 'react-router-dom';
import HostNavbar from '../HostNavbar/HostNavbar';

function ManagePlace() {
  const { propertyId } = useParams();

  return (
    <div>
      <div>
        <HostNavbar />
      </div>
      {/* Now you can use the propertyId in your component */}
      Property ID: {propertyId}
    </div>
  );
}

export default ManagePlace;
