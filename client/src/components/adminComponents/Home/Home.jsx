import React, { useEffect, useState } from 'react';
import SideDrawer from '../Sidebar/SideDrawer';
import { getUsers, getHosts } from "../../../api/adminApi";

function Home() {
  const [userCount, setUserCount] = useState(0);
  const [hostCount, setHostCount] = useState(0);

  useEffect(() => {
    const getUsersData = () => {
      getUsers()
        .then((response) => {
          setUserCount(response.data.length);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const getHostsData = () => {
      getHosts()
        .then((response) => {
          setHostCount(response.data.length);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getUsersData();
    getHostsData();
  }, []);

  return (
    <div>
      <SideDrawer dashBoard={'dashboard'} userCount={userCount} hostCount={hostCount} />
    </div>
  );
}

export default Home;
