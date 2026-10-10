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
      setTimeout(() => setIsGlitching(false), 280);
      return;
    }

    const transition = (document as any).startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.finished.finally(() => {
      setTimeout(() => setIsGlitching(false), 80);
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

      {/* Screen Glitch & Scanline Overlay */}
      {isGlitching && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-[10000] overflow-hidden select-none"
        >
          <style>{`
            @keyframes glitch-scanlines {
              0% {
                transform: translateY(-100%);
                opacity: 0.6;
              }
              50% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(100%);
                opacity: 0;
              }
            }
            @keyframes glitch-flash {
              0%, 100% { opacity: 0; }
              20% { opacity: 0.15; }
              40% { opacity: 0.05; }
              60% { opacity: 0.2; }
              80% { opacity: 0.08; }
            }
            @keyframes glitch-line-1 {
              0% { top: 12%; height: 3px; transform: scaleX(0); opacity: 0; }
              30% { top: 28%; height: 8px; transform: scaleX(1); opacity: 0.8; background: rgba(56, 189, 248, 0.4); }
              70% { top: 64%; height: 4px; transform: scaleX(1); opacity: 0.6; background: rgba(239, 68, 68, 0.4); }
              100% { top: 88%; height: 2px; transform: scaleX(0); opacity: 0; }
            }
            @keyframes glitch-line-2 {
              0% { top: 75%; height: 4px; transform: scaleX(0); opacity: 0; }
              40% { top: 42%; height: 12px; transform: scaleX(1); opacity: 0.7; background: rgba(239, 68, 68, 0.35); }
              80% { top: 18%; height: 6px; transform: scaleX(1); opacity: 0.5; background: rgba(56, 189, 248, 0.35); }
              100% { top: 5%; height: 2px; transform: scaleX(0); opacity: 0; }
            }
          `}</style>

          {/* CRT / Scanlines Flash */}
          <div
            className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[length:100%_4px] mix-blend-overlay"
            style={{ animation: "glitch-scanlines 0.28s linear forwards" }}
          />

          {/* Digital Noise / Flash Strobe */}
          <div
            className="absolute inset-0 bg-cyan-400/10 mix-blend-screen"
            style={{ animation: "glitch-flash 0.28s steps(2, start) forwards" }}
          />

          {/* Glitch Slicing Lines */}
          <div
            className="absolute left-0 right-0 shadow-xs"
            style={{ animation: "glitch-line-1 0.28s ease-in-out forwards" }}
          />
          <div
            className="absolute left-0 right-0 shadow-xs"
            style={{ animation: "glitch-line-2 0.28s ease-in-out forwards" }}
          />
        </div>
      )}
    </>
  );
}
