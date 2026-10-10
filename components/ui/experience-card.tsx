import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink, MapPin } from "lucide-react";
import { ExperienceItem } from "@/lib/notion";
import { cn } from "@/lib/utils";
import { NotionText } from "@/components/ui/notion-text";

interface ExperienceCardProps {
  experience: ExperienceItem;
  className?: string;
}

export function ExperienceCard({ experience, className }: ExperienceCardProps) {
  return (
    <Card className={cn("p-4 sm:p-5 transition-colors duration-150 space-y-3", className)}>
      <div className="flex items-start justify-between gap-2.5">
        <div className="space-y-1.5 pr-1 flex-1">
          {/* Role & Type Badge */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-1.5 sm:gap-2">
            <h3 className="font-serif text-base sm:text-lg font-medium text-foreground leading-snug">
              {experience.role}
            </h3>
            {experience.type && (
              <Badge variant="subtle" className="w-fit text-[11px] sm:text-xs px-2 py-0.5">
                {experience.type}
              </Badge>
            )}
          </div>

          {/* Company, Location & Period */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-muted-foreground font-serif">
            {experience.company && <span className="font-medium text-foreground/90">{experience.company}</span>}
            {experience.company && (experience.period || experience.location) && <span>•</span>}
            {experience.period && <span>{experience.period}</span>}
            {experience.location && (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1 font-sans text-xs">
                  <MapPin className="h-3 w-3 text-muted-foreground/70" />
                  {experience.location}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Company / Reference Link */}
        {experience.link && (
          <Link
            href={experience.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md border border-border/50 text-muted-foreground hover:text-foreground hover:border-border hover:bg-secondary transition-colors duration-150 shrink-0 mt-0.5"
            title="Visit Company / Reference"
            aria-label="Visit Company / Reference"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {/* Description */}
      {experience.description && (
        <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed font-sans border-t border-border/30 pt-2.5 whitespace-pre-line">
          <NotionText segments={experience.descriptionSegments} fallback={experience.description} />
        </p>
      )}

      {/* Tech Stack Chips (if available) */}
      {experience.techStack && experience.techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {experience.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-serif px-2 py-0.5 rounded border border-border/40 text-muted-foreground/80 bg-secondary/30"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </Card>
  );
}
