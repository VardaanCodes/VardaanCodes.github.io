/** @format */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import ProjectCard from "./ProjectCard";
import { getFeaturedProjects } from "@/lib/data";

export default function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects();

  return (
    <section className="py-20 px-6" data-testid="section-featured-projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
              Portfolio
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight"
              data-testid="text-featured-title"
            >
              Featured Projects
            </h2>
          </div>
          <Link href="/projects">
            <Button
              variant="ghost"
              className="gap-2"
              data-testid="button-view-all-projects"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
