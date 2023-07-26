import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyNavbar from './PropertyNavbar';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { postAddProperty } from '../../../api/hostApi';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

function SetPrice() {
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { propertyDetails, host } = useSelector((state) => state);

  const handleNext = async () => {
    try {
      // Show a SweetAlert popup indicating that the API call is in progress
      Swal.fire({
        title: 'Please wait',
        text: 'Saving your property...',
        allowOutsideClick: false,
        showConfirmButton: false,
        onOpen: () => {
          Swal.showLoading();
        },
      });

      await dispatch({ type: 'propertyDetails', payload: { pricePerNight: price, hostId: host.details._id } });

      const response = await postAddProperty(propertyDetails);
      console.log("response", response);
      if (response && response.data.error === false) {
        // If API call is successful, close the SweetAlert popup and navigate to the "/host" page
        Swal.close();
        navigate('/host');
      } else {
        // Handle error scenario
        Swal.fire({
          title: 'Error',
          text: 'Error occurred during API call',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      // Handle API call error
      Swal.fire({
        title: 'Error',
        text: 'Error occurred during API call',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.log('Error occurred during API call:', error);
    }
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
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
