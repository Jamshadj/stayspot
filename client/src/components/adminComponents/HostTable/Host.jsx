import { Card, Typography, Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import Sidebar from '../Sidebar/Sidebar'
import { getHosts, postBlockHost, postUnBlockHost } from "../../../api/adminApi";

const Host = () => {
  const [hostsData, setHostsData] = useState([]);
  const [selectedHost, setSelectedHost] = useState(null);

  const handleBlock = (host) => {
    setSelectedHost(host);
    Swal.fire({
      title: `Block host`,
      text: `Are you sure you want to block ${host.firstName} ${host.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Block',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        postBlockHost(host._id)
          .then(() => {
            Swal.fire('Blocked!', `${host.firstName} ${host.lastName} has been blocked.`, 'success');
            setSelectedHost(null);
            getHostsData();
          })
          .catch((error) => {
            Swal.fire('Error!', 'An error occurred while blocking the host.', 'error');
            console.error(error);
          });
      }
    });
  };

  const handleUnblock = (host) => {
    setSelectedHost(host);
    Swal.fire({
      title: `Unblock Host`,
      text: `Are you sure you want to unblock ${host.firstName} ${host.lastName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Unblock',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        postUnBlockHost(host._id)
          .then(() => {
            Swal.fire('Unblocked!', `${host.firstName} ${host.lastName} has been unblocked.`, 'success');
            setSelectedHost(null);
            getHostsData();
          })
          .catch((error) => {
            Swal.fire('Error!', 'An error occurred while unblocking the host.', 'error');
            console.error(error);
          });
      }
    });
  };

  useEffect(() => {
    getHosts().then((response) => {
      setHostsData(response.data);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

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

  const TABLE_HEAD = ["No", "Name", "Email", "Phone", "Status", "Action"];
  const TABLE_ROWS = hostsData.map((host) => (
    <tr key={host._id} className="even:bg-blue-gray-50/50">
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          No
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {host.firstName + " " + host.lastName}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {host.email}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {host.phoneNumber}
        </Typography>
      </td>
      <td className="p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {host.blocked ? "Blocked" : "Not Blocked"}
        </Typography>
      </td>
      <td className="p-4">
        <Typography as="a" href="#" variant="small" color="blue" className="font-medium">
          {host.blocked ? (
            <Button color="green" onClick={() => handleUnblock(host)}>
              Unblock
            </Button>
          ) : (
            <Button color="red" onClick={() => handleBlock(host)}>
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
      <div style={{width:"100%", margin:"30px"}}>
        <h2>Host Management</h2>
        <Card className="overflow-scroll h-full w-full">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}

export default Host;
