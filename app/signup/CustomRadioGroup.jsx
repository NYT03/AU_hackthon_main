import React from 'react';

const CustomRadioGroup = ({ label, options, name, value, onChange, required = false }) => {
  return (
    <div className="mb-6">
      <label className="block text-base font-medium text-gray-800 mb-3">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-3 pl-1">
        {options.map((option, index) => (
          <label key={index} className="flex items-start cursor-pointer group">
            <div className="flex items-center h-5">
              <input
                type="radio"
                name={name}
                value={typeof option === 'boolean' ? option.toString() : option}
                checked={value === option || value === option.toString()}
                onChange={onChange}
                className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                required={required}
              />
            </div>
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
              {typeof option === 'boolean' ? (option ? 'Yes' : 'No') : option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CustomRadioGroup;
