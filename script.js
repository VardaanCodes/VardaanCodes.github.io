/** @format */

// Configure marked for link handling
if (typeof marked !== "undefined") {
  marked.use({
    renderer: {
      link(href, title, text) {
        let url = href;
        if (!url.match(/^(http|https|mailto|tel|\/|#)/)) {
          url = "https://" + url;
        }
        let target = "";
        if (url.startsWith("http")) {
          target = ' target="_blank" rel="noopener noreferrer"';
        }
        return `<a href="${url}"${target} title="${title || ""}">${text}</a>`;
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Active Navigation Link Logic
  const currentPath = window.location.pathname;
  const navLinksArr = document.querySelectorAll(".nav-links a");

  navLinksArr.forEach((link) => {
    const linkPath = link.getAttribute("href");
    // Simple check: if current path ends with link path (handling / vs /index.html)
    if (
      linkPath === currentPath.split("/").pop() ||
      (linkPath === "index.html" && currentPath.endsWith("/")) ||
      (linkPath === "index.html" && currentPath === "")
    ) {
      // Remove active class from all and add to current
      document.querySelector(".nav-links a.active")?.classList.remove("active");
      link.classList.add("active");
    }
  });

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      navLinks.classList.remove("active");

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    } else {
      navbar.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    }
  });

  // Projects Page Logic
  const projectsContainer = document.getElementById("projects-container");
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");
  const closeModal = document.querySelector(".close-modal");

  if (projectsContainer) {
    loadProjects();
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    window.addEventListener("click", (e) => {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    });

    // Close on Escape key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "block") {
        modal.style.display = "none";
      }
    });
  }

  async function loadProjects() {
    try {
      const displayResponse = await fetch("res/projects/Display.md");
      if (!displayResponse.ok) return; // Silent fail
      const displayText = await displayResponse.text();
      const lines = displayText.split("\n");

      // Parse Tabs per row
      const tabsLine = lines.find((line) => line.includes("Tabs per row"));
      if (tabsLine) {
        const tabsCount = parseInt(tabsLine.split("-")[1].trim());
        if (!isNaN(tabsCount) && tabsCount > 0) {
          projectsContainer.style.gridTemplateColumns = `repeat(${tabsCount}, 1fr)`;
        }
      }

      const orderLine = lines.find((line) => line.includes("Display order"));
      if (!orderLine) return;

      const projectFolders = orderLine
        .split("-")[1]
        .trim()
        .split(",")
        .map((folder) => folder.trim());

      for (const folder of projectFolders) {
        if (!folder) continue;
        await createProjectCard(folder);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
      projectsContainer.innerHTML = `<p style="text-align: center; color: red; padding: 2rem;">Unable to load projects. If you are viewing this locally, please use a local server (e.g., Live Server in VS Code or 'python -m http.server').<br>Error details: ${error.message}</p>`;
    }
  }

  async function createProjectCard(folderName) {
    try {
      const initResponse = await fetch(`res/projects/${folderName}/init.md`);
      if (!initResponse.ok)
        throw new Error(`Failed to load init.md for ${folderName}`);
      const initText = await initResponse.text();

      // Parse init.md
      const details = {};
      initText.split("\n").forEach((line) => {
        // Handle lines with multiple dashes (e.g. "Project Tags - Python, JS")
        const firstDashIndex = line.indexOf("-");
        if (firstDashIndex !== -1) {
          const key = line.substring(0, firstDashIndex).trim();
          const value = line.substring(firstDashIndex + 1).trim();
          details[key] = value;
        }
      });

      const title = details["Project Title"] || "Untitled";
      const brief = details["Project Brief"] || "";
      const imgName = details["Project Image"] || "";
      const tagsString = details["Project Tags"] || "";
      const detailsFile = details["Project Details"] || "Details.md";

      // Construct image path
      const imgPath = `res/projects/${folderName}/${imgName}`;

      // Generate tags HTML
      let tagsHtml = "";
      if (tagsString) {
        const tags = tagsString.split(",").map((t) => t.trim());

        // Load custom icons map
        let customIcons = {};
        try {
          const iconsResponse = await fetch("res/skills/icons.json");
          if (iconsResponse.ok) {
            customIcons = await iconsResponse.json();
          }
        } catch (e) {
          console.warn("Could not load custom icons map");
        }

        const defaultIcons = {
          Python: "fab fa-python",
          JavaScript: "fab fa-js",
          React: "fab fa-react",
          "Node.js": "fab fa-node",
          SQL: "fas fa-database",
          Git: "fab fa-git-alt",
          HTML: "fab fa-html5",
          CSS: "fab fa-css3-alt",
        };

        tagsHtml = `<div class="project-tags">
            ${tags
              .map((tag) => {
                const skillId = `skill-${tag
                  .toLowerCase()
                  .replace(/[^a-z0-9]/g, "")}`;

                let iconContent = "";
                if (customIcons[tag]) {
                  iconContent = `<img src="res/skills/${customIcons[tag]}" alt="${tag}" class="tag-icon-img">`;
                } else {
                  const iconClass = defaultIcons[tag] || "fas fa-code";
                  iconContent = `<i class="${iconClass}"></i>`;
                }

                return `<a href="skills.html#${skillId}" class="project-tag-icon" title="${tag}" onclick="event.stopPropagation()">
                    ${iconContent}
                </a>`;
              })
              .join("")}
        </div>`;
      }

      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
            <img src="${imgPath}" alt="${title}" class="project-img" onerror="this.style.display='none'">
            <div class="project-info">
                <h3>${title}</h3>
                <p>${brief}</p>
            </div>
            ${tagsHtml}
        `;

      card.addEventListener("click", () =>
        openProjectModal(folderName, detailsFile)
      );
      projectsContainer.appendChild(card);
    } catch (error) {
      // Silent fail
    }
  }

  async function openProjectModal(folderName, detailsFile) {
    try {
      const response = await fetch(`res/projects/${folderName}/${detailsFile}`);
      if (!response.ok) return;
      const markdown = await response.text();

      // Convert Markdown to HTML and fix image paths
      const fixedMarkdown = markdown.replace(
        /!\[(.*?)\]\((.*?)\)/g,
        (match, alt, src) => {
          if (!src.startsWith("http") && !src.startsWith("/")) {
            return `![${alt}](res/projects/${folderName}/${src})`;
          }
          return match;
        }
      );

      if (typeof marked !== "undefined") {
        modalBody.innerHTML = marked.parse(fixedMarkdown);
      } else {
        modalBody.innerHTML = `<pre>${fixedMarkdown}</pre>`;
      }

      modal.style.display = "block";
    } catch (error) {
      console.error("Error opening modal:", error);
    }
  }
});
