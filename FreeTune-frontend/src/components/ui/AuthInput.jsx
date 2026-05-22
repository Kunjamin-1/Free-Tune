import { useState } from "react";
import { useFormContext } from "react-hook-form";

const AuthInput = ({
  authLabelContent,
  authLabelStyle = "",
  authImgSrc = "",
  authImgStyle = "",
  authEyeImageStyle = "",
  authInputType = "text",
  authInputPlaceholder,
  authInputStyle = "",
  authInputName,
  authInputValidation,
  isInputPassword = false,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  return (
   <div className="slide-in mb-4">
  {authLabelContent && (
    <label className={authLabelStyle}>
      {authLabelContent}
    </label>
  )}

  <div className="relative group">

    {/* Left Icon */}
    {authImgSrc && (
      <div className="absolute inset-y-0 left-0 pl-3 z-10 flex items-center pointer-events-none">
        <img
          src={authImgSrc}
          alt={authImgSrc.split(".")[0]}
          className={`${authImgStyle} h-4 w-4 transition-transform duration-300 group-focus-within:scale-110`}
        />
      </div>
    )}

    {/* Input */}
    <input
      type={!showPassword && isInputPassword ? "password" : "text"}
      placeholder={authInputPlaceholder}
      name={authInputName}
      {...register(authInputName, authInputValidation)}
      className={`w-full pl-10 ${
        isInputPassword ? "pr-10" : "pr-4"
      } py-3 bg-linear-to-r from-gray-700 to-gray-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-400 focus:border-purple-500 ${authInputStyle}`}
    />

    {/* Eye Icon */}
    {isInputPassword && (
      <div className="absolute inset-y-0 right-0 pr-3 z-10 flex items-center">
        <img
          onClick={() => setShowPassword(!showPassword)}
          src={!showPassword ? "./eye-slash.svg" : "./eye.svg"}
          alt={!showPassword ? "eye-slash" : "eye"}
          className={`h-4 w-4 cursor-pointer transition-transform duration-300 hover:scale-110 ${authEyeImageStyle}`}
        />
      </div>
    )}
  </div>

  {/* Error Message */}
  {errors[authInputName] && (
    <p className="text-red-500 mt-2 text-xs">
      {errors[authInputName]?.message || "This field is required"}
    </p>
  )}
</div>
  );
};

export default AuthInput;
