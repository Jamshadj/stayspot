import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyNavbar from './PropertyNavbar';
import Footer from './Footer';
import { useDispatch } from 'react-redux'; // Import the useDispatch function

function AddDescription() {
  const [description, setDescription] = useState(''); // State to hold the description
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize the useDispatch function

  const handleNext = () => {
    // Dispatch the description to the Redux store
    dispatch({ type: 'propertyDetails', payload: { description: description } });
    navigate('/host/step-3');
  };

  const handleDescriptionChange = (e) => {
    // Update the description state with the input value
    setDescription(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10 bg-white">
        <PropertyNavbar />
      </header>
      <main className="flex-grow mx-auto max-w-screen-xl mt-24 px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Create your description</h2>
          <p>Share what makes your place special</p>
        </div>
        <textarea
          rows={4}
  
          type="text"
          className="mt-10 h-48 w-full border-black"
          value={description} // Set the value of the input to the description state
          onChange={handleDescriptionChange} // Call the handleDescriptionChange function on input change
        />
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} />
      </footer>
    </div>
  );
}

export default AddDescription;
