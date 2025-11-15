"use client";
import React, { useState } from "react";
import Dropzone from "@/app/dashboard/components/media/Dropzone";
import UploadControls from "@/app/dashboard/components/media/UploadControls";
import FilePreview from "@/app/dashboard/components/media/FilePreview";

export default function MediaUploadPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<string | undefined>();
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setFiles([...files, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...newFiles]);
  };

  const handleClear = () => setFiles([]);

  const handleUpload = () => {
    alert(`Uploading ${files.length} file(s) to ${selectedAlbum || "no album"}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-white">
      <div className="w-full max-w-xl border rounded-lg p-6 shadow-md">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">Media Upload</h1>

        <Dropzone onDrop={handleDrop} onFileChange={handleFileChange} />
        <UploadControls
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
          files={files}
          onUpload={handleUpload}
          onClear={handleClear}
        />
        <FilePreview files={files} />
      </div>
    </div>
  );
}
