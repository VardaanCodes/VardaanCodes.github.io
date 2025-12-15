/** @format */

import { useParams, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectById, getProjects } from "@/lib/data";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = id ? getProjectById(id) : null;
  const allProjects = getProjects();

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The project you're looking for doesn't exist.
            </p>
            <Link href="/projects">
              <Button>Back to Projects</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="relative h-[50vh] min-h-[400px] mb-12">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-8">
            <div className="max-w-7xl mx-auto">
              <Link href="/projects">
                <Button
                  variant="ghost"
                  size="sm"
                  className="mb-4 text-white/80 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Button>
              </Link>
              <Badge variant="secondary" className="mb-3">
                {project.category}
              </Badge>
              <h1
                className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
                data-testid="text-project-detail-title"
              >
                {project.title}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {project.detailsMarkdown ? (
                <section className="prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {project.detailsMarkdown}
                  </ReactMarkdown>
                </section>
              ) : (
                <section>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </section>
              )}
            </div>

            <aside className="space-y-8">
              <div className="bg-card border border-card-border rounded-md p-6">
                <h3 className="font-semibold mb-4">Project Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-muted-foreground">Year</dt>
                    <dd className="font-mono">{project.year}</dd>
                  </div>
                  {project.client && (
                    <div>
                      <dt className="text-sm text-muted-foreground">Client</dt>
                      <dd>{project.client}</dd>
                    </div>
                  )}
                  {project.role && (
                    <div>
                      <dt className="text-sm text-muted-foreground">Role</dt>
                      <dd>{project.role}</dd>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <dt className="text-sm text-muted-foreground">
                        Duration
                      </dt>
                      <dd>{project.duration}</dd>
                    </div>
                  )}
                  {project.tags && project.tags.length > 0 && (
                    <div>
                      <dt className="text-sm text-muted-foreground mb-2">
                        Technologies
                      </dt>
                      <dd className="flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {project.specs && project.specs.length > 0 && (
                <div className="bg-card border border-card-border rounded-md p-6">
                  <h3 className="font-semibold mb-4">
                    Technical Specifications
                  </h3>
                  <dl className="space-y-3">
                    {project.specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between gap-4"
                      >
                        <dt className="text-sm text-muted-foreground">
                          {spec.label}
                        </dt>
                        <dd className="text-sm font-mono text-right">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </aside>
          </div>

          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center gap-4">
            {prevProject ? (
              <Link href={`/projects/${prevProject.id}`}>
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous Project
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link href={`/projects/${nextProject.id}`}>
                <Button variant="ghost" className="gap-2">
                  Next Project
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
