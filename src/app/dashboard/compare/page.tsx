"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import {
  IconRefresh,
  IconLibraryPlus,
  IconX,
  IconCaretLeftRight,
} from "@tabler/icons-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Allimages,
  AllImagesRequest,
  ImageResponse,
} from "@/app/dashboard/compare/api/compare_images";

const defaultImages = [
  { src: "/images/black.png", alt: "Default Before", timestamp: "" },
  { src: "/images/white.png", alt: "Default After", timestamp: "" },
];

const cameraOptions = [
  { label: "Cam 1", value: 1 },
  { label: "Cam 2", value: 2 },
];

export default function CompareImagePage() {
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const imgAfterRef = useRef<HTMLDivElement | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [beforeImage, setBeforeImage] = useState(defaultImages[0]);
  const [afterImage, setAfterImage] = useState(defaultImages[1]);
  const [selectedCamera, setSelectedCamera] = useState<number>(1);
  const [imageList, setImageList] = useState<ImageResponse[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const limit = 50;

  const resetToDefault = () => {
    setBeforeImage(defaultImages[0]);
    setAfterImage(defaultImages[1]);

    if (sliderRef.current && lineRef.current && imgAfterRef.current) {
      sliderRef.current.value = "50";
      lineRef.current.style.left = "50%";
      imgAfterRef.current.style.clipPath = "inset(0px 0px 0px 50%)";
    }
  };

  const handleImageClick = (img: ImageResponse) => {
    if (beforeImage.src === img.s3_url || afterImage.src === img.s3_url) return;

    const newImage = {
      src: img.s3_url,
      alt: `Image ${img.image_id}`,
      timestamp: img.created_date,
    };

    if (afterImage.src === defaultImages[1].src) {
      setAfterImage(newImage);
    } else {
      setBeforeImage(newImage);
    }
  };

  const fetchImages = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const requestData: AllImagesRequest = {
      companyId: 2,
      projectId: 1,
      cameraId: selectedCamera,
      fromDate: "",
      toDate: "",
      limit,
      skip,
    };

    try {
      const res = await Allimages(requestData);
      const newImages = res.data;

      if (newImages.length < limit) {
        setHasMore(false);
      }

      setImageList((prev) => [...prev, ...newImages]);
      setSkip((prev) => prev + newImages.length);
    } catch (error) {
      console.error("Failed to fetch images", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCamera, skip, hasMore, loading]);

  useEffect(() => {
    setSkip(0);
    setHasMore(true);
    setImageList([]);
    resetToDefault();
  }, [selectedCamera]);

  useEffect(() => {
    if (imageList.length === 0) {
      fetchImages();
    }
  }, [imageList.length, fetchImages]);

  useEffect(() => {
    const container = document.querySelector(".sidebar-scrollable");

    const handleScroll = () => {
      if (!container || loading || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        fetchImages();
      }
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [fetchImages, loading, hasMore]);

  return (
      <div className="text-center relative bg-gray-100">
        <div className="mx-auto w-full sm:w-[90%] max-w-3xl flex justify-center items-center h-[calc(100vh-64px)] relative">
          <div className="relative w-full aspect-[3/2] sm:aspect-[3/2]">
            <div className="absolute w-full h-full overflow-hidden">
              <Image src={afterImage.src} alt="After" fill className="object-cover" />
            </div>

            <div className="absolute w-full h-full overflow-hidden" ref={imgAfterRef}>
              <Image src={beforeImage.src} alt="Before" fill className="object-cover" />
            </div>

            <div
                ref={lineRef}
                className="absolute top-0 bottom-0 w-1 bg-white z-20 cursor-ew-resize"
                style={{ left: "50%", transform: "translateX(-50%)" }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  const container = lineRef.current?.parentElement;
                  const containerRect = container?.getBoundingClientRect();
                  if (!containerRect) return;
                  const startX = e.clientX;
                  let hasDragged = false;

                  const onMouseMove = (moveEvent: MouseEvent) => {
                    const deltaX = moveEvent.clientX - startX;
                    if (Math.abs(deltaX) > 3) hasDragged = true;
                    if (!hasDragged) return;

                    const currentX = moveEvent.clientX - containerRect.left;
                    const newPercent = Math.min(100, Math.max(0, (currentX / containerRect.width) * 100));
                    if (lineRef.current && imgAfterRef.current) {
                      lineRef.current.style.left = `${newPercent}%`;
                      imgAfterRef.current.style.clipPath = `inset(0px 0px 0px ${newPercent}%)`;
                    }
                  };

                  const onMouseUp = () => {
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", onMouseUp);
                  };

                  document.addEventListener("mousemove", onMouseMove);
                  document.addEventListener("mouseup", onMouseUp);
                }}
            >
              <div
                  className="absolute top-1/2 left-1/2 w-10 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center shadow-md z-30"
                  style={{ transform: "translate(-50%, -50%)" }}
              >
                <IconCaretLeftRight stroke={2} size={32} className="text-gray-600 pointer-events-none" />
              </div>
            </div>

            <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                ref={sliderRef}
                className="absolute w-full h-full appearance-none bg-transparent z-20 pointer-events-none"
            />
          </div>

          <button
              onClick={() => setSidebarOpen(true)}
              className="mt-[30px] absolute top-2 right-2 bg-yellow-500 text-white w-10 h-10 rounded-full shadow hover:bg-yellow-400 z-30 flex items-center justify-center cursor-pointer"
          >
            <IconLibraryPlus stroke={2} size={20} />
          </button>

          <button
              onClick={resetToDefault}
              className="mt-[30px] absolute top-2 left-2 bg-gray-600 text-white px-3 py-1 rounded shadow hover:bg-gray-700 text-sm z-30 cursor"
          >
            <IconRefresh stroke={2} />
          </button>
        </div>

        {sidebarOpen && (
            <>
              <div className="fixed inset-0 z-30 bg-black/10 pointer-events-none" />

              <aside
                  className={clsx(
                      "fixed right-0 top-[53px] h-full w-[200px] bg-white shadow-xl border-l z-40 transition-transform duration-300",
                      sidebarOpen ? "translate-x-0" : "translate-x-full"
                  )}
              >
                <div className="relative h-full flex flex-col">
                  <div className="px-4 py-3 border-b bg-white sticky z-10 flex items-center justify-between gap-2">
                    <Select
                        value={selectedCamera.toString()}
                        onValueChange={(val) => setSelectedCamera(Number(val))}
                    >
                      <SelectTrigger className="w-[125px] h-8 text-sm bg-yellow-300">
                        <SelectValue placeholder="Select camera" />
                      </SelectTrigger>
                      <SelectContent>
                        {cameraOptions.map((cam) => (
                            <SelectItem key={cam.value} value={cam.value.toString()}>
                              {cam.label}
                            </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-gray-500 hover:text-black text-lg leading-none"
                    >
                      <IconX stroke={2} />
                    </button>
                  </div>

                  <div className="p-3 space-y-3 overflow-y-auto sidebar-scrollable">
                    {imageList.map((img, idx) => {
                      const isSelected = beforeImage.src === img.s3_url || afterImage.src === img.s3_url;
                      return (
                          <div
                              key={idx}
                              className="rounded-md border border-gray-200 hover:shadow-md transition cursor-pointer overflow-hidden shadow-sm p-2"
                          >
                            <div className="relative">
                              <Image
                                  src={img.s3_url}
                                  alt={`Image ${img.image_id}`}
                                  width={160}
                                  height={100}
                                  className="object-cover rounded cursor-pointer"
                                  onClick={() => handleImageClick(img)}
                              />
                              <input
                                  type="checkbox"
                                  checked={isSelected}
                                  readOnly
                                  className="absolute top-1 right-1 w-4 h-4 accent-yellow-500 pointer-events-none"
                              />
                            </div>
                            <p className="text-[11px] bg-yellow-400 text-white text-center py-1 font-medium border border-yellow-400 mt-2">
                              {img.created_date.split("T")[0]} - Cam {img.cam_id}
                            </p>
                          </div>
                      );
                    })}

                    {loading && (
                        <p className="text-center text-sm text-gray-400">Loading more...</p>
                    )}
                    {!hasMore && (
                        <p className="text-center text-xs text-gray-500 mt-4">No more images</p>
                    )}
                  </div>
                </div>
              </aside>
            </>
        )}
      </div>
  );
}
