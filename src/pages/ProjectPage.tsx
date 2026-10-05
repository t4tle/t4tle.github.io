import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import {
  projects,
  journalEntries,
} from "../content/contentLoader";

export default function ProjectPage() {
  const { slug } = useParams();

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    return (
      <main className="page">
        <p className="eyebrow">
          PROJECT / ERROR
        </p>

        <h1>Project Not Found</h1>

        <p>
          I couldn't find the project you're
          looking for.
        </p>

        <Link to="/projects">
          ← Back to Projects
        </Link>
      </main>
    );
  }

  const renderedContent = marked.parse(
    project.content
  );

  const relatedEntries =
    journalEntries.filter((entry) =>
      project.relatedJournal?.includes(entry.slug)
    );

  return (
    <main className="page project-page">
      <header className="project-page-header">
        <p className="eyebrow">
          ENGINEERING / PROJECT
        </p>

        <h1>{project.title}</h1>

        {project.status && (
          <span className="project-status">
            {project.status}
          </span>
        )}

        <p className="project-description">
          {project.description}
        </p>

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

        <div className="project-page-actions">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="button button-primary"
            >
              GitHub
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="button button-secondary"
            >
              Live Application
            </a>
          )}
        </div>
      </header>

      {project.heroImage && (
        <div className="project-hero-image">
          <img
            src={project.heroImage}
            alt={project.title}
          />
        </div>
      )}

      {project.demoVideo && (
        <section className="project-video">
          <h2>Demo</h2>

          <video
            controls
            preload="metadata"
          >
            <source
              src={project.demoVideo}
              type="video/mp4"
            />
          </video>
        </section>
      )}

      <article
        className="markdown-content"
        dangerouslySetInnerHTML={{
          __html: renderedContent,
        }}
      />

      {relatedEntries.length > 0 && (
        <section className="related-journal">
          <p className="eyebrow">
            PROJECT JOURNAL
          </p>

          <h2>From the Journal</h2>

          <div className="journal-list">
            {relatedEntries.map((entry) => (
              <article
                className="journal-card"
                key={entry.slug}
              >
                <p>{entry.date}</p>

                <h3>{entry.title}</h3>

                {entry.excerpt && (
                  <p>{entry.excerpt}</p>
                )}

                <Link
                  to={`/journal/${entry.category}/${entry.slug}`}
                  className="text-link"
                >
                  Read Entry →
                </Link>
              </article>
            ))}
          </div>
        </section>
      )}

      <footer className="project-page-footer">
        <Link
          to="/projects"
          className="text-link"
        >
          ← Back to Projects
        </Link>
      </footer>
    </main>
  );
}