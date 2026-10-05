import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navigation/Navbar";
import "./styles/globals.css"
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectPage from "./pages/ProjectPage";
import Journal from "./pages/Journal";
import JournalEntry from "./pages/JournalEntry";
import JournalCategory from "./pages/JournalCategory";
import Lab from "./pages/Lab";
import About from "./pages/About";
import Resume from "./pages/Resume";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />

        <Route path="/journal" element={<Journal />} />
        <Route
          path="/journal/:category"
          element={<JournalCategory />}
        />
        <Route
          path="/journal/:category/:slug"
          element={<JournalEntry />}
        />

        <Route path="/lab" element={<Lab />} />

        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;