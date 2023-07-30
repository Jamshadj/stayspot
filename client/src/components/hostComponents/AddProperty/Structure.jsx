import React, { useState } from 'react';
import PropertyNavbar from './PropertyNavbar';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCastle, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  GiWindmill
} from 'react-icons/gi';
import { FaSkiing } from 'react-icons/fa';
import { BsSnow,BsHouseDoor } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { MdOutlineVilla,MdOutlineBedroomChild,MdApartment } from 'react-icons/md';
// ... (previously defined icon imports)

function Structure() {
  // Categories array with types and corresponding icons
  const categories = [
    {
      label: 'Appartment',
      icon: MdApartment,
      description: 'This property is close to the beach!',
    },
    {
      label: 'Windmills',
      icon: GiWindmill,
      description: 'This property is has windmills!',
    },
    {
      label: 'Modern',
      icon: MdOutlineVilla,
      description: 'This property is modern!'
    },
    {
      label: 'House',
      icon: BsHouseDoor,
      description: 'This property is in arctic environment!'
    },
    {
      label: 'Room',
      icon: MdOutlineBedroomChild,
      description: 'This property is in arctic environment!'
    },
    {
      label: 'Beach house',
      icon: TbBeach,
      description: 'This property is in the countryside!'
    },
    {
      label: 'Pools',
      icon: TbPool,
      description: 'This is property has a beautiful pool!'
    },
    {
      label: 'Islands',
      icon: GiIsland,
      description: 'This property is on an island!'
    },
    {
      label: 'Lake',
      icon: GiBoatFishing,
      description: 'This property is near a lake!'
    },
    {
      label: 'Skiing',
      icon: FaSkiing,
      description: 'This property has skiing activies!'
    },
    {
      label: 'Castles',
      icon: GiCastle,
      description: 'This property is an ancient castle!'
    },
    {
      label: 'Caves',
      icon: GiCaveEntrance,
      description: 'This property is in a spooky cave!'
    },
    {
      label: 'Camping',
      icon: GiForestCamp,
      description: 'This property offers camping activities!'
    },
    {
      label: 'Arctic',
      icon: BsSnow,
      description: 'This property is in arctic environment!'
    },
    {
      label: 'Desert',
      icon: GiCactus,
      description: 'This property is in the desert!'
    },
    {
      label: 'Barns',
      icon: GiBarn,
      description: 'This property is in a barn!'
    },
    {
      label: 'Lux',
      icon: IoDiamond,
      description: 'This property is brand new and luxurious!'
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const rows = Math.ceil(categories.length / 4); // Calculate the number of rows needed
  const navigate = useNavigate();

  // Function to handle category button click
  const handleClick = (categoryType) => {
    setSelectedCategory((prevSelectedCategory) =>
      prevSelectedCategory === categoryType ? null : categoryType
    );
  };

  // Function to handle the Next button click
  const handleNext = () => {
    if (selectedCategory) {
      // If a category is selected, proceed to the next step
      dispatch({ type: 'propertyDetails', payload: { structure: selectedCategory } });
      navigate('/host/privacy-type'); // Navigate to the privacy type page
    } else {
      // If no category is selected, show a SweetAlert warning
      showSelectCategoryAlert();
    }
  };

  // Function to show a SweetAlert warning for selecting a category
  const showSelectCategoryAlert = () => {
    Swal.fire({
      title: 'Select Category',
      text: 'Please select a category that best describes your place.',
      icon: 'warning',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10 bg-white">
        <PropertyNavbar />
      </header>
      <main className="flex-grow mx-auto max-w-screen-xl mt-24 px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Which of these best describes your place?</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <button
              onClick={() => handleClick(category.label)} // Use the category label for click handler
              key={index}
              className={`flex flex-col items-center justify-center border p-4 rounded-lg transition-colors duration-300 ease-in-out focus:bg-blue-gray-200 ${
                category.label === selectedCategory ? 'bg-blue-200' : ''
              }`}
            >
              <div className="text-4xl mb-2"><category.icon/></div>
              <p className="font-medium text-center">{category.label}</p>
            </button>
          ))}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} disabled={selectedCategory === null} />
      </footer>
    </div>
  );
}

export default Structure;
