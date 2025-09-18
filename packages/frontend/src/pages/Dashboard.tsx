import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../components/ui/sidebar';
import { Button } from '../components/ui/button';
import { Moon, Sun, LayoutDashboard, PlusSquare, History, Settings, LogOut } from 'lucide-react';
import { CreatePost } from '../pages/CreatePost';
import { HistoryPage } from '../pages/HistoryPage';
import { DashboardHome } from '../pages/DashboardHome';
import { SettingsPage } from '../pages/SettingsPage';
import { useAppStore } from "@/lib/store";
import { useIsMobile } from "@/hooks/use-mobile"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLogout: () => void;
}

type ActivePage = 'dashboard' | 'create' | 'history' | 'settings';

export function Dashboard({ onLogout }: DashboardProps) {
  const [activePage, setActivePage] = useState<ActivePage>('create');
  const { user, setUser, theme, toggleTheme } = useAppStore();
  const isMobile = useIsMobile()
  
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'create', label: 'Create Post', icon: PlusSquare },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'create':
        return <CreatePost />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <CreatePost />;
    }
  };

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Fake login for now
    setUser(email);
    setIsLoginModalOpen(false);

    // Go to dashboard
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background w-full">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Echooo</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-2xl">
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </Button>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu className="px-2">
              {navigation.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActivePage(item.id as ActivePage)}
                    isActive={activePage === item.id}
                    className="rounded-xl"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              
               {user && <div className="mt-auto pt-4">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={onLogout}
                    className="rounded-xl text-destructive hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </div>}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="flex fle-row border-b border-border p-4 align-end justify-between items-center">
            {isMobile && <SidebarTrigger />}
            {!user && <div></div>}
            

             {/* Login / Signup */}
            <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
              <DialogTrigger asChild>
                {!user && <Button variant="ghost" className="rounded-2xl">
                {user ? "Account" : "Login / Signup"}
              </Button>}
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
          
          <main className="flex-1 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}