import React from "react";

import { MessageSquare, MoreHorizontal, Send, Share2, ThumbsUp } from "lucide-react";

import { ImageWithFallback } from "../common/ImageWithFallback";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface LinkedInPreviewProps {
  content: {
    text: string;
    hashtags: string[];
    imageUrl?: string;
  };
}

export function LinkedInPreview({ content }: LinkedInPreviewProps) {
  return (
    <Card className="w-full max-w-lg rounded-2xl border border-border shadow-sm bg-card">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground">E</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Echooo</h3>
                <p className="text-sm text-muted-foreground">AI-powered content platform</p>
                <p className="text-xs text-muted-foreground">2m • 🌐</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-4">
          <p className="whitespace-pre-wrap leading-relaxed">{content.text}</p>
        </div>

        {/* Image */}
        {content.imageUrl && (
          <div className="mb-4 rounded-xl overflow-hidden border border-border">
            <ImageWithFallback
              src={content.imageUrl}
              alt="LinkedIn post image"
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3 pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 bg-blue-500 rounded-full border-2 border-card flex items-center justify-center">
                <ThumbsUp className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
            <span>45 reactions</span>
          </div>
          <div className="flex gap-4">
            <span>8 comments</span>
            <span>3 reposts</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="flex-1 h-10 rounded-xl hover:bg-muted">
            <ThumbsUp className="h-4 w-4 mr-2" />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 h-10 rounded-xl hover:bg-muted">
            <MessageSquare className="h-4 w-4 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 h-10 rounded-xl hover:bg-muted">
            <Share2 className="h-4 w-4 mr-2" />
            Repost
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 h-10 rounded-xl hover:bg-muted">
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
