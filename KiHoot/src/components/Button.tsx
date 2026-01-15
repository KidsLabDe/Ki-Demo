import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'quiz-red' | 'quiz-blue' | 'quiz-yellow' | 'quiz-green';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    shape?: 'default' | 'circle';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    shape = 'default',
    ...props
}) => {
    const variants = {
        primary: "bg-white text-brand-purple hover:bg-white/90 shadow-lg shadow-white/10 active:scale-95",
        secondary: "glass text-white hover:bg-white/20 active:scale-95",
        danger: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 active:scale-95",
        ghost: "bg-transparent text-white/70 hover:text-white hover:bg-white/5",
        'quiz-red': "bg-quiz-red text-white hover:brightness-110 shadow-lg shadow-quiz-red/40 active:scale-[0.98]",
        'quiz-blue': "bg-quiz-blue text-white hover:brightness-110 shadow-lg shadow-quiz-blue/40 active:scale-[0.98]",
        'quiz-yellow': "bg-quiz-yellow text-white hover:brightness-110 shadow-lg shadow-quiz-yellow/40 active:scale-[0.98]",
        'quiz-green': "bg-quiz-green text-white hover:brightness-110 shadow-lg shadow-quiz-green/40 active:scale-[0.98]",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm font-medium",
        md: "px-6 py-3 text-base font-bold",
        lg: "px-8 py-4 text-xl font-bold",
        xl: "px-10 py-6 text-2xl font-black",
    };

    return (
        <button
            className={cn(
                "relative transition-all duration-200 flex items-center justify-center outline-none ring-offset-2 ring-offset-transparent focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:pointer-events-none",
                shape === 'default' ? 'rounded-xl' : 'rounded-full aspect-square p-0',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
    );
};
