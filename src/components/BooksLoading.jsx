import { Skeleton } from '@mui/material';
import React from 'react'

const BooksLoading = () => {
     return (
          <div className='w-fit bg-white cursor-pointer flex flex-col gap-3 rounded-md shadow-button p-3'>
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
     );
}

export default BooksLoading