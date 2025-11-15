'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Download, 
  Star, 
  Maximize, 
  Edit,
  Grid3X3,
  Play,
  Pause
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ImageResponse } from '../../api/all_images';
import { toast } from 'sonner';

interface ImageViewerProps {
  images: ImageResponse[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

export function ImageViewer({ 
  images, 
  currentIndex, 
  onNext, 
  onPrev, 
  onToggleSidebar,
  sidebarOpen 
}: ImageViewerProps) {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentImage = images[currentIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case ' ':
          e.preventDefault();
          setIsPlaying(prev => !prev);
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev]);


  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        onNext();
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, onNext]);

  const handleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().catch((err) => {
        console.error('Fullscreen request failed:', err);
        toast.error('Fullscreen not supported');
      });
    } else {
      document.exitFullscreen?.();
    }
  };

  const handleDownload = async () => {
    if (!currentImage) return;

    try {
      const response = await fetch(currentImage.s3_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `image-${currentImage.image_id}-${new Date(currentImage.created_date).toISOString().split('T')[0]}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Image downloaded successfully');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Failed to download image');
    }
  };

  const handleFavorite = () => {
    if (!currentImage) return;

    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(currentImage.image_id)) {
        newFavorites.delete(currentImage.image_id);
        toast.success('Removed from favorites');
      } else {
        newFavorites.add(currentImage.image_id);
        toast.success('Added to favorites');
      }
      return newFavorites;
    });
  };

  const handleShare = () => {
    setEmail('');
    setSubject(`Image from ${new Date(currentImage?.created_date || '').toLocaleDateString()}`);
    setIsShareOpen(true);
  };

  const handleSendEmail = () => {
    if (!email || !subject) {
      toast.error('Please fill in all fields');
      return;
    }

    // Simulate email sending
    console.log('Sending email:', { email, subject, image: currentImage });
    toast.success('Email sent successfully');
    setIsShareOpen(false);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  if (!currentImage) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-gray-500">No image selected</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
        {/* Main Image */}
        <div className="relative w-full h-full">
          <Image
            src={currentImage.s3_url}
            alt={`Image ${currentImage.image_id}`}
            fill
            className="object-contain"
            priority
            sizes="100vw"
          />

          {/* Image Info Overlay */}
          <div className="absolute top-4 left-4 z-30 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <p className="text-sm font-medium">
              {formatTimestamp(currentImage.created_date)}
            </p>
            <p className="text-xs text-gray-300">
              Image {currentIndex + 1} of {images.length}
            </p>
          </div>

          {/* Sidebar Tools */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 z-30 flex flex-col gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handleShare}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  <Share2 size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Share</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => toast.info('Edit functionality coming soon')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  <Edit size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Edit</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handleFavorite}
                  className={cn(
                    "text-black transition-colors",
                    favorites.has(currentImage.image_id)
                      ? "bg-red-400 hover:bg-red-500"
                      : "bg-yellow-400 hover:bg-yellow-500"
                  )}
                >
                  <Star 
                    size={20} 
                    className={favorites.has(currentImage.image_id) ? "fill-current" : ""} 
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {favorites.has(currentImage.image_id) ? 'Remove from favorites' : 'Add to favorites'}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handleDownload}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  <Download size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Download</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={handleFullscreen}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  <Maximize size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Fullscreen</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={cn(
                    "text-black transition-colors",
                    isPlaying ? "bg-red-400 hover:bg-red-500" : "bg-green-400 hover:bg-green-500"
                  )}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {isPlaying ? 'Pause slideshow' : 'Start slideshow'}
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Navigation Controls */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                onClick={onPrev}
                className="absolute top-1/2 left-16 -translate-y-1/2 z-30 bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                <ChevronLeft size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Previous (←)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                onClick={onNext}
                className="absolute top-1/2 right-4 -translate-y-1/2 z-30 bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                <ChevronRight size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Next (→)</TooltipContent>
          </Tooltip>

          {/* Sidebar Toggle */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                onClick={onToggleSidebar}
                className={cn(
                  "absolute bottom-4 right-4 z-30 transition-colors",
                  sidebarOpen 
                    ? "bg-red-400 hover:bg-red-500 text-black" 
                    : "bg-yellow-400 hover:bg-yellow-500 text-black"
                )}
              >
                <Grid3X3 size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              {sidebarOpen ? 'Close gallery' : 'Open gallery'}
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Share Dialog */}
        <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Share Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsShareOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendEmail}
                className="bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                Send Email
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}