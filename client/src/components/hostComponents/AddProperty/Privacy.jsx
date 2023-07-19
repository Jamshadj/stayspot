import React, { useState } from 'react';
import PropertyNavbar from './PropertyNavbar';
import Footer from './Footer';

import { BsDoorOpen, BsHouseDoor, BsShareFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Privacy() {
  const categories = [
    {
      type: 'A Entire place',
      description: 'Guest have the whole place to themselves',
      icon: <BsHouseDoor />,
    },
    {
      type: 'A room',
      description: 'Guest has own room in home, plus access to shared places',
      icon: <BsDoorOpen />,
    },
    {
      type: 'A shared room',
      description: 'Guest sleep in a room or common area that may be shared with you or others',
      icon: <BsShareFill />,
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [privacyType, setPrivacyType] = useState('');

  const handleNext = () => {
    if (privacyType) {
      dispatch({ type: 'propertyDetails', payload: { privacyType: privacyType } });
      navigate('/host/location');
    }
   
  };

  return (
    <div className="flex flex-col min-h-screen">
      <PropertyNavbar />
      <div className="flex-grow mx-auto max-w-screen-xl px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Which of these best describes your place?</h2>
        </div>
        <div className="mt-10 grid gap-6 justify-items-start">
          {categories.map((category, index) => (
            <button
              onClick={() => setPrivacyType(category.type)}
              key={index}
              className="flex items-center justify-between border border-gray-900 p-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out w-full focus:bg-blue-gray-200"
            >
              <div>
                <p className="font-medium">{category.type}</p>
                <p className="w-80">{category.description}</p>
              </div>
              <div className="text-4xl">{category.icon}</div>
            </button>
          ))}
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} disabled={privacyType === null} />
      </footer>
    </div>
  );
}

export default Privacy;
