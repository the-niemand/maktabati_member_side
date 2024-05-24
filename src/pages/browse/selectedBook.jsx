import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../../../redux/Slice';
import { Toaster, toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './calender.css';
import { CircularProgress } from '@mui/material';
import valide from '../../assets/valide.gif';
import axios from 'axios';

const SpecificBook = () => {

     const navigate = useNavigate();
     const URL = import.meta.env.VITE_URL_API;
     const selectedBook = useSelector(state => state.books.selectedData);
     const userID = sessionStorage.getItem("user_id");
     const [phase, setPhase] = useState(1)
     const threeDays = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
     const today = new Date(Date.now() + 24 * 60 * 60 * 1000);
     const weeks = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
     const [startDate, setStartDate] = useState(threeDays);
     const [formData, setFormData] = useState({
          userId: userID,
          bookId: selectedBook._id,
          expectedDeliveryDate: null,
          pickupDate: null,
          status: "reserved"
     });
     const [isLoading, setIsLoading] = useState(false)
     const [reservationSucceded, setReservationSucceded] = useState(false)

     useEffect(() => {
          const handleCreationSuccess = async () => {
               if (reservationSucceded) {
                    await new Promise(resolve => setTimeout(resolve, 1250));
                    location.reload();
               }
          };

          handleCreationSuccess();
     }, [reservationSucceded]);



     const dispatch = useDispatch();

     const handleExpectedDeliveryDateChange = (date) => {
          setFormData({
               ...formData,
               expectedDeliveryDate: date,
          });
     };
     const handlePickupDateChange = (date) => {
          setFormData({
               ...formData,
               pickupDate: date,
          });
     };

     const handleAuthors = () => {
          if (selectedBook.authors && selectedBook.authors.length > 0) {
               return selectedBook.authors.join(', ');
          } else {
               return "unknown";
          }
     };

     const handleCategory = () => {
          if (selectedBook.categories && selectedBook.categories.length > 0) {
               return selectedBook.categories.join(', ');
          } else {
               return "unknown";
          }
     };

     const handleSecondPhase = () => {
          if (!userID) {
               toast.error('You are not currently logged in');
          } else {
               setPhase(2)
          }
     };


     const handleReserve = async () => {
          try {
               setIsLoading(true)
               const response = await axios.post(`${URL}reservations/createReservation`, formData);
               setReservationSucceded(true)
               if (response.status === 201 || response.status === 200) {
               }
          } catch (error) {
               console.log(error);
          } finally {
               setIsLoading(false)
          }
     }


     const renderingPhases = () => {
          switch (phase) {
               case 1:
                    return <>
                         <div className='h-[350px] rounded overflow-hidden'>
                              <img src={selectedBook.image} alt="book image" className='w-full h-full object-cover' />
                         </div>
                         <div className='h-[350px] flex flex-col gap-5 justify-center mr-14'>
                              <div className='absolute right-3 top-3'>
                                   <svg onClick={() => { dispatch(addData(null)) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-30 hover:opacity-100 transition duration-200 cursor-pointer feather feather-x">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                   </svg>
                              </div>
                              <h1 title={selectedBook.title} className='text-[23px] font-Poppins font-extra w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap'>{selectedBook.title}</h1>
                              <h1 title={selectedBook.type} className='text-[18px] font-Poppins font-bold w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap'>type {selectedBook.type}</h1>
                              <div title={handleAuthors()} className='text-[15px] inline w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap'>by : <p className='text-[15px] font-Poppins inline font-bold'>{handleAuthors()}</p></div>
                              <h1 title={handleCategory()}>category : <p className='text-[15px] font-Poppins inline font-bold w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap'>{handleCategory()}</p></h1>
                              <h1>copies available : <p className='text-[15px] font-Poppins inline font-bold'>{selectedBook.copies}</p></h1>

                              {selectedBook.status && selectedBook.status == "upcomming" ? (
                                   <button className={`cursor-not-allowed bg-red-500 text-white rounded border-2 border-white border-opacity-0 py-1 px-3 text-[15px] shadow-search font-popping font-bold hover:border-red-500 hover:bg-white hover:text-red-500`}>
                                        Not Available yet
                                   </button>
                              ) : (
                                   <button onClick={handleSecondPhase} className={`${selectedBook.copies === 0 ? 'cursor-not-allowed' : 'cursor-pointer'} bg-yellow-400 text-white rounded border-2 border-white border-opacity-0 py-1 px-3 text-[15px] shadow-search font-popping font-bold hover:border-yellow-400 hover:bg-white hover:text-yellow-400`}>
                                        reserve
                                   </button>
                              )}

                         </div></>
               case 2:
                    return <div className='flex flex-col items-center justify-center'>
                         {reservationSucceded ? (
                              <div className='flex flex-col gap-4 items-center justify-center'>
                                   <img src={valide} width="60" alt="valide" />
                                   <h3 className='text-green-600 font-Poppins font-regular'>reserved successfully</h3>
                              </div>
                         ) : (
                              <>
                                   <div className='flex gap-4'>
                                        <div className='flex flex-col gap-2 mb-4 '>
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="Brand">
                                                  Expected Pickup Date
                                             </label>
                                             <div className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                                  <DatePicker
                                                       selected={formData.pickupDate}
                                                       onChange={handlePickupDateChange}
                                                       name="pickupDate"
                                                       dateFormat="dd/MM/yyyy"
                                                       minDate={today}
                                                       maxDate={startDate}
                                                       placeholderText='dd/MM/yyyy'
                                                  />
                                             </div>
                                        </div>
                                        <div className='flex flex-col gap-2 mb-4 '>
                                             <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="Brand">
                                                  Expected Delivery Date
                                             </label>
                                             <div className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                                  <DatePicker
                                                       selected={formData.expectedDeliveryDate}
                                                       onChange={handleExpectedDeliveryDateChange}
                                                       name="expected_deliveryDate"
                                                       dateFormat="dd/MM/yyyy"
                                                       minDate={startDate}
                                                       maxDate={weeks}
                                                       placeholderText='dd/MM/yyyy'
                                                  />
                                             </div>
                                        </div>

                                   </div>
                                   <button onClick={handleReserve} className={`cursor-pointer bg-yellow-400 text-white rounded border-2 border-white border-opacity-0 py-1 px-3 text-[15px] shadow-search font-popping font-bold hover:border-yellow-500`}>
                                        {isLoading ? (<CircularProgress color='secondary'  size={20}/> ) : ('reserve')}
                                   </button>
                              </>
                         )}
                    </div>
          }
     }
     return (
          <>
               <div className='fixed z-50 w-full h-screen flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
                    <div className='bg-white rounded relative p-4  flex gap-5 items-center'>
                         {renderingPhases()}
                    </div>
               </div >
               <div className='absolute'>
                    <Toaster expand={false} position="bottom-right" richColors containerStyle={{ position: 'fixed', bottom: 0, right: 0 }} />
               </div>
          </>
     )
}

export default SpecificBook