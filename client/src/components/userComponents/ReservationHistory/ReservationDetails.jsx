import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { getBookingById } from '../../../api/adminApi';
import { getHostById, getListingById } from '../../../api/userApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import { DateRange, PeopleAlt, ModeNight, CurrencyExchange, MoreHoriz, LocationOn, Public } from '@mui/icons-material';
import { TbMapPinCog } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import Review from './Review';

function ReservationDetails() {
    const { bookingId } = useParams();
    const [loading, setLoading] = useState(true);
    const [bookingData, setBookingData] = useState(null);
    const [host, setHost] = useState(null);
    const [listing, setListing] = useState(null);
    const { user } = useSelector((state) => state);

    const getBookingData = async () => {
        try {
            const response = await getBookingById(bookingId);
            console.log(response.data,"response"); // Log the data to the console
            setBookingData(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    

    useEffect(() => {
        console.log("booking",bookingData);
        getBookingData();
    }, [bookingId]);

    useEffect(() => {
        if (bookingData) {
            getListingById(bookingData.listingId)
                .then(response => setListing(response.data))
                .catch(error => console.error(error));
        }
    }, [bookingData]);

    useEffect(() => {
        if (listing) {
            getHostById(listing.hostId)
                .then(response => setHost(response.data))
                .catch(error => console.error(error));
        }
    }, [listing]);

    return (
        <div>
            <div>
                <Navbar reservation={'reservation'} />
            </div>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <div className='md:flex pt-36'>
                        <div className='md:w-1/2'>
                            <div>
                                {listing && <img className='w-80  ml-9 h-96 md:ml-12 rounded' src={listing.images[0]} alt="" />}
                            </div>
                            <div className='mt-8 ml-12'>
                                <div>
                                    <span className='text-2xl font-bold'>
                                        {listing && listing.title}
                                    </span>
                                </div>
                                <div>
                                    <span className='text-gray-500 mt-4'>
                                        <LocationOn /> {listing && listing.location}
                                    </span>
                                </div>
                            </div>
                            <div className='mt-8 ml-12'>
                                <span className='font-semibold'>Hosted By: {host && host.firstName}</span>
                            </div>
                            <div className='mt-8 ml-12'>
                                <span className='font-semibold'>Contact : {host && host.phoneNumber}</span>
                            </div>
                        </div>
                        <div className='md:w-1/2'>
                            {bookingData && (
                                <div className='mt-8 ml-12 flex flex-col gap-6'>
                                    <div className='font-semibold'>
                                        Details
                                    </div>
                                    <div>
                                        <DateRange /> Check In: {new Date(bookingData.checkInDate).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <DateRange /> Check Out: {new Date(bookingData.checkOutDate).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <DateRange /> Booking Date: {new Date(bookingData.bookingDate).toLocaleDateString()}
                                    </div>
                                    <div>
                                        <PeopleAlt /> Number of Guests: {bookingData.guests}
                                    </div>
                                    <div>
                                        <ModeNight /> Number of Nights: {bookingData.numberOfNights}
                                    </div>
                                    <div>
                                        <CurrencyExchange /> Total Amount: ${bookingData.totalAmount}
                                    </div>
                                    <div>
                                        <MoreHoriz /> Status: {bookingData.status}
                                    </div>
                                </div>
                            )}
                            {listing && (
                                <div className='mt-8 ml-12 mb-7 flex flex-col gap-6'>
                                    <div className='font-semibold'>
                                        Address
                                    </div>
                                    <div>
                                        <span>
                                            House Number: {listing.address.houseNumber}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            Street Address: {listing.address.streetAddress}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            Area: {listing.address.area}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            Landmark: {listing.address.landMark}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            City: {listing.address.city}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            State: {listing.address.region}
                                        </span>
                                    </div>
                                    <div className='flex'>
                                        <span>
                                            <TbMapPinCog />
                                        </span>
                                        <span>
                                            Pincode: {listing.address.postCode}
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <Public /> Country: {listing.address.country}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {bookingData && bookingData.status && (
                        <div className='m-6'>
                            {bookingData.status === "CheckOut completed" && (
                                <Review bookingId={bookingId} userId={user.details._id} />
                            )}
                        </div>
                    )}

                </div>
            )}
        </div>
    );
}

export default ReservationDetails;
