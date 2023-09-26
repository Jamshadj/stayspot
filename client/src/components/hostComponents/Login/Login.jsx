import React from 'react';
import LoginCard from './LoginCard';
import LoginCardImage from '../../LoginCardImage/LoginCardImage.jsx';
import Navbar from './Navbar';
import StaySpot from "../../../assets/images/HostLogin.jpg"

function Login() {
 
  return (
    <div>
      <Navbar />
      <hr />
      <div className="flex flex-col md:flex-row mt-11">
        <div className="md:w-1/2 ">
          <LoginCardImage image={StaySpot}/>
        </div>
        {/* Login form section on the right */}
        <div className=" md:w-1/2">
          <LoginCard/>
        </div>
      </div>
    </div>
  );
}

export default Login;
