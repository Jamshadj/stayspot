import React from 'react'

function LoginCardImage({image}) {
  return (
    <div className=" md:w-[30rem] w-96 md:ml-auto" >
    <div className="bg-white shadow-lg rounded-lg p-6" >
      <img src={image} className='md:h-[33rem] md:w-[27rem] h-[21rem] w-[21rem]' alt="Google Logo" />
    </div>
  </div>
  )
}

export default LoginCardImage