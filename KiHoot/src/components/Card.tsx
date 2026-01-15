import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={cn("glass-panel rounded-2xl p-8 shadow-2xl w-full max-w-2xl mx-auto transition-all", className)}>
            {children}
        </div>
    );
};
