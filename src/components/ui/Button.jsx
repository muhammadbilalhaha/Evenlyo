import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-full font-semibold transition flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-brand-pink hover:bg-pink-600 text-white',
    outline: 'border border-brand-pink text-brand-pink hover:bg-pink-50',
    ghost: 'border border-white hover:bg-white hover:text-brand-dark text-white',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;