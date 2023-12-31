import React, { useRef, useState } from "react";

type returnTypes<T> = [
  string,
  React.RefObject<T>,
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
];

const useFormInput = <T>(): returnTypes<T> => {
  const [state, setState] = useState<string>("");

  const forwardRef = useRef<T>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState(e.target.value);
  };
  return [state, forwardRef, handleChange];
};

export default useFormInput;
