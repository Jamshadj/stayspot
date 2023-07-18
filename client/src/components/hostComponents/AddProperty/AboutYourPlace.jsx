import React from 'react'
import PropertyNavbar from './PropertyNavbar'
import home from "../../../assets/animation/home.png"
function AboutYourPlace() {
  return (
    <div>
      <PropertyNavbar/>
      <div className='mx-auto w-full inline-flex'>
        <div className=' w-1/2 ml-10'>
          <div className='p-28 p-44'>
          <h5>Step 1
          </h5>
          <h2>Tell about your place</h2>
          <p>In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</p>
        </div>
        </div>
        <div className='w-1/2 '>
         <img src={home} alt="" />
        </div>

      
      </div>
      </div>
  )
}

export default AboutYourPlace