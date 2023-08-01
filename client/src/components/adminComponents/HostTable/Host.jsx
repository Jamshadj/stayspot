import { Card, Typography, Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import Sidebar from '../Sidebar/Sidebar'
import { getHosts, postBlockHost, postUnBlockHost } from "../../../api/adminApi";
import SideDrawer from "../Sidebar/SideDrawer";

const Host = () => {
  const [hostsData, setHostsData] = useState([]);
  const getHostsData = () => {
    getHosts()
      .then((response) => {
        setHostsData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getHostsData();
  }, []);


  return (
   <div>
     {hostsData.length > 0 && <SideDrawer host={'host'} hostsData={hostsData} />}
   </div>
  )
}

export default Host;
