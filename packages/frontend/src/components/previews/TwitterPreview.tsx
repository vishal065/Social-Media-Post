import React from "react";

import { Heart, MessageCircle, MoreHorizontal, Repeat2, Share } from "lucide-react";

import { ImageWithFallback } from "../common/ImageWithFallback";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface TwitterPreviewProps {
  content: {
    text: string;
    hashtags: string[];
    imageUrl?: string;
  };
}

export function TwitterPreview({ content }: TwitterPreviewProps) {
  return (
    <Card className="w-full max-w-lg rounded-2xl border border-border shadow-sm">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">E</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">Echooo</span>
              <span className="text-muted-foreground">@echooo</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground text-sm">2m</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="mb-3">
          <p className="whitespace-pre-wrap leading-relaxed">{content.text}</p>
        </div>

        {/* Image */}
        {content.imageUrl && (
          <div className="mb-3 rounded-2xl overflow-hidden border border-border">
            <ImageWithFallback
              src={content.imageUrl}
              alt="Tweet image"
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Engagement */}
        <div className="flex items-center justify-between text-muted-foreground max-w-md">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 rounded-full hover:bg-blue-50 hover:text-blue-500"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">12</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 rounded-full hover:bg-green-50 hover:text-green-500"
          >
            <Repeat2 className="h-4 w-4 mr-2" />
            <span className="text-sm">5</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 rounded-full hover:bg-red-50 hover:text-red-500"
          >
            <Heart className="h-4 w-4 mr-2" />
            <span className="text-sm">23</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 rounded-full hover:bg-blue-50 hover:text-blue-500"
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
