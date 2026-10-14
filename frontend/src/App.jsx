
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import StudentList from "./pages/StudentList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">PS</div>
            <div>
              <h2>Placement Portal</h2>
              <p>Skill Monitoring System</p>
            </div>
          </div>

          <nav className="navigation">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/add-student">Add Student</NavLink>
            <NavLink to="/students">Student Records</NavLink>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/students" element={<StudentList />} />
          </Routes>
        </main>

        <footer className="footer">
          Placement Skill Monitoring Management System
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
