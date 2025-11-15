"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { IconChevronRight } from "@tabler/icons-react";
import { IconHomeLink } from "@tabler/icons-react";
import { IconPhoneCall } from "@tabler/icons-react";
import { IconMailPlus } from "@tabler/icons-react";
import CallToAction from "../Home/CallToAction";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    services: [
      "Time-Lapse Monitoring",
      "360° Interior Monitoring (In development)",
      "Virtual Interior Tour (In development)",
      "Project Planning Integration",
    ],
    resources: [
      "Demonstration Videos",
      "Time-Lapse Showcases",
      "Construction Gallery",
      "Sample Images",
      "Why TRIVERSE?",
    ],
  };

  const socialLinks = [
    { icon: FaFacebookF, href: "#" },
    { icon: FaTwitter, href: "#" },
    { icon: BsInstagram, href: "#" },
    { icon: FaLinkedinIn, href: "#" },
    { icon: FaYoutube, href: "#" },
  ];

  return (
    <div>
      <CallToAction />
      <footer className="relative pt-16 pb-8 bg-card border-t border-border">
        <div className="max-w-7xl px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-bold text-foreground mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Address</h4>
                    <p className="text-sm text-muted-foreground">
                      A-18 2nd Floor Sector 4, Noida
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">
                      Mobile Number
                    </h4>
                    <p className="text-sm text-muted-foreground">9990405622</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-brand-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-sm text-muted-foreground">biz@guidona.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="space-y-5"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">Our Services</h3>
              <div className="space-y-3">
                {footerLinks.services.map((service, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-brand-primary transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <IconChevronRight
                      stroke={2}
                      className="mr-2 w-4 h-4 group-hover:text-brand-primary transition-colors"
                    />
                    <span>{service}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-5"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                Resources and Comparisons
              </h3>
              <div className="space-y-3">
                {footerLinks.resources.map((resource, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="flex items-center text-sm font-medium text-muted-foreground hover:text-brand-primary transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <IconChevronRight
                      stroke={2}
                      className="mr-2 w-4 h-4 group-hover:text-brand-primary transition-colors"
                    />
                    <span>{resource}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl p-6 border border-brand-border-light flex flex-col items-center space-y-6"
            >
              <h3 className="text-xl font-bold text-foreground text-center">
                Need Assistance?
              </h3>
              <p className="text-sm font-medium text-muted-foreground text-center">
                help@triverse.com
              </p>
              <div className="w-full h-px bg-border"></div>
              <h4 className="text-lg font-semibold text-foreground underline text-center">
                Find Us:
              </h4>

              <div className="flex items-center justify-center space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-brand-primary hover:border-brand-primary transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>

              <motion.a
                href="#"
                className="w-full px-6 py-3 text-center text-sm font-semibold bg-brand-primary hover:bg-brand-primary/90 text-brand-text-primary rounded-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get the App
              </motion.a>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground"
          >
            <p className="text-center md:text-left mb-4 md:mb-0">
              © Copyright 2025 TriverseⓇ. All rights are reserved. Unauthorized use or
              reproduction of content is strictly prohibited.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
