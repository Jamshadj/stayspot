import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Button } from '@mui/material'
import confirmLogo from '../../../assets/verificationimg/360_F_549387387_RCkqVtf2t5PbNYGQgQEHZMpFuHbpTvJz.webp'
import { useLocation } from 'react-router-dom';
function ReservationSucess() {
  const location = useLocation(); // Use the useLocation hook
  const bookingId = new URLSearchParams(location.search).get('bookingId');
  return (
    <div>
      <div>
        <Navbar reservation={true} />
      </div>
      <div >
        <div className='pt-28'>
          <div className='mx-40'>
            <div className='mx-auto text-center'>
              <span className='text-center text-black text-2xl font-bold'>Booking confirmed successfully</span>
            </div>
            <div className='items-center flex justify-center'>
              <img src={confirmLogo} alt="" />
            </div>
            <div className='text-center'>
              <span >
                Booking ID:{bookingId}
              </span>
            </div>
            <div className='flex mt-6 justify-center'>
              <div>
                <img src={confirmLogo} className='w-20 h-20' alt="" />
              </div>
              <div className=' flex text-center'>
                <span className='text-center pt-4'>Title dssfjnjwnfirfjn djn  endne</span>
              </div>
            </div>
            <div className='flex justify-center'>
            <div className='flex gap-4'>
              <div>
             <Button className='blue'>Go to Home</Button>
              </div>
              <div>
              <Button className='blue'>Go to reservations</Button>
              </div>
            </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ReservationSucess