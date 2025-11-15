'use client';

import { useState, useEffect, useCallback } from 'react';
import { Allimages, getCameras, AllImagesRequest, ImageResponse, Camera } from '../api/all_images';
import { toast } from 'sonner';

interface UseImageGalleryProps {
  companyId: number;
  projectId: number;
  initialCameraId?: number;
}

export const useImageGallery = ({ companyId, projectId, initialCameraId }: UseImageGalleryProps) => {
  const [images, setImages] = useState<ImageResponse[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [currentCameraId, setCurrentCameraId] = useState<number>(initialCameraId || 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const LIMIT = 50;

  // Fetch cameras
  const fetchCameras = useCallback(async () => {
    try {
      const camerasData = await getCameras(projectId);
      setCameras(camerasData);
      
      // Set initial camera if not provided
      if (!initialCameraId && camerasData.length > 0) {
        setCurrentCameraId(camerasData[0].id);
      }
    } catch (error) {
      console.error('Error fetching cameras:', error);
      toast.error('Failed to load cameras');
    }
  }, [companyId, projectId, initialCameraId]);

  // Fetch images
  const fetchImages = useCallback(async (cameraId: number, skip: number = 0, append: boolean = false) => {
    const loadingState = skip > 0 ? setLoadingMore : setLoading;
    loadingState(true);

    try {
      const request: AllImagesRequest = {
        companyId,
        projectId,
        cameraId,
        limit: LIMIT,
        skip,
      };

      console.log('Fetching images with request:', request);
      const response = await Allimages(request);
      
      if (response.success) {
        const newImages = response.data;
        console.log('Successfully loaded', newImages.length, 'images');
        
        if (append) {
          setImages(prev => [...prev, ...newImages]);
        } else {
          setImages(newImages);
          setCurrentIndex(0);
        }
        
        setTotalCount(response.totle_count);
        setHasMore(newImages.length === LIMIT && (images.length + newImages.length) < response.totle_count);
      } else {
        console.error('API returned unsuccessful response:', response);
        toast.error(response.message || 'Failed to load images');
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      
      // More specific error messages
      if (error instanceof Error) {
        if (error.message.includes('Network Error')) {
          toast.error('Unable to connect to the server. Please check your API configuration.');
        } else if (error.message.includes('timeout')) {
          toast.error('Request timed out. Please try again.');
        } else {
          toast.error(`Failed to load images: ${error.message}`);
        }
      } else {
        toast.error('Failed to load images');
      }
    } finally {
      loadingState(false);
    }
  }, [companyId, projectId, images.length]);

  // Load more images
  const loadMoreImages = useCallback(() => {
    if (hasMore && !loadingMore) {
      fetchImages(currentCameraId, images.length, true);
    }
  }, [currentCameraId, images.length, hasMore, loadingMore, fetchImages]);

  // Change camera
  const changeCamera = useCallback((cameraId: number) => {
    setCurrentCameraId(cameraId);
    setImages([]);
    setHasMore(true);
    fetchImages(cameraId, 0, false);
  }, [fetchImages]);

  // Navigation
  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const selectImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Initialize
  useEffect(() => {
    fetchCameras();
  }, [fetchCameras]);

  useEffect(() => {
    if (currentCameraId) {
      fetchImages(currentCameraId, 0, false);
    }
  }, [currentCameraId, fetchImages]);

  return {
    images,
    cameras,
    currentCameraId,
    currentIndex,
    loading,
    loadingMore,
    hasMore,
    totalCount,
    currentImage: images[currentIndex],
    loadMoreImages,
    changeCamera,
    goToNext,
    goToPrev,
    selectImage,
  };
};