import { Link } from "react-router-dom";
import { projects } from "../content/contentLoader";



export default function Projects() {
  const sortedProjects = [...projects].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured)
  );

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">
          ENGINEERING / PROJECTS
        </p>

        <h1>Projects</h1>

        <p>
          Systems, applications, experiments, and
          technical work I've built and documented.
        </p>
      </header>

      <section className="project-grid">
        {sortedProjects.map((project) => (
          <article
            className="project-card"
            key={project.slug}
          >
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
                  {formatStatus(project.status)}
                </span>
              )}

              <h2>{project.title}</h2>

              <p>{project.description}</p>

              <div className="tag-list">
                {project.technologies.map(
                  (technology) => (
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
        ))}
      </section>
    </main>
  );
}

function formatStatus(status: string) {
  return status
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}