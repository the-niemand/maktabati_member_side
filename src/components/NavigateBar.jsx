import React from 'react';
import Icon from './Icon'; // Assuming the correct file name is Icon.js

const NavigateBar = () => {
  const isLoggedIn = !!sessionStorage.getItem('user_id');
  const list = isLoggedIn ? ['Browse', 'Catalog', 'Saved', 'About'] : ['Browse', 'Catalog', 'About'];

  return (
    <div className='fixed bottom-6 bg-white shadow-button py-1.5 px-3 flex items-center gap-3 rounded'>
      {list.map((item, index) => (
        <Icon key={index} to={item.toLowerCase()} />
      ))}
    </div>
  );
};

export default NavigateBar;
