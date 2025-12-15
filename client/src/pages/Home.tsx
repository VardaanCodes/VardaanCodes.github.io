/** @format */

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import About from "@/components/About";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation transparent />
      <Hero />
      <FeaturedProjects />
      <About />
    </div>
  );
}
