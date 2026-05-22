export const loginValidation = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Enter valid email",
    },
  },

  password: {
    required: "Password is required",
  },

  confirmPassword: (getValues) => ({
    required: "confirm password is required",
    validate: (value) => {
      return value === getValues("password") || "confirm password do not match";
    },
  }),
};

// const [showPassword, setShowPassword] = useState(false);
// const [showConfirmPassword, setShowConfirmPassword] = useState(false);

export const loginFields = [
  {
    authLabelContent: "Email Address",
    authLabelStyle: "block text-sm font-medium text-gray-400 mb-2",
    authImgSrc: "./e-mail.svg",
    authImgStyle: "text-gray-400 h-4",
    authInputType: "email",
    authInputPlaceholder: "Enter your email",
    authInputName: "email",
    authInputValidation: loginValidation.email,
  },
  {
    authLabelContent: "Password",
    authLabelStyle: "block text-sm font-medium text-gray-400 mb-2",
    authImgSrc: "./lock.svg",
    authImgStyle: "text-gray-400 h-4",
    authInputType: "password",
    authInputPlaceholder: "Enter your password",
    authInputName: "password",
    authInputValidation: loginValidation.password,
    // authEyeToggleFunc: () => setShowPassword(!showPassword),
    isInputPassword : true
  },
  {
    authLabelContent: "Confirm Password",
    authLabelStyle: "block text-sm font-medium text-gray-400 mb-2",
    authImgSrc: "./lock.svg",
    authImgStyle: "text-gray-400 h-4",
    authInputType: "password",
    authInputPlaceholder: "confirm your password",
    authInputName: "confirmPassword",
    authInputValidation: (getValues) => loginValidation.confirmPassword(getValues),
    // authEyeToggleFunc: () => setShowConfirmPassword(!showConfirmPassword),
    isInputPassword : true
  },
];
