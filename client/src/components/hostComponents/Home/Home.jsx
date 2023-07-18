import React, { useState } from 'react';
import HostNavbar from '../HostNavbar/HostNavbar';
import { useSelector } from 'react-redux';
import './Home.css';
import TodayReversation from '../Reversations/TodayReversation';
import ArrivingSoon from '../Reversations/ArrivingSoon';
import { Link } from 'react-router-dom';

function Home() {
  const [reservation, setReservation] = useState(<TodayReversation />);
  const [selectedButton, setSelectedButton] = useState('today'); // Added state for selected button

  const { host } = useSelector((state) => state);

  const handleButtonClick = (button) => {
    setSelectedButton(button);

    if (button === 'today') {
      setReservation(<TodayReversation />);
    } else if (button === 'soon') {
      setReservation(<ArrivingSoon />);
    }
  };

  return (
    <div>
      <HostNavbar />
      <div className="inline-flex">
        <h2 className="pl-36 pt-12">Welcome {host.details.firstName}!</h2>
       <Link to={"/host/about-your-place"}> <button className="listing">Complete Your Listing</button></Link>
      </div>
      <div className="inline-flex w-full">
        <h3 className="pl-36 pt-12">Your reservations</h3>
      </div>
      <div className="inline-flex ml-36">
        <button
          className={selectedButton === 'today' ? 'selectedLists' : 'lists'}
          onClick={() => handleButtonClick('today')}
        >
          Checking out
        </button>
        <button
          className={selectedButton === 'soon' ? 'selectedLists' : 'lists'}
          onClick={() => handleButtonClick('soon')}
        >
          Ariving soon
        </button>
      </div>
      <div>{reservation}</div>
    </div>
  );
}

export default Home;
