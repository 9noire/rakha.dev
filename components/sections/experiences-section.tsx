import { SectionHeading } from "@/components/ui/section-heading";
import { getExperiencesFromNotion } from "@/lib/notion";
import { ExperienceCard } from "@/components/ui/experience-card";

export async function ExperiencesSection() {
  const experiences = await getExperiencesFromNotion();

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="space-y-8">
      <SectionHeading title="Experience" />

      <div className="grid grid-cols-1 gap-3.5">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
}
