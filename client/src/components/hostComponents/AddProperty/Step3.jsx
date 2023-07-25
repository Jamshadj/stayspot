import React from 'react'
import { useNavigate } from 'react-router-dom';
import PropertyNavbar from './PropertyNavbar';
import Footer from './Footer';
import home from '../../../assets/animation/home.png';
function Step3() {
    const navigate = useNavigate();
    const handleNext = () => {
  
      //   dispatch({ type: 'propertyDetails', payload: { structure: selectedCategory } });
        navigate('/host/setPrice');
  
    };
  return (
    <div className="flex flex-col min-h-screen">
    <PropertyNavbar />
    <div className="flex-grow mx-auto w-full flex flex-col md:flex-row justify-center items-center">
      <div className="w-full md:w-1/2 ml-10">
        <div className="p-4 md:p-28">
          <h5>Step 3</h5>
          <h2>Finish up and publish</h2>
          <p>
            In this step, we'll ask you which type of property you have and if guests will book the entire place or just
            a room. Then let us know the location and how many guests can stay.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 mt-4 md:mt-0">
        <img src={home} alt="" className="mx-auto" />
      </div>
    </div>
    <Footer onNext={handleNext} />
  </div>
  )
}

export default Step3