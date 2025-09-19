import React, { useState } from "react";

import { ArrowRight, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";

interface AppSelectionProps {
  onNext: (platforms: string[]) => void;
}

const platforms = [
  {
    id: "twitter",
    name: "Twitter",
    icon: Twitter,
    color: "bg-black text-white",
    description: "Share quick thoughts and updates",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-600 text-white",
    description: "Professional networking and content",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    description: "Visual content and stories",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-500 text-white",
    description: "Connect with friends and family",
  },
];

export function AppSelection({ onNext }: AppSelectionProps) {
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<string, boolean>>({
    twitter: true,
    linkedin: true,
    instagram: false,
    facebook: false,
  });

  const togglePlatform = (platformId: string) => {
    setConnectedPlatforms((prev) => ({
      ...prev,
      [platformId]: !prev[platformId],
    }));
  };

  const selectedPlatforms = Object.entries(connectedPlatforms)
    .filter(([_, connected]) => connected)
    .map(([platform, _]) => platform);

  const handleContinue = () => {
    if (selectedPlatforms.length > 0) {
      onNext(selectedPlatforms);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl mb-2">Select Platforms</h1>
        <p className="text-muted-foreground">Choose which social media platforms to publish to</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isConnected = connectedPlatforms[platform.id];

          return (
            <Card
              key={platform.id}
              className="rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl ${platform.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  {isConnected && (
                    <Badge variant="default" className="bg-green-500 text-white rounded-full">
                      Connected
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg">{platform.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{platform.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{isConnected ? "Connected" : "Connect"}</span>
                  <Switch
                    checked={isConnected}
                    onCheckedChange={() => togglePlatform(platform.id)}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={selectedPlatforms.length === 0}
          className="px-8 py-3 rounded-2xl"
        >
          Continue with {selectedPlatforms.length} platform
          {selectedPlatforms.length !== 1 ? "s" : ""}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
