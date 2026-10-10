"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

// Pre-computed circular chain links for BASE_RADIUS 400
const BASE_RADIUS = 400;
const NUM_LINKS = 72;

const CHAIN_LINKS = Array.from({ length: NUM_LINKS }, (_, i) => {
  const angle = (i / NUM_LINKS) * 2 * Math.PI;
  const deg = (angle * 180) / Math.PI + 90;
  const x = BASE_RADIUS * Math.cos(angle);
  const y = BASE_RADIUS * Math.sin(angle);
  const isAlt = i % 2 === 0;
  return { x, y, deg, isAlt };
});

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [transitionData, setTransitionData] = React.useState<{
    x: number;
    y: number;
    maxScale: number;
  } | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn("h-8 w-8 text-muted-foreground", className)}
        aria-label="Toggle theme"
      >
        <span className="h-4 w-4" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";

    if (
      typeof document === "undefined" ||
      !(document as any).startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      return;
    }

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const maxScale = (endRadius * 1.06) / BASE_RADIUS;

    setTransitionData({ x, y, maxScale });

    const transition = (document as any).startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 480,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });

    setTimeout(() => {
      setTransitionData(null);
    }, 550);
  };

  return (
    <>
      <Button
        variant="ghost"
        size={showLabel ? "sm" : "icon"}
        onClick={handleToggleTheme}
        className={cn(
          "h-8 text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors",
          !showLabel && "w-8",
          className
        )}
        aria-label="Toggle theme"
      >
        {isDark ? (
          <Sun className="h-4 w-4 transition-transform rotate-0 scale-100" />
        ) : (
          <Moon className="h-4 w-4 transition-transform rotate-0 scale-100" />
        )}
        {showLabel && (
          <span className="text-xs">{isDark ? "Light Mode" : "Dark Mode"}</span>
        )}
      </Button>

      {/* Expanding Chain Frame Transition Overlay */}
      {transitionData && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden select-none"
        >
          <style>{`
            @keyframes chain-ring-expand {
              0% {
                transform: translate3d(${transitionData.x}px, ${transitionData.y}px, 0) scale(0) rotate(0deg);
                opacity: 0.95;
              }
              75% {
                opacity: 0.9;
              }
              100% {
                transform: translate3d(${transitionData.x}px, ${transitionData.y}px, 0) scale(${transitionData.maxScale}) rotate(30deg);
                opacity: 0;
              }
            }
          `}</style>
          <svg
            className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 overflow-visible"
            style={{
              width: `${BASE_RADIUS * 2}px`,
              height: `${BASE_RADIUS * 2}px`,
              transformOrigin: "center center",
              animation: "chain-ring-expand 0.48s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
            viewBox={`-${BASE_RADIUS} -${BASE_RADIUS} ${BASE_RADIUS * 2} ${BASE_RADIUS * 2}`}
          >
            <defs>
              <linearGradient id="chainRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#d1d5db" />
                <stop offset="50%" stopColor="#6b7280" />
                <stop offset="75%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              <linearGradient id="chainRingDark" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1f2937" />
                <stop offset="50%" stopColor="#4b5563" />
                <stop offset="100%" stopColor="#1f2937" />
              </linearGradient>

              <filter id="chainRingGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Subtle Guide Ring */}
            <circle
              r={BASE_RADIUS}
              fill="none"
              stroke="url(#chainRingGrad)"
              strokeWidth="2"
              opacity="0.3"
            />

            {/* Interlocking Chain Links around perimeter */}
            {CHAIN_LINKS.map((link, i) => (
              <g
                key={i}
                transform={`translate(${link.x}, ${link.y}) rotate(${link.deg})`}
                filter="url(#chainRingGlow)"
              >
                {link.isAlt ? (
                  // Front facing metallic link
                  <g>
                    <rect
                      x="-14"
                      y="-7"
                      width="28"
                      height="14"
                      rx="5"
                      fill="none"
                      stroke="url(#chainRingGrad)"
                      strokeWidth="2.8"
                    />
                    <rect
                      x="-10"
                      y="-3.5"
                      width="20"
                      height="7"
                      rx="3.5"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="0.7"
                      opacity="0.9"
                    />
                  </g>
                ) : (
                  // Side interlocking link
                  <g>
                    <rect
                      x="-12"
                      y="-3"
                      width="24"
                      height="6"
                      rx="3"
                      fill="url(#chainRingDark)"
                      stroke="url(#chainRingGrad)"
                      strokeWidth="1.4"
                    />
                  </g>
                )}
              </g>
            ))}

            {/* Y2K 4-Point Sparkles on Cardinal Points */}
            {[0, 90, 180, 270].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const sx = BASE_RADIUS * Math.cos(rad);
              const sy = BASE_RADIUS * Math.sin(rad);
              return (
                <g key={i} transform={`translate(${sx}, ${sy})`}>
                  <path
                    d="M 0,-14 Q 0,0 14,0 Q 0,0 0,14 Q 0,0 -14,0 Q 0,0 0,-14 Z"
                    fill="url(#chainRingGrad)"
                  />
                  <circle r="2.5" fill="#ffffff" />
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </>
  );
}
