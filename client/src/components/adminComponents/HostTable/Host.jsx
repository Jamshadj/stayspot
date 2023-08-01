import React, { useState, useEffect } from "react";
import { getHosts } from "../../../api/adminApi";
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

  // Callback function to handle host status change
  const handleHostStatusChange = (updatedData) => {
    // Update the state with the new host data received from the callback
    console.log(updatedData);
    getHostsData();
  };
  return (
   <div>
     {hostsData.length > 0 && <SideDrawer hostsData={hostsData} host={'host'} onHostStatusChange={handleHostStatusChange} />}
   </div>
  )
}

export default Host;
