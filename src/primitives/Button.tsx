import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = '', ...rest }) => (
  <button className={`px-3 py-1 rounded ${className}`} {...rest}>
    {children}
  </button>
);
