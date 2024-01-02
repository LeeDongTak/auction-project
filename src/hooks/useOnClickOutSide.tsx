import React, { useEffect } from "react";

interface Props {
  ref: React.RefObject<HTMLInputElement>;
  handler: () => void;
}

const useOnClickOutSide = ({ ref, handler }: Props) => {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      // 모달 밖 클릭 시
      // ref.current 영역을 클릭하지 않았거나 ref.current (모달 영역)을 포함하고 있는 경우
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }

      // 모달 밖 클릭 시
      handler();
    };

    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutSide;
