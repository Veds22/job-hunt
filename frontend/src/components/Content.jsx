import React from 'react';

const Content = ({ children }) => {
  return (
    <div className="p-4 w-full">
      <main>{children}</main>
    </div>
  );
};

export default Content;
