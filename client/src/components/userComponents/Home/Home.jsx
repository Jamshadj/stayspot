import React from 'react';
import NavbarWithCTAButton from '../Navbar/Navbar';
import CardWithDecorativeImage from '../Card/Card';
import './Home.css'
function Home() {
  return (
    <div>
      <div className=''>

      <NavbarWithCTAButton/>
      </div>
      <hr className='mt-4' />
      <div className="card-container">
        <CardWithDecorativeImage />
        <CardWithDecorativeImage />
        <CardWithDecorativeImage />
        <CardWithDecorativeImage />
      </div>
    </div>
  );
}

export default Home;
