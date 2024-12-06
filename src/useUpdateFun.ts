import { useState } from "react";

export function useUpdateFun(): () => void {
  const [, set] = useState({});
  return () => {
    set({});
  };
}

export default useUpdateFun;
