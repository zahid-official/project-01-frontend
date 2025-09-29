import { Link } from "react-router";
import Logo from "@/components/layout/Logo";
import LoginForm from "@/components/modules/authentication/LoginForm";

const Login = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Content */}
      <div className="flex flex-col gap-4 py-10 px-6 md:px-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="w-40 flex items-center gap-2 font-medium">
            <Logo design="" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/login.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
