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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {Form, FormField, FormItem, FormControl, FormLabel, FormMessage,} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { loginUser } from '@/app/auth/api/login';
import {CustomSlider} from "@/app/auth/components/custom_slider";


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
                    <Image 
                      src="/images/trilogo.jpg" 
                      alt="Logo" 
                      width={80} 
                      height={80} 
                      className="relative rounded-full"
                    />
                  </div>
                </motion.div>

                <div className="text-center space-y-2">
                  <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="text-2xl font-bold text-foreground"
                  >
                    Welcome Back
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="text-sm text-muted-foreground"
                  >
                    Sign in to continue to your account
                  </motion.p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                                      placeholder="Enter your email"
                                      type="email"
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
                      transition={{ delay: 0.6, duration: 0.4 }}
                    >
                      <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Password</FormLabel>
                                <FormControl>
                                  <Input
                                      placeholder="Enter your password"
                                      type="password"
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
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.4 }}
                      className="flex justify-end text-sm"
                    >
                      <Link 
                        href="/auth/reset-password" 
                        className="text-primary hover:text-primary/80 transition-colors duration-200 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                    >
                      <Button
                          type="submit"
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden group"
                          disabled={loading}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {loading ? (
                              <>
                                <Loader2 className="animate-spin h-4 w-4" />
                                Logging in...
                              </>
                          ) : (
                              'Login'
                          )}
                        </span>
                        {!loading && (
                          <motion.div
                            className="absolute inset-0 bg-primary-foreground/10"
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

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="text-sm text-center text-muted-foreground pt-4 border-t border-border/50"
                >
                  <Link 
                    href="/auth/partner" 
                    className="text-primary hover:text-primary/80 transition-colors duration-200 font-semibold hover:underline"
                  >
                    Become a partner here
                  </Link>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
  );
}
