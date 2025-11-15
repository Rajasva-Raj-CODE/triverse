"use client";

import React from "react";

type DropzoneProps = {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Dropzone: React.FC<DropzoneProps> = ({ onDrop, onFileChange }) => (
  <div
    className="border-2 border-dashed border-blue-400 bg-blue-100/50 rounded-md h-48 flex items-center justify-center text-center text-sm text-gray-600 cursor-pointer transition hover:bg-blue-100"
    onDrop={onDrop}
    onDragOver={(e) => e.preventDefault()}
  >
    <label htmlFor="file-upload" className="w-full h-full flex flex-col justify-center items-center cursor-pointer">
      <span>📤 Drag and drop or <span className="text-blue-600 underline">click here</span> to upload</span>
      <input
        id="file-upload"
        type="file"
        multiple
        className="hidden"
        onChange={onFileChange}
      />
    </label>
  </div>
);

export default Dropzone;
