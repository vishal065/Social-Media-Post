import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Twitter, Linkedin, Instagram, Facebook, Bell, Shield, User, Palette } from 'lucide-react';
import { useAppStore } from "@/lib/store";

export function SettingsPage() {
  const { user, setUser, theme, toggleTheme } = useAppStore();
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: true,
  });

  const [connectedAccounts, setConnectedAccounts] = useState({
    twitter: true,
    linkedin: true,
    instagram: false,
    facebook: false,
  });

  const platforms = [
    { id: 'twitter', name: 'Twitter', icon: Twitter, connected: connectedAccounts.twitter },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, connected: connectedAccounts.linkedin },
    { id: 'instagram', name: 'Instagram', icon: Instagram, connected: connectedAccounts.instagram },
    { id: 'facebook', name: 'Facebook', icon: Facebook, connected: connectedAccounts.facebook },
  ];

  const toggleAccount = (platform: string) => {
    setConnectedAccounts(prev => ({
      ...prev,
      [platform]: !prev[platform as keyof typeof prev]
    }));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and integrations</p>
      </div>

      <div className="space-y-8">
        {/* Profile Settings */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="John Doe" className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" className="rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input 
                id="bio" 
                defaultValue="Content creator and AI enthusiast" 
                className="rounded-xl" 
              />
            </div>
            <Button className="rounded-xl">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Connected Accounts */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Connected Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <div key={platform.id} className="flex items-center justify-between p-4 border border-border rounded-xl">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <div>
                        <h4 className="font-medium">{platform.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {platform.connected ? 'Ready to Publish' : 'Not connected'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {platform.connected && (
                        <Badge className="bg-green-500 text-white">Connected</Badge>
                      )}
                      <Switch
                        checked={platform.connected}
                        onCheckedChange={() => toggleAccount(platform.id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, email: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, push: checked }))
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Marketing Emails</h4>
                  <p className="text-sm text-muted-foreground">Receive updates about new features</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, marketing: checked }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Theme</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-4 cursor-pointer border border-border rounded-xl hover:border-primary" onClick={toggleTheme}>
                    <div className="text-center">
                      <div className="w-full h-12 bg-white border border-border rounded mb-2"></div>
                      <span className="text-sm">Light</span>
                    </div>
                  </Card>
                  <Card className="p-4 cursor-pointer border border-border rounded-xl hover:border-primary" onClick={toggleTheme}>
                    <div className="text-center">
                      <div className="w-full h-12 bg-gray-900 rounded mb-2"></div>
                      <span className="text-sm">Dark</span>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="rounded-2xl border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between p-4 border border-destructive/20 rounded-xl">
                <div>
                  <h4 className="font-medium">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account
                  </p>
                </div>
                <Button variant="destructive" className="rounded-xl">
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}