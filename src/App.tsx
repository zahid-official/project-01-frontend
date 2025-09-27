import { Outlet } from "react-router";
import CommonLayout from "./components/layout/CommonLayout";

const App = () => {
  return (
    <div>
      <CommonLayout>
        <main className="px-4 md:px-6 max-w-7xl w-full container mx-auto min-h-[50vh]">
          <Outlet />
        </main>
      </CommonLayout>
    </div>
  );
};

export default App;
