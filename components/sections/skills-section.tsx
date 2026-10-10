import { SectionHeading } from "@/components/ui/section-heading";
import { getSkillsFromNotion } from "@/lib/notion";
import { getSkillIcon } from "@/lib/icons";

export async function SkillsSection() {
  const skillGroups = await getSkillsFromNotion();

  if (!skillGroups || skillGroups.length === 0) {
    return null;
  }

  return (
    <section id="skills" className="space-y-8">
      <SectionHeading title="Skill Sets" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {skillGroups.map((group) => (
          <div key={group.category} className="space-y-2.5">
            <h3 className="font-serif text-base sm:text-lg font-medium text-foreground">
              {group.category}
            </h3>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const Icon = getSkillIcon(skill.icon);
                return (
                  <div
                    key={skill.name}
                    className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md border border-border/50 bg-secondary/30 text-muted-foreground hover:text-foreground hover:border-border hover:bg-secondary/70 transition-colors duration-150 text-xs"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span>{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
