import React, { useState } from 'react';
import PropertyNavbar from './PropertyNavbar';
import Footer from './Footer';
import { GrWifi } from 'react-icons/gr';
import { PiTelevisionFill } from 'react-icons/pi';
import { MdOutlineSoupKitchen,MdOutlinePaid,MdOutlineLocalParking } from 'react-icons/md';
import {GiWashingMachine} from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {TbAirConditioning} from 'react-icons/tb';
import {BsPersonWorkspace} from 'react-icons/bs'
function Amenities() {
  const categories = [
    {
      type: 'Wifi',
      icon: <GrWifi size={40} />,
    },
    {
      type: 'TV',
      icon: <PiTelevisionFill size={40} />,
    },
    {
      type: 'Kitchen',
      icon: <MdOutlineSoupKitchen size={40} />,
    },
    {
      type: 'Washing Machine',
      icon: <GiWashingMachine size={40} />,
    },
    {
      type: 'Free parking on premises',
      icon: <MdOutlineLocalParking size={40} />,
    },
    {
      type: 'Paid parking on premises',
      icon: <MdOutlinePaid size={40} />,
    },
    {
      type: 'Air conditioning',
      icon: <TbAirConditioning size={40} />,
    },
    {
      type: 'Dedicated Work space',
      icon: <BsPersonWorkspace size={40} />,
    },
    // Add more categories as needed
    // ...
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const dispatch = useDispatch();
  const rows = Math.ceil(categories.length / 4); // Calculate the number of rows needed
  const navigate = useNavigate();

  const handleClick = (categoryType) => {
    // Toggle the category selection
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryType)
        ? prevCategories.filter((category) => category !== categoryType)
        : [...prevCategories, categoryType]
    );
  };

  const handleNext = () => {

      // Dispatch action and navigate to the next step
      console.log(selectedCategories);
      dispatch({ type: 'propertyDetails', payload: { amenities: selectedCategories } });
      navigate('/host/add-images');

  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10 bg-white">
        <PropertyNavbar />
      </header>
      <main className="flex-grow mx-auto max-w-screen-xl mt-24 px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Tell guests what Your place has to offer</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <button
              onClick={() => handleClick(category.type)}
              key={index}
              className={`flex flex-col items-center justify-center border p-4 rounded-lg transition-colors duration-300 ease-in-out focus:bg-blue-gray-200 ${
                selectedCategories.includes(category.type) ? 'bg-blue-200' : ''
              }`}
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <p className="font-medium text-center">{category.type}</p>
            </button>
          ))}
        </div>
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} disabled={selectedCategories.length === 0} />
      </footer>
    </div>
  );
}

export default Amenities;
