import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, LogIn } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/auth";
import { ApiResponse } from "@/lib/http";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      // Call the login function from context
      login(response.data.data.token);
      toast({
        title: "Success",
        description: "Login successful. Welcome back!",
      });
    },
    onError: (error: ApiResponse<null>) => {
      console.log(error);
      toast({
        title: "Error",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }

    // Call the login mutation
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-primary/10 p-4">
              {/* <Lock className="h-8 w-8 text-primary" /> */}
              <img src="/blake-logo.png" alt="Logo" className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">MAST-Token Admin Panel</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button type="button" onClick={() => {
                  navigate("/forgot-password");
                }} variant="link" size="sm" className="px-0 font-normal">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Signing in...
                </div>
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign in
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
