import { FC, useMemo, useRef, useState } from "react";
import { cloneDeep } from "lodash";
import { routerOptions } from "@/router";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {}

const Menua: FC<IProps> = ({}: IProps) => {
  const menus = useMemo(() => {
    const res = cloneDeep(routerOptions[0].children)?.map((item: any) => {
      item.key = item.path;
      return item;
    });
    return res;
  }, []);
  const location = useLocation();
  const current = useMemo(() => location.pathname, [location]);
  const goto = useNavigate();

  const onClick = (e) => {
    console.log("click ", e.item.props.path, current);
    goto(e.item.props.path);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={menus}
      />
    </>
  );
};

export default Menua;
