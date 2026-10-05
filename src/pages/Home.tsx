import { Link } from "react-router-dom";
import { projects, journalEntries } from "../content/contentLoader";

export default function Home() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 3);

  const latestEntries = [...journalEntries]
    .sort((a, b) =>
      b.date.localeCompare(a.date)
    )
    .slice(0, 3);

  return (
    <main>
      {/* HERO */}

      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">
            ENGINEERING / DATA / ANALYTICS
          </p>

          <h1>
            Joseph Boye
          </h1>

          <p className="hero-description">
            I build data-driven applications and
            intelligent systems while documenting
            what I learn along the way.
          </p>

          <div className="hero-actions">
            <Link
              to="/projects"
              className="button button-primary"
            >
              View Projects
            </Link>

            <Link
              to="/journal"
              className="button button-secondary"
            >
              Read Journal
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}

      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              ENGINEERING / SELECTED WORK
            </p>

            <h2>Projects</h2>
          </div>

          <Link
            to="/projects"
            className="text-link"
          >
            View all →
          </Link>
        </div>

        <div className="project-grid">
          {featuredProjects.map((project) => (
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
                    {project.status}
                  </span>
                )}

                <h3>{project.title}</h3>

                <p>
                  {project.description}
                </p>

                <div className="tag-list">
                  {project.technologies
                    .slice(0, 5)
                    .map((technology) => (
                      <span
                        className="tag"
                        key={technology}
                      >
                        {technology}
                      </span>
                    ))}
                </div>

                <Link
                  to={`/projects/${project.slug}`}
                  className="text-link"
                >
                  Explore project →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* LATEST JOURNAL */}

      <section className="home-section home-journal">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              JOURNAL / LATEST UPDATES
            </p>

            <h2>Recent Notes</h2>
          </div>

          <Link
            to="/journal"
            className="text-link"
          >
            Open journal →
          </Link>
        </div>

        <div className="journal-list">
          {latestEntries.map((entry) => (
            <article
              className="journal-card"
              key={`${entry.category}-${entry.slug}`}
            >
              <p className="journal-card-date">
                {entry.date}
              </p>

              <h3>{entry.title}</h3>

              {entry.excerpt && (
                <p>{entry.excerpt}</p>
              )}

              <Link
                to={`/journal/${entry.category}/${entry.slug}`}
                className="text-link"
              >
                Read entry →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}