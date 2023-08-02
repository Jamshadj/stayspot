import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './Home.css';
import TodayReversation from '../Reversations/TodayReversation';
import ArrivingSoon from '../Reversations/ArrivingSoon';
import { Link } from 'react-router-dom';
import SelectCalendar from '../SetCalendar/SelectCalendar';
import HostNavbar from '../HostNavBar/HostNavbar';

function Home() {
  const { host } = useSelector((state) => state);
  const [selectedButton, setSelectedButton] = useState('today');

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  return (
    <div>
      <HostNavbar />

      {/* Welcome and Complete Your Listing */}
      <div className="inline-flex">
        <h2 className="pl-36 pt-12">Welcome {host.details.firstName}!</h2>
        <Link to={"/host/about-your-place"}>
          <button className="listing">Complete Your Listing</button>
        </Link>
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
          Arriving soon
        </button>
      </div>
      <div>
        {selectedButton === 'today' ? <TodayReversation /> : <ArrivingSoon />}
      </div>
      <div>
        <SelectCalendar />
      </div>
    </div>
  );
}

export default Home;
