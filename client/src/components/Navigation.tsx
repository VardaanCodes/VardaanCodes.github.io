/** @format */

import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  transparent?: boolean;
}

export default function Navigation({ transparent = false }: NavigationProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const CV_PATH = "/Vardaan_Srivastava_Resume.pdf";

  const handleDownloadCV = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = CV_PATH;
    link.download = "Vardaan_Srivastava_Resume.pdf";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    if (href.startsWith("/#")) return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-20 ${
        transparent
          ? "bg-background/80 backdrop-blur-md"
          : "bg-background border-b border-border"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">
        <Link href="/" data-testid="link-home-logo">
          <span className="font-semibold text-xl tracking-tight">
            VARDAAN<span className="text-muted-foreground"> SRIVASTAVA</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href={CV_PATH}
            download="Vardaan_Srivastava_Resume.pdf"
            onClick={handleDownloadCV}
          >
            <Button variant="outline" size="sm" data-testid="button-resume">
              Download CV
            </Button>
          </a>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border p-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-base font-medium ${
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <a
              href={CV_PATH}
              download="Vardaan_Srivastava_Resume.pdf"
              onClick={handleDownloadCV}
              className="w-fit"
            >
              <Button variant="outline" size="sm" className="w-fit mt-2">
                Download CV
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
