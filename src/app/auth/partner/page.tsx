'use client';

import { createPartner } from 'app/auth/api/partner';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from '@/components/ui/form';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,} from '@/components/ui/dialog';
import {CustomSlider} from "@/app/auth/components/custom_slider";
import { ThemeToggle } from "@/components/ThemeToggle";


const signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Enter a valid email'),
  message: z.string().optional(),
  isVerified: z.literal(true, {
    errorMap: () => ({ message: 'Please verify before Submit .' }),
  }),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function Partner() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      isVerified: true,
    },
  });

  const onSubmit: SubmitHandler<SignupFormData> = async (values) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await createPartner(values);
      console.log('✅ Partner created:', response);
      setMessage('Partner registration successful!');
      setShowDialog(true);
    } catch (error: any) {
      console.error('❌ Error creating partner:', error);
      setMessage(error?.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex flex-col md:flex-row relative bg-background overflow-hidden">
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

        {/* Right: Form */}
        <div className="w-full md:w-[35%] relative min-h-screen flex items-center justify-center px-4 py-8">
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
            className="w-full max-w-md z-10 relative"
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
                  <h2 className="text-2xl font-bold text-white drop-shadow-lg">Become a Partner</h2>
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

              <CardContent className="relative py-10 px-6 lg:px-10">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                  className="flex justify-center mb-6"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-brand-primary/30 rounded-full blur-2xl animate-pulse-slow" />
                    <div className="relative">
                      <Image 
                        src="/images/trilogo.jpg" 
                        alt="Logo" 
                        width={80} 
                        height={80} 
                        className="rounded-full border-4 border-brand-primary/20 shadow-xl" 
                      />
                    </div>
                  </motion.div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-center mb-8 space-y-2"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Become a Partner
                  </h2>
                  <p className="text-sm text-muted-foreground px-2 leading-relaxed">
                    Join us and grow together. Let's build something amazing.
                  </p>
                </motion.div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="flex gap-3"
                    >
                      <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                              <FormItem className="w-1/2">
                                <FormLabel className="text-foreground font-semibold text-sm mb-2.5 block">
                                  First Name
                                </FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Input 
                                      placeholder="First Name" 
                                      className="bg-background/50 dark:bg-background/30 border-2 border-border/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300 h-12 rounded-xl text-base shadow-sm hover:shadow-md" 
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
                      <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                              <FormItem className="w-1/2">
                                <FormLabel className="text-foreground font-semibold text-sm mb-2.5 block">
                                  Last Name
                                </FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Input 
                                      placeholder="Last Name" 
                                      className="bg-background/50 dark:bg-background/30 border-2 border-border/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300 h-12 rounded-xl text-base shadow-sm hover:shadow-md" 
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
                                      className="bg-background/50 dark:bg-background/30 border-2 border-border/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300 h-12 rounded-xl text-base shadow-sm hover:shadow-md" 
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
                      transition={{ delay: 0.7, duration: 0.5 }}
                    >
                      <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground font-semibold text-sm mb-2.5 block">
                                  Message
                                </FormLabel>
                                <FormControl>
                                  <div className="relative group">
                                    <Textarea
                                        placeholder="Tell us about yourself and your interest in partnering..."
                                        className="bg-background/50 dark:bg-background/30 border-2 border-border/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300 h-28 rounded-xl resize-none text-base shadow-sm hover:shadow-md"
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
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <FormField
                          control={form.control}
                          name="isVerified"
                          render={({ field }) => (
                              <FormItem className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border-2 border-border/50 bg-background/30 hover:bg-background/50 transition-all duration-300 group">
                                <FormControl>
                                  <Checkbox
                                      id="verify"
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                      className="mt-0.5"
                                  />
                                </FormControl>
                                <FormLabel htmlFor="verify" className="text-sm text-foreground cursor-pointer leading-relaxed flex-1">
                                  I agree to the <span className="text-brand-primary font-semibold hover:underline">terms and conditions</span>
                                </FormLabel>
                                <FormMessage className="text-xs mt-1.5" />
                              </FormItem>
                          )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary text-brand-text-primary h-12 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                          disabled={form.formState.isSubmitting || loading}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2 text-base">
                          {form.formState.isSubmitting || loading ? (
                              <>
                                <Loader2 className="animate-spin h-5 w-5" />
                                <span>Submitting...</span>
                              </>
                          ) : (
                              <>
                                <span>Submit Application</span>
                                <motion.span
                                  initial={{ x: -5, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.1 }}
                                >
                                  →
                                </motion.span>
                              </>
                          )}
                        </span>
                        {!loading && !form.formState.isSubmitting && (
                          <>
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
                          </>
                        )}
                      </Button>
                    </motion.div>

                    {message && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`text-sm text-center p-4 rounded-xl border-2 ${
                                message.includes('success') 
                                  ? 'bg-green-500/10 dark:bg-green-500/5 text-green-600 dark:text-green-400 border-green-500/20' 
                                  : 'bg-destructive/10 dark:bg-destructive/5 text-destructive border-destructive/20'
                            }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {message.includes('success') ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring" }}
                              >
                                ✓
                              </motion.div>
                            ) : (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring" }}
                              >
                                ✕
                              </motion.div>
                            )}
                            <span>{message}</span>
                          </div>
                        </motion.div>
                    )}
                  </form>
                </Form>

                {/* Copyright */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-xs text-muted-foreground/70 text-center pt-6 border-t border-border/30 mt-6"
                >
                  © 2024 Triverse. All rights reserved.
                </motion.div>
              </CardContent>
            </Card>

            {/* Dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogContent className="sm:max-w-md bg-card border-border/50">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Thank You!</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground">
                  Thank you for showing interest in becoming a Partner with TRIVERSE! <br />
                  We have received your query and will reach out to the given Email within 24–48 hours.
                </div>
                <DialogFooter>
                  <Button
                      onClick={() => {
                        setShowDialog(false);
                        router.push('/home');
                      }}
                      className="bg-brand-primary hover:bg-brand-primary/90 text-brand-text-primary"
                  >
                    Continue
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
  );
}
