"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const FormButtons = () => {
  return (
    <div className="flex gap-4 justify-center pt-2">
      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6">
        Submit
      </Button>
      <Button
        variant="outline"
        className="border-yellow-400 text-yellow-500 hover:bg-yellow-100 font-semibold px-6"
      >
        Clear
      </Button>
    </div>
  );
};

export default FormButtons;
