import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadEmployees() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
          signal: controller.signal
        });
        if (!response.ok) throw new Error("The employee list could not be loaded.");
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Unable to load employees. Please check your internet connection and try again.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
    return () => controller.abort();
  }, []);

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Employee Dashboard</h1>
          <p className="subheading">A quick look at the people in your organisation.</p>
        </div>
        <div className="total-card">
          <span className="total-icon">👥</span>
          <div><span className="total-label">Total employees</span><strong>{loading ? "—" : employees.length}</strong></div>
        </div>
      </div>

      <div className="section-title">
        <div><h2>Employee directory</h2><p>Employee details loaded from an external API</p></div>
        {!loading && !error && <span className="status-pill"><span /> Live data</span>}
      </div>

      <div className="table-card">
        {loading ? (
          <div className="message"><span className="spinner" /> Loading employees…</div>
        ) : error ? (
          <div className="message error-message">{error} <button className="small-button" onClick={() => window.location.reload()}>Retry</button></div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead><tr><th>ID</th><th>EMPLOYEE</th><th>EMAIL ADDRESS</th><th>STATUS</th></tr></thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td><span className="id-tag">#{String(employee.id).padStart(3, "0")}</span></td>
                    <td><div className="person-cell"><span className={`avatar avatar-${employee.id % 5}`}>{employee.name.split(" ").map(part => part[0]).slice(0, 2).join("").toUpperCase()}</span><div><strong>{employee.name}</strong><small>{employee.company?.name || "Team member"}</small></div></div></td>
                    <td><a className="email-link" href={`mailto:${employee.email}`}>{employee.email}</a></td>
                    <td><span className="active-pill"><span /> Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <p className="footnote">Showing {loading ? "…" : employees.length} records · Source: JSONPlaceholder API</p>
    </section>
  );
}

function EmployeeForm() {
  const [form, setForm] = useState({ name: "", designation: "", location: "", salary: "" });
  const [submitted, setSubmitted] = useState(false);

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="form-page">
      <div className="page-heading">
        <div><p className="eyebrow">EMPLOYEE MANAGEMENT</p><h1>Employee Form</h1><p className="subheading">Enter the employee details below.</p></div>
        <div className="form-icon">＋</div>
      </div>
      <div className="form-card">
        <div className="form-card-heading"><h2>Basic information</h2><p>Fields marked with * are required.</p></div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>Full name <span>*</span><input name="name" value={form.name} onChange={update} placeholder="e.g. Ananya Menon" required /></label>
            <label>Designation <span>*</span><input name="designation" value={form.designation} onChange={update} placeholder="e.g. Software Engineer" required /></label>
            <label>Location <span>*</span><input name="location" value={form.location} onChange={update} placeholder="e.g. Kochi, Kerala" required /></label>
            <label>Salary (₹) <span>*</span><input name="salary" type="number" min="0" value={form.salary} onChange={update} placeholder="e.g. 35000" required /></label>
          </div>
          <div className="form-actions"><button type="reset" className="secondary-button" onClick={() => { setForm({ name: "", designation: "", location: "", salary: "" }); setSubmitted(false); }}>Clear form</button><button type="submit" className="primary-button">Preview details <span>→</span></button></div>
        </form>
        {submitted && <div className="preview-box"><h3>Details preview</h3><p><strong>Name:</strong> {form.name}</p><p><strong>Designation:</strong> {form.designation}</p><p><strong>Location:</strong> {form.location}</p><p><strong>Salary:</strong> ₹{Number(form.salary).toLocaleString("en-IN")}</p><small>This is a frontend-only demo. The data is not sent to a server.</small></div>}
      </div>
      <p className="footnote">Note: This form previews entered data locally. No data is posted to an API.</p>
    </section>
  );
}

export default function App() {
  const location = useLocation();
  const isForm = location.pathname === "/employee-form";
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">E</div><div><strong>Elevate</strong><small>PEOPLE PLATFORM</small></div></div>
        <p className="nav-caption">WORKSPACE</p>
        <nav>
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? "selected" : ""}`}><span className="nav-icon">▦</span> Home</NavLink>
          <NavLink to="/employee-form" className={({ isActive }) => `nav-link ${isActive ? "selected" : ""}`}><span className="nav-icon">＋</span> Employee Form</NavLink>
        </nav>
        <div className="sidebar-bottom"><div className="help-icon">?</div><div><strong>Need help?</strong><small>Contact your administrator</small></div></div>
      </aside>
      <main className="main-area">
        <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>{isForm ? "Employee Form" : "Home"}</strong></div><div className="profile"><div className="notification">♧</div><div className="profile-avatar">A</div><div className="profile-name"><strong>Admin User</strong><small>Administrator</small></div><span className="chevron">⌄</span></div></header>
        <div className="content"><Routes><Route path="/" element={<Dashboard />} /><Route path="/employee-form" element={<EmployeeForm />} /><Route path="*" element={<Dashboard />} /></Routes></div>
        <footer>© 2026 Elevate People Platform <span>Built with React</span></footer>
      </main>
    </div>
  );
}
