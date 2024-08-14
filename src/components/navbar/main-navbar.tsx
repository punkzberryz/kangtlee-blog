import { ThemeToggleButton } from "../providers/theme-toggle-button";
import { MiddleNavMenu } from "./middle-nav-menu";

export const MainNavbar = () => {
  return (
    <div className="bg-primary px-4 py-2 text-primary-foreground">
      <div className="mx-auto flex max-w-4xl items-center justify-between space-x-4">
        <div>KangTLee</div>
        {/* Middle nav  */}
        <MiddleNavMenu />

        {/* Link to Admin */}
        <div className="flex items-center space-x-2">
          <ThemeToggleButton />
        </div>
      </div>
    </div>
  );
};
