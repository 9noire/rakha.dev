import { SectionHeading } from "@/components/ui/section-heading";
import { getExperiencesFromNotion } from "@/lib/notion";
import { ExperienceItemRow } from "@/components/ui/experience-item";

export async function ExperiencesSection() {
  const experiences = await getExperiencesFromNotion();

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="space-y-8">
      <SectionHeading title="Experience" />

      {/* Professional Timeline with vertical connector line */}
      <div className="relative border-l border-border/70 ml-2.5 sm:ml-3 pl-6 sm:pl-8 space-y-9 sm:space-y-11">
        {experiences.map((exp) => (
          <ExperienceItemRow key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
}
