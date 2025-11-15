"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <div className="relative bg-cover bg-center bg-no-repeat overflow-hidden" style={{ backgroundImage: "url('/images/co.jpg')" }}>
      <div className="absolute inset-0 bg-background/80 dark:bg-background/90"></div>
      
      <div className="relative z-10 text-center px-6 py-20 sm:py-28 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/20 border border-brand-border-light mb-6"
        >
          <Sparkles className="w-4 h-4 text-brand-primary" />
          <p className="text-brand-primary font-semibold uppercase text-sm tracking-wider">
            Work with us !
          </p>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-foreground"
        >
          Have any upcoming project
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
        >
          Leverage agile frameworks to provide a robust synopsis for high level overviews.
          <br />
          Iterative approaches to corporate strategy foster collaborative thinking.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-brand-primary hover:bg-brand-primary/90 text-brand-text-primary font-semibold px-8 py-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              GET STARTED
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div
              className="absolute inset-0 bg-brand-secondary"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;
