'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage, } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { loginUser } from '@/app/auth/api/login';
import { CustomSlider } from "@/app/auth/components/custom_slider";


const loginSchema = z.object({
  email: z.string().nonempty({ message: 'Email is required' }).email(),
  password: z.string().nonempty({ message: 'Password is required' }).min(8),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (values: LoginFormData) => {
    setLoading(true);
    setMessage('');

    try {
      const res = await loginUser(values);

      // ✅ Console full response
      console.log('Full login response:', res);

      // ✅ Console the token
      console.log('Token:', res.token);

      // ✅ Save token to localStorage
      localStorage.setItem('token', res.token);

      setMessage('Login successful!');
      router.push(res.route || '/dashboard/main');
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Login failed';
      console.error("Login error:", err);
      setMessage(msg);
    } finally {
      setLoading(false);
    }
  };





  return (
    <div className="w-full flex flex-col lg:flex-row relative min-h-screen bg-background">

      <CustomSlider />

      {/* Right Side: Login Form */}
      <div className="relative w-full lg:w-[35%] min-h-screen flex items-center justify-center px-4 py-12">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--brand-primary)/5,transparent_50%)]" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md z-10"
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
            <CardContent className="relative space-y-6 py-8 px-6 lg:px-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-center space-y-2"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Welcome Back 👋
                </h2>
                <p className="text-sm text-muted-foreground px-2">
                  Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
                </p>
              </motion.div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground font-medium">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Example@email.com"
                              type="email"
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
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between mb-2">
                            <FormLabel className="text-foreground font-medium">Password</FormLabel>
                            <Link
                              href="/auth/reset-password"
                              className="text-sm text-brand-primary hover:text-brand-primary/80 transition-colors duration-200 hover:underline font-medium"
                            >
                              Forgot Password?
                            </Link>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="At least 8 characters"
                              type="password"
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
                    <Button
                      type="submit"
                      className="w-full bg-brand-primary hover:bg-brand-primary/90 text-brand-text-primary h-11 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden group"
                      disabled={loading}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin h-4 w-4" />
                            Logging in...
                          </>
                        ) : (
                          'Sign in'
                        )}
                      </span>
                      {!loading && (
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
                      className={`text-sm text-center p-3 rounded-lg ${message.includes('success')
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                          : 'bg-destructive/10 text-destructive'
                        }`}
                    >
                      {message}
                    </motion.p>
                  )}





                  {/* Sign Up Link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="text-sm text-center text-muted-foreground pt-2"
                  >
                    <span>Don't you have an account? </span>
                    <Link
                      href="/auth/partner"
                      className="text-brand-primary hover:text-brand-primary/80 transition-colors duration-200 font-semibold hover:underline"
                    >
                      Sign up
                    </Link>
                  </motion.div>
                </form>
              </Form>

              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="text-xs text-muted-foreground text-center pt-4 border-t border-border/50"
              >
                © 2023 ALL RIGHTS RESERVED
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
