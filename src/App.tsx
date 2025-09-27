import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";

const App = () => {
  return (
    <div>
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </div>
  );
};

export default App;
