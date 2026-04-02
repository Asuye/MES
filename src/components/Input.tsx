import React from 'react';

interface InputProps {
  label?: string;
  type?: 'text' | 'password' | 'number' | 'email' | 'date' | 'time';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  className = '',
  required = false,
  multiline = false,
  rows = 3,
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          className={`
            w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
            ${disabled ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-300 focus:border-blue-500'}
            ${error ? 'border-red-500' : ''}
          `}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
            ${disabled ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-300 focus:border-blue-500'}
            ${error ? 'border-red-500' : ''}
          `}
        />
      )}
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;