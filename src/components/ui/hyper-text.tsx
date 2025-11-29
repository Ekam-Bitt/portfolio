"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function HyperText({
    text,
    className,
    duration = 800,
    animateOnLoad = true,
}: {
    text: string;
    className?: string;
    duration?: number;
    animateOnLoad?: boolean;
}) {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const iterations = useRef(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true });

    const triggerAnimation = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        iterations.current = 0;

        const interval = setInterval(() => {
            setDisplayText((prev) =>
                prev
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations.current) {
                            return text[index];
                        }
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );

            if (iterations.current >= text.length) {
                clearInterval(interval);
                setIsAnimating(false);
            }

            iterations.current += 1 / 3;
        }, duration / (text.length * 3));
    }, [duration, isAnimating, text]);

    useEffect(() => {
        if (animateOnLoad && isInView) {
            triggerAnimation();
        }
    }, [isInView, animateOnLoad, triggerAnimation]);

    return (
        <span
            ref={ref}
            className={cn("font-mono cursor-default", className)}
            onMouseEnter={triggerAnimation}
        >
            {displayText}
        </span>
    );
}
