
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [firstName, setFirstName] = useState("Cryptog");
  const [lastName, setLastName] = useState("Admin");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("admin@example.com");

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
              Customize the appearance of the platform.
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Theme Settings</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Color Mode</Label>
                  <div className="flex space-x-4">
                    <Button variant="outline">Light</Button>
                    <Button variant="outline">Dark</Button>
                    <Button variant="outline">System</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
