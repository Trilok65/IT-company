"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const PROJECT_TYPES = [
  "Web & App Engineering",
  "Cloud & DevOps",
  "UI/UX Design",
  "AI & Automation",
] as const;

const BUDGET_RANGES = [
  { value: "", label: "Select a budget range" },
  { value: "under-5k", label: "Under $5,000" },
  { value: "5-15k", label: "$5,000 – $15,000" },
  { value: "15k+", label: "$15,000+" },
];

export default function ContactForm() {
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function toggleProjectType(type: string) {
    setProjectTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          projectTypes,
          budget: formData.get("budget"),
          message: formData.get("message"),
        }),
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "Unable to send your message.");
      }

      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to send your message."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="contact-success">
        <CheckCircle2 className="contact-success-icon" />
        <h3>Message sent</h3>
        <p>
          We reply to every inquiry within one business day. Talk soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 sm:p-8"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="contact-input"
            placeholder="Jane Cooper"
          />
        </div>
        <div>
          <label htmlFor="email">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="contact-input"
            placeholder="jane@company.com"
          />
        </div>
      </div>

      <fieldset className="mt-6">
        <legend>Project type</legend>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PROJECT_TYPES.map((type) => {
            const checked = projectTypes.includes(type);
            return (
              <label
                key={type}
                className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2.5 text-sm transition-colors ${
                  checked
                    ? "border-amber-400 bg-amber-400/10 text-amber-300"
                    : "contact-choice"
                }`}
              >
                <input
                  type="checkbox"
                  name="projectType"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleProjectType(type)}
                />
                {type}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6">
          <label htmlFor="budget">
          Estimated budget
        </label>
        <select
          id="budget"
          name="budget"
          required
          defaultValue=""
          className="contact-input"
        >
          {BUDGET_RANGES.map((range) => (
            <option key={range.value} value={range.value} disabled={range.value === ""}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <label htmlFor="message">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="contact-input"
          placeholder="What are you looking to build?"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="contact-submit"
      >
        {isSubmitting ? "Sending..." : "Send message"}
        <Send className="h-4 w-4" />
      </button>
      {error && (
        <p role="alert" className="contact-error">
          {error}
        </p>
      )}
    </form>
  );
}
