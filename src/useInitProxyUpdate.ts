import { useCallback, useEffect, useRef } from "react";
import useUpdateFun from "./useUpdateFun";
import { uniqueId } from "lodash";

export const proxyUpdateMap = new WeakMap();

function useInitProxyUpdate() {
  const id = useRef(uniqueId("updateKey_"));
  const update = useUpdateFun();
  const setList = useRef<any>([]);

  useEffect(() => {
    return () => {
      setList.current.forEach((item: any) => {
        const map = proxyUpdateMap.get(item);
        if (map) {
          map.delete(id.current);
          if (map.size === 0) {
            proxyUpdateMap.delete(item);
          }
        }
      });
    };
  }, []);

  const set = useCallback((proxy) => {
    setList.current.push(proxy);
    if (!proxyUpdateMap.has(proxy)) {
      const map = new Map();
      map.set(id.current, update);
      proxyUpdateMap.set(proxy, map);
    } else {
      proxyUpdateMap.get(proxy)?.set(id.current, update);
    }
  }, []);

  return { set };
}

export default useInitProxyUpdate;
