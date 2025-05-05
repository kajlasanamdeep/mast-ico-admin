import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/auth";
import { ApiResponse } from "@/lib/http";
import { ShieldCheck } from "lucide-react";

const ForgotPassword = () => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const sendOtpMutation = useMutation({
    mutationFn: authApi.sendOtp,
    onSuccess: () => {
      toast({
        title: "OTP Sent",
        description: "Check your email for the OTP.",
      });
      setStep("otp");
    },
    onError: (error: ApiResponse<null>) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP.",
        variant: "destructive",
      });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: authApi.verifyOtpAndResetPassword,
    onSuccess: () => {
      toast({
        title: "Password Reset",
        description: "You can now sign in with your new password.",
      });
      setStep("email");
      setEmail("");
      setOtp("");
      setNewPassword("");
    },
    onError: (error: ApiResponse<null>) => {
      toast({
        title: "Error",
        description: error.message || "Failed to reset password.",
        variant: "destructive",
      });
    },
  });

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Error", description: "Enter your email.", variant: "destructive" });
      return;
    }
    sendOtpMutation.mutate(email);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      toast({ title: "Error", description: "Fill in all fields.", variant: "destructive" });
      return;
    }
    resetPasswordMutation.mutate({ email, otp, newPassword });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-4">
              <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Reset Your Password</CardTitle>
          <CardDescription className="text-center">
            {step === "email" ? "Enter your email to receive an OTP" : "Enter the OTP and your new password"}
          </CardDescription>
        </CardHeader>

        <form onSubmit={step === "email" ? handleSendOtp : handleResetPassword}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={step === "otp"}
              />
            </div>

            {step === "otp" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={sendOtpMutation.isPending || resetPasswordMutation.isPending}
            >
              {(sendOtpMutation.isPending || resetPasswordMutation.isPending) ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Please wait...
                </div>
              ) : (
                step === "email" ? "Send OTP" : "Reset Password"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;
