// type 설정
import React, { createContext } from "react";

interface DetailContext {}
// 초기값 설정
const initialState: DetailContext = {};

// context 생성
export const AuctionDetailContext = createContext(initialState);

// provider 생성
const AuctionDetailProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // auction data state 가질것.

  const value = {};
  return (
    <AuctionDetailContext.Provider value={value}>
      {children}
    </AuctionDetailContext.Provider>
  );
};

export default AuctionDetailProvider;
