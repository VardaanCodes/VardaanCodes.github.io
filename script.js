/** @format */

document.addEventListener("DOMContentLoaded", () => {
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

      const orderLine = displayText
        .split("\n")
        .find((line) => line.includes("Display order"));
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
        const parts = line.split("-");
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const value = parts.slice(1).join("-").trim();
          details[key] = value;
        }
      });

      const title = details["Project Title"] || "Untitled";
      const brief = details["Project Brief"] || "";
      const imgName = details["Project Image"] || "";
      const detailsFile = details["Project Details"] || "Details.md";

      // Construct image path
      const imgPath = `res/projects/${folderName}/${imgName}`;

      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
            <img src="${imgPath}" alt="${title}" class="project-img" onerror="this.style.display='none'">
            <div class="project-info">
                <h3>${title}</h3>
                <p>${brief}</p>
            </div>
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
