import React from 'react';
import Navbar from './Navbar';
import LoginCard from './LoginCard';
import LoginCardImage from './LoginCardImage';

function Login() {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="flex flex-col md:flex-row mt-11">
        {/* Image section on the left (for large screens) */}
        <div className="md:w-1/2 ">
          <LoginCardImage />
        </div>
        {/* Login form section on the right */}
        <div className=" md:w-1/2">
          <LoginCard />
        </div>
        {/* Image section on the top (for small screens) */}
        {/* <div className="w-full md:hidden">
          <LoginCardImage />
        </div> */}
      </div>
    </div>
  );
}

export default Login;
