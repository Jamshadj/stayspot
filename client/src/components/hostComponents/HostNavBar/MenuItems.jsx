import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MenuItem from '../../userComponents/Navbar/MenuItem';
import { postHostLogout } from '../../../api/hostApi';
import Swal from 'sweetalert2';

function MenuItems() {
    const { host } = useSelector((state) => state);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
      }, []);
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
            const response = await postHostLogout();
            // Dispatch a refresh action to update the user state
            dispatch({ type: 'refresh' });
    
            // Redirect the user to the login page after successful logout
            navigate('/host/login'); // Replace '/host/login' with your desired login page URL for hosts
          }
        } catch (error) {
          console.error('Error logging out:', error);
    
         
        }
      };
    
    
  return (
    <div>
    <div
      onClick={toggleOpen}
      className="
       
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
      <div className="hidden md:block">
        <img
          src={host.details.image}
          alt=" Avatar"
          className="w-10  rounded-full"
        />
      </div>
    </div>
    {isOpen && (
      <div 
        className="
          absolute 
          rounded-xl 
          shadow-md
          w-[40vw]
          md:w-1/4 
          bg-white 
          overflow-hidden 
          right-0 
          top-12 
          text-sm
          mt-8
        "
      >
        <div className="flex flex-col cursor-pointer">
          {host && ( // Add missing parenthesis here
            <>
              <MenuItem 
                label="Profile" 
                onClick={() => navigate('/my-trips')}
              />
              <MenuItem 
                label="Account" 
                onClick={() => navigate('/my-favorites')}
              />
              <MenuItem 
                label="Listings" 
                onClick={() => navigate('/my-reservations')}
              />
              <MenuItem 
                label="Switch to travelling" 
                onClick={() => navigate('/my-properties')}
              />
              <hr />
              <MenuItem 
                label="Logout" 
                onClick={handleLogout}
              />
            </>
          )}
        </div>
      </div>
    )}
  </div>
  )
}

export default MenuItems