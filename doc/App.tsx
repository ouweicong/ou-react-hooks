import { Outlet } from "react-router-dom";
import Menu from "./component/menu";

const App = () => {
  return (
    <div
      className="flex-col"
      style={{ height: "100vh", width: "100%", overflow: "auto" }}
    >
      <Menu />
      <div style={{ flex: "1", flexShrink: "0" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
