import { useParams, Link } from "react-router-dom";
import { journalEntries } from "../content/contentLoader";
import { marked } from "marked";

export default function JournalEntry() {
  const { category, slug } = useParams();

  const entry = journalEntries.find(
    (item) =>
      item.category === category &&
      item.slug === slug
  );

  if (!entry) {
    return (
      <main className="page">
        <p className="eyebrow">JOURNAL / ERROR</p>

        <h1>Entry Not Found</h1>

        <p>
          I couldn't find the journal entry you're
          looking for.
        </p>

        <Link to="/journal">
          ← Back to Journal
        </Link>
      </main>
    );
  }

  const renderedContent = marked.parse(
    entry.content
  );

  return (
    <main className="page journal-entry">
      <header className="journal-entry-header">
        <p className="eyebrow">
          JOURNAL /{" "}
          {category?.replace("-", " ").toUpperCase()}
        </p>

        <h1>{entry.title}</h1>

        <div className="journal-entry-meta">
          <span>{entry.date}</span>

          {entry.tags &&
            entry.tags.map((tag) => (
              <span
                className="tag"
                key={tag}
              >
                {tag}
              </span>
            ))}
        </div>

        {entry.excerpt && (
          <p className="journal-entry-excerpt">
            {entry.excerpt}
          </p>
        )}
      </header>

      <article
        className="markdown-content"
        dangerouslySetInnerHTML={{
          __html: renderedContent,
        }}
      />

      <footer className="journal-entry-footer">
        <Link
          to={`/journal/${category}`}
          className="text-link"
        >
          ← Back to {category}
        </Link>
      </footer>
    </main>
  );
}