import React from "react";

import { Bookmark, Heart, MessageCircle, MoreHorizontal, Send } from "lucide-react";

import { ImageWithFallback } from "../common/ImageWithFallback";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface InstagramPreviewProps {
  content: {
    text: string;
    hashtags: string[];
    imageUrl?: string;
  };
}

export function InstagramPreview({ content }: InstagramPreviewProps) {
  return (
    <Card className="w-full max-w-sm rounded-2xl border border-border shadow-sm bg-card">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">E</AvatarFallback>
            </Avatar>
            <span className="font-medium text-sm">echooo</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>

        {/* Image */}
        {content.imageUrl && (
          <div className="aspect-square">
            <ImageWithFallback
              src={content.imageUrl}
              alt="Instagram post"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="p-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0">
                <Heart className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0">
                <MessageCircle className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0">
                <Send className="h-6 w-6" />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0">
              <Bookmark className="h-6 w-6" />
            </Button>
          </div>

          {/* Likes */}
          <div className="mb-2">
            <span className="text-sm font-medium">142 likes</span>
          </div>

          {/* Caption */}
          <div className="text-sm">
            <span className="font-medium mr-2">echooo</span>
            <span className="whitespace-pre-wrap">{content.text}</span>
          </div>

          {/* Comments */}
          <div className="mt-2">
            <button className="text-sm text-muted-foreground">View all 12 comments</button>
          </div>

          {/* Time */}
          <div className="mt-1">
            <span className="text-xs text-muted-foreground">2 MINUTES AGO</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
