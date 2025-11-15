"use client";

import React, { useState } from "react";
import {Tabs, TabsList, TabsTrigger, TabsContent,} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {Popover, PopoverTrigger, PopoverContent,} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { IconCalendar, IconFileText, IconMail } from "@tabler/icons-react";
import { format } from "date-fns";
import jsPDF from "jspdf";

export default function ReportPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const generatePdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Instant report", 10, 20);

    if (selectedDate) {
      doc.setFontSize(12);
      doc.text(`Date: ${format(selectedDate, "PPP")}`, 10, 30);
    }

    doc.text("Email: example@example.com", 10, 40);
    doc.text("report generated using Guidona's system.", 10, 50);

    doc.save("report.pdf");
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-auto  sm:p-6 md:p-8">
      <Tabs
        defaultValue="detailed"
        className="w-full sm:max-w-20xl max-w-7xl mx-auto flex flex-col gap-6"
      >
        {/* Tab Headers */}
        <TabsList className="grid grid-cols-2 w-full bg-yellow-300 text-black rounded-md overflow-hidden">
          <TabsTrigger
            value="detailed"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:font-bold"
          >
            Detailed Report
          </TabsTrigger>
          <TabsTrigger
            value="instant"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:font-bold"
          >
            Instant Report
          </TabsTrigger>
        </TabsList>

        {/* Detailed report */}
        <TabsContent value="detailed">
  <div className="flex flex-col gap-4 h-[calc(100vh-150px)] overflow-y-auto pr-2">
    <div className="flex gap-4 flex-wrap items-start">
      {/* Date & Time Picker Popover */}
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            className="bg-yellow-400 text-black hover:bg-yellow-500"
            onClick={() => setCalendarOpen((prev) => !prev)}
          >
            Add images to report 📎
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2 space-y-2">
          <div>
            <Label className="text-sm">Select Date</Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </div>
          <div>
            <Label htmlFor="time" className="text-sm">Select Time</Label>
            <Input
              type="time"
              id="time"
              className="mt-1"
            />
          </div>
        </PopoverContent>
      </Popover>

      <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
        Add/Edit Notes ✏️
      </Button>
    </div>

    <Textarea
      placeholder="*notes added by user*"
      className="text-sm border"
      rows={3}
    />

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="min-h-[200px] bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-600 text-center p-2">
        *Added images to report with notes added individually*
      </div>
        <div className="min-h-[200px] bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-600 text-center p-2">
   
      </div>
        <div className="min-h-[200px] bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-600 text-center p-2">
       
      </div>
        <div className="min-h-[200px] bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-600 text-center p-2">
    
      </div>
        <div className="min-h-[200px] bg-gray-200 rounded border flex items-center justify-center text-xs text-gray-600 text-center p-2">
  
      </div>
      <div className="min-h-[200px] bg-gray-200 rounded border" />
    </div>

    <div className="flex flex-wrap justify-center gap-4">
      <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
        Generate Report
      </Button>
      <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
        Previous Reports
      </Button>
    </div>
  </div>
</TabsContent>


        {/* Instant report */}
        <TabsContent value="instant">
  <div className="flex flex-col gap-6 h-[calc(100vh-150px)] overflow-y-auto ">
    {/* Image Grid with Calendar */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Box 1 */}
      <div className="relative w-full aspect-video border border-gray-300 bg-white flex flex-col items-center justify-center p-4">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <IconCalendar
              className="text-black w-6 h-6 absolute top-2 left-2 cursor-pointer"
              onClick={() => setCalendarOpen((open) => !open)}
            />
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 mt-1">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setCalendarOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {selectedDate && (
          <div className="text-sm text-gray-600 mt-2">
            {format(selectedDate, "PPP")}
          </div>
        )}
      </div>

      {/* Box 2 */}
      <div className="relative w-full aspect-video border border-gray-300 bg-black flex items-center justify-center">
        <IconCalendar className="absolute top-2 left-2 text-white w-5 h-5" />
      </div>
    </div>

    {/* PDF / Mail Buttons */}
    <div className="flex flex-wrap justify-end gap-2">
      <Button
        onClick={generatePdf}
        className="bg-yellow-400 text-black hover:bg-yellow-500"
      >
        <IconFileText className="mr-2 h-4 w-4" />
        PDF Report
      </Button>
      <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
        <IconMail className="mr-2 h-4 w-4" />
        Mail Report
      </Button>
    </div>

    {/* Schedule report Form */}
    <div className="border border-blue-400 rounded-md p-4 space-y-4">
      <h3 className="text-lg font-semibold">Schedule Report</h3>

      <Input type="email" placeholder="Email" />

      <RadioGroup
        defaultValue="weekly"
        className="flex flex-wrap gap-6 pt-2"
      >
        {["weekly", "biweekly", "monthly"].map((value) => (
          <div className="flex items-center space-x-2" key={value}>
            <RadioGroupItem value={value} id={value} />
            <Label htmlFor={value} className="capitalize">
              {value}
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {["Cam 1", "Cam 2", "Cam 3", "Cam 4"].map((label, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <Checkbox id={`cam${idx + 1}`} defaultChecked={idx === 0} />
            <Label htmlFor={`cam${idx + 1}`}>{label}</Label>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-end gap-2 pt-2">
        <Button
          type="submit"
          className="bg-yellow-400 text-black hover:bg-yellow-500"
        >
          Submit
        </Button>
        <Button
          variant="outline"
          className="text-black border-yellow-400 hover:bg-yellow-100"
        >
          Clear
        </Button>
      </div>
    </div>
  </div>
</TabsContent>

      </Tabs>
    </div>
  );
}
