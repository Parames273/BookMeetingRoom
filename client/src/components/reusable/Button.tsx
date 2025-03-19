import React from 'react';
import { ButtonProps } from '../../typings';

/**
 * Button reusable component
 * 
 * @component
 * @returns {JSX.Element} The rendered button.
 */
const Button: React.FC<ButtonProps> = ({
    label,
    onClick,
    className,
    type = "button",
    disableDefaultClasses = false,
    disabled = false
}) => {

    const defaultClasses = "w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75";
    const combinedClasses = disableDefaultClasses ? className : `${defaultClasses} ${className}`;

    return (
        <button
            onClick={onClick}
            type={type}
            className={combinedClasses}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;