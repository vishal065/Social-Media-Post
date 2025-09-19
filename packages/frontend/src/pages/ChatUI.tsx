import React, { useState } from "react";

import { ArrowLeft, Bot, RefreshCw, Send, User } from "lucide-react";

import { ImageWithFallback } from "../components/common/ImageWithFallback";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

interface ChatUIProps {
  selectedPlatforms: string[];
  onContentGenerated: (content: { text: string; hashtags: string[]; imageUrl?: string }) => void;
  onBack: () => void;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  generatedContent?: {
    text: string;
    hashtags: string[];
    imageUrl?: string;
  };
}

export function ChatUI({ selectedPlatforms, onContentGenerated, onBack }: ChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [editableContent, setEditableContent] = useState<{
    text: string;
    hashtags: string[];
    imageUrl?: string;
  } | null>(null);

  const generateContent = async (prompt: string) => {
    const sampleImages = [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400",
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    ];

    const sampleResponses = [
      {
        text: "🚀 Just launched our new AI-powered content creation platform! Creating engaging social media posts has never been easier. From concept to publish in minutes! #AI #SocialMedia #ContentCreation",
        hashtags: ["#AI", "#SocialMedia", "#ContentCreation", "#Innovation", "#Technology"],
        imageUrl: sampleImages[0],
      },
      {
        text: "Excited to share our latest breakthrough in AI technology! This platform transforms how businesses create and manage their social media presence. What do you think? #TechInnovation #AI #Business",
        hashtags: ["#TechInnovation", "#AI", "#Business", "#SocialMediaManagement", "#Startup"],
        imageUrl: sampleImages[1],
      },
      {
        text: "The future of content creation is here! 🎯 Generate, preview, and publish across all platforms seamlessly. Ready to revolutionize your social media strategy? #Future #ContentStrategy #AI",
        hashtags: ["#Future", "#ContentStrategy", "#AI", "#SocialMedia", "#Marketing"],
        imageUrl: sampleImages[2],
      },
    ];

    return sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsGenerating(true);

    // Simulate AI response delay
    setTimeout(async () => {
      const generatedContent = await generateContent(inputValue);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "I've generated some engaging content for your social media post. You can edit the text and hashtags below:",
        generatedContent,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setEditableContent(generatedContent);
      setIsGenerating(false);
    }, 2000);
  };

  const handleRegenerateImage = async () => {
    if (!editableContent) return;

    const sampleImages = [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400",
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    ];

    const newImageUrl = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setEditableContent((prev) => (prev ? { ...prev, imageUrl: newImageUrl } : null));
  };

  const handleNext = () => {
    if (editableContent) {
      onContentGenerated(editableContent);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-xl">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-xl">Create Content</h2>
          <p className="text-sm text-muted-foreground">
            Publishing to: {selectedPlatforms.join(", ")}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Start by describing the content you'd like to create.</p>
            <p className="text-sm mt-2">
              For example: "Create a post about our new product launch"
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.type === "user" ? "justify-end" : ""}`}
          >
            {message.type === "ai" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}

            <Card
              className={`max-w-2xl rounded-2xl ${message.type === "user" ? "bg-primary text-primary-foreground" : ""}`}
            >
              <CardContent className="p-4">
                <p>{message.content}</p>

                {message.generatedContent && editableContent && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm mb-2">Post Text:</label>
                      <Textarea
                        value={editableContent.text}
                        onChange={(e) =>
                          setEditableContent((prev) =>
                            prev ? { ...prev, text: e.target.value } : null
                          )
                        }
                        className="rounded-xl"
                        rows={4}
                      />
                    </div>

                    <div>
                      <label className="block text-sm mb-2">Hashtags:</label>
                      <div className="flex flex-wrap gap-2">
                        {editableContent.hashtags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="rounded-full">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {editableContent.imageUrl && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm">Suggested Image:</label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRegenerateImage}
                            className="rounded-xl"
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Regenerate
                          </Button>
                        </div>
                        <div className="rounded-xl overflow-hidden">
                          <ImageWithFallback
                            src={editableContent.imageUrl}
                            alt="Generated content image"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {message.type === "user" && (
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isGenerating && (
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <Card className="rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                  <span>Generating content...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe the content you want to create..."
            className="rounded-2xl"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isGenerating}
            className="rounded-2xl"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {editableContent && (
          <div className="mt-4 flex justify-end">
            <Button onClick={handleNext} className="rounded-2xl">
              Preview Content
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
