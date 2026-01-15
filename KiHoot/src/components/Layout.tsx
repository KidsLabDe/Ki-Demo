import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-brand-purple via-brand-blue to-brand-pink text-white">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-pink opacity-30 blur-[120px] rounded-full animate-nebula" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-lightBlue opacity-20 blur-[100px] rounded-full animate-nebula" style={{ animationDelay: '-10s' }} />

                {/* Geometric Floaties (Static for now, could be animated) */}
                <div className="absolute top-[15%] left-[10%] w-20 h-20 border-4 border-white/10 rotate-45 rounded-xl backdrop-blur-sm" />
                <div className="absolute bottom-[20%] right-[15%] w-32 h-32 rounded-full border-4 border-white/10 backdrop-blur-sm" />
                <div className="absolute top-[40%] right-[25%] w-16 h-16 border-4 border-white/5 rotate-12" />
            </div>

            {/* Content */}
            <div className={cn("relative z-10 flex flex-col items-center justify-center min-h-screen p-4", className)}>
                {children}
            </div>
        </div>
    );
};
