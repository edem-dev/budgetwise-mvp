"use client";
import React, {useState} from 'react';

const Input = ({
                   variant = 'default', // 'default', 'aligned', 'noBorder'
                   label = '',
                   value = '',
                   onChange = () => {
                   },
                   type = 'text',
                   name = '',
                   id = '',
                   placeholder = '',
                   disabled = false,
                   error = '',
                   className = '',
               }) => {
    const [isFocused, setIsFocused] = useState(false);

    const hasValue = value && value.length > 0;
    const isLabelFloating = isFocused || hasValue;

    // Base wrapper styles
    const wrapperStyles = "relative w-full mb-6";

    // Variant styles for input
    const variantStyles = {
        default: `w-full px-4 pt-6 pb-2 text-gray-900 bg-white border-2 rounded-lg transition-all duration-300 ease-in-out
                  ${error ? 'border-red-500 focus:border-red-600' : isFocused ? 'border-blue-500' : 'border-gray-300 hover:border-gray-400'}
                  ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'focus:border-blue-500'}
                  outline-none shadow-sm focus:shadow-md`,

        aligned: `w-full px-4 pt-6 pb-2 text-gray-900 bg-transparent border-b-2 border-t-0 border-x-0 transition-all duration-300 ease-in-out
                  ${error ? 'border-red-500 focus:border-red-600' : isFocused ? 'border-blue-500' : 'border-gray-300'}
                  ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'focus:border-blue-500'}
                  outline-none`,

        noBorder: `w-full px-4 pt-6 pb-2 text-gray-900 bg-gray-50 rounded-lg transition-all duration-300 ease-in-out
                   ${error ? 'bg-red-50' : isFocused ? 'bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'}
                   ${disabled ? 'cursor-not-allowed opacity-60' : ''}
                   outline-none border-0`
    };

    // Label styles with animation
    const labelStyles = `absolute left-4 transition-all duration-300 ease-in-out pointer-events-none
                        ${isLabelFloating
        ? 'top-2 text-xs font-medium'
        : 'top-1/2 -translate-y-1/2 text-base'}
                        ${error
        ? 'text-red-500'
        : isFocused
            ? 'text-blue-500'
            : 'text-gray-500'}`;

    return (
        <div className={`${wrapperStyles} ${className}`}>
            <input
                type={type}
                id={id || name}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={disabled}
                placeholder={isLabelFloating ? placeholder : ''}
                className={variantStyles[variant]}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${id || name}-error` : undefined}
            />
            {label && (
                <label
                    htmlFor={id || name}
                    className={labelStyles}
                >
                    {label}
                </label>
            )}
            {error && (
                <p
                    id={`${id || name}-error`}
                    className="mt-1 text-sm text-red-500 animate-fade-in"
                >
                    {error}
                </p>
            )}
        </div>
    );
};

export default Input;
