import React, { useEffect, useState } from "react";

const CategoryDropDown = ({ onSelect }) => {
     const [isOpen, setIsOpen] = useState(false);
     const [selectedItems, setSelectedItems] = useState([]);

     const list = [
          "Fantasy",
          "Horror",
          "Romance",
          "Historical fiction",
          "Science fiction",
          "Mystery",
          "Thriller",
          "Autobiography"
     ];


     useEffect(() => {
          onSelect(selectedItems)
     }, [selectedItems])



     const handleDivClick = (item) => {
          if (selectedItems.includes(item)) {
               setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
          } else {
               setSelectedItems([...selectedItems, item])
          }
     };

     return (
          <div className="w-full flex flex-col gap-3">
               <div
                    className="relative cursor-pointer w-full py-1.5 pl-4 pr-10 border border-neutral-300 rounded flex gap-3 flex-wrap justify-start items-center"
                    onClick={() => setIsOpen(!isOpen)}
               >

                    {selectedItems.length !== 0 ? (
                         <div className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                              {selectedItems.map((selectedItem, index) => (
                                   <span key={index} className="font-bold text-neutral-600">
                                        {selectedItem} {index !== selectedItems.length - 1 ? "," : ""}
                                   </span>
                              ))}
                         </div>
                    ) : (
                         <div className="text-neutral-600 font-bold mr-10">All...</div>
                    )}

                    <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="19"
                         height="19"
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         className={`absolute right-3 feather feather-chevron-down opacity-80 py-auto ${isOpen ? "rotate-180 pt-0" : ""
                              } transition ease-out duration-200 ml-2`}
                    >
                         <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
               </div>



               {isOpen && (
                    <div className="w-full p-4 border rounded flex flex-col gap-3 items-start h-40 overflow-y-auto">
                         {list.map((item) => (
                              <div
                                   key={item}

                                   className={`w-full flex justify-between items-center cursor-pointer ${selectedItems.includes(item) && "bg-gray-200"} hover:bg-gray-200 rounded py-2 px-4`}
                                   onClick={() => handleDivClick(item)}
                              >
                                   {item} {selectedItems.includes(item) && (
                                        <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="16"
                                             height="16"
                                             viewBox="0 0 24 24"
                                             fill="none"
                                             stroke="currentColor"
                                             strokeWidth="2"
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                             className="feather feather-check"
                                        >
                                             <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                   )}
                              </div>
                         ))}
                    </div>
               )}
          </div>
     );
};

export default CategoryDropDown;
