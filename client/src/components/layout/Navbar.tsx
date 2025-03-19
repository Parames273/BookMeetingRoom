import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { FaUser } from 'react-icons/fa';

/**
 * Navbar component for user navigations.
 * 
 * @component
 * @returns {JSX.Element} The rendered navigations component.
 */
const Navbar: React.FC = () => {
    const {user} = useSelector((state: RootState) => state.auth.userInfo);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('persist:root');
        navigate('/');
    };


    return (
        <nav className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="sm:hidden flex items-center px-3 py-2 rounded text-white hover:text-gray-300"
                >
                    <svg
                        className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                    <svg
                        className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                    </svg>
                </button>
                <Link className="white text-bold ml-4" to='/dashboard'>Health Care</Link>
            </div>
            <div className={`flex flex-col sm:flex-row items-center w-full sm:w-auto ${isOpen ? "block" : "hidden"} sm:block`}>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center hover:text-gray-300"
                        >
                            <FaUser className="text-xl mr-2" />
                            <span>{user?.userName || ""}</span>
                            <svg
                                className={`fill-current h-4 w-4 ml-1 transition-transform ${profileOpen ? "rotate-180" : "rotate-0"}`}
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414L10 12.414l-4.707-4.707a1 1 0 010-1.414z" />
                            </svg>
                        </button>
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
                                <button
                                    onClick={handleLogOut}
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;