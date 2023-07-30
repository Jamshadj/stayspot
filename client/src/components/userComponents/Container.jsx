import React from 'react';

function Container({ children }) {
  return (
    <div className='max-w-[2520px] mx-auto xl:px-20 sm:px-2 px-4'>
      {children}
    </div>
  );
}

export default Container;
