import { FC } from "react";
import style from "../style.module.scss";
import ChildrenItem from "../childrenItem";

interface IProps {
  data?: any[];
}

const ParentItem: FC<IProps> = ({ data }: IProps) => {
  console.log(data);

  return (
    <>
      {data &&
        data.map((item: any, index: number) => (
          <ChildrenItem key={index} item={item} />
        ))}
    </>
  );
};

export default ParentItem;
