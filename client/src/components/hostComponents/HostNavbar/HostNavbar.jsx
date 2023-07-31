import React, { useState, useEffect } from "react";
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postHostLogout } from '../../../api/hostApi';
import Swal from 'sweetalert2';

import Logo from '../../../assets/logo/logo.png';

export default function Example() {
  const [openNav, setOpenNav] = useState(false);
  const { host } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const logout = () => {
    // Display the logout confirmation dialog
    Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed the logout, proceed with the logout action
        postHostLogout().then(() => {
          // Dispatch the logout action here (update the logic according to your Redux setup)
          // For example, if you have a logout action creator, you can dispatch it like this:
          dispatch({type:"refresh"}); // Replace "logoutAction" with your actual action creator
          // After dispatching the logout action, you can navigate to the login page or perform any other necessary actions
          navigate('/login'); // Replace "/login" with the path to your login page
        }).catch((error) => {
          console.error('Error logging out:', error);
        });
      }
    });
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-x-1">
      {/* Your navigation links */}
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-3xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-medium">
          <img src={Logo} alt="Logo" className="w-12" />
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button variant="gradient" size="sm" className="hidden lg:inline-block" onClick={logout}>
          {host.login === true ? (
            <span>Logout</span>
          ) : (
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2" onClick={logout}>
            <span>Logout</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}
