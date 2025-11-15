"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CameraOptions = () => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">Camera Options</Label>
    <RadioGroup defaultValue="Cam 1" className="flex flex-wrap gap-4">
      {["Cam 1", "Cam 2", "Cam 3", "Cam 4"].map((cam) => (
        <div key={cam} className="flex items-center space-x-2">
          <RadioGroupItem value={cam} id={cam} />
          <Label htmlFor={cam}>{cam}</Label>
        </div>
      ))}
    </RadioGroup>
  </div>
);

export default CameraOptions;
