import ProjectCard from "../ProjectCard";
import gearboxImage from "@assets/generated_images/gearbox_assembly_render.png";

export default function ProjectCardExample() {
  const sampleProject = {
    id: "1",
    title: "Precision Gearbox Assembly",
    category: "Product Design",
    description: "High-torque gearbox design for industrial automation applications",
    image: gearboxImage,
    year: "2024",
    tags: ["SolidWorks", "FEA", "Manufacturing"],
  };

  return (
    <div className="w-80">
      <ProjectCard project={sampleProject} featured />
    </div>
  );
}
