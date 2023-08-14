import React from 'react';
import HostNavbar from '../HostNavBar/HostNavbar';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { updateDetails } from '../../../api/hostApi';

function HostProfile() {
  const dispatch = useDispatch();
  const { host } = useSelector((state) => state);
  console.log(host.details._id);
  const handleEdit = async (field) => {
    const { value } = await Swal.fire({
      title: `Edit ${field}`,
      input: 'text',
      inputValue: host.details[field],
      showCancelButton: true,
      confirmButtonText: 'Save',
      inputValidator: (value) => {
        if (!value) {
          return 'Value is required';
        }
        if (value.length < 3) {
          return 'Value must be at least 3 characters';
        }
        return null; // Return null for no validation errors
      },
    });

    if (value) {
      try {
        // Call the API to update the host's field
        // const updatedDetails =;
        await updateDetails(host.details._id, { [field]: value }); // Correctly pass hostId and details
        dispatch({ type: 'refresh' });
        Swal.fire('Updated', '', 'success');
      } catch (error) {
        Swal.fire('Failed to update. Please try again.', '', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <HostNavbar />
      <div className="pt-28">
        <div className="m-10 flex">
          <div className="w-1/3 p-4">
            <div className="flex justify-center h-48">
              <img src={host.details.image} className="rounded-full" alt="host" />
            </div>
            <div className="text-center mt-4">
              <span className="text-lg font-semibold">
                {host.details.firstName} {host.details.lastName}
              </span>
            </div>
          </div>
          <div className="w-2/3 p-4">
            <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
            {['firstName', 'lastName', 'email'].map((field) => (
              <div className="mb-4" key={field}>
                <p className="text-black font-semibold">{field}</p>
                <div className="flex justify-between items-center">
                  <div>{host.details[field]}</div>
                  <div className="text-blue-500 cursor-pointer" onClick={() => handleEdit(field)}>
                    Edit
                  </div>
                </div>
              </div>
            ))}
            <div className="mb-4">
              <p className="text-black font-semibold">Wallet Balance</p>
              <div className="flex justify-between items-center">
                <div>{host.details.wallet}</div>
                <div className="text-blue-500 cursor-pointer" >
                  Withdraw request
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-black font-semibold">Balance Amount to be credited</p>
              <div className="flex justify-between items-center">
                <div>{host.details.balance}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostProfile;
