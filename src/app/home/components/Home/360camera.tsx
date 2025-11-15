"use client";
import React from "react";
import { motion } from "framer-motion";
import { Camera, Map, Eye, GitCompare, Layers, File } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Map, text: "360° Image Overlay on Floor Plans" },
  { icon: Eye, text: "360° Interactive Virtual Walkthroughs" },
  { icon: Camera, text: "360° Progress Tracking Timeline" },
  { icon: GitCompare, text: "360° Visual Comparison Tool" },
  { icon: Layers, text: "360° and BIM 4D Side-by-Side View" },
  { icon: File, text: "360° On-Site Visual Documentation" },
];

const Camera360 = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-background">
      <div className="max-w-7xl px-4 md:px-6 mx-auto grid grid-cols-1 xl:grid-cols-5 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-3 flex flex-col items-center xl:items-start text-center xl:text-left order-2 xl:order-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-border-light mb-6"
          >
            <Camera className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-text-primary">
              360° Monitoring
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
            360 Camera
          </h2>

          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            Triverse improves construction site visibility by capturing 360° images and videos overlaid on floor plans to monitor interior progress in real time. Its built-in tools support reporting, remote tracking, and team collaboration through an always-ready dashboard.
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

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-2 flex justify-center order-1 xl:order-2"
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
                src="/landing_page/videos/360.mp4"
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
      </div>
    </section>
  );
};

export default Camera360;
