/** @format */

import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Award, Wrench, Users } from "lucide-react";
import { getAboutData } from "@/lib/data";

export default function About() {
  const aboutData = getAboutData();

  // Map icon names to components
  const getIcon = (role: string) => {
    if (
      role.toLowerCase().includes("coordinator") ||
      role.toLowerCase().includes("member")
    )
      return Users;
    if (role.toLowerCase().includes("representative")) return Award;
    return Briefcase;
  };

  return (
    <section
      id="about"
      className="py-20 px-6 bg-card"
      data-testid="section-about"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
            Background
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            data-testid="text-about-title"
          >
            About Me
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <p
              className="text-lg leading-relaxed text-muted-foreground mb-6"
              data-testid="text-about-bio"
            >
              {aboutData.bio}
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.skills.map((skill) => (
                  <Badge
                    key={skill.id}
                    variant="secondary"
                    className="text-sm"
                    data-testid={`badge-skill-${skill.id}`}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>

            <div id="contact">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                {aboutData.contact.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground w-20">
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-contact-${item.label.toLowerCase()}`}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm">{item.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">
              Experience & Education
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-8">
                {aboutData.experiences.map((item, index) => {
                  const IconComponent = getIcon(item.role);
                  return (
                    <div key={item.id} className="relative pl-12">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                        <IconComponent className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-muted-foreground">
                          {item.period}
                        </span>
                        <h4
                          className="font-semibold mt-1"
                          data-testid={`text-experience-company-${index}`}
                        >
                          {item.company}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
