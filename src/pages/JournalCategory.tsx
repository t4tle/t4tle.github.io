import { Link, useParams } from "react-router-dom";
import { journalEntries } from "../content/contentLoader";

const categoryNames: Record<string, string> = {
  "software-engineering": "Software Engineering",
  "life-career": "My Life & Career",
  "1000-attempts": "A 1000 Attempts",
  "technical-theory": "Technical Theory",
  "my-projects": "My Projects",
  "deep-dark-web": "The Surface of the Deep Dark Web",
  general: "General",
};

export default function JournalCategory() {
  const { category } = useParams();

  const categoryEntries = journalEntries
    .filter((entry) => entry.category === category)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );

  const categoryName =
    categoryNames[category || ""] || "Journal";

  return (
    <main className="page">
      <div className="page-header">
        <p className="eyebrow">JOURNAL / CATEGORY</p>

        <h1>{categoryName}</h1>

        <p>
          Notes, experiments, ideas, and observations
          from the engineering archive.
        </p>
      </div>

      <section className="journal-list">
        {categoryEntries.length === 0 ? (
          <div className="empty-state">
            <p>No entries here yet.</p>
          </div>
        ) : (
          categoryEntries.map((entry) => (
            <article
              className="journal-card"
              key={entry.slug}
            >
              <div className="journal-card-meta">
                <span>{entry.date}</span>
              </div>

              <h2>{entry.title}</h2>

              {entry.excerpt && (
                <p>{entry.excerpt}</p>
              )}

              {entry.tags && entry.tags.length > 0 && (
                <div className="tag-list">
                  {entry.tags.map((tag) => (
                    <span className="tag" key={tag}>   
                       {tag}
                    </span>
                  ))}
                </div>
              )}

              <Link
                to={`/journal/${category}/${entry.slug}`}
                className="text-link"
              >
                Read Entry →
              </Link>
            </article>
          ))
        )}
      </section>
    </main>
  );
}