import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import Swal from 'sweetalert2';
import { userLogout } from '../../../api/userApi';

function UserMenu() {
  const { user } = useSelector((state) => state);
  const currentUser = user;
  const isLoading = !currentUser;
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const avatarLink='https://imgs.search.brave.com/ltN-AHqc6pHIeJ2056RPITzZ_px0QapnUdkbzH4Uio4/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC80NS83OS9t/YWxlLWF2YXRhci1w/cm9maWxlLXBpY3R1/cmUtc2lsaG91ZXR0/ZS1saWdodC12ZWN0/b3ItNDY4NDU3OS5q/cGc'
  const profile = user.login?user.details.image || avatarLink:avatarLink;

  // Use useNavigate hook to get the navigate function
  const navigate = useNavigate();

  const handleLogout = async () => {
    
  try {
    // Ask for logout confirmation
    const shouldLogout = await Swal.fire({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
    });

    // If the user confirms the logout, proceed with the logout process
    if (shouldLogout.isConfirmed) {
      localStorage.removeItem('UserToken'); // Corrected 'UserToken'

      Swal.fire({
        title: 'Logged Out',
        text:"sucessfully", // Make sure you have 'response' defined
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Dispatch a refresh action to update the user state
      dispatch({ type: 'user', payload:  { login: false, details: null} }); // Corrected 'host'

      // Redirect the user to the login page after successful logout
      // Example using a router if you are using a client-side router (e.g., React Router):
      // navigate('/login');
    }
  } catch (error) {
    console.error('Error logging out:', error);

    await Swal.fire({
      title: 'Error',
      text: 'Failed to log out. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
  };

  // Handle the loading state
  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loader or a better UI
  }

  // User data is available, render the component
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => navigate('/host')}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
          "
        >
          Stayspot your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-3
            md:py-1
            md:px-2
            border-[1px] 
            border-neutral-200 
            flex 
            flex-row 
            items-center 
            gap-3 
            rounded-full 
            cursor-pointer 
            hover:shadow-md 
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            {currentUser.login ? (
              <img
                src={profile}
                alt="User Avatar"
                className="w-5 h-5 rounded-full"
              />
            ) : (
              <img
                src={profile}
                alt="User Avatar"
                className="w-5 h-5 rounded-full"
              />
            )}
          </div>
        </div>
        {isOpen && (
          <div
            className="
              absolute 
              rounded-xl 
              shadow-md
              w-[40vw]
              md:w-3/4 
              bg-white 
              overflow-hidden 
              right-0 
              top-12 
              text-sm
            "
          >
            <div className="flex flex-col cursor-pointer">
              {currentUser.login ? (
                <>
                  <div onClick={() => navigate(`/profile/${currentUser.details._id}`)} >
                    <MenuItem
                      label="Profile"

                    />
                  </div>
                  <MenuItem
                    label="My favorites"
                    onClick="/favorites"
                  />
                  <MenuItem
                    label="My reservations"
                    onClick="/reservationHistory"
                  />
                    <div onClick={() => navigate('/chat')} >
                  <MenuItem
                    label="Mesagess"
                  /></div>
                  <MenuItem
                    label="stayspot your home"
                    onClick="/host"
                  />
                  <hr />
                  <div onClick={handleLogout}>

                    <MenuItem
                      label="Logout"

                    />
                  </div>
                </>
              ) : (
                <>
                  <MenuItem
                    label="Login"
                    onClick="/login"
                  />
                  <MenuItem
                    label="Sign up"
                    onClick="/signup"
                  />
                </>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default UserMenu;
