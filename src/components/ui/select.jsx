import React from 'react';

export function Select({ children, value, onValueChange, className = '' }) {
  return (
    <select value={value} onChange={(e) => onValueChange && onValueChange(e.target.value)} className={`rounded-md px-3 py-2 bg-slate-800 border border-slate-700 text-slate-200 ${className}`}>
      {children}
    </select>
  );
}

export function SelectItem({ children, value }) {
  return <option value={value}>{children}</option>;
}

export function SelectContent({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function SelectTrigger({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function SelectValue({ children, className = '' }) {
  return <span className={className}>{children}</span>;
}

export default Select;
