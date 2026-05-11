import React from "react";

const Button = ({
    type,
    svgSrc,
    children,
    svgAlt,
    buttonStyle,
    buttonFunction,
    svgStyle
}) => {
  return (
    <button
      type={type}
      onClick={buttonFunction}
      className={`flex justify-center items-center cursor-pointer ${buttonStyle}`}
    >
      <img src={svgSrc} alt={svgAlt} className={`h-4 ${svgStyle}`} /> 
      {
        children
    }
    </button>
  );
};

export default Button;
