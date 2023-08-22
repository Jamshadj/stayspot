import React, { useState } from 'react';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import GoogleAuth from '../GooogleAuth/GoogleAuth';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { logInSchema } from '../../../validations/logInValidation';
import { postForgotPassword, postLogin, postVerifyOtp } from '../../../api/userApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

function LoginCard() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

 // Client-side code (assuming Swal is used)
const handleEmailSubmit = async (inputValue) => {
  try {
    const response = await postForgotPassword(inputValue);
    if (response.data.success) {
      const { value: otp } = await Swal.fire({
        title: 'Enter OTP',
        input: 'text',
        inputAttributes: {
          maxlength: 4,
          inputmode: 'numeric'
        },
        showCancelButton: true,
        confirmButtonText: 'Submit',
        cancelButtonText: 'Cancel'
      });
      
      if (otp) {
        const otpResponse = await postVerifyOtp(otp);
        console.log(otpResponse.data.message,"eff");
        if (otpResponse.data.success) {
          // OTP verification successful
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'OTP verified successfully'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: otpResponse.data.message
          });
        }
      }
    } else {
      // Show error message
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: response.data.message
      });
    }
  } catch (error) {
    console.error(error);
  }
};


  const forgotPassword = async () => {
    try {
      const result = await Swal.fire({
        title: 'Enter your email',
        input: 'email',
        inputPlaceholder: 'Enter email',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
          if (inputValue) {
            setEmail(inputValue);
            return handleEmailSubmit(inputValue);
          } else {
            Swal.showValidationMessage('Please enter a valid email');
          }
        },
      });

      if (result.isConfirmed) {
        // Handle the result if needed
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await postLogin(data);

      if (!response.data.err) {
        dispatch({ type: "refresh" });
        return navigate('/');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-80 sm:max-w-96 md:w-[30rem]">
      <div className="bg-white shadow-lg rounded-lg p-6" style={{ height: "36rem" }}>
        <Card color="transparent" shadow={false}>
          <Typography className="mb-4 text-center" variant="h4" color="blue-gray">
            Welcome back StaySpot
          </Typography>
          <Typography variant="h4" color="blue-gray">
            Login
          </Typography>
          <form className="mt-8 mb-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 space-y-6">
              <Input
                size="lg"
                label="Email"
                type="email"
                {...register("email")}
                className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 mt-1 mb-2">{errors.email.message}</p>}

              <Input
                type="password"
                size="lg"
                label="Password"
                {...register("password")}
                className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && <p className="text-red-500 mt-1 mb-2">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              Login
            </Button>
            <div>
              <p className="pl-52 md:pl-72 hover:text-blue-500 hover:cursor-pointer" onClick={forgotPassword}>
                Forgot password
              </p>
            </div>
            {error && <p className="text-red-500 mt-4 text-center font-normal">{error}</p>}
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <Link to={"/signup"}>
                Sign Up
              </Link>
            </Typography>
            <Typography className="mb-4 text-center" variant="h4" color="blue-gray">
              or
            </Typography>
            <GoogleAuth />
          </form>
        </Card>
      </div>
    </div>
  );
}

export default LoginCard;
