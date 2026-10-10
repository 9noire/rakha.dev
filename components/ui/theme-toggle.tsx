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

// Small glitch boxes matrix
const GLITCH_BLOCKS = [
  { top: "8%", left: "12%", width: "90px", height: "14px", bg: "#38bdf8", delay: "0.04s" },
  { top: "15%", left: "62%", width: "130px", height: "8px", bg: "#ef4444", delay: "0.1s" },
  { top: "20%", left: "35%", width: "55px", height: "16px", bg: "#f43f5e", delay: "0.18s" },
  { top: "26%", left: "78%", width: "110px", height: "7px", bg: "#38bdf8", delay: "0.08s" },
  { top: "33%", left: "6%", width: "125px", height: "12px", bg: "#ffffff", delay: "0.22s" },
  { top: "40%", left: "48%", width: "75px", height: "18px", bg: "#ef4444", delay: "0.16s" },
  { top: "46%", left: "22%", width: "150px", height: "9px", bg: "#38bdf8", delay: "0.28s" },
  { top: "53%", left: "72%", width: "60px", height: "20px", bg: "#f43f5e", delay: "0.2s" },
  { top: "60%", left: "8%", width: "95px", height: "10px", bg: "#38bdf8", delay: "0.32s" },
  { top: "66%", left: "42%", width: "140px", height: "7px", bg: "#ef4444", delay: "0.14s" },
  { top: "73%", left: "82%", width: "80px", height: "15px", bg: "#38bdf8", delay: "0.26s" },
  { top: "80%", left: "28%", width: "115px", height: "9px", bg: "#ffffff", delay: "0.36s" },
  { top: "86%", left: "58%", width: "70px", height: "16px", bg: "#ef4444", delay: "0.3s" },
  { top: "92%", left: "15%", width: "105px", height: "11px", bg: "#38bdf8", delay: "0.42s" },
  // Small pixel clusters
  { top: "12%", left: "48%", width: "28px", height: "12px", bg: "#f43f5e", delay: "0.06s" },
  { top: "28%", left: "20%", width: "36px", height: "16px", bg: "#38bdf8", delay: "0.24s" },
  { top: "50%", left: "86%", width: "32px", height: "12px", bg: "#ef4444", delay: "0.12s" },
  { top: "76%", left: "36%", width: "40px", height: "15px", bg: "#ffffff", delay: "0.34s" },
  { top: "64%", left: "68%", width: "30px", height: "10px", bg: "#38bdf8", delay: "0.22s" },
  { top: "38%", left: "84%", width: "44px", height: "14px", bg: "#f43f5e", delay: "0.18s" },
];

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isGlitching, setIsGlitching] = React.useState(false);

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

  const handleToggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    setIsGlitching(true);

    if (
      typeof document === "undefined" ||
      !(document as any).startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(nextTheme);
      setTimeout(() => setIsGlitching(false), 650);
      return;
    }

    const transition = (document as any).startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.finished.finally(() => {
      setTimeout(() => setIsGlitching(false), 100);
    });
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

      {/* Screen Glitch & Small Glitch Boxes Matrix Overlay */}
      {isGlitching && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden select-none"
        >
          <style>{`
            @keyframes glitch-box-jitter {
              0% { opacity: 0; transform: scaleX(0) translate3d(0,0,0); }
              20% { opacity: 0.95; transform: scaleX(1) translate3d(-8px, 2px, 0); }
              40% { opacity: 0.8; transform: scaleX(0.85) translate3d(12px, -3px, 0); }
              60% { opacity: 1; transform: scaleX(1.15) translate3d(-6px, 1px, 0); }
              80% { opacity: 0.5; transform: scaleX(0.6) translate3d(4px, -1px, 0); }
              100% { opacity: 0; transform: scaleX(0) translate3d(0,0,0); }
            }
            @keyframes glitch-scanlines {
              0% { transform: translateY(-100%); opacity: 0.7; }
              50% { opacity: 0.9; }
              100% { transform: translateY(100%); opacity: 0; }
            }
            @keyframes glitch-flash-strobe {
              0%, 100% { opacity: 0; }
              15% { opacity: 0.2; }
              35% { opacity: 0.08; }
              55% { opacity: 0.25; }
              75% { opacity: 0.12; }
            }
          `}</style>

          {/* CRT Scanline Bars */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.35)_51%)] bg-[length:100%_4px] mix-blend-overlay"
            style={{ animation: "glitch-scanlines 0.65s linear forwards" }}
          />

          {/* Digital Strobe Flash */}
          <div
            className="absolute inset-0 bg-cyan-400/15 mix-blend-screen"
            style={{ animation: "glitch-flash-strobe 0.65s steps(4, start) forwards" }}
          />

          {/* Small Pixelated Glitch Boxes Scatter */}
          {GLITCH_BLOCKS.map((block, idx) => (
            <div
              key={idx}
              className="absolute shadow-sm"
              style={{
                top: block.top,
                left: block.left,
                width: block.width,
                height: block.height,
                backgroundColor: block.bg,
                animation: `glitch-box-jitter 0.45s steps(3, jump-none) ${block.delay} forwards`,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
