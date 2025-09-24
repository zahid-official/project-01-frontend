import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface IProps {
  children: ReactNode;
}
const CommonLayout = ({ children }: IProps) => {
  return (
    <div>
      {/* navbar */}
      <nav>
        <Navbar />
      </nav>

      {/* main */}
      <main>{children}</main>

      {/* footer */}
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default CommonLayout;
