import { FC } from "react";
import style from "./style.scss";
import useReactReactive from "@src/useReactReactive";
import ParentItem from "./component/parentItem";

interface IProps {}

const Test: FC<IProps> = ({}: IProps) => {
  const { value: dataList } = useReactReactive({
    res: [
      {
        label: "我是父1",
        children: [
          {
            label: "我是子1-1",
          },
        ],
      },
      {
        label: "我是父2",
        children: [
          {
            label: "我是子2-1",
            children: [
              {
                label: "我是子2-1-1",
              },
            ],
          },
          {
            label: "我是子2-2",
          },
        ],
      },
    ],
  });
  return (
    <div style={{ padding: "10px" }}>
      <ParentItem data={dataList.res} />
    </div>
  );
};

export default Test;
