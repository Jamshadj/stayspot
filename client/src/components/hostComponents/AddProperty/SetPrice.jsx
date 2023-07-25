import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyNavbar from './PropertyNavbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { postAddProperty } from '../../../api/hostApi';
import Swal from 'sweetalert2';

function SetPrice() {
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { propertyDetails, host } = useSelector((state) => state);

  const handleNext = async () => {
    dispatch({ type: 'propertyDetails', payload: { pricePerNight: price, hostId: host.details._id } });
console.log("dd");
    // Check if both price and hostId are present in propertyDetails before making the API call
    if (propertyDetails.pricePerNight && propertyDetails.hostId) {
      try {
        console.log("ddd");
        const response = await postAddProperty(propertyDetails);
        if (response.success) {
          console.log("dddd");
          // If API call is successful, navigate to the "/host" page
          navigate('/host');
        } else {
          // Handle error scenario
          showErrorAlert('Error occurred during API call');
        }
      } catch (error) {
        // Handle API call error
        showErrorAlert('Error occurred during API call');
        console.log('Error occurred during API call:', error);
      }
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // Helper function to show error alert
  const showErrorAlert = (message) => {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
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
          <h2 className="pt-3 text-2xl font-bold">Now set your price</h2>
          <p>You can change it any time</p>
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
          value={price}
          onChange={handlePriceChange}
        />
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-10 bg-white">
        <Footer onNext={handleNext} />
      </footer>
    </div>
  );
}

export default SetPrice;
