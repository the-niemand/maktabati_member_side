import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Dropdown from './DropDown';
import CategoryDropDown from './CategoryDropDown';

const FilterAndSearch = () => {
     const [categories, setCategories] = useState([]);
     const [showFilter, setShowFilter] = useState(false);


     const handleCategorySelect = (categories) => {
          setCategories(categories);
     };

     return (
          <div className='w-[80%] flex flex-col gap-10'>
               <div className='flex gap-4 items-center justify-center'>
                    <div
                         className='border p-3 bg-white shadow-search rounded-full w-fit h-fit opacity-70 hover:opacity-100 cursor-pointer hover:shadow-button transition ease-out duration-200'
                         onClick={() => setShowFilter(!showFilter)}
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter">
                              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                         </svg>
                    </div>
                    <SearchBar showFilter={showFilter} setShowFilter={setShowFilter} />
               </div>

               <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${showFilter ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr]'}`}>
                    <div className={`flex px-8 gap-4 items-start justify-between overflow-hidden`}>
                         <div className='flex flex-col items-start gap-3'>
                              <p className='text-[14px] font-bold'>Sort By</p>
                              <Dropdown name={'Popular'} dropdownItems={['Popular', 'Release']} direction={'right'} />
                         </div>
                         <div className='flex gap-6'>
                              <div className='flex flex-col items-start gap-3'>
                                   <p className='text-[14px] font-bold'>Type</p>
                                   <Dropdown name={'Books'} dropdownItems={['Books', 'Novel', 'Magazines', 'Newspapers']} />
                              </div>
                              <div className='flex flex-col items-start gap-3'>
                                   <p className='text-[14px] font-bold'>Categories</p>
                                   <CategoryDropDown onSelect={handleCategorySelect} />
                              </div>
                         </div>
                    </div>

               </div>
          </div>
     );
};

export default FilterAndSearch;
