import React from 'react'
import StaySpot from "../../../assets/images/Signup design.jpg"

function SignUpCardImage() {
  return (
    <div className="max-w-80 sm:max-w-96 ml-auto" style={{ width: "30rem" }}>
    <div className="bg-white shadow-lg rounded-lg p-6" style={{ height: "46rem" }}>
      <img src={StaySpot} className='h-[33rem] w-[27rem]' alt="Google Logo" />
    </div>
  </div>
  )
}

export default SignUpCardImage