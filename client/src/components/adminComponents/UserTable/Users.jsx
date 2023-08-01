import React, { useState, useEffect } from "react";
import { getUsers } from "../../../api/adminApi";
import SideDrawer from "../Sidebar/SideDrawer";
// import SideDrawer from "../Sidebar/SideDrawer";

const Users = () => {
  const [usersData, setUsersData] = useState([]);


  const getUsersData = () => {
    getUsers()
      .then((response) => {
        setUsersData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div>
      {usersData.length > 0 && <SideDrawer user={'user'} userData={usersData} />}
    </div>
  );
};

export default Users;
