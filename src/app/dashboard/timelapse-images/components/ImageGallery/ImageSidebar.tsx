'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { ImageResponse, Camera } from '../../api/all_images';

interface ImageSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  images: ImageResponse[];
  cameras: Camera[];
  currentCameraId: number;
  currentIndex: number;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  totalCount: number;
  onImageSelect: (index: number) => void;
  onCameraChange: (cameraId: number) => void;
  onLoadMore: () => void;
}

export function ImageSidebar({
  isOpen,
  onClose,
  images,
  cameras,
  currentCameraId,
  currentIndex,
  loading,
  loadingMore,
  hasMore,
  totalCount,
  onImageSelect,
  onCameraChange,
  onLoadMore,
}: ImageSidebarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const currentCamera = cameras.find(c => c.id === currentCameraId);

  // Handle scroll for infinite loading
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      
      // Load more when 80% scrolled
      if (scrollPercentage > 80 && hasMore && !loadingMore) {
        onLoadMore();
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadingMore, onLoadMore]);

  // Auto-scroll to current image
  useEffect(() => {
    if (isScrolling || !isOpen) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const currentImageElement = scrollContainer.querySelector(`[data-index="${currentIndex}"]`);
    if (currentImageElement) {
      currentImageElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentIndex, isOpen, isScrolling]);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-10 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed right-0 top-0 h-full w-[320px] bg-white shadow-2xl border-l z-40 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4 border-b bg-gradient-to-r from-yellow-400 to-yellow-500 text-white">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Image Gallery</h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Camera Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Camera</label>
              <Select
                value={currentCameraId.toString()}
                onValueChange={(value) => onCameraChange(Number(value))}
              >
                <SelectTrigger className="w-full bg-white text-gray-800 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cameras.map((camera) => (
                    <SelectItem key={camera.id} value={camera.id.toString()}>
                      <div className="flex items-center space-x-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          camera.isActive ? "bg-green-500" : "bg-gray-400"
                        )} />
                        <span>{camera.name}</span>
                        {camera.location && (
                          <span className="text-xs text-gray-500">({camera.location})</span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Stats */}
          <div className="px-6 py-3 bg-gray-50 border-b">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Total Images: {totalCount}</span>
              <span>Loaded: {images.length}</span>
            </div>
          </div>

          {/* Images Grid */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4"
            onScrollCapture={() => setIsScrolling(true)}
            onScrollEndCapture={() => setTimeout(() => setIsScrolling(false), 100)}
          >
            {loading && images.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Spinner size="lg" />
                <p className="mt-4 text-gray-500">Loading images...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {images.map((image, index) => (
                  <div
                    key={image.image_id}
                    data-index={index}
                    onClick={() => onImageSelect(index)}
                    className={cn(
                      'relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200',
                      index === currentIndex
                        ? 'border-yellow-400 ring-2 ring-yellow-400/50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    )}
                  >
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={image.s3_url}
                        alt={`Image ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                        sizes="(max-width: 320px) 150px, 150px"
                      />
                      
                      {/* Timestamp overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <p className="text-xs text-white font-medium">
                          {formatTimestamp(image.created_date)}
                        </p>
                      </div>
                      
                      {/* Current indicator */}
                      {index === currentIndex && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full shadow-lg" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Indicator */}
            {loadingMore && (
              <div className="flex items-center justify-center py-6">
                <Spinner />
                <span className="ml-2 text-gray-500">Loading more images...</span>
              </div>
            )}

            {/* End of Results */}
            {!hasMore && images.length > 0 && (
              <div className="text-center py-6 text-gray-500">
                <p className="text-sm">All images loaded</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}