import React, { useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { FacebookPreview } from "../components/previews/FacebookPreview";
import { InstagramPreview } from "../components/previews/InstagramPreview";
import { LinkedInPreview } from "../components/previews/LinkedInPreview";
import { TwitterPreview } from "../components/previews/TwitterPreview";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface PreviewPageProps {
  content: {
    text: string;
    hashtags: string[];
    imageUrl?: string;
  };
  selectedPlatforms: string[];
  onNext: () => void;
  onBack: () => void;
}

export function PreviewPage({ content, selectedPlatforms, onNext, onBack }: PreviewPageProps) {
  const [activeTab, setActiveTab] = useState(selectedPlatforms[0]);

  const platformComponents = {
    twitter: TwitterPreview,
    linkedin: LinkedInPreview,
    instagram: InstagramPreview,
    facebook: FacebookPreview,
  };

  const platformLabels = {
    twitter: "Twitter",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    facebook: "Facebook",
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="rounded-xl">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-xl">Preview Content</h2>
            <p className="text-sm text-muted-foreground">
              See how your content will look on each platform
            </p>
          </div>
        </div>
        <Button onClick={onNext} className="rounded-2xl">
          Publish Content
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Platform Previews */}
      <div className="flex-1 p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 rounded-2xl p-1">
            {selectedPlatforms.map((platform) => (
              <TabsTrigger key={platform} value={platform} className="rounded-xl">
                {platformLabels[platform as keyof typeof platformLabels]}
              </TabsTrigger>
            ))}
          </TabsList>

          {selectedPlatforms.map((platform) => {
            const PreviewComponent =
              platformComponents[platform as keyof typeof platformComponents];
            return (
              <TabsContent key={platform} value={platform} className="mt-8">
                <div className="flex justify-center">
                  <PreviewComponent content={content} />
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
}
