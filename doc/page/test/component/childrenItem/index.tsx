import { FC, memo, useCallback, useRef, useState } from "react";
import style from "../style.module.scss";
import { Button } from "antd";
import { useWhyDidYouUpdate } from "ahooks";
import useUpdateFun from "@src/useUpdateFun";
import useInitProxyUpdate from "@src/useInitProxyUpdate";
import { uniqueId } from "lodash";

interface IProps {
  item: any;
  level?: number;
}

const ChildrenItem: FC<IProps> = ({ item, level = 1 }: IProps) => {
  console.log("kjsahdkjsahdksadsad", item, level);

  useWhyDidYouUpdate("子的影响", { item, level });
  console.log(item.label + "   " + level, item);
  const { set } = useInitProxyUpdate();
  if (level <= 2) {
    // useInitProxyUpdate(item, update, id.current);
    set(item);
  }

  const handleclick = useCallback(() => {
    item.label = item.label + "s";
  }, []);

  const [count, setCount] = useState({});

  return (
    <div
      className={`flex-center ${style[`color-${level}`]}`}
      style={
        level === 1
          ? {
              minWidth: "500px",
              height: "300px",
              whiteSpace: "nowrap",
              marginBottom: "10px",
            }
          : {
              width: `calc(100% - ${level} * 50px)`,
              height: `calc(100% / ${level})`,
            }
      }
    >
      {item.label}
      <Button onClick={handleclick}>按钮</Button>
      <Button onClick={() => setCount({})}>刷新</Button>
      {item.children && (
        <ChildrenItem item={item.children[0]} level={level + 1} />
      )}
    </div>
  );
};

export default ChildrenItem;
