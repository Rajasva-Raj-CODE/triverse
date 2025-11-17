'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2, Eye, EyeOff } from 'lucide-react';
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
import { ThemeToggle } from "@/components/ThemeToggle";


const loginSchema = z.object({
  email: z.string().nonempty({ message: 'Email is required' }).email(),
  password: z.string().nonempty({ message: 'Password is required' }).min(8),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

      {/* Right Side: Login Form */}
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
                <h2 className="text-2xl font-bold text-white drop-shadow-lg">Welcome Back</h2>
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
                className="text-center space-y-3"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 mb-2"
                >
                  <span className="text-3xl">👋</span>
                </motion.div>
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Welcome Back
                </h2>
                <p className="text-sm text-muted-foreground px-2 leading-relaxed">
                  Today is a new day. It's your day. You shape it. Sign in to start managing your projects.
                </p>
              </motion.div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
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
                                placeholder="Example@email.com"
                                type="email"
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
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between mb-2.5">
                            <FormLabel className="text-foreground font-semibold text-sm">
                              Password
                            </FormLabel>
                            <Link
                              href="/auth/reset-password"
                              className="text-xs text-brand-primary hover:text-brand-primary/80 transition-all duration-200 font-medium hover:underline decoration-2 underline-offset-2"
                            >
                              Forgot Password?
                            </Link>
                          </div>
                          <FormControl>
                            <div className="relative group">
                              <Input
                                placeholder="At least 8 characters"
                                type={showPassword ? "text" : "password"}
                                className="bg-background/50 dark:bg-background/30 border-2 border-border/50 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all duration-300 h-12 rounded-xl pl-4 pr-12 text-base shadow-sm hover:shadow-md"
                                {...field}
                              />
                              <motion.div
                                className="absolute inset-0 rounded-xl bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                whileHover={{ opacity: 1 }}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 p-1.5 rounded-lg hover:bg-background/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                              >
                                {showPassword ? (
                                  <EyeOff className="w-5 h-5" />
                                ) : (
                                  <Eye className="w-5 h-5" />
                                )}
                              </button>
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
                      className="w-full bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary text-brand-text-primary h-12 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={loading}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2 text-base">
                        {loading ? (
                          <>
                            <Loader2 className="animate-spin h-5 w-5" />
                            <span>Logging in...</span>
                          </>
                        ) : (
                          <>
                            <span>Sign in</span>
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
                      {!loading && (
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





                  {/* Sign Up Link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="text-sm text-center text-muted-foreground pt-2"
                  >
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link
                      href="/auth/partner"
                      className="text-brand-primary hover:text-brand-primary/80 transition-all duration-200 font-semibold hover:underline decoration-2 underline-offset-2 inline-flex items-center gap-1 group"
                    >
                      <span>Sign up</span>
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
