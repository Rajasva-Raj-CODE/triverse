'use client';

import { useState } from 'react';
import { ImageViewer } from './ImageViewer';
import { ImageSidebar } from './ImageSidebar';
import { useImageGallery } from '../../hooks/useImageGallery';
import { Spinner } from '@/components/ui/spinner';

interface ImageGalleryProps {
  companyId: number;
  projectId: number;
  initialCameraId?: number;
}

export function ImageGallery({ companyId, projectId, initialCameraId }: ImageGalleryProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    images,
    cameras,
    currentCameraId,
    currentIndex,
    loading,
    loadingMore,
    hasMore,
    totalCount,
    currentImage,
    loadMoreImages,
    changeCamera,
    goToNext,
    goToPrev,
    selectImage,
  } = useImageGallery({
    companyId,
    projectId,
    initialCameraId,
  });

  const handleRetry = () => {
    window.location.reload();
  };

  // Loading state
  if (loading && images.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Loading image gallery...</p>
        </div>
    );
  }

  // Error state
  // if (!loading && images.length === 0) {
  //   return (
  //       <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
  //         <div className="text-center">
  //           <p className="text-gray-600 mb-4">No images found for the selected camera.</p>
  //           <Button onClick={handleRetry} variant="outline">
  //             <RefreshCw className="mr-2 h-4 w-4" />
  //             Try Again
  //           </Button>
  //         </div>
  //       </div>
  //   );
  // }

  return (
      <div className="relative">
        <ImageViewer
            images={images}
            currentIndex={currentIndex}
            onNext={goToNext}
            onPrev={goToPrev}
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            sidebarOpen={sidebarOpen}
        />

        <ImageSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            images={images}
            cameras={cameras}
            currentCameraId={currentCameraId}
            currentIndex={currentIndex}
            loading={loading}
            loadingMore={loadingMore}
            hasMore={hasMore}
            totalCount={totalCount}
            onImageSelect={selectImage}
            onCameraChange={changeCamera}
            onLoadMore={loadMoreImages}
        />
      </div>
  );
}