"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type Props = {
  label: string;
  type: "text" | "date" | "select"|"time";
  options?: string[]; // only for type === "select"
};

const FormField = ({ label, type, options = [] }: Props) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {type === "select" ? (
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option, i) => (
              <SelectItem key={i} value={option.toLowerCase()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input type={type} />
      )}
    </div>
  );
};

export default FormField;
