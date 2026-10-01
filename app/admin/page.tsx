"use client";

import "./admin.css";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, CheckCircle2, DollarSign, LogOut, Mail, Search, ShieldCheck, Users } from "lucide-react";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  projectTypes: string[];
  budget: string;
  message: string;
  created_at: string;
};

type DashboardResponse = {
  inquiries: Inquiry[];
  stats: { total: number; thisMonth: number; budgets: Record<string, number> };
};

const budgetLabels: Record<string, string> = {
  "under-5k": "Under $5,000",
  "5-15k": "$5,000 - $15,000",
  "15k+": "$15,000+",
};

export default function AdminPage() {
  const [key, setKey] = useState("");
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState("all");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const existingKey = window.sessionStorage.getItem("admin-key");
    if (existingKey) {
      loadDashboard(existingKey);
    }
  }, []);

  async function loadDashboard(adminKey: string) {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/inquiries", {
        headers: { Authorization: `Bearer ${adminKey}` },
      });
      const result = (await response.json()) as DashboardResponse & { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Unable to sign in.");
      setData(result);
      window.sessionStorage.setItem("admin-key", adminKey);
    } catch (loadError) {
      setData(null);
      setError(loadError instanceof Error ? loadError.message : "Unable to load the dashboard.");
      window.sessionStorage.removeItem("admin-key");
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loadDashboard(key.trim());
  }

  function signOut() {
    window.sessionStorage.removeItem("admin-key");
    setData(null);
  }

  const filteredInquiries = useMemo(() => {
    if (!data) return [];
    const normalizedSearch = search.toLowerCase().trim();

    return data.inquiries.filter((inquiry) => {
      const matchesSearch = !normalizedSearch || [inquiry.name, inquiry.email, inquiry.message, ...inquiry.projectTypes].join(" ").toLowerCase().includes(normalizedSearch);
      const matchesBudget = budget === "all" || inquiry.budget === budget;
      return matchesSearch && matchesBudget;
    });
  }, [data, search, budget]);

  if (!data) {
    return (
      <main className="admin-login">
        <div className="admin-login-card">
          <a href="/" className="admin-back"><ArrowLeft size={15} /> Back to website</a>
          <div className="admin-logo"><ShieldCheck size={22} /> Nepal Exporting IT</div>
          <span className="admin-kicker">PRIVATE WORKSPACE</span>
          <h1>Welcome back.</h1>
          <p>Sign in to view and manage your website inquiries.</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <label htmlFor="admin-key">Admin key</label>
            <input id="admin-key" type="password" value={key} onChange={(event) => setKey(event.target.value)} placeholder="Enter your ADMIN_KEY" required autoFocus />
            <button type="submit" disabled={isLoading}>{isLoading ? "Checking..." : "Open dashboard"}</button>
          </form>
          {error && <p className="admin-error" role="alert">{error}</p>}
          <small>Set ADMIN_KEY in your environment before using this page.</small>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <a href="/" className="admin-logo"><ShieldCheck size={20} /> Nepal Exporting IT <span>/ Admin</span></a>
        <button className="admin-signout" onClick={signOut}><LogOut size={15} /> Sign out</button>
      </header>
      <div className="admin-content">
        <div className="admin-heading"><div><span className="admin-kicker">PRIVATE WORKSPACE</span><h1>Inquiry overview</h1><p>Keep every new conversation visible and ready for a thoughtful reply.</p></div><a className="admin-site-link" href="/">View website <ArrowLeft size={15} /></a></div>
        <div className="admin-stats"><div><Users size={18} /><span>Total inquiries</span><strong>{data.stats.total}</strong></div><div><CalendarDays size={18} /><span>This month</span><strong>{data.stats.thisMonth}</strong></div><div><DollarSign size={18} /><span>15k+ opportunities</span><strong>{data.stats.budgets["15k+"] ?? 0}</strong></div><div><CheckCircle2 size={18} /><span>Showing now</span><strong>{filteredInquiries.length}</strong></div></div>
        <section className="admin-panel"><div className="admin-toolbar"><div className="admin-search"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search name, email, project..." /></div><select value={budget} onChange={(event) => setBudget(event.target.value)} aria-label="Filter by budget"><option value="all">All budgets</option><option value="under-5k">Under $5,000</option><option value="5-15k">$5,000 - $15,000</option><option value="15k+">$15,000+</option></select></div>
          <div className="admin-table-wrap"><table><thead><tr><th>Contact</th><th>Project</th><th>Budget</th><th>Message</th><th>Received</th></tr></thead><tbody>{filteredInquiries.map((inquiry) => <tr key={inquiry.id}><td><strong>{inquiry.name}</strong><a href={`mailto:${inquiry.email}`}><Mail size={13} />{inquiry.email}</a></td><td><div className="admin-tags">{inquiry.projectTypes.map((type) => <span key={type}>{type}</span>)}</div></td><td><b className="admin-budget">{budgetLabels[inquiry.budget] ?? inquiry.budget}</b></td><td><p className="admin-message">{inquiry.message}</p></td><td className="admin-date">{new Date(inquiry.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td></tr>)}</tbody></table>{filteredInquiries.length === 0 && <div className="admin-empty">No inquiries match your filters.</div>}</div>
        </section>
        <p className="admin-security-note">Signed in for this browser session. Customer data is protected by your server-side ADMIN_KEY.</p>
      </div>
    </main>
  );
}
