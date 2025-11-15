"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/home");
    }, [router]);

    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <Image
                src="/images/trilogo.jpg"
                alt="Logo"
                width={100}
                height={100}
                className="animate-pulse-slow"
            />
        </div>
    );
};

export default HomePage;
