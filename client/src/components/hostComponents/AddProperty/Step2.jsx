import React from 'react'
import { useNavigate } from 'react-router-dom';
import HostNavbar from '../HostNavBar/HostNavbar';
import home from '../../../assets/animation/home.png';
import Footer from './Footer';
function Step2() {
    const navigate = useNavigate();

    const handleNext = () => {
      navigate('/host/amenities');
    };
  
    return (
      <div className="flex flex-col min-h-screen">
      <HostNavbar />
      <div className="flex-grow mx-auto max-w-screen-xl px-4 md:px-8 lg:px-16">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="w-full md:w-1/2 md:ml-10">
            <div className="p-4 md:p-10 lg:p-28">
              <h5 className="text-xl md:text-2xl">Step 2</h5>
              <h2 className="text-2xl md:text-3xl font-semibold mt-2 md:mt-4">
                Make your place standout
              </h2>
              <p className="mt-2 md:mt-4">
                In this step, you’ll add some of the amenities your place offers, plus 5 or more
                photos. Then you’ll create a title and description.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <img src={home} alt="" className="mx-auto md:max-w-lg lg:max-w-xl" />
          </div>
        </div>
      </div>
      <Footer onNext={handleNext} />
    </div>
    );
}

export default Step2