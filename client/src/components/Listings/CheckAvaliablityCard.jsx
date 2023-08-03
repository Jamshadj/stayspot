import React from 'react'
import { Button } from "@material-tailwind/react";
import { IoIosArrowDropdown } from 'react-icons/io'
function CheckAvaliablityCard({listing}) {
  return (
    <div className='sticky top-0 z-10 h-[200px] w-full inline-block'>
                  <div className='pb-12'>
                    <div className='mt-12'>
                      <div className="border border-gray-300 rounded-lg p-6 shadow-md">
                        <div className="text-gray-700 font-sans font-normal text-base leading-5">
                          <div className="flex flex-wrap justify-between items-baseline mb-6 gap-x-2 gap-y-4">
                            <div className="flex items-baseline">
                              <span className="font-bold">₹ {listing.pricePerNight}</span>
                              <span className="ml-2">night</span>
                            </div>
                            <div className="text-right"> 
                              Ratings
                            </div>
                          </div>
                        </div>
                        <div className='mb-4'>
                          <div className='grid grid-cols-2 '>
                            <div className="relative border-2 p-2 overflow-hidden">
                              <div className='text-xs font-bold'>
                                CHECK-IN
                              </div>
                              <div>
                                19/04/2004
                              </div>
                            </div>
                            <div className="relative border-2 p-2 overflow-hidden">
                              <div className='text-xs font-bold'>
                                CHECKOUT
                              </div>
                              <div>
                                19/04/2004
                              </div>
                            </div>
                          </div>
                          <div className='flex relative border-2 p-2 overflow-hidden'>
                            <div>
                              <div className='text-xs font-bold'>
                                Guests
                              </div>
                              <div>
                                1 guest
                              </div>
                            </div>
                            <div className='ml-auto'>
                              <IoIosArrowDropdown />
                            </div>
                          </div>
                        </div>
                        <div>
                          <Button className='w-full' color="blue">Check Avaliablity</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  )
}

export default CheckAvaliablityCard