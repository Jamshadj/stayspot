import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { updateDetails } from '../../../api/userApi';
import Navbar from '../Navbar/Navbar';

function UserProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const handleEdit = async (field) => {
    const { value } = await Swal.fire({
      title: `Edit ${field}`,
      input: 'text',
      inputValue: user.details[field],
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
        console.log("ddd");
        // Call the API to update the user's field
        await updateDetails(user.details._id, { [field]: value });
         dispatch({type:"refresh"})
        Swal.fire('Updated', '', 'success');
      } catch (error) {
        Swal.fire('Failed to update. Please try again.', '', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar reservation="reservation" />
      <div className="pt-28">
        <div className="m-10 flex">
          <div className="w-1/3 p-4">
            <div className="flex justify-center h-48">
              <img src={user.details.image} className="rounded-full" alt="User" />
            </div>
            <div className="text-center mt-4">
              <span className="text-lg font-semibold">
                {user.details.firstName} {user.details.lastName}
              </span>
            </div>
          </div>
          <div className="w-2/3 p-4">
            <h2 className="text-xl font-semibold mb-4">Personal Info</h2>
            {['firstName', 'lastName', 'email', 'phoneNumber'].map((field) => (
              <div className="mb-4" key={field}>
                <p className="text-black font-semibold">{field}</p>
                <div className="flex justify-between items-center">
                  <div>{user.details[field]}</div>
                  <div className="text-blue-500 cursor-pointer" onClick={() => handleEdit(field)}>
                    Edit
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
