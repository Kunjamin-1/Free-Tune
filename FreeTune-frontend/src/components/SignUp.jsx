import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import { UserContext } from "../context/user/UserContext";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Loader from "./Loader";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [tempSignUpData, setTempSignUpData] = useState({})

    const [showLoader, setShowLoader] = useState(false)

    const {registerUser} = useContext(UserContext)

    const navigate = useNavigate()

    const location = useLocation()

    useEffect(() => {
    if(location.pathname === "/signup") document.querySelector("title").innerText = "FreeTune - SignUp"
    }, [])
    

    const enteredInputDetail = (e) => {
        setTempSignUpData({ ...tempSignUpData, [e.target.id]: e.target.value })
    }
    const showPasswordClick = () => {
        setShowPassword(!showPassword)
    }
    const showConfirmPasswordClick = () => {
        setShowConfirmPassword(!showConfirmPassword)
     
    }

    const submitSignUpDetails = async (e) => {
        e.preventDefault()

        const formData = {}

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

        if (!tempSignUpData.fullName) {
            toast.error('full name is required', toastOptions);
            throw new Error("full name is required")
        } else {
            formData.fullName = (tempSignUpData.fullName).trim()
        }

        if (!/^[A-Za-z\s]+$/.test(tempSignUpData.fullName)) {
            toast.error('only alphabets are allowed in full name', toastOptions);
            throw new Error("only alphabets are allowed in full name")
        }

        if (!tempSignUpData.username) {
            toast.error('username is required', toastOptions);
            throw new Error("username is required")
        } else {
            formData.username = (tempSignUpData.username).trim()
        }

        if (tempSignUpData.email) {
          formData.email = (tempSignUpData.email).trim()
        }

        if (!tempSignUpData.password) {
            toast.error('password is required', toastOptions);
            throw new Error("password is required")
        } else {
           formData.password = (tempSignUpData.password).trim()
        }

        if (!tempSignUpData.confirmPassword) {
            toast.error('confirm password is required', toastOptions);
            throw new Error("confirm password is required")
        }

        if (tempSignUpData.password !== tempSignUpData.confirmPassword) {
            toast.error('confirm password did not match', toastOptions);
            throw new Error("confirm password did not match")
        }
        
        setShowLoader(true)
        const response = await registerUser(formData)
        setShowLoader(false)
   
        if(response.success){
            navigate("/login")
            setTempSignUpData({})
        }
    }

    return (

        <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
            {showLoader && <Loader/>}
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
                      <img src="music.svg" alt="music" className="h-6" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Join FreeTune</h1>
                    <p className="text-gray-400">
                        Create your account and discover amazing music </p> </div>


                <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
                    <form method="post" onSubmit={submitSignUpDetails} className="space-y-6">
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-white mb-2"
                            >
                                Full Name
                            </label>
                            <input
                                onChange={enteredInputDetail}
                                type="text"
                                id="fullName"
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                placeholder="Enter your full name"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-white mb-2"
                            >
                                Username
                            </label>
                            <input
                                onChange={enteredInputDetail}
                                type="text"
                                id="username"
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                placeholder="Choose a unique username"
                            />
                        </div>


                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-white mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                onChange={enteredInputDetail}
                                type="email"
                                id="email"
                                required
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-white mb-2"
                            >
                                Password
                            </label>
                            <input
                                onChange={enteredInputDetail}
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                placeholder="Create a strong password"
                            />
                            <img onClick={showPasswordClick} src={`${showPassword ? "eye" : "eye-slash"}.svg`} alt={showPassword ? "eye" : "eye-slash"} className="absolute right-3 h-4 cursor-pointer top-11" />
                        </div>


                        <div className="relative">
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium text-white mb-2"
                            >
                                Confirm Password
                            </label>
                            <input
                                onChange={enteredInputDetail}
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                placeholder="Confirm your password"
                            />
                            <img onClick={showConfirmPasswordClick} src={`${showConfirmPassword ? "eye" : "eye-slash"}.svg`} alt={showConfirmPassword ? "eye" : "eye-slash"} className="absolute right-3 h-4 cursor-pointer top-11" />
                        </div>


                        <button
                            type="submit"
                            className="w-full cursor-pointer bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all transform hover:scale-[1.02]"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Already have an account?{" "}
                            <Link to="/login" className="text-purple-400 hover:text-white font-medium">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SignUp;
