import React from 'react';

const Badge = ({ children, className = '' }) => {
  return (
    <span className={`inline-block bg-brand-pink text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider ${className}`}>
      {children}
    </span>
  );
};

export default Badge;