import React from 'react';

const CustomSelect = ({ label, options, name, value, onChange, required = false }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={typeof option === 'boolean' ? option.toString() : option}>
            {typeof option === 'boolean' ? (option ? 'Yes' : 'No') : option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
