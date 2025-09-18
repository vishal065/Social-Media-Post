import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/lib/store";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun, ArrowRight } from "lucide-react";

export function LandingPage() {

  const navigate = useNavigate();
  const { user, setUser, theme, toggleTheme } = useAppStore();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Fake login for now
    setUser(email);
    setIsLoginModalOpen(false);

    // Go to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Header */}
      <header className="absolute top-0 right-0 p-6 flex items-center gap-4">
        {/* Theme toggle */}
       <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-2xl">
        {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
       </Button>

        {/* Login / Signup */}
        <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="rounded-2xl">
              {user ? "Account" : "Login / Signup"}
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl border-border">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome to Echooo</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="rounded-2xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="rounded-2xl"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full rounded-2xl">
                    Sign In
                  </Button>
                  <Button variant="secondary" className="w-full rounded-2xl">
                    Not Registered? Sign Up
                  </Button>
                </form>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tight">
            Generate → Preview → Publish.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Echo through your all socials using AI-power.
          </p>

          <Button
            size="lg"
            className="text-xl px-12 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Try it Now
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
