"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface StepWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export function StepWrapper({ children, className }: StepWrapperProps) {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        // Small delay for animation
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={cn(
                "transition-all duration-300 ease-out",
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4",
                className
            )}
        >
            {children}
        </div>
    );
}

interface StepQuestionProps {
    question: string;
    subtext?: string;
}

export function StepQuestion({ question, subtext }: StepQuestionProps) {
    return (
        <div className="mb-8 text-center">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
                {question}
            </h3>
            {subtext && (
                <p className="text-base text-muted-foreground">{subtext}</p>
            )}
        </div>
    );
}
