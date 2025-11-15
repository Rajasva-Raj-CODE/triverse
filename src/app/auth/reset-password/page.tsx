'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
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
import {CustomSlider} from "@/app/auth/components/custom_slider"; // ✅ Reusable slider

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
      <div className="w-full flex flex-col lg:flex-row relative min-h-screen bg-background">

        <CustomSlider />

        {/* Right Side: Reset Form */}
        <div className="relative w-full lg:w-[35%] min-h-screen flex items-center justify-center px-4 py-12">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--brand-primary)/5,transparent_50%)]" />
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md z-10"
          >
            <Card className="relative backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
              <CardContent className="relative space-y-6 py-8 px-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-brand-primary/20 rounded-full blur-xl" />
                    <div className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-center space-y-2"
                >
                  <h2 className="text-2xl font-bold text-foreground">Reset Password</h2>
                  <p className="text-sm text-muted-foreground">
                    Enter your registered email to receive the reset link
                  </p>
                </motion.div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
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
                                      placeholder="Enter your email"
                                      className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-200 h-11"
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
                      <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <Mail className="w-4 h-4" />
                          Send Reset Link
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-primary-foreground/10"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
  );
}
