export function createResizeObserver(
  targetNode: Element,
  cb: ResizeObserverCallback
) {
  // console.log('是否能使用ResizeObserver', 'ResizeObserver' in window);
  if (!targetNode || !("ResizeObserver" in window)) return;
  const resizeObserver = new ResizeObserver(cb);
  console.log("asdasdasdasdasd", targetNode);
  resizeObserver.observe(targetNode);
  return resizeObserver;
}

export default createResizeObserver;
