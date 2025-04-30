
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Image, Moon, Sun, Monitor } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "@/providers/ThemeProvider";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [firstName, setFirstName] = useState("Cryptog");
  const [lastName, setLastName] = useState("Admin");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("admin@example.com");
  const { theme, setTheme } = useTheme();

  const handleUpdatePreferences = () => {
    toast.success("Preferences updated successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      
      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-muted w-full max-w-md grid grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Profile</h2>
            <p className="text-muted-foreground">
              Manage your personal information and how it appears on the platform.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Profile Photo</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 text-3xl">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-muted">
                    {firstName && lastName 
                      ? `${firstName[0]}${lastName[0]}`
                      : "CA"}
                  </AvatarFallback>
                </Avatar>
                
                <Button variant="outline" className="gap-2">
                  <Image className="h-4 w-4" />
                  Upload Photo
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Upload a square profile picture (PNG, JPG, JPEG, GIF, SVG).<br />
                Recommended size: 200×200 px.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Personal Information</h3>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <Button className="mt-6">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Security</h2>
            <p className="text-muted-foreground">
              Manage your security settings and authentication methods.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Change Password</h3>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              
              <Button className="mt-6">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
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

              <Button onClick={handleUpdatePreferences} className="mt-8 bg-black text-white hover:bg-black/90">Update preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
