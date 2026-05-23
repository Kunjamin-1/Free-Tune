import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import { UserContext } from "../../../context/user/UserContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../../Loader";
import { signupField } from "../../../features/input-validation/signup";
import AuthInput from "../../ui/AuthInput";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../../features/auth/authThunk";

const SignUp = () => {
  const { registerUser } = useContext(UserContext);

  const navigate = useNavigate();

  const location = useLocation();

  const method = useForm();

  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

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
  };

  const enteredInputDetail = (e) => {
    setTempSignUpData({ ...tempSignUpData, [e.target.id]: e.target.value });
  };
  const showPasswordClick = () => {
    setShowPassword(!showPassword);
  };
  const showConfirmPasswordClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onError = (error) => {
    for (const err in error) {
      toast.error(error[err].message, toastOptions);
    }
  };

  const submitSignUpDetails = async (data) => {
    const { success, message } = await dispatch(
      registerUserThunk(data),
    ).unwrap();
    
    if (success) {
      toast.success(message, toastOptions);
      navigate("/login");
    } else {
      toast.error(message, toastOptions);
    }
  };

  useEffect(() => {
    if (location.pathname === "/signup")
      document.querySelector("title").innerText = "FreeTune - SignUp";
  }, []);

  return (
    <FormProvider {...method}>
      <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
        {loading.registerUser && <Loader />}
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
              Join FreeTune
            </h1>
            <p className="text-gray-400">
              Create your account and discover amazing music{" "}
            </p>{" "}
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <form
              method="post"
              onSubmit={method?.handleSubmit(submitSignUpDetails, onError)}
              className="space-y-6"
            >
              {signupField.map((field) => {
                return (
                  <AuthInput
                    key={field?.authInputName}
                    authLabelContent={field?.authLabelContent}
                    authLabelStyle={field?.authLabelStyle}
                    authImgSrc={field?.authImgSrc}
                    authImgStyle={field?.authImgStyle}
                    authEyeImageStyle={field?.authEyeImageStyle}
                    authInputType={field?.authInputType}
                    authInputPlaceholder={field?.authInputPlaceholder}
                    authInputName={field?.authInputName}
                    authInputValidation={
                      field?.authInputName === "confirmPassword"
                        ? field?.authInputValidation(method?.getValues)
                        : field?.authInputValidation
                    }
                    isInputPassword={field?.isInputPassword}
                  />
                );
              })}

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
                <Link
                  to="/login"
                  className="text-purple-400 hover:text-white font-medium"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default SignUp;
