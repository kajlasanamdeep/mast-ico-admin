
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ThemeSelector from "./ThemeSelector";
import ThemePreviewCard from "./ThemePreviewCard";
import { useTheme } from "@/providers/ThemeProvider";

const AppearanceTab = () => {
  const { theme, setTheme } = useTheme();

  const handleUpdatePreferences = () => {
    toast.success("Preferences updated successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Appearance</h2>
        <p className="text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day and night themes.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <h3 className="text-lg font-medium">Theme</h3>
          <p className="text-sm text-muted-foreground">Select the theme for the dashboard.</p>
        </CardHeader>
        <CardContent>
          <ThemeSelector />
          
          <div className="grid grid-cols-2 gap-4 max-w-md mt-4">
            <ThemePreviewCard 
              theme="light" 
              currentTheme={theme} 
              onClick={() => setTheme('light')} 
            />
            <ThemePreviewCard 
              theme="dark" 
              currentTheme={theme} 
              onClick={() => setTheme('dark')} 
            />
          </div>

          <Button onClick={handleUpdatePreferences} className="mt-8 bg-black text-white hover:bg-black/90">
            Update preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceTab;
