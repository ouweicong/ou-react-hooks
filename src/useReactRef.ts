import { cloneDeep } from "lodash";
import useProxyObject from "./useProxyObject";

interface IRef<T> {
  value: T;
}

export function useReactRef<T>(value: T) {
  const defaultValue = value;
  const [proxy, update] = useProxyObject<IRef<T>, "ref">(value, "ref");

  function reset() {
    proxy.value = cloneDeep(defaultValue);
    update();
  }
  return {
    value: proxy,
    reset,
  };
}

export default useReactRef;
