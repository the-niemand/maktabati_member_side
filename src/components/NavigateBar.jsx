import React, { useEffect, useState } from 'react';
import Icon from './Icon'; // Assuming the correct file name is Icon.js

const NavigateBar = () => {

  const list = ['Browse', 'Catalog', 'Saved', 'About'];

  return (
    <div className='fixed bottom-6 bg-white shadow-button py-1.5 px-3 flex items-center gap-3 rounded'>
      {list.map((item, index) => {
        return <Icon key={index}  to={item.toLowerCase()} />;
      })}
    </div>
  );
};

export default NavigateBar;
