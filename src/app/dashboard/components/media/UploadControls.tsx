"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UploadControlsProps = {
  selectedAlbum?: string;
  setSelectedAlbum: (val: string) => void;
  files: File[];
  onUpload: () => void;
  onClear: () => void;
};

const UploadControls: React.FC<UploadControlsProps> = ({
  selectedAlbum,
  setSelectedAlbum,
  files,
  onUpload,
  onClear,
}) => (
  <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
   <Select value={selectedAlbum} onValueChange={setSelectedAlbum}>
  <SelectTrigger className="sm:w-40">
    <SelectValue placeholder="Add to album" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="album1">Album 1</SelectItem>
    <SelectItem value="album2">Album 2</SelectItem>
    <SelectItem value="album3">Album 3</SelectItem>
  </SelectContent>
</Select>


    <div className="flex gap-2 justify-end sm:justify-start">
      <Button onClick={onUpload} disabled={files.length === 0}>
        Upload
      </Button>
      <Button variant="outline" onClick={onClear} disabled={files.length === 0}>
        Clear
      </Button>
    </div>
  </div>
);

export default UploadControls;
