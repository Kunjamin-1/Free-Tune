import { useForm } from "react-hook-form";

const AuthInput = ({
  authLabelContent,
  authLabelStyle = "",
  authImgSrc = "",
  authImgStyle = "",
  authEyeImageSrc = "./eye-slash.svg",
  authEyeImageStyle = "",
  authEyeToggleFunc,
  authInputType = "text",
  authInputPlaceholder,
  authInputStyle = "",
  authInputName,
  authInputValidation
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div class="slide-in">
      {authLabelContent && (
        <label className={authLabelStyle}>{authLabelContent}</label>
      )}

      <div class="relative group">
        <div class="absolute inset-0 bg-linear-to-r from-purple-600/20 to-blue-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 gradient-shift"></div>

        {authImgSrc && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <img
              src={authImgSrc}
              alt={authImgSrc.split(".")[0]}
              className={`${authImgStyle} h-4`}
            />
          </div>
        )}
        <input
          type={authInputType}
          placeholder={authInputPlaceholder}
          name={authInputName}
          {...register(authInputName, authInputValidation)}

          class="w-full px-4 py-3 bg-linear-to-r from-gray-700 to-gray-600 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-400 focus:scale-[1.02] relative z-10"
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <img
            onClick={authEyeToggleFunc}
            src={authEyeImageSrc}
            alt={authEyeImageSrc.split(".")[0]}
            className={`h-4 cursor-pointer ${authEyeImageStyle}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthInput;
