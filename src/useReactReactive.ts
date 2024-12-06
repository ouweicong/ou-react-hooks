import { cloneDeep, isPlainObject } from "lodash";
import useProxyObject from "./useProxyObject";

export function useReactReactive<T extends Record<string, unknown>>(value: T) {
  const defaultValue = value;
  if (!isPlainObject(defaultValue)) {
    throw new Error("useReactReactive value must be an object");
  }
  const [proxy, update] = useProxyObject<T, "reactive">(value, "reactive");

  function reset() {
    Object.keys(proxy).forEach((key) => delete proxy[key]);
    Object.assign(proxy, cloneDeep(defaultValue));
    update();
  }
  return {
    value: proxy,
    reset,
  };
}

export default useReactReactive;
