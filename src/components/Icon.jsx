import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook, faBookmark,
  faUsers, faShapes
} from '@fortawesome/free-solid-svg-icons'

const Icon = ({ to }) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (window.location.pathname === `/${to}`) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [window.location.pathname, to]);

  const IconRendered = () => {
    switch (to) {
      case 'browse':
        return <FontAwesomeIcon icon={faBook} style={{ color: isActive ? "#fff" : "#262626" }} />;
      case 'catalog':
        return <FontAwesomeIcon icon={faShapes} style={{ color: isActive ? "#fff" : "#262626" }} />;
      case 'saved':
        return <FontAwesomeIcon icon={faBookmark} style={{ color: isActive ? "#fff" : "#262626" }} />;
      case 'about':
        return <FontAwesomeIcon icon={faUsers} style={{ color: isActive ? "#fff" : "#262626" }} />;
      default:
        return null;
    }
  };

  const containerClassName = `w-9 h-9 flex items-center justify-center rounded cursor-pointer ${isActive ? "bg-yellow-400" : "hover:bg-yellow-100"}`;

  const handleClick = () => {
    navigate(to);
  };

  return (
    <div className={containerClassName} onClick={handleClick}>
      {IconRendered()}
    </div>
  );
};

export default Icon;
