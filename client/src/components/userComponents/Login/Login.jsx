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
        {/* Image section on the left */}
        <div className="w-full md:w-1/2 hidden md:block">
          <LoginCardImage />
        </div>
        {/* Login form section on the right */}
        <div className="w-full md:w-1/2">
          <LoginCard />
        </div>
      </div>
    </div>
  );
}

export default Login;
