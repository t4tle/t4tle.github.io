import * as yaml from "js-yaml";

export interface JournalEntry {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  audio?: string;
  video?: string;
  youtube?: string;
  relatedProjects?: string[];
  relatedEntries?: string[];
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  status?: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  heroImage?: string;
  demoVideo?: string;
  featured?: boolean;
  relatedJournal?: string[];
  content: string;
}

interface JournalFrontmatter {
  slug?: string;
  title?: string;
  category?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  audio?: string;
  video?: string;
  youtube?: string;
  relatedProjects?: string[];
  relatedEntries?: string[];
}

interface ProjectFrontmatter {
  slug?: string;
  title?: string;
  status?: string;
  description?: string;
  technologies?: string[];
  github?: string;
  demo?: string;
  heroImage?: string;
  demoVideo?: string;
  featured?: boolean;
  relatedJournal?: string[];
}

const journalFiles = import.meta.glob(
  "./journal/**/*.md",
  {
    eager: true,
    query: "?raw",
    import: "default",
  }
);

const projectFiles = import.meta.glob(
  "./projects/**/*.md",
  {
    eager: true,
    query: "?raw",
    import: "default",
  }
);

function parseMarkdownFile(
  rawFile: string,
  path: string
): {
  frontmatter: Record<string, unknown>;
  content: string;
} | null {
  const normalized = rawFile
    .replace(/^\uFEFF/, "")
    .trim();

  // Empty Markdown files are allowed.
  // They are simply ignored until they are filled out.
  if (!normalized) {
    console.warn(
      `[contentLoader] Empty Markdown file skipped: ${path}`
    );

    return null;
  }

  const match = normalized.match(
    /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/
  );

  if (!match) {
    console.warn(
      `[contentLoader] Markdown file skipped because it has no frontmatter: ${path}`
    );

    return null;
  }

  try {
    const frontmatter = yaml.load(
      match[1]
    ) as Record<string, unknown>;

    return {
      frontmatter: frontmatter || {},
      content: match[2].trim(),
    };
  } catch (error) {
    console.error(
      `[contentLoader] Failed to parse YAML: ${path}`,
      error
    );

    return null;
  }
}

/* =========================================
   JOURNAL
========================================= */

const loadedJournalEntries = Object.entries(
  journalFiles
).map(
  ([path, rawFile]): JournalEntry | null => {
    const parsed = parseMarkdownFile(
      rawFile as string,
      path
    );

    if (!parsed) {
      return null;
    }

    const data =
      parsed.frontmatter as JournalFrontmatter;

    const filename =
      path
        .split("/")
        .pop()
        ?.replace(".md", "") || "";

    return {
      slug: data.slug || filename,
      title: data.title || "Untitled Entry",
      category:
        data.category || "general",
      date: data.date || "",
      ...(data.excerpt
        ? { excerpt: data.excerpt }
        : {}),
      tags: data.tags || [],
      ...(data.audio
        ? { audio: data.audio }
        : {}),
      ...(data.video
        ? { video: data.video }
        : {}),
      ...(data.youtube
        ? { youtube: data.youtube }
        : {}),
      relatedProjects:
        data.relatedProjects || [],
      relatedEntries:
        data.relatedEntries || [],
      content: parsed.content,
    };
  }
);

export const journalEntries: JournalEntry[] =
  loadedJournalEntries.filter(
    (entry): entry is JournalEntry =>
      entry !== null
  );

/* =========================================
   PROJECTS
========================================= */

const loadedProjects = Object.entries(
  projectFiles
).map(
  ([path, rawFile]): Project | null => {
    const parsed = parseMarkdownFile(
      rawFile as string,
      path
    );

    if (!parsed) {
      return null;
    }

    const data =
      parsed.frontmatter as ProjectFrontmatter;

    const filename =
      path
        .split("/")
        .pop()
        ?.replace(".md", "") || "";

    return {
      slug: data.slug || filename,
      title: data.title || "Untitled Project",
      ...(data.status
        ? { status: data.status }
        : {}),
      description:
        data.description || "",
      technologies:
        data.technologies || [],
      ...(data.github
        ? { github: data.github }
        : {}),
      ...(data.demo
        ? { demo: data.demo }
        : {}),
      ...(data.heroImage
        ? { heroImage: data.heroImage }
        : {}),
      ...(data.demoVideo
        ? { demoVideo: data.demoVideo }
        : {}),
      featured: data.featured ?? false,
      relatedJournal:
        data.relatedJournal || [],
      content: parsed.content,
    };
  }
);

export const projects: Project[] =
  loadedProjects.filter(
    (project): project is Project =>
      project !== null
  );