import React from 'react';
import PropertyNavbar from './PropertyNavbar';
import Footer from './Footer';
import { AiOutlineHome } from 'react-icons/ai';
import { MdApartment, MdOutlineCabin, MdOutlineHouseboat, MdOutlineBedroomChild } from 'react-icons/md';
import { GiBarn, GiTreehouse, GiCaveEntrance, GiCampingTent } from 'react-icons/gi';
import { LuHotel } from 'react-icons/lu';

function Structure() {
  const categories = [
    {
      type: 'House',
      icon: <AiOutlineHome size={40} />,
    },
    {
      type: 'Flat/apartment',
      icon: <MdApartment size={40} />,
    },
    {
      type: 'Barn',
      icon: <GiBarn size={40} />,
    },
    {
      type: 'Cabin',
      icon: <MdOutlineCabin size={40} />,
    },
    {
      type: 'Cave',
      icon: <GiCaveEntrance size={40} />,
    },
    {
      type: 'Houseboat',
      icon: <MdOutlineHouseboat size={40} />,
    },
    {
      type: 'Tent',
      icon: <GiCampingTent size={40} />,
    },
    {
      type: 'Room',
      icon: <MdOutlineBedroomChild size={40} />,
    },
    {
      type: 'Hotel',
      icon: <LuHotel size={40} />,
    },
    {
      type: 'Treehouse',
      icon: <GiTreehouse size={40} />,
    },
    {
      type: 'Farmhouse',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
          <path
            fillRule="evenodd"
            d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      type: 'Cycladic home',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
          <path
            fillRule="evenodd"
            d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    // Add more categories as needed
    // ...
  ];

  const rows = Math.ceil(categories.length / 4); // Calculate the number of rows needed

  return (
    <div className="flex flex-col min-h-screen">
      <PropertyNavbar />
      <div className="mx-auto h-auto max-w-screen-xl px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Which of these best describes your place?</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center border border-gray-900 p-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <p className="font-medium text-center">{category.type}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Structure;
