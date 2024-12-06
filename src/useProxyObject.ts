import { isPlainObject } from "lodash";
import { useMemo } from "react";
import useUpdateFun from "./useUpdateFun";

type UseType = "ref" | "reactive";
export function useProxyObject<T, K extends UseType>(value: T, type: K) {
  // k:v 原对象:代理过的对象
  const proxyMap = useMemo(() => new WeakMap(), []);
  // k:v 代理过的对象:原对象
  const rawMap = useMemo(() => new WeakMap(), []);

  const update = useUpdateFun();
  const ref = useMemo(() => {
    return observer(
      type === "ref" ? { value } : value,
      update,
      proxyMap,
      rawMap
    );
  }, []);

  return [ref, update] as [typeof ref, typeof update];
}

function observer(
  initialVal: any,
  cb: () => void,
  proxyMap: WeakMap<object, unknown>,
  rawMap: WeakMap<object, unknown>
) {
  const existingProxy = proxyMap.get(initialVal);
  // 添加缓存 防止重新构建proxy
  if (existingProxy) {
    return existingProxy;
  }
  // 防止代理已经代理过的对象
  if (rawMap.has(initialVal)) {
    return initialVal;
  }
  const proxy = new Proxy(initialVal, {
    get: function (target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      const descriptor = Reflect.getOwnPropertyDescriptor(target, key);
      if (
        !(descriptor === null || descriptor === void 0
          ? void 0
          : descriptor.configurable) &&
        !(descriptor === null || descriptor === void 0
          ? void 0
          : descriptor.writable)
      ) {
        return res;
      }
      return isPlainObject(res) || Array.isArray(res)
        ? observer(res, cb, proxyMap, rawMap)
        : res;
    },
    set: function (target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
    deleteProperty: function (target, key) {
      const ret = Reflect.deleteProperty(target, key);
      cb();
      return ret;
    },
  });
  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);
  return proxy;
}

export default useProxyObject;
