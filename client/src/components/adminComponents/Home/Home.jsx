import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import ComplexNavbar from '../Navbar/Navbar';
import NavbarWithCTAButton from '../Navbar/Navbar';
import SideDrawer from '../Sidebar/SideDrawer';

function Home() {
  return (
    <div>
      <SideDrawer dashBoard={'dashboard'}/>
{/*   
      <div className='h-full' style={{"height":"49rem"}}>
      <Sidebar />
      </div> */}
    </div>
  );
}

export default Home;
