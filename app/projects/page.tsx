import Link from "next/link";
import { MainLayout } from "@/components/layouts/main-layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getProjectsFromNotion } from "@/lib/notion";
import { ProjectCard } from "@/components/ui/project-card";

// Revalidate Notion data every 60 seconds (ISR)
export const revalidate = 60;

export const metadata = {
  title: "Projects | Rakha",
  description: "Complete list of software engineering and web development projects.",
};

export default async function ProjectsPage() {
  const projects = await getProjectsFromNotion();

  return (
    <MainLayout>
      <div className="space-y-10 pt-4 sm:pt-8">
        {/* Top Header & Back Button */}
        <div className="space-y-4">
          <Button asChild variant="ghost" size="sm" className="gap-2 text-xs -ml-2 text-muted-foreground hover:text-foreground">
            <Link href="/">
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Home</span>
            </Link>
          </Button>

          <SectionHeading title="All Projects" />
        </div>

        {/* Clean Project List */}
        <div className="space-y-8 sm:space-y-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
