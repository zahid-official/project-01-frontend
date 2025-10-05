/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLogoutMutation } from "@/redux/features/auth.api";
import { useProfileInfoQuery, userApi } from "@/redux/features/user.api";
import { useAppDispatch } from "@/redux/hooks";
import { Link } from "react-router";
import { toast } from "sonner";
import Logo from "./Logo";
import ThemeToggler from "./ThemeToggler";
import role from "@/constants/role";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/user", label: "Dashboard", role: role.USER },
  { href: "/admin", label: "Dashboard", role: role.ADMIN },
  { href: "/admin", label: "Dashboard", role: role.SUPER_ADMIN },
];

const Navbar = () => {
  // RTK Query mutation hook
  const { data } = useProfileInfoQuery(undefined);
  const [logout] = useLogoutMutation();

  const dispatch = useAppDispatch();
  const email = data?.data?.email;
  const userRole = data?.data?.role;

  // Handle logout
  const handleLogout = async () => {
    try {
      const result = await logout(null).unwrap();

      // reset api state
      dispatch(userApi.util.resetApiState());
      toast.success(result.message || "Logged out successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  return (
    <header className="border-b py-3">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>

            {/* Mobile menu */}
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink className="py-1.5" asChild>
                        <Link to={link.href}>{link.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>

          {/* Main nav */}
          <div className="flex items-center gap-6">
            <div className="w-40">
              <Link to="#" className="text-primary hover:text-primary/90">
                <Logo design={"sm:block hidden"} />
              </Link>
            </div>

            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <div key={index}>
                    {/* Public routes */}
                    {link.role === "PUBLIC" && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                          asChild
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}

                    {/* Logged users routes */}
                    {link.role === userRole && (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          className="text-muted-foreground hover:text-primary py-1.5 font-medium"
                          asChild
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    )}
                  </div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {email ? (
            <Button onClick={handleLogout} className="text-sm">
              Logout
            </Button>
          ) : (
            <Button className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}

          {/* Theme mode */}
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
