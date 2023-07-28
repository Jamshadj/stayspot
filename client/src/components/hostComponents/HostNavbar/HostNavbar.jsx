// import React from 'react';
import Logo from '../../../assets/logo/logo.png';

// function HostNavbar() {
//   return (
//     <div>
//       <div className='w-full h-16 flex justify-between'>
//         <div className='h-full w-16'>
//           <img src={Logo} alt="" />
//         </div>
//         <div className='flex justify-between items-center h-full w-96'>
//           <div>Home</div>
//           <div>Inbox</div>
//           <div>Home</div>
//           <div>Home</div>
          
//         </div>
//         <div className='bg-blue-gray-400 h-full w-16'>
//           {/* Content for the right div */}
//         </div>
//       </div>
//       <hr />
//     </div>
//   );
// }

// export default HostNavbar;


import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 
export default function Example() {
  const [openNav, setOpenNav] = useState(false);
  const { host } = useSelector((state) => state);
  const navigate=useNavigate()
  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-x-1">
      <Typography
        as="li"
        variant="small"
        color="black"
        className="p-1 font-normal"
      >
        <p  className="flex items-center">
          Pages
        </p>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <p href="#" className="flex items-center">
          Account
        </p>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <p href="#" className="flex items-center">
          Blocks
        </p>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <p href="#" className="flex items-center">
          Docs
        </p>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <p onClick={()=>navigate('/host/listings')}  className="flex items-center">
          Listings
        </p>
      </Typography>
    </ul>
  );
  
 
  return (
    <Navbar className=" mx-auto max-w-screen-3xl py-2 px-4 lg:px-8 lg:py-4">
      <div className=" container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
         <img src={Logo} alt="" className='w-12'/>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block">
          {host.login===true ? (
            <span>{host.details.firstName+" "+host.details.lastName}</span>
          ):(
            <span>Login</span>
          )}
          
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Buy Now</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}