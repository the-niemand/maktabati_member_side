import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Icon = ({ path, to }) => {
  const navigate = useNavigate();
  const [isActive , setIsActive] = useState()
  const IconUrl = `/${to}`

  useEffect(()=>{
    if(IconUrl === window.location.pathname){
      setIsActive(true)
    }else{
      setIsActive(false)
    }
  },[window.location.pathname])

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={isActive ? "white" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-globe"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );

  const containerClassName = `w-9 h-9 flex items-center justify-center rounded cursor-pointer ${isActive ? "bg-yellow-400" : "hover:bg-yellow-100"}`;
  const handleClick = () => {
    navigate(to);
  };

  return (
    <div className={containerClassName} onClick={handleClick}>
      {icon}
    </div>
  );
};

export default Icon;
