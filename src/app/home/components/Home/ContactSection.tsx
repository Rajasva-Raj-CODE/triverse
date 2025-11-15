"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IconHomeLink, IconPhoneCall, IconMailPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative max-w-7xl px-4 md:px-6 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 bg-card rounded-3xl shadow-2xl border border-border/50 p-8 md:p-10 lg:h-full flex flex-col relative overflow-hidden"
        >
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5 rounded-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mr-4 flex flex-col justify-center space-y-1"
              >
                <div className="flex space-x-1">
                  <motion.span
                    className="w-2.5 h-2.5 bg-brand-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span
                    className="w-2.5 h-2.5 bg-brand-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  />
                </div>
                <div className="flex space-x-1">
                  <motion.span
                    className="w-2.5 h-2.5 bg-brand-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  />
                  <motion.span
                    className="w-2.5 h-2.5 bg-brand-primary rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
              </motion.div>
              <div className="flex items-center gap-2">
             
                <h3 className="text-xl md:text-2xl font-bold tracking-wider text-foreground">
                  WHO WE ARE
                </h3>
              </div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-foreground leading-tight"
            >
              Have an upcoming{" "}
              <span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                project?
              </span>
            </motion.h2>

            <form className="space-y-6 flex-1 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileFocus={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                >
                  <Input
                    placeholder="Name"
                    className="h-14 rounded-xl border-2 border-border/50 bg-background/50 focus:border-brand-primary focus:bg-background transition-all duration-200 shadow-sm group-hover:shadow-md"
                  />
                </motion.div>
                <motion.div
                  whileFocus={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                >
                  <Input
                    type="email"
                    placeholder="E-Mail"
                    className="h-14 rounded-xl border-2 border-border/50 bg-background/50 focus:border-brand-primary focus:bg-background transition-all duration-200 shadow-sm group-hover:shadow-md"
                  />
                </motion.div>
                <motion.div
                  whileFocus={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                >
                  <Input
                    placeholder="Phone Number"
                    className="h-14 rounded-xl border-2 border-border/50 bg-background/50 focus:border-brand-primary focus:bg-background transition-all duration-200 shadow-sm group-hover:shadow-md"
                  />
                </motion.div>
                <motion.div
                  whileFocus={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="relative group"
                >
                  <Input
                    placeholder="Your Website"
                    className="h-14 rounded-xl border-2 border-border/50 bg-background/50 focus:border-brand-primary focus:bg-background transition-all duration-200 shadow-sm group-hover:shadow-md"
                  />
                </motion.div>
              </div>
              <motion.div
                whileFocus={{ scale: 1.01, y: -2 }}
                transition={{ duration: 0.2 }}
                className="relative group flex-1"
              >
                <Textarea
                  placeholder="Your Message Here"
                  rows={6}
                  className="rounded-xl border-2 border-border/50 bg-background/50 focus:border-brand-primary focus:bg-background transition-all duration-200 resize-none shadow-sm group-hover:shadow-md min-h-[150px]"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  className="group relative overflow-hidden w-full md:w-auto bg-brand-primary hover:bg-brand-primary/90 text-brand-text-primary font-bold px-10 py-7 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-brand-primary/30"
                >
                  <span className="relative z-10 flex items-center gap-3 text-base">
                    SUBMIT NOW
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-brand-secondary"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-3xl shadow-2xl border border-border/50 p-6 md:p-8 lg:h-full flex flex-col justify-between relative overflow-hidden"
        >
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 via-transparent to-brand-primary/5 rounded-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col gap-3 h-full justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-4 group p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 cursor-pointer"
            >
              <motion.div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-brand-primary/30 group-hover:to-brand-primary/20 transition-all duration-300 shadow-md group-hover:shadow-lg flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <IconHomeLink className="text-brand-primary w-7 h-7" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-lg text-foreground mb-1.5 group-hover:text-brand-primary transition-colors">
                  Office(India)
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A-19, Sector 4, Noida, UP
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-start gap-4 group p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 cursor-pointer"
            >
              <motion.div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-brand-primary/30 group-hover:to-brand-primary/20 transition-all duration-300 shadow-md group-hover:shadow-lg flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <IconMailPlus className="text-brand-primary w-7 h-7" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-lg text-foreground mb-1.5 group-hover:text-brand-primary transition-colors">
                  Email us
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  biz@guidona.com
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-4 group p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 cursor-pointer"
            >
              <motion.div
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-brand-primary/30 group-hover:to-brand-primary/20 transition-all duration-300 shadow-md group-hover:shadow-lg flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <IconPhoneCall className="text-brand-primary w-7 h-7" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-lg text-foreground mb-1.5 group-hover:text-brand-primary transition-colors">
                  Call Us
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  9990405622
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
