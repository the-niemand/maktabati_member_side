import React, { useState } from 'react';

function SearchBar({ showFilter, setShowFilter }) {
  const [searchFieldValue, setSearchFieldValue] = useState('');

  const clearInput = () => {
    setSearchFieldValue('');
  };


  return (
    <div className='flex w-full space-x-4'>
      <div
        className={`w-full pl-5 pr-2.5 py-2 bg-white rounded-full shadow-search justify-start border items-center flex space-x-4 `}
      >
        {/* //filter icon */}
        <div onClick={()=>{setShowFilter(!showFilter)}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#282828"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-60 cursor-pointer hover:opacity-100 transition ease-out duration-150"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="text-base border-none outline-none focus:ring-0 w-full "
            value={searchFieldValue}
            onChange={(e) => setSearchFieldValue(e.target.value)}
          />
        </div>
        {searchFieldValue && (
          <div onClick={clearInput}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#282828" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50 cursor-pointer hover:opacity-100 transition ease-out duration-150">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        )}
        <button
          type="submit"
          className="w-fit px-2 py-0.5 border-2 border-yellow-400 bg-yellow-400 text-[13px] font-medium font-Poppins text-white rounded-full hover:bg-transparent hover:text-yellow-400 font-semibold transition ease-out duration-250"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;