import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import { UserContext } from "../../../context/user/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loader from "../../Loader";
import { MusicContext } from "../../../context/music/MusicContext";
import Button from "../../ui/Button";
import { loginFields } from "../../../features/input-validation/login";
import AuthInput from "../../ui/AuthInput";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../../features/auth/authThunk";

const Login = () => {
  const [tempLoginData, setTempLoginData] = useState({});
  const [showLoader, setShowLoader] = useState(false);

  const { loginUser} = useContext(UserContext);
  const { musics, getAllMusic } = useContext(MusicContext);

  const navigate = useNavigate();

  const location = useLocation();

  const method = useForm();

  const {loading} = useSelector((state)=>state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (location.pathname === "/login")
      document.querySelector("title").innerText = "FreeTune - Login";
  }, []);

  const loginInputChange = (e) => {
    setTempLoginData({ ...tempLoginData, [e.target.name]: e.target.value });
  };

  const submitLoginDetail = async (data) => {

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
    console.log(loading.loginUser)

    const response = await dispatch(loginUserThunk({
      email: data.email,
      password: data.password,
    })).unwrap();

    console.log(loading.loginUser)
    if (response.success) {
      localStorage.setItem("accessToken", response.body.accessToken);
      setShowLoader(false);
      toast.success(response.message, toastOptions);
      navigate("/");
    } else {
      toast.error(response.message, toastOptions);
      setShowLoader(false);
    }
  };


  return (
    <FormProvider {...method}>
      <div className="bg-gray-900 min-h-full flex items-center justify-center p-12">
        {loading.loginUser && <Loader />}
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
              <img src="music.svg" className="h-6" alt="music" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">FreeTune</h1>
            <p className="text-gray-400">Your music, your way</p>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <form
                
                method="post"
                onSubmit={method.handleSubmit(submitLoginDetail)}
                className="space-y-6"
              >
                {loginFields.map((field) => {
                  return (
                    <AuthInput
                      key={field?.authLabelContent}
                      authLabelContent={field?.authLabelContent}
                      authLabelStyle={field?.authLabelStyle}
                      authImgSrc={field?.authImgSrc}
                      authImgStyle={field?.authImgStyle}
                      authInputPlaceholder={field?.authInputPlaceholder}
                      authInputName={field?.authInputName}
                      authInputValidation={field.authInputName !== "confirmPassword"? field?.authInputValidation:field?.authInputValidation(method.getValues)}
                      authInputType={field?.authInputType}
                      authEyeImageSrc={field?.authEyeImageSrc}
                      isInputPassword={field?.isInputPassword}
                    />
                  );
                })}

                <Button
                  type="submit"
                  buttonStyle="w-full py-3 mt-6 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all"
                  svgSrc={"/signin.svg"}
                  svgAlt={"signin"}
                  svgStyle={"mr-2"}
                >
                  Sign In
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-6 tex-xs text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-400 hover:text-white font-medium"
              >
                Signup
              </Link>
            </p>
          </div>
          <div className="text-center mt-8 text-gray-400 ">
            © 2025 StreamTunes. All rights reserved.
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Login;
