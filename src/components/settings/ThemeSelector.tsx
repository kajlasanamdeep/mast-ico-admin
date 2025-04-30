
import { Moon, Monitor, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

type Theme = "light" | "dark" | "system";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-4">
      <Toggle
        variant="outline"
        aria-label="Toggle light mode"
        pressed={theme === "light"}
        onPressedChange={() => setTheme("light")}
        className={cn(
          "w-fit border-border data-[state=on]:bg-accent",
          theme === "light" ? "border-primary" : ""
        )}
      >
        <Sun className="h-5 w-5" />
        <span className="ml-2">Light</span>
      </Toggle>

      <Toggle
        variant="outline"
        aria-label="Toggle dark mode"
        pressed={theme === "dark"}
        onPressedChange={() => setTheme("dark")}
        className={cn(
          "w-fit border-border data-[state=on]:bg-accent",
          theme === "dark" ? "border-primary" : ""
        )}
      >
        <Moon className="h-5 w-5" />
        <span className="ml-2">Dark</span>
      </Toggle>

      <Toggle
        variant="outline"
        aria-label="Toggle system mode"
        pressed={theme === "system"}
        onPressedChange={() => setTheme("system")}
        className={cn(
          "w-fit border-border data-[state=on]:bg-accent",
          theme === "system" ? "border-primary" : ""
        )}
      >
        <Monitor className="h-5 w-5" />
        <span className="ml-2">System</span>
      </Toggle>
    </div>
  );
};

export default ThemeSelector;
