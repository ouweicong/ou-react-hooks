import { FC, useEffect } from "react";
import style from "./style.scss";
import useReactReactive from "@src/useReactReactive";
import ParentItem from "./component/parentItem";
import { proxyUpdateMap } from "@src/useInitProxyUpdate";

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

  useEffect(() => {
    console.log("salkdjsalkdjlsakdsad");
  }, [dataList]);
  return (
    <div style={{ padding: "10px" }}>
      <div onClick={() => console.log(dataList.res, proxyUpdateMap)}>show</div>
      <div
        onClick={() =>
          (dataList.res[1].children[1].label = new Date().getTime())
        }
      >
        change
      </div>
      <ParentItem data={dataList.res} />
    </div>
  );
};

export default Test;
