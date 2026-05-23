export const signupValidation = {
  fullName: {
    required: "Full name is required",
    setValueAs: (v) => v.trim(),
    minLength: {
      value: 3,
      message: "Full name must be at least 3 characters",
    },
    pattern: {
      value: /^[A-Za-z\s]+$/,
      message: "Only letters and spaces are allowed",
    },
  },

  username: {
    required: "Username is required",
    setValueAs: (v) => v.trim(),
    minLength: {
      value: 4,
      message: "Username must be at least 4 characters",
    },
    maxLength: {
      value: 20,
      message: "Username cannot exceed 20 characters",
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Only letters, numbers and underscore allowed",
    },
  },

  email: {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email address",
    },
  },

  password: {
    required: "Password is required",
    getValues: (v) => v.trim(),
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d).+$/,
      message: "Password must contain letters and numbers",
    },
  },

  confirmPassword: (getValues) => ({
    required: "Confirm password is required",
    validate: (value) => {
      value == getValues("password") || "Confirm Passwords do not match";
    },
  }),
};

export const signupField = [
  {
    authLabelContent: "Full Name",
    authLabelStyle: "block text-sm font-medium text-gray-400 mb-2",
    authImgStyle: "text-gray-400 h-4",
    authInputType: "text",
    authInputPlaceholder: "Enter your full name",
    authInputName: "fullName",
    authInputValidation: signupValidation.fullName,
  },
  {
    authLabelContent: "Username",
    authLabelStyle: "block text-sm font-medium text-gray-400 mb-2",
    authImgStyle: "text-gray-400 h-4",
    authInputType: "text",
    authInputPlaceholder: "Enter your username",
    authInputName: "username",
    authInputValidation: signupValidation.username,
  },
  {
    authLabelContent: "Email Address",
    authLabelStyle: "block text-sm font-medium text-gray-400 mb-2",
    authImgSrc: "./e-mail.svg",
    authImgStyle: "text-gray-400 h-4",
    authInputType: "email",
    authInputPlaceholder: "Enter your email",
    authInputName: "email",
    authInputValidation: signupValidation.email,
  },
  {
    authLabelContent: "password",
    authLabelStyle: "block text-sm font-medium text-gray-400 mb-2",
    authImgSrc: "./lock.svg",
    authImgStyle: "text-gray-400 h-4",
    authInputType: "password",
    authInputPlaceholder: "Enter your password",
    authInputName: "password",
    authInputValidation: signupValidation.password,
    isInputPassword: true,
  },
  {
    authLabelContent: "confirmPassword",
    authLabelStyle: "block text-sm font-medium text-gray-400 mb-2",
    authImgSrc: "./lock.svg",
    authImgStyle: "text-gray-400 h-4",
    authInputType: "password",
    authInputPlaceholder: "Enter your confirm password",
    authInputName: "confirmPassword",
    authInputValidation: signupValidation.confirmPassword,
    isInputPassword: true,
  },
];
