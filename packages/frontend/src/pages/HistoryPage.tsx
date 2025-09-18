import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Check, X, Clock, Twitter, Linkedin, Instagram, Facebook, Calendar, Eye } from 'lucide-react';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface Post {
  id: string;
  content: {
    text: string;
    hashtags: string[];
    imageUrl?: string;
  };
  platforms: {
    platform: string;
    status: 'success' | 'failed' | 'pending';
    publishedAt?: string;
    error?: string;
  }[];
  createdAt: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    content: {
      text: "🚀 Just launched our new AI-powered content creation platform! Creating engaging social media posts has never been easier. From concept to publish in minutes! #AI #SocialMedia #ContentCreation",
      hashtags: ['#AI', '#SocialMedia', '#ContentCreation', '#Innovation', '#Technology'],
      imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400'
    },
    platforms: [
      { platform: 'twitter', status: 'success', publishedAt: '2 hours ago' },
      { platform: 'linkedin', status: 'success', publishedAt: '2 hours ago' },
      { platform: 'instagram', status: 'failed', error: 'API connection failed' },
    ],
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    content: {
      text: "Excited to share our latest breakthrough in AI technology! This platform transforms how businesses create and manage their social media presence. What do you think? #TechInnovation #AI #Business",
      hashtags: ['#TechInnovation', '#AI', '#Business', '#SocialMediaManagement', '#Startup'],
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400'
    },
    platforms: [
      { platform: 'twitter', status: 'success', publishedAt: '1 day ago' },
      { platform: 'linkedin', status: 'success', publishedAt: '1 day ago' },
      { platform: 'facebook', status: 'success', publishedAt: '1 day ago' },
    ],
    createdAt: '1 day ago'
  },
  {
    id: '3',
    content: {
      text: "The future of content creation is here! 🎯 Generate, preview, and publish across all platforms seamlessly. Ready to revolutionize your social media strategy? #Future #ContentStrategy #AI",
      hashtags: ['#Future', '#ContentStrategy', '#AI', '#SocialMedia', '#Marketing'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400'
    },
    platforms: [
      { platform: 'twitter', status: 'pending' },
      { platform: 'linkedin', status: 'pending' },
    ],
    createdAt: '3 days ago'
  }
];

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
};

const platformLabels = {
  twitter: 'Twitter',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  facebook: 'Facebook',
};

export function HistoryPage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <X className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500 text-white">Success</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  const getOverallStatus = (platforms: Post['platforms']) => {
    const hasFailure = platforms.some(p => p.status === 'failed');
    const hasPending = platforms.some(p => p.status === 'pending');
    const allSuccess = platforms.every(p => p.status === 'success');

    if (allSuccess) return { status: 'success', label: 'All Published' };
    if (hasFailure) return { status: 'partial', label: 'Partial Success' };
    if (hasPending) return { status: 'pending', label: 'Publishing' };
    return { status: 'unknown', label: 'Unknown' };
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Post History</h1>
        <p className="text-muted-foreground">View and manage your published content</p>
      </div>

      <div className="space-y-6">
        {mockPosts.map((post) => {
          const overallStatus = getOverallStatus(post.platforms);
          
          return (
            <Card key={post.id} className="rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Thumbnail */}
                  {post.content.imageUrl && (
                    <div className="flex-shrink-0">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted">
                        <ImageWithFallback
                          src={post.content.imageUrl}
                          alt="Post thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {post.content.text}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {post.createdAt}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        {getStatusBadge(overallStatus.status)}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="rounded-xl"
                              onClick={() => setSelectedPost(post)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl rounded-2xl">
                            <DialogHeader>
                              <DialogTitle>Post Details</DialogTitle>
                            </DialogHeader>
                            {selectedPost && (
                              <div className="space-y-6">
                                {/* Content */}
                                <div>
                                  <h4 className="font-medium mb-2">Content</h4>
                                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-xl">
                                    {selectedPost.content.text}
                                  </p>
                                </div>

                                {/* Hashtags */}
                                <div>
                                  <h4 className="font-medium mb-2">Hashtags</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedPost.content.hashtags.map((tag, index) => (
                                      <Badge key={index} variant="secondary" className="rounded-full">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {/* Platform Status */}
                                <div>
                                  <h4 className="font-medium mb-3">Platform Status</h4>
                                  <div className="space-y-3">
                                    {selectedPost.platforms.map((platform) => {
                                      const Icon = platformIcons[platform.platform as keyof typeof platformIcons];
                                      const label = platformLabels[platform.platform as keyof typeof platformLabels];
                                      
                                      return (
                                        <div key={platform.platform} className="flex items-center justify-between p-3 border border-border rounded-xl">
                                          <div className="flex items-center gap-3">
                                            <Icon className="h-5 w-5" />
                                            <div>
                                              <span className="font-medium">{label}</span>
                                              {platform.publishedAt && (
                                                <p className="text-sm text-muted-foreground">
                                                  Published {platform.publishedAt}
                                                </p>
                                              )}
                                              {platform.error && (
                                                <p className="text-sm text-destructive">
                                                  {platform.error}
                                                </p>
                                              )}
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-3">
                                            {getStatusIcon(platform.status)}
                                            {getStatusBadge(platform.status)}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    {/* Platform Icons */}
                    <div className="flex items-center gap-2">
                      {post.platforms.map((platform) => {
                        const Icon = platformIcons[platform.platform as keyof typeof platformIcons];
                        return (
                          <div key={platform.platform} className="flex items-center gap-1">
                            <Icon className="h-4 w-4" />
                            {getStatusIcon(platform.status)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {mockPosts.length === 0 && (
        <Card className="rounded-2xl">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No posts yet</h3>
              <p>Your published content will appear here</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}