
import { cn } from "@/lib/utils";

interface ThemePreviewCardProps {
  theme: "light" | "dark";
  currentTheme: string;
  onClick: () => void;
}

const ThemePreviewCard = ({ theme, currentTheme, onClick }: ThemePreviewCardProps) => {
  const isSelected = theme === currentTheme;
  
  return (
    <div 
      className={cn(
        "cursor-pointer rounded-lg border p-4",
        isSelected ? "border-primary bg-accent" : "border-border"
      )}
      onClick={onClick}
    >
      <div className={cn(
        "border rounded-md p-4 mb-3",
        theme === "light" ? "bg-white" : "bg-slate-900"
      )}>
        <div className={cn(
          "h-2 w-8 mb-2 rounded-sm",
          theme === "light" ? "bg-gray-200" : "bg-slate-700"
        )}></div>
        <div className={cn(
          "h-2 w-16 mb-2 rounded-sm",
          theme === "light" ? "bg-gray-200" : "bg-slate-700"
        )}></div>
        <div className={cn(
          "h-2 w-10 rounded-sm",
          theme === "light" ? "bg-gray-200" : "bg-slate-700"
        )}></div>
      </div>
      <div className="text-center">{theme === "light" ? "Light" : "Dark"}</div>
    </div>
  );
};

export default ThemePreviewCard;
