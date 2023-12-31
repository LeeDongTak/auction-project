import React, { useState } from "react";

type returnType = [
  boolean,
  () => void,
  React.Dispatch<React.SetStateAction<boolean>>,
];
const useIsUpdateState = (): returnType => {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const handleIsUpdate = () => {
    setIsUpdate(!isUpdate);
  };

  return [isUpdate, handleIsUpdate, setIsUpdate];
};

export default useIsUpdateState;
