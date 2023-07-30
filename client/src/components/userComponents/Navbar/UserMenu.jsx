import React, { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
function UserMenu() {
  const { user } = useSelector((state) => state);
  const currentUser = user.details;
  const isLoading = !currentUser; // Assume user.details is null until the data is available
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  
  // Use useNavigate hook to get the navigate function
  const navigate = useNavigate();

  const onHost = () => {
    // Navigate to the '/host' route when clicked
    navigate('/host');
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
          onClick={onHost} // Use the correct onClick event for Stayspot
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
          onClick={toggleOpen} // Use toggleOpen for the click event
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
            {currentUser.image ? (
              <img
                src={currentUser.image}
                alt="User Avatar"
                className="w-5 h-5 rounded-full"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gray-300" />
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
            {currentUser ? (
              <>
                <MenuItem 
                  label="My trips" 
                  onClick='/my-trips'
                />
                <MenuItem 
                  label="My favorites" 
                  onClick='/my-trips'
                />
                <MenuItem 
                  label="My reservations" 
                  onClick='/my-trips'
                />
                <MenuItem 
                  label="My properties" 
                  onClick='/my-trips'
                />
                <MenuItem 
                  label="stayspot your home" 
                  onClick='/my-trips'
                />
                <hr />
                <MenuItem 
                  label="Logout" 
                  onClick={() => signOut()}
                />
              </>
            ) : (
              <>
                <MenuItem 
                  label="Login" 
                  onClick='/login'
                />
                <MenuItem 
                  label="Sign up" 
                  onClick='/signup'
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
