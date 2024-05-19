import React, { useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Book from './book';

const Books = () => {


  return (
    <div className='flex gap-7'>
      <Book />
      <Book />
      <div className='bg-white cursor-pointer flex flex-col gap-3 rounded-md shadow-button p-3 '>
        <div>
          <Skeleton variant="rectangular" sx={{ width: "180px", height: "250px", borderRadius: "0.375rem" }} />
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col w-4/5'>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="50%" />
          </div>
          <Skeleton variant="circular" width={24} height={24} />
        </div>
      </div>

    </div>
  );
};

export default Books;
