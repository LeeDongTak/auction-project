import React, { useRef, useState } from "react";

type returnTypes<T> = [
  string,
  React.RefObject<T>,
  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  React.Dispatch<React.SetStateAction<string>>,
];

const useFormInput = <T>(initialState: string = ""): returnTypes<T> => {
  const [state, setState] = useState<string>(initialState);

  const forwardRef = useRef<T>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState(e.target.value);
  };
  return [state, forwardRef, handleChange, setState];
};

export default useFormInput;
