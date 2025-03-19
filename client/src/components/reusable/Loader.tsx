import React from 'react';

/**
 * @returns Common loader with Loading message when components are yet to be rendered
 */
const Loader: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
            <div className="animate-spin">
                <svg data-testid="loader-svg" width="50" height="50" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" stroke="#3498db" strokeLinecap="round" />
                </svg>
            </div>
        </div>
    );
};

export default Loader;