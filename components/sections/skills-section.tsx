import { SectionHeading } from "@/components/ui/section-heading";
import { getSkillsFromNotion } from "@/lib/notion";

export async function SkillsSection() {
  const skillGroups = await getSkillsFromNotion();

  if (!skillGroups || skillGroups.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="space-y-6 sm:space-y-8">
      <SectionHeading title="Skill Sets" />

      <div className="space-y-3.5 sm:space-y-5">
        {skillGroups.map((group) => (
          <div
            key={group.category}
            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 border-b border-border/30 pb-3 last:border-b-0 last:pb-0"
          >
            {/* Category label */}
            <h3 className="font-serif text-sm sm:text-base font-medium text-foreground sm:w-44 shrink-0">
              {group.category}
            </h3>

            {/* Clean inline text skills list */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-muted-foreground/90 font-sans leading-relaxed">
              {group.skills.map((skill, index) => (
                <span key={skill.name} className="inline-flex items-center gap-2">
                  <span className="hover:text-foreground transition-colors duration-150 cursor-default">
                    {skill.name}
                  </span>
                  {index < group.skills.length - 1 && (
                    <span className="text-muted-foreground/40 text-[10px] select-none">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
