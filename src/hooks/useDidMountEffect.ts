import { useEffect, useRef } from "react";

const useDidMountEffect = (func: any, deps: boolean[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
