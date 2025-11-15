"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { AnimatedGradient } from "@/components/ui/aceternity/animated-gradient";

const Hero = () => {
  return (
    <AnimatedGradient className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <Spotlight className="top-0 left-0 opacity-40" fill="var(--brand-primary)" />
      {/* Enhanced animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-primary/25 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-secondary/25 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-brand-primary/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 w-[90%] md:w-[80%] mx-auto items-center grid grid-cols-1 xl:grid-cols-2 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center xl:text-left"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-primary/15 via-brand-primary/10 to-brand-secondary/15 border border-brand-border-light backdrop-blur-md mb-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Zap className="w-4 h-4 text-brand-primary" />
            </motion.div>
            <span className="text-sm font-semibold text-brand-text-primary bg-gradient-to-r from-brand-text-primary to-brand-text-secondary bg-clip-text text-transparent">
              Advanced Construction Monitoring
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-tight mb-6"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Surveillance and{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient"
            >
              Monitoring Services
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto xl:mx-0 leading-relaxed"
          >
            Triverse offers advanced construction monitoring through time-lapse cameras, 360° image tracking, and virtual site documentation. Integrated with Autodesk Construction Cloud and BIM-Revit, it ensures real-time progress tracking, enhanced visibility, and streamlined reporting across all project stages.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 w-fit mx-auto xl:mx-0"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary text-brand-text-primary font-bold px-10 py-7 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-[0_20px_50px_rgba(255,154,0,0.4)] border border-brand-border-light"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get a quote
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand-secondary to-brand-primary/50"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-border hover:border-brand-primary text-foreground font-semibold px-10 py-7 rounded-2xl transition-all duration-300 backdrop-blur-sm bg-background/60 hover:bg-background/80 shadow-lg hover:shadow-xl"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative mx-auto xl:mx-0 hidden xl:block"
        >
          <div className="relative group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-brand-secondary/20 to-brand-primary/30 rounded-3xl blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="relative rounded-3xl overflow-hidden border-2 border-brand-border-light shadow-2xl backdrop-blur-sm bg-gradient-to-br from-background/50 to-background/30"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent z-10" />
              <Image
                src="/landing_page/images/cons.jpg"
                alt="Construction monitoring"
                width={600}
                height={800}
                className="object-cover w-full h-auto relative z-0"
                priority
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AnimatedGradient>
  );
};

export default Hero;
