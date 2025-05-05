
import { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

type ProfileTabProps = {
  initialFirstName: string;
  initialLastName: string;
  initialPhoneNumber: string;
  initialEmail: string;
};

const ProfileTab = ({
  initialFirstName,
  initialLastName,
  initialPhoneNumber,
  initialEmail
}: ProfileTabProps) => {
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [email, setEmail] = useState(initialEmail);

  return (
    <div className="space-y-6">
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="firstName">Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div> */}

            {/* <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div> */}
          </div>

          <Button className="mt-6">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
