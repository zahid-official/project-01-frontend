import { useProfileInfoQuery } from "@/redux/features/user.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

const withAuth = (Component: ComponentType, requiredRole?: TRole[]) => {
  const AuthWrapper = () => {
    // RTK Query mutation hook
    const { data, isLoading } = useProfileInfoQuery(undefined);

    const email = data?.data?.email;
    const userRole = data?.data?.role;

    // check is user logged in
    if (!isLoading && !email) {
      return <Navigate to={"/login"} />;
    }

    // check is user role matches the required role
    if (!isLoading && requiredRole && !requiredRole.includes(userRole)) {
      return <Navigate to={"/unauthorized"} />;
    }

    return <Component />;
  };

  return AuthWrapper;
};

export default withAuth;
