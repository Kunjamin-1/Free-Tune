import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import { UserContext } from '../context/user/UserContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loader from "./Loader"
import { MusicContext } from '../context/music/MusicContext';

const Login = () => {

    const [tempLoginData, setTempLoginData] = useState({})
    const [showLoginPassword, setShowLoginPassword] = useState(false)
    const [showLoader, setShowLoader] = useState(false)
    const { loginUser } = useContext(UserContext)
    const { musics, getAllMusic } = useContext(MusicContext)
    const navigate = useNavigate()
  
    const location = useLocation()

    useEffect(() => {
    if(location.pathname === "/login") document.querySelector("title").innerText = "FreeTune - Login"
    }, [])

    const loginInputChange = (e) => {
        setTempLoginData({ ...tempLoginData, [e.target.name]: e.target.value })
    }

    const eyeClick = () => {
        setShowLoginPassword(!showLoginPassword)
    }
    const submitLoginDetail = async (e) => {
        e.preventDefault()
        const toastOptions = {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        }

        if (!tempLoginData.password) {
            toast.error('password is required', toastOptions);
            throw new Error("password is required")
        }

        const { email, password } = tempLoginData

        setShowLoader(true)

        const response = await loginUser(
            {
                email: email.trim(),
                password: password.trim()
            }
        )

        
        if (response.success) {
            toast.success(response.message, toastOptions)
            localStorage.setItem("accessToken", response.body.accessToken)
            await getAllMusic()
            setShowLoader(false)
            navigate("/")
        } else {
            toast.error(response.message, toastOptions)
            setShowLoader(false)
        }
    }
    return (
        <div className="bg-gray-900 min-h-full flex items-center justify-center p-12">
            {showLoader && <Loader />}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-purple-600 to-blue-600 rounded-full mb-4">
                        <img src="music.svg" className='h-6' alt="music" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">FreeTune</h1>
                    <p className="text-gray-400">Your music, your way</p>
                </div>

                <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-8">
                        <form method='post' onSubmit={submitLoginDetail} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <img src='e-mail.svg' alt='e-mail' className=" text-gray-400 h-4" />
                                    </div>
                                    <input
                                        onChange={loginInputChange}
                                        type="email"
                                        required
                                        placeholder="Enter your email"
                                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none"
                                        name="email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <img src='lock.svg' alt='lock' className="h-4" />
                                    </div>
                                    <input
                                        onChange={loginInputChange}
                                        type={showLoginPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-purple-500 outline-none "
                                        name='password'
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        <img onClick={eyeClick} src={`${showLoginPassword ? "eye" : "eye-slash"}.svg`} alt={showLoginPassword ? "eye" : "eye-slash"} className="h-4 cursor-pointer" />
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center items-center cursor-pointer py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all"
                            >
                                <img src='sigin.svg' alt='sigin' className="h-4 mr-2" /> Sign In
                            </button>
                        </form>
                    </div>

                </div>
                <div className="mt-6 tex-xs text-center">
                    <p className="text-gray-400">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-purple-400 hover:text-white font-medium">
                            Signup
                        </Link>
                    </p>
                </div>
                <div className="text-center mt-8 text-gray-400 ">
                    © 2025 StreamTunes. All rights reserved.
                </div>
            </div>
        </div >

    )
}

export default Login
