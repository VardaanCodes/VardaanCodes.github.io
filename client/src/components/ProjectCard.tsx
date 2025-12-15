/** @format */

import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({
  project,
  featured = false,
}: ProjectCardProps) {
  const fallbackImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42mP8z/C/HwAFAAL/2aC1jgAAAABJRU5ErkJggg=="; // 1x1 black

  return (
    <Link href={`/projects/${project.id}`}>
      <article
        className={`group relative overflow-hidden rounded-md bg-card border border-card-border transition-transform duration-300 hover:scale-[1.02] ${
          featured ? "aspect-[4/3]" : "aspect-square"
        }`}
        data-testid={`card-project-${project.id}`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 bw-logo"
          onError={(e) => {
            if (e.currentTarget.src !== fallbackImage) {
              e.currentTarget.src = fallbackImage;
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge
              variant="secondary"
              className="bg-white/10 text-white/90 border-white/20 text-xs"
            >
              {project.categories?.[0] ?? "Engineering"}
            </Badge>
            <span className="text-xs text-white/60 font-mono">
              {project.year}
            </span>
          </div>

          <h3
            className="text-lg md:text-xl font-semibold text-white mb-1 line-clamp-2"
            data-testid={`text-project-title-${project.id}`}
          >
            {project.title}
          </h3>
          <p
            className="text-sm text-white/70 line-clamp-2"
            data-testid={`text-project-description-${project.id}`}
          >
            {project.description}
          </p>

          <div className="mt-3 flex items-center text-sm text-white/60 group-hover:text-white transition-colors">
            <span className="font-medium">View Details</span>
            <svg
              className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
