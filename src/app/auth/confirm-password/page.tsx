'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Lock, KeyRound } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {Form, FormField, FormItem, FormControl, FormLabel, FormMessage,} from '@/components/ui/form'

import {CustomSlider} from "@/app/auth/components/custom_slider"; // ✅ Imported Slider component

// ✅ Zod Schema
const confirmPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/^(?=.*[a-zA-Z])(?=.*\d)?/, {
                message: 'Password must contain letters and optionally numbers',
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

type ConfirmPasswordForm = z.infer<typeof confirmPasswordSchema>

export default function ConfirmPasswordPage() {
    const form = useForm<ConfirmPasswordForm>({
        resolver: zodResolver(confirmPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = (data: ConfirmPasswordForm) => {
        console.log('✅ Password reset:', data)
        alert('Password successfully reset!')
    }

    return (
        <div className="min-h-screen flex flex-col lg:flex-row relative bg-background">

            <CustomSlider />

            {/* Right Form Section */}
            <div className="relative w-full lg:w-[35%] flex items-center justify-center px-4 py-10">
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
                                        <Lock className="w-8 h-8 text-primary" />
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
                                <p className="text-sm text-muted-foreground">Enter your new password</p>
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
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-foreground">New Password</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                            <Input
                                                                type="password"
                                                                placeholder="Enter new password"
                                                                className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-200 h-11 pl-10"
                                                                {...field}
                                                            />
                                                        </div>
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
                                            name="confirmPassword"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-foreground">Confirm Password</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                            <Input
                                                                type="password"
                                                                placeholder="Confirm new password"
                                                                className="bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-200 h-11 pl-10"
                                                                {...field}
                                                            />
                                                        </div>
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
                                        <Button
                                            type="submit"
                                            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                <Lock className="w-4 h-4" />
                                                Reset Password
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
    )
}
