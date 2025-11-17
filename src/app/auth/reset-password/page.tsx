'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import {CustomSlider} from "@/app/auth/components/custom_slider";
import { ThemeToggle } from "@/components/ThemeToggle";

const resetSchema = z.object({
  email: z
      .string()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Enter a valid email address' }),
});

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const form = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ResetFormData) => {
    // You can trigger the reset API here
    form.reset();
  };

  return (
      <div className="w-full flex flex-col lg:flex-row relative min-h-screen bg-background overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <CustomSlider />

        {/* Right Side: Reset Form */}
        <div className="relative w-full lg:w-[35%] min-h-screen flex items-center justify-center px-4 py-12">
          {/* Enhanced Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--brand-primary)/8,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--brand-secondary)/6,transparent_50%)]" />

          {/* Theme Toggle - Top Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-6 right-6 z-30"
          >
            <ThemeToggle variant="icon" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative w-full max-w-md z-10"
          >
            {/* Mobile Header Image */}
            <div className="lg:hidden mb-8 -mt-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative w-full h-56 rounded-t-3xl overflow-hidden shadow-2xl"
              >
                <Image
                  src="/images/servic-2.jpg"
                  alt="Header"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white drop-shadow-lg">Reset Password</h2>
                </div>
              </motion.div>
            </div>

            <Card className="relative bg-white/80 dark:bg-card/80 backdrop-blur-xl border-border/50 shadow-2xl overflow-hidden rounded-3xl lg:rounded-3xl border-2">
              {/* Decorative Gradient Overlay */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary" />
              
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }} />
              </div>

              <CardContent className="relative space-y-7 py-10 px-6 lg:px-10">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                  className="flex justify-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-brand-primary/30 rounded-full blur-2xl animate-pulse-slow" />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center border-4 border-brand-primary/20 shadow-xl">
                      <Mail className="w-10 h-10 text-brand-primary" />
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-center space-y-3"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Reset Password
                  </h2>
                  <p className="text-sm text-muted-foreground px-2 leading-relaxed">
                    Enter your registered email address and we'll send you a link to reset your password.
                  </p>
                </motion.div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground font-semibold text-sm mb-2.5 block">
                                  Email Address
                                </FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Input
                                        type="email"
                                        placeholder="Example@email.com"
                                        className="bg-background/50 dark:bg-background/30 border-2 border-border/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300 h-12 rounded-xl pl-4 pr-4 text-base shadow-sm hover:shadow-md"
                                        {...field}
                                    />
                                    <motion.div
                                      className="absolute inset-0 rounded-xl bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                      whileHover={{ opacity: 1 }}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage className="text-xs mt-1.5" />
                              </FormItem>
                          )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary text-brand-text-primary h-12 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2 text-base">
                          <Mail className="w-5 h-5" />
                          <span>Send Reset Link</span>
                          <motion.span
                            initial={{ x: -5, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >
                            →
                          </motion.span>
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <motion.div
                          className="absolute inset-0 bg-white/10"
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </motion.div>

                    {/* Back to Login Link */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      className="text-sm text-center text-muted-foreground pt-2"
                    >
                      <span className="text-muted-foreground">Remember your password? </span>
                      <Link
                        href="/auth/login"
                        className="text-brand-primary hover:text-brand-primary/80 transition-all duration-200 font-semibold hover:underline decoration-2 underline-offset-2 inline-flex items-center gap-1 group"
                      >
                        <span>Sign in</span>
                        <motion.span
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.div>
                  </form>
                </Form>

                {/* Copyright */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-xs text-muted-foreground/70 text-center pt-6 border-t border-border/30"
                >
                  © 2024 Triverse. All rights reserved.
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
  );
}
