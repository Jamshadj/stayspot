import React, { useState, useEffect } from "react";
import { getUsers } from "../../../api/adminApi";
import SideDrawer from "../Sidebar/SideDrawer";

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

  // Callback function to handle user status change
  const handleUserStatusChange = (updatedData) => {
    // Update the state with the new user data received from the callback
    console.log(updatedData);
    getUsersData();
  };
  const TABLE_HEAD = ["No", "Name", "Email", "Status", "Action"];
  return (
    <div>
      {usersData.length > 0 && (
        <SideDrawer user={'user'} tableHead={TABLE_HEAD} data={usersData} onUserStatusChange={handleUserStatusChange} />
      )}
    </div>
  );
};

export default Users;
