import { PresentationChartBarIcon, UserCircleIcon } from "@heroicons/react/outline";
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Sidebar.css";
import Logo from "../../../assets/logo/logo.png";
import { GiHamburgerMenu } from 'react-icons/gi';
function Sidebar() {
  const [activeLink, setActiveLink] = useState("/admin");
  const navigate = useNavigate();
  const location = useLocation();
  const [navBar,setNavbar]=useState(true)
  const menuItems = [
    {
      title: "Dashboard",
      icon: <PresentationChartBarIcon className="pl-6 w-16 icon" />,
      link: "/admin",
    },
    {
      title: "Users",
      icon: <UserCircleIcon className="pl-6 w-16 icon" />,
      link: "/admin/users"
    },
    {
      title: "Hosts",
      icon: <UserCircleIcon className="pl-6 w-16 icon" />,
      link: "/admin/hosts",
    }
  ];
console.log(navBar);
  const handleLinkClick = (link) => {
    setActiveLink(link);
    navigate(link);
  };

  // Check if the current location matches the activeLink
  React.useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    // {if (navBar==false) {
    
    // } else {
    //   <div>
    //   <button onClick={()=>openNavbar(true)}>Click</button>
    // </div>
    // }}
    <div>
      {navBar?(
          <div className={`sideBar bg-gray-800 w-64 `}>
            <div>
          <div className='logo min-w-full'>
            <img src={Logo} className='Logo' alt="Logo" />
            <h1 className='name pl-3 text-3xl text-white'>StaySpot</h1>
            <button className="button" onClick={() => setNavbar(false)}><GiHamburgerMenu/></button>
          </div>
          </div>
          <div className='mt-10' style={{height:"100vh"}}>
            {menuItems.map((obj, index) => (
              <div
                className={`inline-flex min-w-full list ${activeLink === obj.link ? 'selected' : ''}`}
                key={index}
                onClick={() => handleLinkClick(obj.link)}
              >
                {obj.icon}
                <span className="pl-6 text-2xl name pt-2 pb-2">{obj.title}</span>
              </div>
            ))}
          </div>
        </div>
      ):(
        <div>
          <button className="secondButton" onClick={() => setNavbar(true)}><GiHamburgerMenu/></button>
        </div>
      )

      }
    </div>
    
    
  );
}

export default Sidebar;
