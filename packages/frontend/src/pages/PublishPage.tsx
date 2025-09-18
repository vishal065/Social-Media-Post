import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { ArrowLeft, Check, X, Clock, Twitter, Linkedin, Instagram, Facebook } from 'lucide-react';

interface PublishPageProps {
  content: {
    text: string;
    hashtags: string[];
    imageUrl?: string;
  };
  selectedPlatforms: string[];
  onComplete: () => void;
  onBack: () => void;
}

type PublishStatus = 'pending' | 'publishing' | 'success' | 'failed';

interface PlatformStatus {
  platform: string;
  status: PublishStatus;
  message?: string;
}

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

export function PublishPage({ content, selectedPlatforms, onComplete, onBack }: PublishPageProps) {
  const [publishStatuses, setPublishStatuses] = useState<PlatformStatus[]>(
    selectedPlatforms.map(platform => ({
      platform,
      status: 'pending' as PublishStatus,
    }))
  );
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishProgress, setPublishProgress] = useState(0);

  const simulatePublishing = async () => {
    setIsPublishing(true);
    setPublishProgress(0);

    for (let i = 0; i < selectedPlatforms.length; i++) {
      const platform = selectedPlatforms[i];
      
      // Update status to publishing
      setPublishStatuses(prev => 
        prev.map(status => 
          status.platform === platform 
            ? { ...status, status: 'publishing' as PublishStatus }
            : status
        )
      );

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Randomly determine success/failure (80% success rate)
      const isSuccess = Math.random() > 0.2;
      const newStatus: PublishStatus = isSuccess ? 'success' : 'failed';
      const message = isSuccess 
        ? 'Posted successfully' 
        : 'Failed to connect to API';

      setPublishStatuses(prev => 
        prev.map(status => 
          status.platform === platform 
            ? { ...status, status: newStatus, message }
            : status
        )
      );

      setPublishProgress(((i + 1) / selectedPlatforms.length) * 100);
    }

    setIsPublishing(false);
  };

  const handlePublishEverywhere = () => {
    simulatePublishing();
  };

  const isComplete = publishStatuses.every(status => 
    status.status === 'success' || status.status === 'failed'
  );

  const successCount = publishStatuses.filter(status => status.status === 'success').length;
  const failureCount = publishStatuses.filter(status => status.status === 'failed').length;

  const getStatusIcon = (status: PublishStatus) => {
    switch (status) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <X className="h-4 w-4 text-destructive" />;
      case 'publishing':
        return <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: PublishStatus) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500 text-white">Posted</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'publishing':
        return <Badge variant="secondary">Publishing...</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
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
            <h2 className="text-xl">Publish Content</h2>
            <p className="text-sm text-muted-foreground">
              Publish to {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        {isComplete && (
          <Button onClick={onComplete} className="rounded-2xl">
            Create New Post
          </Button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-8 max-w-4xl mx-auto w-full">
        <div className="space-y-6">
          {/* Post Summary */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Content Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Post Text:</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded-xl">
                    {content.text}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Hashtags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {content.hashtags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Publish Button */}
          {!isPublishing && !isComplete && (
            <div className="text-center">
              <Button
                size="lg"
                onClick={handlePublishEverywhere}
                className="px-12 py-4 text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                Publish Everywhere
              </Button>
            </div>
          )}

          {/* Progress */}
          {isPublishing && (
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium mb-2">Publishing Content...</h3>
                  <Progress value={publishProgress} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Platform Status */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Publishing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publishStatuses.map((status) => {
                  const Icon = platformIcons[status.platform as keyof typeof platformIcons];
                  const label = platformLabels[status.platform as keyof typeof platformLabels];
                  
                  return (
                    <div key={status.platform} className="flex items-center justify-between p-4 border border-border rounded-xl">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <div>
                          <h4 className="font-medium">{label}</h4>
                          {status.message && (
                            <p className="text-sm text-muted-foreground">{status.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusIcon(status.status)}
                        {getStatusBadge(status.status)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          {isComplete && (
            <Card className="rounded-2xl border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-medium mb-2">Publishing Complete!</h3>
                <p className="text-muted-foreground">
                  Successfully published to {successCount} platform{successCount !== 1 ? 's' : ''}
                  {failureCount > 0 && `, ${failureCount} failed`}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}