
import { Moon, Monitor, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";

type Theme = "light" | "dark" | "system";

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-4">
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
      
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <div 
          className={`cursor-pointer rounded-lg border p-4 ${theme === 'light' ? 'border-primary bg-accent' : 'border-border'}`}
          onClick={() => setTheme('light')}
        >
          <div className="border rounded-md p-4 bg-white mb-3">
            <div className="h-2 w-8 bg-gray-200 mb-2 rounded-sm"></div>
            <div className="h-2 w-16 bg-gray-200 mb-2 rounded-sm"></div>
            <div className="h-2 w-10 bg-gray-200 rounded-sm"></div>
          </div>
          <div className="text-center">Light</div>
        </div>

        <div 
          className={`cursor-pointer rounded-lg border p-4 ${theme === 'dark' ? 'border-primary bg-accent' : 'border-border'}`}
          onClick={() => setTheme('dark')}
        >
          <div className="border rounded-md p-4 bg-slate-900 mb-3">
            <div className="h-2 w-8 bg-slate-700 mb-2 rounded-sm"></div>
            <div className="h-2 w-16 bg-slate-700 mb-2 rounded-sm"></div>
            <div className="h-2 w-10 bg-slate-700 rounded-sm"></div>
          </div>
          <div className="text-center">Dark</div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;
