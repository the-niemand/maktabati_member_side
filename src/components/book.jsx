import React, { useState } from 'react'

const Book = () => {

     const [saveIsOnHover, setSaveIsOnHover] = useState(false);
     const [isSaved, setIsSaved] = useState(false);

     return (
          <div className='h-fit cursor-pointer flex flex-col gap-3 rounded-md bg-white shadow-button p-3 border border-white hover:border-neutral-400 transition-color duration-100'>
               <div className='w-[180px] h-[250px] rounded-md overflow-hidden'>
                    <img className="w-full h-full object-cover" src="https://marketplace.canva.com/EAFaQMYuZbo/1/0/1003w/canva-brown-rusty-mystery-novel-book-cover-hG1QhA7BiBU.jpg" alt="Book Cover" />
               </div>
               <div className='flex justify-between items-center'>
                    <div className='flex flex-col'>
                         <h1 className='font-extra font-Poppins'>This is Soul</h1>
                         <p className='text-[11px] font-bold font-Mulish'>By Olivia Wilson</p>
                    </div>
                    <div
                         onMouseEnter={() => setSaveIsOnHover(true)}
                         onMouseLeave={() => setSaveIsOnHover(false)}
                         onClick={() => setIsSaved(!isSaved)}
                         className="transition-opacity duration-150"
                    >
                         <div
                              className={saveIsOnHover ? "bg-black bg-opacity-10 rounded-full p-1.5" : "rounded-full p-1.5"}
                              style={{ transition: "background-color 0.15s ease" }}
                         >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={saveIsOnHover || isSaved ? "black" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark">
                                   <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                              </svg>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Book