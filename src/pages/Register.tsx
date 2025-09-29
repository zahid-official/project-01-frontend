import { Link } from "react-router";
import Logo from "@/components/layout/Logo";
import RegisterForm from "@/components/modules/authentication/RegisterForm";

const Register = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Banner */}
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/register.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 py-10 px-6 md:px-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="w-40 flex items-center gap-2 font-medium">
            <Logo design="" />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
