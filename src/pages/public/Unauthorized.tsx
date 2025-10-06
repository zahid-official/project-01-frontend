import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Unauthorized = () => {
  //
  return (
    <div className="h-screen content-center text-center">
      <h2 className="text-lg font-semibold">
        You're not authorized to view this page. Go back to the home page.
      </h2>

      <Link to={"/"}>
        <Button className="mt-4">Go to Home</Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
