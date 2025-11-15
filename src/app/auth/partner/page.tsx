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
      <div className="min-h-screen flex flex-col md:flex-row relative bg-background">

        <CustomSlider />

        {/* Right: Form */}
        <div className="w-full md:w-[35%] relative min-h-screen flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--brand-primary)/5,transparent_50%)]" />

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md z-10 relative"
          >
            {/* Mobile Header Image */}
            <div className="lg:hidden mb-6 -mt-8">
              <div className="relative w-full h-48 rounded-t-2xl overflow-hidden">
                <Image
                  src="/images/servic-2.jpg"
                  alt="Header"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              </div>
            </div>

            <Card className="relative bg-white dark:bg-card border-border/50 shadow-2xl overflow-hidden rounded-2xl lg:rounded-2xl">
              <CardContent className="relative py-8 px-6 lg:px-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="flex justify-center mb-4"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-xl" />
                    <Image src="/images/trilogo.jpg" alt="Logo" width={70} height={70} className="relative rounded-full" />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-center mb-6"
                >
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Become a Partner</h2>
                  <p className="text-sm text-muted-foreground mt-2 px-2">Join us and grow together</p>
                </motion.div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="flex gap-3"
                    >
                      <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                              <FormItem className="w-1/2">
                                <FormLabel className="text-foreground">First Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="First Name" 
                                    className="bg-background border-border focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-200 h-11" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                              <FormItem className="w-1/2">
                                <FormLabel className="text-foreground">Last Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="Last Name" 
                                    className="bg-background border-border focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-200 h-11" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                    >
                      <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Email</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder="Example@email.com" 
                                    className="bg-background border-border focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-200 h-11" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                    >
                      <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Message</FormLabel>
                                <FormControl>
                                  <Textarea
                                      placeholder="Your message"
                                      className="bg-background border-border focus:border-brand-primary focus:ring-brand-primary/20 transition-all duration-200 h-24 resize-none"
                                      {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                    >
                      <FormField
                          control={form.control}
                          name="isVerified"
                          render={({ field }) => (
                              <FormItem className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-border/50 bg-background/30">
                                <FormControl>
                                  <Checkbox
                                      id="verify"
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel htmlFor="verify" className="text-sm text-foreground cursor-pointer">
                                  I agree to the terms and conditions
                                </FormLabel>
                                <FormMessage />
                              </FormItem>
                          )}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                    >
                      <Button
                          type="submit"
                          className="w-full bg-brand-primary hover:bg-brand-primary/90 text-brand-text-primary h-11 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden group cursor-pointer"
                          disabled={form.formState.isSubmitting || loading}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {form.formState.isSubmitting || loading ? (
                              <>
                                <Loader2 className="animate-spin h-4 w-4" />
                                <span>Submitting...</span>
                              </>
                          ) : (
                              'Submit'
                          )}
                        </span>
                        {!loading && !form.formState.isSubmitting && (
                          <motion.div
                            className="absolute inset-0 bg-white/10"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </Button>
                    </motion.div>

                    {message && (
                        <motion.p
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`text-sm text-center p-3 rounded-lg ${
                                message.includes('success') 
                                  ? 'bg-green-500/10 text-green-600 dark:text-green-400' 
                                  : 'bg-destructive/10 text-destructive'
                            }`}
                        >
                          {message}
                        </motion.p>
                    )}
                  </form>
                </Form>

                {/* Copyright */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="text-xs text-muted-foreground text-center pt-4 border-t border-border/50 mt-6"
                >
                  © 2023 ALL RIGHTS RESERVED
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
