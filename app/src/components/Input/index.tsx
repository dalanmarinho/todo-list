import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  text?: string;
}

export const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ text, ...rest }, ref) => {
  return (
    <>
      {text?<label className="block text-base font-bold">{text}</label>:null}
      <input className="font-Inter bg-custom-gray-500 text-custom-gray-300 p-3 rounded-md font-small text-sm outline-none w-full border border-custom-gray-700 ring-custom-purple focus-within:ring-2" 
        {...rest} ref={ref as React.RefObject<HTMLInputElement>} />
    </>
  );
};

export default forwardRef(Input);