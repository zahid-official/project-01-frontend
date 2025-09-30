import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Verify = () => {
  // Navigation and location hooks
  const navigate = useNavigate();
  const location = useLocation();

  // State for email from location state
  const [email] = useState(location.state);

  // Redirect to home if no email in state
  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  return <div>Verify account page</div>;
};

export default Verify;
