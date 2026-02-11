"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate elements when they scroll into view.
 * Add `data-animate` attribute to elements you want animated.
 * Supports: data-animate="fade-up" | "fade-left" | "fade-right" | "fade-in" | "scale-in"
 * Supports: data-delay="0.2" for stagger delays
 */
export function useScrollAnimations(containerRef: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const elements = container.querySelectorAll("[data-animate]");

        elements.forEach((el) => {
            const type = el.getAttribute("data-animate") || "fade-up";
            const delay = parseFloat(el.getAttribute("data-delay") || "0");

            let fromVars: gsap.TweenVars = { opacity: 0, duration: 0.8, delay, ease: "power3.out" };

            switch (type) {
                case "fade-up":
                    fromVars = { ...fromVars, y: 60 };
                    break;
                case "fade-down":
                    fromVars = { ...fromVars, y: -60 };
                    break;
                case "fade-left":
                    fromVars = { ...fromVars, x: -80 };
                    break;
                case "fade-right":
                    fromVars = { ...fromVars, x: 80 };
                    break;
                case "fade-in":
                    break;
                case "scale-in":
                    fromVars = { ...fromVars, scale: 0.85 };
                    break;
            }

            gsap.from(el, {
                ...fromVars,
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [containerRef]);
}

/**
 * Stagger animate children of a container when it scrolls into view.
 */
export function useStaggerAnimation(
    containerRef: React.RefObject<HTMLElement | null>,
    childSelector: string,
    stagger: number = 0.1
) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const children = container.querySelectorAll(childSelector);
        if (children.length === 0) return;

        gsap.from(children, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            stagger,
            ease: "power3.out",
            scrollTrigger: {
                trigger: container,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [containerRef, childSelector, stagger]);
}

/**
 * Hero entrance animation — runs on mount, no scroll trigger.
 */
export function useHeroAnimation(containerRef: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        const badge = container.querySelector("[data-hero='badge']");
        const title = container.querySelector("[data-hero='title']");
        const subtitle = container.querySelector("[data-hero='subtitle']");
        const cta = container.querySelector("[data-hero='cta']");
        const social = container.querySelector("[data-hero='social']");

        tl.from(badge, { opacity: 0, y: 30, duration: 0.6 })
            .from(title, { opacity: 0, y: 50, duration: 0.8 }, "-=0.3")
            .from(subtitle, { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
            .from(cta, { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
            .from(social, { opacity: 0, y: 20, duration: 0.5 }, "-=0.2");

        return () => {
            tl.kill();
        };
    }, [containerRef]);
}
