import React, { useCallback, useState } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import MenuItem from '../../userComponents/Navbar/MenuItem';

function Options() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
      }, []);
  return (
    <div className='flex'>
      <div
        // onClick={()=>navigate('/host')}
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
        Home
      </div>
      <div
        // onClick={()=>navigate('/host')}
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
        Inbox
      </div>
      <div
        // onClick={()=>navigate('/host')}
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
        Calendar {/* Corrected spelling here */}
      </div>
      <div
        // onClick={()=>navigate('/host')}
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
        Insights
      </div>
      <div onClick={toggleOpen} className='flex '>
      <div
        // onClick={()=>navigate('/host')}
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
        Menu
      </div>
      <div className='mt-3 ml-[-1rem]'>
      <IoIosArrowDropdownCircle />

      </div>
      </div>
      {isOpen && (
  <div 
    className="
      absolute 
      rounded-xl 
      shadow-md
      w-[20vw]
      md:w-1/4 
      bg-white 
      overflow-hidden 
      top-12 
      text-sm
    "
  >
    <div className="flex flex-col cursor-pointer">
      <>
        <MenuItem
          label="Listings" 
          onClick='/my-trips'
        />
        <MenuItem 
          label="Reverations" 
          onClick='/my-favorites'
        />
        <MenuItem 
          label="Create new listings" 
          onClick='/my-reservations'
        />
      </>
    </div>
  </div>
)}

    </div>
  );
}

export default Options;
