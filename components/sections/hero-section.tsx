import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Mail } from "lucide-react";
import { getProfileFromNotion, getSocialsFromNotion } from "@/lib/notion";
import { NotionText } from "@/components/ui/notion-text";
import { getSkillIcon } from "@/lib/icons";

export async function HeroSection() {
  const profile = await getProfileFromNotion();
  const socials = await getSocialsFromNotion();

  if (!profile) {
    return null;
  }

  return (
    <section id="about" className="space-y-4 sm:space-y-6 pt-1 sm:pt-6">
      {/* Top Cover Banner with Dynamic Theme Switching (Light vs Dark) */}
      {(profile.bannerLight || profile.bannerDark || profile.banner) && (
        <div className="relative w-full h-32 sm:h-52 md:h-60 rounded-xl overflow-hidden border border-border/70 bg-secondary/30 shadow-xs">
          {profile.bannerLight && (
            <img
              src={profile.bannerLight}
              alt={`${profile.name} Banner Light`}
              className="w-full h-full object-cover object-center dark:hidden"
            />
          )}
          {profile.bannerDark && (
            <img
              src={profile.bannerDark}
              alt={`${profile.name} Banner Dark`}
              className="w-full h-full object-cover object-center hidden dark:block"
            />
          )}
        </div>
      )}

      {/* Name & Title */}
      <div className="space-y-1.5 sm:space-y-2 pt-1">
        <h1 className="font-serif text-2xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-foreground">
          {profile.name}
        </h1>
        {profile.taglineSegments && profile.taglineSegments.length > 0 && (
          <p className="text-sm sm:text-lg italic text-muted-foreground font-sans">
            <NotionText segments={profile.taglineSegments} />
          </p>
        )}
      </div>

      {/* Narrative Bio - Concise on mobile */}
      {profile.bioSegments && profile.bioSegments.length > 0 && (
        <p className="text-xs sm:text-base text-muted-foreground/90 leading-relaxed max-w-3xl font-sans whitespace-pre-line line-clamp-3 sm:line-clamp-none">
          <NotionText segments={profile.bioSegments} />
        </p>
      )}

      {/* Social Links from Notion Socials database */}
      {socials.length > 0 && (
        <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5 text-muted-foreground">
          {socials.map((social) => {
            const Icon = getSkillIcon(social.icon);
            return (
              <Link
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="p-1.5 sm:p-2 rounded-md border border-border/50 bg-secondary/30 hover:border-border hover:bg-secondary hover:text-foreground transition-colors duration-150"
              >
                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </Link>
            );
          })}
        </div>
      )}

      {/* Action CTAs */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-0.5">
        {profile.resumeUrl && (
          <Button asChild variant="default" size="sm" className="gap-1.5 text-xs h-8 px-3">
            <Link href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              <span>Resume</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
        {profile.email && (
          <Button asChild variant="outline" size="sm" className="gap-1.5 text-xs h-8 px-3">
            <Link href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer">
              <span>Get in Touch</span>
              <Mail className="h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
      </div>
    </section>
  );
}
