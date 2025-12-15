import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Sidebar = ({ display, closeSideBar }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const navigateToProfile = () => {
        if (localStorage.getItem("accessToken")) {
            navigate("/user-profile")
        }
        closeSideBar()
    }

    return (
        <div
            className={`${display ? 'block' : 'hidden'} sm:hidden absolute right-0 top-17 z-20 bg-gray-800 max-h-max  text-white border-l border-gray-700 transition-all duration-300 ease-in-out`}
        >
            <nav className="flex flex-col gap-4 mt-6 px-6">
                <Link
                    to="/"
                    onClick={() => closeSideBar()}
                    className={`${location.pathname === '/' ? 'text-purple-400' : 'text-gray-400'
                        } font-medium hover:text-white transition-colors`}
                >
                    Home
                </Link>

                <Link
                    to="/library"
                    onClick={() => closeSideBar()}
                    className={`${location.pathname === '/library' ? 'text-purple-400' : 'text-gray-400'
                        } font-medium hover:text-white transition-colors`}
                >
                    Library
                </Link>

                <Link
                    to="/upload"
                    onClick={() => closeSideBar()}
                    className={`${location.pathname === '/upload' ? 'text-purple-400' : 'text-gray-400'
                        } font-medium hover:text-white transition-colors`}
                >
                    Upload
                </Link>

                <Link
                    to="/recived-song"
                    onClick={() => closeSideBar()}
                    className={`${location.pathname === '/recived-song' ? 'text-purple-400' : 'text-gray-400'
                        } font-medium hover:text-white transition-colors`}
                >
                    Received Song
                </Link>
            </nav>

            <div className="flex justify-center mt-10 mb-6">
                <div
                    onClick={navigateToProfile}
                    className="cursor-pointer bg-gray-700 hover:bg-gray-600 rounded-full p-2 flex items-center justify-center transition">
                    <img src="user.svg" alt="user" className="w-8 h-8" />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
