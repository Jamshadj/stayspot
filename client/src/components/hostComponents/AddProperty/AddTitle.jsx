import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyNavbar from './PropertyNavbar';
import Footer from './Footer';
import { useDispatch } from 'react-redux'; // Import the useDispatch function

function AddTitle() {
  const [title, setTitle] = useState(''); // State to hold the title
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize the useDispatch function

  const handleNext = () => {
    // Dispatch the title to the Redux store
    console.log(title);
    dispatch({ type: 'propertyDetails', payload: { title: title } });
    navigate('/host/add-description');
  };

  const handleTitleChange = (e) => {
    // Update the title state with the input value
    setTitle(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-10 bg-white">
        <PropertyNavbar />
      </header>
      <main className="flex-grow mx-auto max-w-screen-xl mt-24 px-4">
        <div>
          <h2 className="pt-3 text-2xl font-bold">Now let's give your place a title</h2>
          <p>Short title works best</p>
        </div>
        <input
  style={{
    border: 'black solid 0.5px',
    fontSize: '26px',
    verticalAlign: 'top',  // Align the text at the top
    whiteSpace: 'normal',   // Allow the text to wrap to the next line
    wordWrap: 'break-word'  // Enable word wrap to handle long words
  }}
  type="text"
  className="mt-10 h-48 w-full border-black"
  value={title} // Set the value of the input to the title state
  onChange={handleTitleChange} // Call the handleTitleChange function on input change
/>



      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} />
      </footer>
    </div>
  );
}

export default AddTitle;
