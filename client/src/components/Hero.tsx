/** @format */

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/Lunar_Eclipse_Moon.png";

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <p
          className="text-sm md:text-base uppercase tracking-widest text-white/70 mb-4"
          data-testid="text-hero-subtitle"
        >
          Mechanical Engineering Student at IIT Madras
        </p>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6"
          data-testid="text-hero-title"
        >
          Vardaan Srivastava
        </h1>
        <p
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          data-testid="text-hero-description"
        >
          Passionate about mechatronics, embedded systems, and computational
          engineering. Building innovative solutions through CAD design, Python
          programming, and experimental analysis.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/projects">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 border border-white/20"
              data-testid="button-view-projects"
            >
              View Projects
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
            onClick={scrollToAbout}
            data-testid="button-about-me"
          >
            About Me
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll to about section"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
