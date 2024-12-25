import { FC, useState } from "react";
import style from "../style.module.scss";
import ChildrenItem from "../childrenItem";

interface IProps {
  data?: any[];
}

const ParentItem: FC<IProps> = ({ data }: IProps) => {
  console.log(data);
  const [count, setCount] = useState(1);

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }}>
        <div onClick={() => setCount(count + 1)}>++++++</div>
        <div onClick={() => setCount(count - 1)}>------</div>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        {new Array(count).fill("").map((val) => {
          return (
            <div>
              {data &&
                data.map((item: any, index: number) => (
                  <ChildrenItem key={index} item={item} />
                ))}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ParentItem;
