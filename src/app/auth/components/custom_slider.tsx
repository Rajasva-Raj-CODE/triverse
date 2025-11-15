'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Spotlight } from '@/components/ui/aceternity/spotlight';
import { AnimatedGradient } from '@/components/ui/aceternity/animated-gradient';
import { cn } from '@/lib/utils';

const images = [
    '/images/servic-2.jpg',
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/after.png',
];

export function CustomSlider() {
    const totalSlides = images.length;
    const [index, setIndex] = useState(0);
    const [transition, setTransition] = useState(true);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const clearAutoSlide = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
    }, []);

    const startAutoSlide = useCallback(() => {
        clearAutoSlide();
        timeoutRef.current = setTimeout(() => {
            setIndex((prev) => prev + 1);
        }, 5000);
    }, [clearAutoSlide]);

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

    return (
        <AnimatedGradient className="hidden lg:flex w-full lg:w-[65%] h-screen relative overflow-hidden bg-brand-bg-tertiary">
            <Spotlight className="top-0 left-0 opacity-20 dark:opacity-15" fill="var(--brand-primary)" />
            <div className="relative w-full h-full overflow-hidden">
                <div
                    className="flex h-full w-full"
                    style={{
                        width: `${(totalSlides + 1) * 100}%`,
                        transform: `translateX(-${index * (100 / (totalSlides + 1))}%)`,
                        transition: transition ? 'transform 0.5s ease-in-out' : 'none',
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
                                transition={{ duration: 0.5 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={src}
                                    alt={`Slide ${i}`}
                                    width={1200}
                                    height={800}
                                    className="w-full h-full object-cover brightness-[0.7] contrast-110"
                                    priority={i === 0}
                                />
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                clearAutoSlide();
                                setIndex(i);
                            }}
                            className={cn(
                                "h-2 rounded-full transition-all duration-300",
                                index === i || (index === totalSlides && i === 0)
                                    ? "w-8 bg-brand-primary"
                                    : "w-2 bg-white/40 hover:bg-white/60"
                            )}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>

                <motion.button
                    onClick={goToPrevSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/10 dark:bg-white/5 backdrop-blur-xl hover:bg-white/20 dark:hover:bg-white/10 rounded-full p-3 shadow-lg border border-white/20 z-20 transition-all duration-200"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                    onClick={goToNextSlide}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/10 dark:bg-white/5 backdrop-blur-xl hover:bg-white/20 dark:hover:bg-white/10 rounded-full p-3 shadow-lg border border-white/20 z-20 transition-all duration-200"
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </motion.button>
            </div>
        </AnimatedGradient>
    );
}
