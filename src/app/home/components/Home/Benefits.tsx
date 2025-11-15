"use client";
import React from "react";
import { motion } from "framer-motion";
import { Building2, Cloud, Users, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Building2,
    title: "Complete Monitoring",
    description: "Advanced time-lapse cameras and 360° image tracking",
  },
  {
    icon: Cloud,
    title: "Cloud Integration",
    description: "Seamless integration with Autodesk Construction Cloud",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Enhanced transparency and collaboration across teams",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    description: "Real-time progress tracking and high-quality reporting",
  },
];

const Benefits = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-background">
      <div className="max-w-7xl px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-border-light mb-6"
          >
            <Building2 className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-medium text-brand-text-primary">
              About Triverse
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight">
            Why Choose Triverse?
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Triverse offers complete construction monitoring with advanced time-lapse cameras, 360° image tracking, material monitoring, and SCAN TO BIM. Integrated with Autodesk Construction Cloud and BIM-Revit models, it delivers a clear, data-rich project overview.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-brand-primary/50 transition-all duration-300 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:bg-brand-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-brand-primary hover:bg-brand-primary/90 text-brand-text-primary font-semibold px-8 py-6 rounded-xl transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Read More
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
    </section>
  );
};

export default Benefits;
