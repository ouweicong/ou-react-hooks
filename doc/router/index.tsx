import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import UseUpdateFun from "../page/useUpdateFun/index";
import Test from "@/page/test";

interface R {
  label?: string;
  children?: (RouteObject & R)[];
}

export const routerOptions: (RouteObject & R)[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        label: "小测试专用",
        path: "/test",
        element: <Test />,
      },
      {
        label: "useUpdateFun",
        path: "/useUpdateFun",
        element: <UseUpdateFun />,
      },
    ],
  },
];

const routers = createBrowserRouter(routerOptions);

export default <RouterProvider router={routers} />;
