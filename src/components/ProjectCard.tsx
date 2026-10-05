import { Link } from "react-router-dom";
import type { Project } from "../content/contentLoader";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="project-card">
      {project.heroImage && (
        <div className="project-card-image">
          <img
            src={project.heroImage}
            alt={project.title}
          />
        </div>
      )}

      <div className="project-card-content">
        {project.status && (
          <span className="project-status">
            {project.status
              .replace(/-/g, " ")
              .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
              )}
          </span>
        )}

        <h2>{project.title}</h2>

        <p>{project.description}</p>

        <div className="tag-list">
          {project.technologies.map(
            (technology: string) => (
              <span
                className="tag"
                key={technology}
              >
                {technology}
              </span>
            )
          )}
        </div>

        <div className="project-card-actions">
          <Link
            to={`/projects/${project.slug}`}
            className="button button-primary"
          >
            View Project
          </Link>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="button button-secondary"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}