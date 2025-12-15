/** @format */

import Navigation from "@/components/Navigation";
import { getSkills } from "@/lib/data";

export default function Skills() {
  const skills = getSkills();

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              Expertise
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Skills & Technologies
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              A comprehensive overview of the tools, technologies, and
              methodologies I work with across mechanical design, programming,
              and electronics.
            </p>
          </div>

          <div className="space-y-16">
            {Object.entries(skillsByCategory).map(
              ([category, categorySkills]) => (
                <section key={category}>
                  <h2 className="text-2xl font-semibold mb-8 pb-4 border-b border-border">
                    {category}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="group relative flex flex-col items-center gap-3 p-4 rounded-md bg-card border border-card-border hover:border-primary/50 transition-all hover:scale-105"
                        data-skill-id={skill.id}
                      >
                        <div className="w-16 h-16 flex items-center justify-center">
                          <img
                            src={skill.iconPath}
                            alt={skill.name}
                            className="max-w-full max-h-full object-contain binary-icon"
                            onError={(e) => {
                              // Fallback if image doesn't load
                              e.currentTarget.style.display = "none";
                              const parent = e.currentTarget.parentElement;
                              if (parent) {
                                parent.innerHTML = `<div class="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold">${skill.name.charAt(
                                  0
                                )}</div>`;
                              }
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-center">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
