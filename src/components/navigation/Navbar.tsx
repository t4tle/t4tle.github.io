import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown  
} from "lucide-react";

//Github,Linkedin,

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);

  const closeMobile = () => {
    setMobileOpen(false);
    setJournalOpen(false);
  };

  return (
    <header className="site-header">
      <nav className="navbar">
        <Link to="/" className="brand" onClick={closeMobile}>
          <span className="brand-name">JOSEPH BOYE</span>
          <span className="brand-status">ENGINEERING / DATA / Analytics</span>
        </Link>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-links ${mobileOpen ? "open" : ""}`}>
          <Link to="/projects" onClick={closeMobile}>
            Projects
          </Link>

          <Link to="/lab" onClick={closeMobile}>
            Lab Prototypes
          </Link>

          <div className="nav-dropdown">
            <button
              className="nav-dropdown-button"
              onClick={() => setJournalOpen(!journalOpen)}
              aria-expanded={journalOpen}
            >
              Journal
              <ChevronDown
                size={15}
                className={journalOpen ? "rotate" : ""}
              />
            </button>

            <div
              className={`nav-dropdown-menu ${
                journalOpen ? "show" : ""
              }`}
            >
              <Link to="/journal" onClick={closeMobile}>
                All Entries
              </Link>

              <Link
                to="/journal/software-engineering"
                onClick={closeMobile}
              >
                Software Engineering
              </Link>

              <Link
                to="/journal/life-career"
                onClick={closeMobile}
              >
                My Life & Career
              </Link>

              <Link
                to="/journal/1000-attempts"
                onClick={closeMobile}
              >
                A 1000 Attempts
              </Link>

              <Link
                to="/journal/technical-theory"
                onClick={closeMobile}
              >
                Technical Theory
              </Link>

              <Link
                to="/journal/my-projects"
                onClick={closeMobile}
              >
                My Projects
              </Link>

              <Link
                to="/journal/deep-dark-web"
                onClick={closeMobile}
              >
                Surface of the Deep Dark Web
              </Link>

              <Link to="/journal/general" onClick={closeMobile}>
                General
              </Link>
            </div>
          </div>

          <Link to="/about" onClick={closeMobile}>
            About
          </Link>

          <Link to="/resume" onClick={closeMobile}>
            Resume
          </Link> 
          <div className="nav-socials">
            <a
              href="https://github.com/t4tle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >  
            </a>

            <a
              href="https://www.linkedin.com/in/joseph-o-boye/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
            </a>
          </div> 
        </div>
      </nav>
    </header>
  );
}

export default Navbar;