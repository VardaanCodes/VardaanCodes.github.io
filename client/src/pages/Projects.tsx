/** @format */

import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { getProjects } from "@/lib/data";

export default function Projects() {
  const allProjects = getProjects();
  const [activeCategory, setActiveCategory] = useState("All");

  // Get unique categories from projects (projects can have multiple)
  const categories = useMemo(() => {
    const cats = new Set<string>();
    allProjects.forEach((p) => {
      p.categories.forEach((c) => cats.add(c));
    });
    return ["All", ...Array.from(cats).sort()];
  }, [allProjects]);

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.categories.includes(activeCategory));

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              Portfolio
            </p>
            <h1
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
              data-testid="text-projects-title"
            >
              All Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A collection of mechanical engineering projects spanning product
              design, industrial automation, and electromechanical systems.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "secondary"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                data-testid={`button-filter-${category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
