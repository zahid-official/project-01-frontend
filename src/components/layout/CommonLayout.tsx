import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface IProps {
  children: ReactNode;
}
const CommonLayout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* navbar */}
      <nav className="px-4 md:px-6 max-w-7xl w-full container mx-auto">
        <Navbar />
      </nav>

      {/* main */}
      <main className="grow-1 px-4 md:px-6 max-w-7xl w-full container mx-auto">
        {children}
      </main>

      {/* footer */}
      <footer className="px-4 md:px-6 max-w-7xl w-full container mx-auto">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default CommonLayout;
