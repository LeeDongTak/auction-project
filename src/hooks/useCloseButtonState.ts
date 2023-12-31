import React, { useState } from "react";

type ReturnType = [boolean, (e: React.MouseEvent<HTMLElement>) => void];
const useCloseButtonState = (): ReturnType => {
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const OnClickCloseButtonHandler = (e: React.MouseEvent<HTMLElement>) => {
    setIsPopup(!isPopup);
  };

  return [isPopup, OnClickCloseButtonHandler];
};

export default useCloseButtonState;
