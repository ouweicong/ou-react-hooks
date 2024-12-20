import { FC, useCallback } from "react";
import style from "../style.module.scss";
import { Button } from "antd";
import { useWhyDidYouUpdate } from "ahooks";
import useUpdateFun from "@src/useUpdateFun";

interface IProps {
  item: any;
  level?: number;
}

const ChildrenItem: FC<IProps> = ({ item, level = 1 }: IProps) => {
  useWhyDidYouUpdate("子的影响", { item, level });
  console.log(item.label + "   " + level, item);
  const update = useUpdateFun();
  item.__update = update;

  const handleclick = useCallback(() => {
    item.label = item.label + "s";
  }, []);

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
          : { width: "70%", height: "70%" }
      }
    >
      {item.label}
      <Button onClick={handleclick}>按钮</Button>
      {item.children &&
        item.children.map((item2: any, index: number) => (
          <ChildrenItem key={index} item={item2} level={level + 1} />
        ))}
    </div>
  );
};

export default ChildrenItem;
