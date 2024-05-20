import { useEffect, useRef, useState } from "react";

const Dropdown = ({ name, dropdownItems, onSelect, direction }) => {
     const [isOpen, setIsOpen] = useState(false);
     const [selected, setSelected] = useState(name);
     const dropdownRef = useRef(null);

     const toggleDropdown = () => {
          setIsOpen(!isOpen);
     };

     const handleOutsideClick = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
               setIsOpen(false);
          }
     };

     useEffect(() => {
          document.addEventListener("mousedown", handleOutsideClick);

          return () => {
               document.removeEventListener("mousedown", handleOutsideClick);
          };
     }, []);

     return (
          <div className="flex flex-col gap-2 w-full" ref={dropdownRef}>
               <button
                    className="border w-full text-neutral-600 border-neutral-300 font-bold py-1.5 px-4 rounded-md flex justify-between items-center"
                    onClick={toggleDropdown}
               >
                    <span className="truncate">{selected}</span>
                    <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="22"
                         height="22"
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke="currentColor"
                         strokeWidth="2"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         className={`feather feather-chevron-down pt-1 ${isOpen ? "rotate-180 pt-0" : ""} transition ease-out duration-200 ml-2`}
                    >
                         <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
               </button>

               <div className={`w-full ${isOpen ? "flex" : "hidden"} ${direction === "right" ? "flex-col items-start" : "flex-col items-end"} text-zinc-800 p-3 rounded border border-neutral-300`}>
                    <ul className="w-full">
                         {dropdownItems.map((item, index) => (
                              <li
                                   className="cursor-pointer hover:bg-gray-200 rounded py-2 px-4 truncate w-full"
                                   key={index}
                                   onClick={() => {
                                        console.log("Item clicked:", item); // Log the item clicked
                                        setSelected(item);
                                        onSelect(item);
                                        setIsOpen(false); // Ensure this sets isOpen to false
                                        console.log("Dropdown state after click:", isOpen); // Log the state
                                   }}
                              >
                                   {item}
                              </li>
                         ))}
                    </ul>
               </div>
          </div>
     );
};

export default Dropdown;
