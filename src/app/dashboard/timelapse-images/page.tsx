'use client';

import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Toaster } from '@/components/ui/sonner';

export default function Home() {

  const companyId = 2;
  const projectId = 1;
  const initialCameraId = 1;

  return (
      <main className="min-h-screen">
        <ImageGallery
            companyId={companyId}
            projectId={projectId}
            initialCameraId={initialCameraId}
        />
        <Toaster />
      </main>
  );
}