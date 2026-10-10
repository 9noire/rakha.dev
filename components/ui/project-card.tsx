import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProjectItem } from "@/lib/notion";
import { cn } from "@/lib/utils";
import { FaGithub, FaGlobe } from "react-icons/fa6";
import { NotionText } from "@/components/ui/notion-text";

interface ProjectCardProps {
  project: ProjectItem;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <div className={cn("space-y-2.5 group", className)}>
      {/* Header: Title, Role, Type & External Action Links */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="space-y-1 pr-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/projects/${project.id}`}
              className="font-serif text-lg sm:text-xl font-medium text-foreground hover:underline underline-offset-4 decoration-border leading-snug"
            >
              {project.title}
            </Link>
            {project.type && (
              <span className="text-[11px] font-sans px-2 py-0.5 rounded border border-border/50 text-muted-foreground bg-secondary/40">
                {project.type}
              </span>
            )}
          </div>
          {project.role && (
            <p className="text-xs sm:text-sm text-muted-foreground font-serif">
              {project.role}
            </p>
          )}
        </div>

        {/* Action Links (GitHub & Live Demo) */}
        <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md border border-border/50 text-muted-foreground hover:text-foreground hover:border-border hover:bg-secondary transition-colors duration-150"
              aria-label="View Source Code"
              title="GitHub Source"
            >
              <FaGithub className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          )}
          {project.link && (
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md border border-border/50 text-muted-foreground hover:text-foreground hover:border-border hover:bg-secondary transition-colors duration-150"
              aria-label="View Live Demo"
              title="Live Demo"
            >
              <FaGlobe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans max-w-3xl">
        <NotionText segments={project.descriptionSegments} fallback={project.description} />
      </p>

      {/* Footer: Tech Stack Chips & Details Link */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        {project.techStack && project.techStack.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-serif px-2 py-0.5 rounded border border-border/40 text-muted-foreground/80 bg-secondary/30"
              >
                {tech}
              </span>
            ))}
          </div>
        ) : (
          <div />
        )}

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="gap-1 text-xs h-7 px-2 text-muted-foreground hover:text-foreground ml-auto shrink-0 -mr-2"
        >
          <Link href={`/projects/${project.id}`}>
            <span>Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
