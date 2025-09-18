import React, { useState } from 'react';
import { AppSelection } from './AppSelection';
import { ChatUI } from './ChatUI';
import { PreviewPage } from './PreviewPage';
import { PublishPage } from './PublishPage';

type CreatePostStep = 'platforms' | 'chat' | 'preview' | 'publish';

export function CreatePost() {
  const [currentStep, setCurrentStep] = useState<CreatePostStep>('platforms');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<{
    text: string;
    hashtags: string[];
    imageUrl?: string;
  } | null>(null);

  const handlePlatformsSelected = (platforms: string[]) => {
    setSelectedPlatforms(platforms);
    setCurrentStep('chat');
  };

  const handleContentGenerated = (content: { text: string; hashtags: string[]; imageUrl?: string }) => {
    setGeneratedContent(content);
    setCurrentStep('preview');
  };

  const handlePreviewComplete = () => {
    setCurrentStep('publish');
  };

  const handlePublishComplete = () => {
    // Reset to start
    setCurrentStep('platforms');
    setSelectedPlatforms([]);
    setGeneratedContent(null);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'platforms':
        return <AppSelection onNext={handlePlatformsSelected} />;
      case 'chat':
        return (
          <ChatUI 
            selectedPlatforms={selectedPlatforms}
            onContentGenerated={handleContentGenerated}
            onBack={() => setCurrentStep('platforms')}
          />
        );
      case 'preview':
        return (
          <PreviewPage
            content={generatedContent!}
            selectedPlatforms={selectedPlatforms}
            onNext={handlePreviewComplete}
            onBack={() => setCurrentStep('chat')}
          />
        );
      case 'publish':
        return (
          <PublishPage
            content={generatedContent!}
            selectedPlatforms={selectedPlatforms}
            onComplete={handlePublishComplete}
            onBack={() => setCurrentStep('preview')}
          />
        );
      default:
        return <AppSelection onNext={handlePlatformsSelected} />;
    }
  };

  return (
    <div className="h-full">
      {renderStep()}
    </div>
  );
}