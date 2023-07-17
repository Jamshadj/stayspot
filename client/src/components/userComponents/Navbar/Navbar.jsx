import React from 'react';
import Logo from '../../../assets/logo/logo.png';
import './Navbar.css';
import { Button, Navbar, Avatar } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { postLogout } from '../../../api/userApi';
import { postHostLogout} from '../../../api/hostApi';
export default function NavbarWithCTAButton() {
  const { user,host } = useSelector((state) => state);
  const dispatch = useDispatch();

  const logout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      if (user.login === true) {
        postLogout();
      } else if (host.login === true) {
        postHostLogout();
      }
      dispatch({ type: 'refresh' });
      // Perform any additional actions after logout, if needed
    }
  };

  return (
    <Navbar fluid rounded className='p-0 mt-3'>
      <Navbar.Brand href='https://flowbite-react.com' className='ml-12'>
        <img src={Logo} alt='Logo' className='mr-3 h-6 sm:h-9' />
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
          StaySpot
        </span>
      </Navbar.Brand>
      <div className='flex md:order-2'>
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white pr-5'>
          StaySpot Your Home
        </span>
        {user.login === false || host.login === false ? (
  <Button className='text-black'>
    <Avatar rounded style={{ width: '20px', height: '20px', marginRight: '5px' }} />
    Login
  </Button>
) : (
  <Button onClick={logout} className='text-black'>
    <Avatar rounded style={{ width: '40px', height: '40px', marginRight: '5px' }} />
    Logout
  </Button>
)}

        <Navbar.Toggle />
      </div>
    </Navbar>
  );
}
