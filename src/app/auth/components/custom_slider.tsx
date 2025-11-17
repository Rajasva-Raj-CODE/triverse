'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spotlight } from '@/components/ui/aceternity/spotlight';
import { AnimatedGradient } from '@/components/ui/aceternity/animated-gradient';
import { cn } from '@/lib/utils';

const images = [
    '/images/servic-2.jpg',
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/after.png',
];

const slideContent = [
    { title: 'Welcome to Triverse', subtitle: 'Transform your construction projects with cutting-edge technology' },
    { title: '360° Views', subtitle: 'Experience immersive virtual tours of your projects' },
    { title: 'Time-lapse Magic', subtitle: 'Watch your projects come to life with stunning time-lapse videos' },
    { title: 'Compare & Analyze', subtitle: 'Track progress with powerful before and after comparisons' },
];

export function CustomSlider() {
    const totalSlides = images.length;
    const [index, setIndex] = useState(0);
    const [transition, setTransition] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clearAutoSlide = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    const startAutoSlide = useCallback(() => {
        clearAutoSlide();
        if (!isHovered) {
            timeoutRef.current = setTimeout(() => {
                setIndex((prev) => prev + 1);
            }, 5000);
        }
    }, [clearAutoSlide, isHovered]);

    useEffect(() => {
        if (!document.hidden) startAutoSlide();
        const handleVisibilityChange = () => {
            if (document.hidden) clearAutoSlide();
            else startAutoSlide();
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            clearAutoSlide();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [startAutoSlide, clearAutoSlide]);

    useEffect(() => {
        if (index === totalSlides) {
            setTimeout(() => {
                setTransition(false);
                setIndex(0);
                setTimeout(() => {
                    setTransition(true);
                    startAutoSlide();
                }, 50);
            }, 500);
        } else {
            startAutoSlide();
        }
    }, [index, totalSlides, startAutoSlide]);

    const goToNextSlide = () => {
        clearAutoSlide();
        setIndex((prev) => prev + 1);
    };

    const goToPrevSlide = () => {
        clearAutoSlide();
        if (index === 0) {
            setTransition(false);
            setIndex(totalSlides - 1);
            setTimeout(() => {
                setTransition(true);
                startAutoSlide();
            }, 50);
        } else {
            setIndex((prev) => prev - 1);
        }
    };

    const currentIndex = index === totalSlides ? 0 : index;

    return (
        <div
            className="hidden lg:flex w-full lg:w-[65%] h-screen relative overflow-hidden bg-brand-bg-tertiary"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <AnimatedGradient className="absolute inset-0">
                {/* Enhanced Spotlight Effects */}
                <Spotlight className="top-0 left-0 opacity-25 dark:opacity-20" fill="var(--brand-primary)" />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-secondary/10"
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                {/* Floating Particles Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-brand-primary/30 rounded-full blur-sm"
                            initial={{
                                x: Math.random() * 100 + '%',
                                y: Math.random() * 100 + '%',
                                opacity: 0,
                            }}
                            animate={{
                                y: [null, Math.random() * 100 + '%'],
                                x: [null, Math.random() * 100 + '%'],
                                opacity: [0, 0.6, 0],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </AnimatedGradient>

            <div className="relative w-full h-full overflow-hidden z-10">
                <div
                    className="flex h-full w-full"
                    style={{
                        width: `${(totalSlides + 1) * 100}%`,
                        transform: `translateX(-${index * (100 / (totalSlides + 1))}%)`,
                        transition: transition ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                    }}
                >
                    {images.concat(images[0]).map((src, i) => (
                        <div
                            key={i}
                            className="relative flex-shrink-0 w-full h-full"
                            style={{ width: `${100 / (totalSlides + 1)}%` }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={src}
                                    alt={`Slide ${i}`}
                                    width={1200}
                                    height={800}
                                    className="w-full h-full object-cover"
                                    priority={i === 0}
                                />
                                {/* Enhanced Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                
                                {/* Content Overlay */}
                                <AnimatePresence mode="wait">
                                    {i === currentIndex && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -30 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="absolute bottom-24 left-12 right-12 z-30"
                                        >
                                            <div className="backdrop-blur-md bg-white/5 dark:bg-black/20 rounded-2xl p-8 border border-white/10 shadow-2xl">
                                                <motion.div
                                                    initial={{ scale: 0.9 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.3, type: "spring" }}
                                                    className="flex items-center gap-3 mb-4"
                                                >
                                                    <Star className="w-6 h-6 text-brand-primary fill-brand-primary/30" />
                                                    <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                                                        {slideContent[currentIndex]?.title || slideContent[0].title}
                                                    </h3>
                                                </motion.div>
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.4 }}
                                                    className="text-lg text-white/90 leading-relaxed"
                                                >
                                                    {slideContent[currentIndex]?.subtitle || slideContent[0].subtitle}
                                                </motion.p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Enhanced Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-30">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                clearAutoSlide();
                                setIndex(i);
                            }}
                            className="group relative"
                            aria-label={`Go to slide ${i + 1}`}
                        >
                            <motion.div
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300 relative overflow-hidden",
                                    currentIndex === i
                                        ? "w-10 bg-brand-primary shadow-lg shadow-brand-primary/50"
                                        : "w-2 bg-white/40 hover:bg-white/60"
                                )}
                                whileHover={{ scale: 1.2 }}
                            >
                                {currentIndex === i && (
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    />
                                )}
                            </motion.div>
                        </button>
                    ))}
                </div>

                {/* Enhanced Navigation Buttons */}
                <motion.button
                    onClick={goToPrevSlide}
                    whileHover={{ scale: 1.15, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-white/10 dark:bg-white/5 backdrop-blur-xl hover:bg-white/20 dark:hover:bg-white/10 rounded-full p-4 shadow-2xl border border-white/20 z-30 transition-all duration-300 group"
                >
                    <ChevronLeft className="w-6 h-6 text-white group-hover:text-brand-primary transition-colors" />
                    <motion.div
                        className="absolute inset-0 rounded-full bg-brand-primary/20"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.5, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>
                <motion.button
                    onClick={goToNextSlide}
                    whileHover={{ scale: 1.15, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-1/2 right-6 transform -translate-y-1/2 bg-white/10 dark:bg-white/5 backdrop-blur-xl hover:bg-white/20 dark:hover:bg-white/10 rounded-full p-4 shadow-2xl border border-white/20 z-30 transition-all duration-300 group"
                >
                    <ChevronRight className="w-6 h-6 text-white group-hover:text-brand-primary transition-colors" />
                    <motion.div
                        className="absolute inset-0 rounded-full bg-brand-primary/20"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.5, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>
            </div>
        </div>
    );
}
