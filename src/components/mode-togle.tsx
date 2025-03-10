import { Moon, Sun } from "lucide-react";

import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const handleSwitch = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleSwitch}
      className="cursor-pointer absolute top-4 right-4"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
