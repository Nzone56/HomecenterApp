import { Github } from "lucide-react";
import { ToggleTheme } from "./toggle-theme";

export const Header = () => {
  return (
    <div className="flex items-center p-3 justify-between">
      <a href="https://github.com/Nzone56" aria-label="My Github">
        <Github />
      </a>
      <ToggleTheme />
    </div>
  );
};
