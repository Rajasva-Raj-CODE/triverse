"use client";

import { Dialog, DialogContent} from "@/components/ui/dialog";
import { CustomLapseForm } from "@/app/dashboard/timelapse/components/form/CustomLapseForm";
import AdvanceLapseForms from "@/app/dashboard/timelapse/components/form/advanced_timelapse/main";

interface CreateTimelapseDialogProps {
  type: "custom" | "advance";
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTimelapseDialog({ type, isOpen, onClose }: CreateTimelapseDialogProps) {

  return (
      <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="w-full md:w-[1000px] h-[80vh] overflow-y-auto">

          {type === "custom" ? (
              <CustomLapseForm/>
          ) : (
              <AdvanceLapseForms/>
          )}
        </DialogContent>
      </Dialog>
  );
}
