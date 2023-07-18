import React from 'react'
import HostNavbar from '../HostNavbar/HostNavbar'
import { useSelector } from 'react-redux';

function Home() {
  const {host } = useSelector((state) => state);
  return (
    <div>
      <HostNavbar/>
      <div className='inline-flex'>
        <h2 className='pl-36 pt-12'>Welcome {host.details.firstName}!</h2>
        <button>Complete Your Listing</button>
        </div>
    </div>
  )
}

export default Home