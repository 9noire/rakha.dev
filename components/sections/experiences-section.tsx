import { SectionHeading } from "@/components/ui/section-heading";
import { getExperiencesFromNotion } from "@/lib/notion";
import { ExperienceItemRow } from "@/components/ui/experience-item";

export async function ExperiencesSection() {
  const experiences = await getExperiencesFromNotion();

  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="space-y-6 sm:space-y-8">
      <SectionHeading title="Experience" />

      {/* Professional Timeline with vertical connector line */}
      <div className="relative border-l border-border/70 ml-2 sm:ml-3 pl-5 sm:pl-8 space-y-7 sm:space-y-11">
        {experiences.map((exp) => (
          <ExperienceItemRow key={exp.id} experience={exp} />
        ))}
      </div>
    </section>
  );
}
