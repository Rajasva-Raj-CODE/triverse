"use client";

import React from "react";

type FilePreviewProps = {
  files: File[];
};

const FilePreview: React.FC<FilePreviewProps> = ({ files }) => {
  if (files.length === 0) return null;

  return (
    <div className="mt-6 text-sm text-gray-700 space-y-1">
      <p className="font-semibold">Selected files:</p>
      {files.map((file, idx) => (
        <p key={idx}>• {file.name}</p>
      ))}
    </div>
  );
};

export default FilePreview;
