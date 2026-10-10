import Link from "next/link";
import { ExternalLink, MapPin } from "lucide-react";
import { ExperienceItem } from "@/lib/notion";
import { NotionText } from "@/components/ui/notion-text";
import { cn } from "@/lib/utils";

interface ExperienceItemRowProps {
  experience: ExperienceItem;
  className?: string;
}

export function ExperienceItemRow({ experience, className }: ExperienceItemRowProps) {
  return (
    <div className={cn("relative group", className)}>
      {/* Node Dot on the timeline connecting line */}
      <span
        aria-hidden="true"
        className="absolute -left-[26px] sm:-left-[38px] top-1.5 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-muted-foreground/40 border-2 border-background ring-2 ring-border/50 group-hover:bg-foreground group-hover:ring-foreground/50 transition-all duration-200"
      />

      <div className="space-y-1.5 sm:space-y-2">
        {/* Header: Role & Period */}
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-4">
          <div className="space-y-0.5 sm:space-y-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h3 className="font-serif text-base sm:text-xl font-medium text-foreground tracking-tight">
                {experience.role}
              </h3>
              {experience.type && (
                <span className="text-[10px] sm:text-[11px] font-sans px-1.5 py-0.2 sm:px-2 sm:py-0.5 rounded border border-border/50 text-muted-foreground bg-secondary/40">
                  {experience.type}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] sm:text-sm text-muted-foreground font-serif">
              {experience.company && (
                <span className="font-medium text-foreground/90">{experience.company}</span>
              )}
              {experience.location && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center gap-0.5 font-sans text-[11px] sm:text-xs">
                    <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-muted-foreground/70" />
                    {experience.location}
                  </span>
                </>
              )}
              {experience.link && (
                <Link
                  href={experience.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-[11px] sm:text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 ml-1"
                  title="Company Link"
                >
                  <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </Link>
              )}
            </div>
          </div>

          {experience.period && (
            <span className="text-[11px] sm:text-sm text-muted-foreground/80 font-serif shrink-0">
              {experience.period}
            </span>
          )}
        </div>

        {/* Description Text - Line clamped on mobile for concise reading */}
        {experience.description && (
          <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed font-sans whitespace-pre-line pt-0.5 max-w-3xl line-clamp-2 sm:line-clamp-none">
            <NotionText segments={experience.descriptionSegments} fallback={experience.description} />
          </p>
        )}

        {/* Tech Stack Chips */}
        {experience.techStack && experience.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
            {experience.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] sm:text-[11px] font-serif px-1.5 sm:px-2 py-0.5 rounded border border-border/40 text-muted-foreground/80 bg-secondary/30"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
