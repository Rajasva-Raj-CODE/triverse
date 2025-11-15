"use client";
import React from "react";
import { motion } from "framer-motion";
import { Check, Video, Clock, MapPin, Mail, Share2, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Video, text: "Automated Time-lapse Generation" },
  { icon: Settings, text: "Tailored Reporting Tools" },
  { icon: Clock, text: "Customizable Time-lapse Settings" },
  { icon: Share2, text: "Interactive Project Timeline" },
  { icon: MapPin, text: "Geospatial Map Integration" },
  { icon: Mail, text: "Instant Email Alerts" },
  { icon: Share2, text: "Shareable Public View Page" },
  { icon: Users, text: "Unlimited User Access" },
];

const Timelapse = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-muted/30">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative max-w-7xl px-4 md:px-6 mx-auto grid grid-cols-1 xl:grid-cols-5 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-2 flex justify-center"
        >
          <div className="relative group">
            <motion.div
              className="absolute inset-0 bg-brand-primary/20 rounded-2xl blur-2xl group-hover:bg-brand-primary/30 transition-colors"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative rounded-2xl overflow-hidden border border-brand-border-light shadow-xl">
              <video
                src="/landing_page/videos/TL.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-contain w-full max-w-xs sm:max-w-sm md:max-w-md xl:max-w-full h-auto rounded-2xl"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-3 flex flex-col items-center xl:items-start text-center xl:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-border-light mb-6"
          >
            <Video className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-text-primary">
              Time-Lapse Technology
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
            Timelapse Camera
          </h2>

          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Triverse offers smart construction camera solutions tailored for the industry&apos;s unique needs, featuring high-resolution imaging, automated time-lapse video creation, real-time alerts, image annotation and comparison tools, and seamless integration with platforms like Procore, BIM, and scheduling software.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="group flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-brand-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center group-hover:bg-brand-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-brand-primary" />
                  </div>
                  <p className="text-sm sm:text-base font-medium text-foreground pt-2">
                    {feature.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-brand-primary hover:bg-brand-primary/90 text-brand-text-primary font-semibold px-8 py-6 rounded-xl transition-all duration-300"
            >
              <span className="relative z-10">Know More</span>
              <motion.div
                className="absolute inset-0 bg-brand-secondary"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timelapse;
