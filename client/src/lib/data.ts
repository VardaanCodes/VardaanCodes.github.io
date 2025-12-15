/** @format */

// Static data loader for portfolio content
// Reads markdown files from res/ folder at build time

export interface Project {
  id: string;
  title: string;
  categories: string[]; // Changed: now array to support multiple
  description: string;
  image: string;
  year: string;
  tags: string[];
  detailsMarkdown?: string;
  // Extended fields (optional)
  client?: string;
  role?: string;
  duration?: string;
  tools?: string[];
  challenge?: string;
  solution?: string;
  results?: string[];
  images?: string[];
  specs?: { label: string; value: string }[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  iconPath: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  prize?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface ContactInfo {
  label: string;
  value: string;
  href: string | null;
}

// Import markdown files - will be processed at build time
const projectInitFiles = import.meta.glob("@res/projects/*/init.md", {
  as: "raw",
  eager: true,
});
const projectDetailsFiles = import.meta.glob("@res/projects/*/Details.md", {
  as: "raw",
  eager: true,
});
const displayFile = import.meta.glob("@res/projects/Display.md", {
  as: "raw",
  eager: true,
});
const achievementsFile = import.meta.glob("@res/ach.md", {
  as: "raw",
  eager: true,
});
const responsibilitiesFile = import.meta.glob("@res/PoR.md", {
  as: "raw",
  eager: true,
});
const skillsIconsFile = import.meta.glob("@res/skills/icons.json", {
  as: "raw",
  eager: true,
});

// Parse project init.md format
function parseProjectInit(
  content: string,
  projectId: string
): Partial<Project> {
  const lines = content
    .split("\n")
    .filter((line) => line.trim() && !line.includes("<!--"));
  const data: any = { id: projectId };

  lines.forEach((line) => {
    if (line.includes("Project Title -")) {
      data.title = line.split("Project Title -")[1].trim();
    } else if (line.includes("Project Brief -")) {
      data.description = line.split("Project Brief -")[1].trim();
    } else if (line.includes("Project Image -")) {
      const rawImage = line.split("Project Image -")[1].trim();
      let imagePath = rawImage;
      if (imagePath.startsWith("/")) {
        // If prefixed with /res/, strip it (publicDir serves at root)
        imagePath = imagePath.replace(/^\/res\//, "/");
      } else if (imagePath.startsWith("res/")) {
        // Convert to absolute from root and drop leading res/
        imagePath = "/" + imagePath.replace(/^res\//, "");
      } else if (imagePath.startsWith("projects/")) {
        // Ensure leading slash
        imagePath = "/" + imagePath;
      } else {
        // Treat as filename within the project's res folder
        imagePath = `/projects/${projectId}/res/${imagePath}`;
      }
      data.image = imagePath;
    } else if (line.includes("Project Tags -")) {
      data.tags = line
        .split("Project Tags -")[1]
        .trim()
        .split(",")
        .map((t) => t.trim());
    } else if (line.includes("Year -")) {
      data.year = line.split("Year -")[1].trim();
    } else if (line.includes("Category -")) {
      // Support multiple categories separated by comma
      data.categories = line
        .split("Category -")[1]
        .trim()
        .split(",")
        .map((c) => c.trim());
    } else if (line.includes("Client -")) {
      data.client = line.split("Client -")[1].trim();
    } else if (line.includes("Role -")) {
      data.role = line.split("Role -")[1].trim();
    } else if (line.includes("Duration -")) {
      data.duration = line.split("Duration -")[1].trim();
    }
  });

  // Extract year from title if not provided
  if (!data.year) {
    const yearMatch = data.title?.match(/\((\d{4})\)/);
    if (yearMatch) {
      data.year = yearMatch[1];
    } else {
      data.year = "2024"; // Default
    }
  }

  // Determine categories from tags if not provided
  if (!data.categories && data.tags) {
    data.categories = [];
    if (
      data.tags.some(
        (t: string) =>
          t.toLowerCase().includes("firmware") ||
          t.toLowerCase().includes("embedded")
      )
    ) {
      data.categories.push("Embedded Systems");
    }
    if (
      data.tags.some(
        (t: string) =>
          t.toLowerCase().includes("vision") ||
          t.toLowerCase().includes("python")
      )
    ) {
      data.categories.push("Software");
    }
    if (
      data.tags.some(
        (t: string) =>
          t.toLowerCase().includes("mechanical") ||
          t.toLowerCase().includes("design")
      )
    ) {
      data.categories.push("Mechanical Design");
    }
    if (
      data.tags.some(
        (t: string) =>
          t.toLowerCase().includes("actuation") ||
          t.toLowerCase().includes("cnc")
      )
    ) {
      data.categories.push("Mechatronics");
    }
    if (data.categories.length === 0) {
      data.categories = ["Engineering"];
    }
  }

  return data;
}

// Parse display order
function getDisplayOrder(): string[] {
  const displayPath = Object.keys(displayFile)[0];
  if (!displayPath) return [];

  const content = displayFile[displayPath];
  const orderLine = content
    .split("\n")
    .find((line) => line.includes("Display order -"));
  if (!orderLine) return [];

  return orderLine
    .split("Display order -")[1]
    .trim()
    .split(",")
    .map((id) => id.trim());
}

// Get all projects
export function getProjects(): Project[] {
  const projects: Project[] = [];
  const displayOrder = getDisplayOrder();

  // Parse all project init files
  for (const [path, content] of Object.entries(projectInitFiles)) {
    const match = path.match(/projects\/([^/]+)\/init\.md/);
    if (!match) continue;

    const projectId = match[1];
    const projectData = parseProjectInit(content, projectId);

    // Get details markdown
    const detailsPath = path.replace("init.md", "Details.md");
    const detailsContent = projectDetailsFiles[detailsPath];

    projects.push({
      id: projectId,
      title: projectData.title || projectId,
      categories: projectData.categories || ["Engineering"],
      description: projectData.description || "",
      image: projectData.image || "/placeholder.jpg",
      year: projectData.year || "2024",
      tags: projectData.tags || [],
      detailsMarkdown: detailsContent || "",
      client: projectData.client,
      role: projectData.role,
      duration: projectData.duration,
    } as Project);
  }

  // Sort by display order
  if (displayOrder.length > 0) {
    projects.sort((a, b) => {
      const aIndex = displayOrder.indexOf(a.id);
      const bIndex = displayOrder.indexOf(b.id);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  }

  return projects;
}

// Get single project by ID
export function getProjectById(id: string): Project | null {
  const projects = getProjects();
  return projects.find((p) => p.id === id) || null;
}

// Get featured projects (customizable count)
export function getFeaturedProjects(count: number = 4): Project[] {
  // You can control which projects show on the front page:
  // Option 1: Take first N projects from Display.md order
  // return getProjects().slice(0, count);

  // Option 2: Only show projects with specific tag
  // const projects = getProjects();
  // return projects.filter(p => p.tags.includes("Featured")).slice(0, count);

  // Option 3: Only show projects with specific category (now supports multiple)
  // const projects = getProjects();
  // return projects.filter(p => p.categories.includes("Mechatronics")).slice(0, count);

  // Current implementation: take first N from display order
  return getProjects().slice(0, count);
}

// Get skills
export function getSkills(): Skill[] {
  const skillsPath = Object.keys(skillsIconsFile)[0];
  if (!skillsPath) return [];

  const skillsData = JSON.parse(skillsIconsFile[skillsPath]);
  const skills: Skill[] = [];

  // New format: Array of objects with id, name, category, iconPath
  if (Array.isArray(skillsData)) {
    skillsData.forEach((skill) => {
      let iconPath = String(skill.iconPath || "").trim();
      if (iconPath.startsWith("/")) {
        // use as-is (absolute from public root)
      } else if (iconPath.startsWith("res/")) {
        iconPath = "/" + iconPath;
      } else if (iconPath.startsWith("skills/")) {
        iconPath = "/" + iconPath;
      } else if (iconPath.startsWith("icons/")) {
        iconPath = "/skills/" + iconPath;
      } else {
        iconPath = "/skills/icons/" + iconPath;
      }

      skills.push({
        id: skill.id,
        name: skill.name,
        category: skill.category || "Other",
        iconPath: iconPath,
      });
    });
  }
  // Old format: Object with name -> iconPath mapping (backward compatibility)
  else {
    const categories: { [key: string]: string } = {
      Python: "Programming",
      Numpy: "Programming",
      Scipy: "Programming",
      Sympy: "Programming",
      OpenCV: "Programming",
      "Computer Vision": "Programming",
      Ansys: "CAD & Simulation",
      AutoCAD: "CAD & Simulation",
      "Fusion 360": "CAD & Simulation",
      Solidworks: "CAD & Simulation",
      CAD: "CAD & Simulation",
      "Mechanical Design": "CAD & Simulation",
      ESP32: "Electronics",
      "Embedded Firmware": "Electronics",
      EasyEDA: "Electronics",
    };

    Object.entries(skillsData).forEach(([name, rawPath]) => {
      let iconPath = String(rawPath || "").trim();
      if (iconPath.startsWith("/")) {
        // use as-is
      } else if (iconPath.startsWith("res/")) {
        iconPath = "/" + iconPath;
      } else if (iconPath.startsWith("skills/")) {
        iconPath = "/" + iconPath;
      } else if (iconPath.startsWith("icons/")) {
        iconPath = "/skills/" + iconPath;
      } else {
        iconPath = "/skills/icons/" + iconPath;
      }

      skills.push({
        id: name.toLowerCase().replace(/\s+/g, "-"),
        name,
        category: categories[name] || "Other",
        iconPath,
      });
    });
  }

  return skills;
}

// Get achievements
export function getAchievements(): Achievement[] {
  const achPath = Object.keys(achievementsFile)[0];
  if (!achPath) return [];

  const content = achievementsFile[achPath];
  const achievements: Achievement[] = [];

  // Simple parsing - split by heading or bold items
  const lines = content.split("\n").filter((line) => line.trim());
  let currentAch: Partial<Achievement> | null = null;

  lines.forEach((line, idx) => {
    if (line.startsWith("**") && line.includes("**")) {
      // New achievement
      if (currentAch) {
        achievements.push(currentAch as Achievement);
      }
      const title = line.replace(/\*\*/g, "").trim();
      currentAch = {
        id: `ach-${idx}`,
        title,
        description: "",
      };
    } else if (currentAch && line.trim() && !line.startsWith("#")) {
      currentAch.description += line.trim() + " ";
    }
  });

  if (currentAch) {
    achievements.push(currentAch as Achievement);
  }

  return achievements;
}

// Get experiences (responsibilities)
export function getExperiences(): Experience[] {
  // Option 1: Hardcoded experiences (easy to customize)
  // Uncomment this section and comment out Option 2 to use hardcoded data
  /*
  return [
    {
      id: "experience-1",
      company: "Company Name",
      role: "Your Role/Position",
      period: "Jan 2023 - Dec 2023",
      description: "Brief description of your role",
    },
    {
      id: "experience-2",
      company: "Another Company",
      role: "Another Role",
      period: "Jan 2022 - Dec 2022",
      description: "What you did here",
    },
  ];
  */

  // Option 2: Load from PoR.md markdown file (current implementation)
  const porPath = Object.keys(responsibilitiesFile)[0];
  if (!porPath) return [];

  const content = responsibilitiesFile[porPath];
  const experiences: Experience[] = [];

  const sections = content.split("##").filter((s) => s.trim());

  sections.forEach((section, idx) => {
    const lines = section.split("\n").filter((l) => l.trim());
    if (lines.length === 0) return;

    const role = lines[0].trim();
    const periodLine = lines.find((l) => l.startsWith("_"));
    const period = periodLine ? periodLine.replace(/_/g, "").trim() : "";

    const description = lines
      .filter((l) => !l.startsWith("_") && l !== lines[0])
      .join(" ")
      .trim();

    // Extract company from role if it contains comma, otherwise leave empty
    let company = "";
    let roleTitle = role;

    if (role.includes(",")) {
      const parts = role.split(",");
      roleTitle = parts[0].trim();
      company = parts[1].trim();
    }

    experiences.push({
      id: `exp-${idx}`,
      company,
      role: roleTitle,
      period,
      description,
    });
  });

  return experiences;
}

// Get contact info
export function getContactInfo(): ContactInfo[] {
  return [
    {
      label: "Email",
      value: "vardaansriv@gmail.com",
      href: "mailto:vardaansriv@gmail.com",
    },
    {
      label: "GitHub",
      value: "VardaanCodes",
      href: "https://github.com/VardaanCodes",
    },
    {
      label: "LinkedIn",
      value: "vardaan-srivastava",
      href: "https://linkedin.com/in/vardaan-srivastava",
    },
  ];
}

// Get about data (bio, skills summary, etc.)
export function getAboutData() {
  return {
    bio: "Mechanical Engineering student at IIT Bombay with a passion for robotics, embedded systems, and computational engineering. Experienced in CAD design, Python programming, and experimental analysis.",
    skills: getSkills(),
    experiences: getExperiences(),
    achievements: getAchievements(),
    contact: getContactInfo(),
  };
}
