"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

const Talk = () => {
  return (
   <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
      
        <div className="lg:col-span-2 space-y-6">
          <h4 className="text-yellow-500 font-semibold uppercase tracking-wide">Let &apos;s Talk</h4>
          <h2 className="text-3xl font-bold">Have an upcoming project?</h2>

        
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Name" />
              <Input type="email" placeholder="E-Mail" />
              <Input placeholder="Phone Number" />
              <Input placeholder="Your Website" />
            </div>
            <Textarea placeholder="Your Message Here" rows={5} />
            <Button type="submit" className="bg-yellow-500 text-black hover:bg-yellow-600">
              SUBMIT NOW
            </Button>
          </form>
        </div>

        
        <div className="space-y-6">
          
          <div className="bg-white p-6 shadow-md rounded-lg flex items-start gap-4">
            <MapPin className="text-yellow-500" />
            <div>
              <h4 className="font-semibold text-lg">USA office</h4>
              <p className="text-sm text-gray-700">55 Gerard Lane, NY 11201, USA</p>
            </div>
          </div>

          
          <div className="bg-white p-6 shadow-md rounded-lg flex items-start gap-4">
            <Mail className="text-yellow-500" />
            <div>
              <h4 className="font-semibold text-lg">Email us</h4>
              <p className="text-sm text-gray-700">test@gamil.com</p>
              <p className="text-sm text-gray-700">test2@gamil.com</p>
            </div>
          </div>

          
          <div className="bg-white p-6 shadow-md rounded-lg flex items-start gap-4">
            <Phone className="text-yellow-500" />
            <div>
              <h4 className="font-semibold text-lg">Call us</h4>
              <p className="text-sm text-gray-700">(+088) 589-8745</p>
              <p className="text-sm text-gray-700">(+088) 222-9999</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Talk
