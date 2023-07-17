import React, { useState, useEffect } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import Swal from "sweetalert2";
import Sidebar from '../Sidebar/Sidebar';
import AdminModals from "../../../modals/adminModals";
import { getUsers, postBlockUser,postUnBlockUser } from "../../../api/adminApi";

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const handleBlock = (user) => {
    setSelectedUser(user);
    Swal.fire({
      title: `Block User`,
      text: `Are you sure you want to block ${user.firstName} ${user.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Block',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
       
        postBlockUser(user._id)
          .then(() => {
            Swal.fire('Blocked!', `${user.firstName} ${user.lastName} has been blocked.`, 'success');
            setSelectedUser(null);
            getUsersData();
          })
          .catch((error) => {
            Swal.fire('Error!', 'An error occurred while blocking the user.', 'error');
            console.error(error);
          });
      }
    });
  };

  const handleUnblock = (user) => {
    setSelectedUser(user);
    Swal.fire({
      title: `Unblock User`,
      text: `Are you sure you want to unblock ${user.firstName} ${user.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Unblock',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        postUnBlockUser(user._id)
          .then(() => {
            Swal.fire('Unblocked!', `${user.firstName} ${user.lastName} has been unblocked.`, 'success');
            setSelectedUser(null);
            getUsersData();
          })
          .catch((error) => {
            Swal.fire('Error!', 'An error occurred while unblocking the user.', 'error');
            console.error(error);
          });
      }
    });
  };

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

  const TABLE_HEAD = ["No", "Name", "Email", "Status", "Action"];
  const TABLE_ROWS = usersData.map((user, index) => (
    <tr key={user.id} className={`${index % 2 === 0 ? 'bg-blue-gray-50' : 'bg-white'}`}>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {index + 1}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {user.firstName} {user.lastName}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {user.email}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {user.blocked ? "Blocked" : "Not Blocked"}
        </Typography>
      </td>
      <td className="p-4">
        <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
          {user.blocked  ? (
            <Button color="green" onClick={() => handleUnblock(user)}>
              Unblock
            </Button>
          ) : (
            <Button color="red" onClick={() => handleBlock(user)}>
              Block
            </Button>
          )}
        </Typography>
      </td>
    </tr>
  ));

  return (
    <div style={{ display:"flex" }}>
      <div className=' h-full' style={{"height":"49rem"}}>
      <Sidebar />
      </div>
      <div style={{ width:"100%", margin:"30px" }}>
        <h2>User Management</h2>
        <Card className="overflow-scroll  w-full">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>{TABLE_ROWS}</tbody>
          </table>
        </Card>
      </div>
      {selectedUser && <AdminModals user={selectedUser} />}
    </div>
  );
};

export default Users;
