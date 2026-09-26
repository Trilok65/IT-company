"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

const projectTypes = [
  "Web & App Engineering",
  "Cloud & DevOps",
  "UI/UX Design",
  "AI & Automation",
  "Other",
];

const budgets = ["Under $5,000", "$5,000–$15,000", "$15,000+"];

type FormspreeResponse = {
  error?: string;
  errors?: Array<{ field?: string; message: string }>;
};

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFieldErrors({});
    setFormError("");

    try {
      const form = event.currentTarget;
      const response = await fetch(form.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      const result = (await response.json().catch(() => ({}))) as FormspreeResponse;

      if (!response.ok) {
        const errors = result.errors?.reduce<Record<string, string>>((collected, item) => {
          if (item.field) collected[item.field] = item.message;
          else collected.form = item.message;
          return collected;
        }, {});

        if (errors && Object.keys(errors).length > 0) {
          setFieldErrors(errors);
          setFormError(errors.form ?? "Please check the highlighted fields and try again.");
        } else {
          setFormError(result.error ?? "Unable to send your message. Please try again.");
        }
        return;
      }

      setIsSubmitted(true);
    } catch {
      setFormError("We couldn't send your message. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div role="status" className="border border-[#b9d5b7] bg-[#edf6e9] p-6 text-[#285344] sm:p-8">
        <CheckCircle2 aria-hidden="true" size={25} />
        <p className="mt-3 font-semibold">Thanks! We&apos;ll be in touch within one business day.</p>
      </div>
    );
  }

  const fieldClassName = "mt-2 min-h-11 w-full border border-[#cbd3c8] bg-white px-3 py-2.5 text-sm text-[#16352e] placeholder:text-[#87938b] focus:border-[#365b40] focus:outline-none focus:ring-2 focus:ring-[#365b40]/20";

  return (
    <form onSubmit={handleSubmit} action="https://formspree.io/f/YOUR_FORM_ID" method="POST" className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor="name" className="text-sm font-medium text-[#16352e]">Name <span aria-hidden="true">*</span></label>
          <input id="name" name="name" type="text" autoComplete="name" required className={fieldClassName} aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "name-error" : undefined} />
          {fieldErrors.name && <p id="name-error" role="alert" className="mt-1 text-xs text-[#a13d2d]">{fieldErrors.name}</p>}
        </div>
        <div className="min-w-0">
          <label htmlFor="email" className="text-sm font-medium text-[#16352e]">Work email <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" autoComplete="email" required className={fieldClassName} aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "email-error" : undefined} />
          {fieldErrors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-[#a13d2d]">{fieldErrors.email}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="company" className="text-sm font-medium text-[#16352e]">Company name</label>
        <input id="company" name="company" type="text" autoComplete="organization" className={fieldClassName} aria-invalid={Boolean(fieldErrors.company)} aria-describedby={fieldErrors.company ? "company-error" : undefined} />
        {fieldErrors.company && <p id="company-error" role="alert" className="mt-1 text-xs text-[#a13d2d]">{fieldErrors.company}</p>}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor="projectType" className="text-sm font-medium text-[#16352e]">Project type</label>
          <select id="projectType" name="projectType" defaultValue="" className={fieldClassName} aria-invalid={Boolean(fieldErrors.projectType)} aria-describedby={fieldErrors.projectType ? "project-type-error" : undefined}>
            <option value="" disabled>Select a project type</option>
            {projectTypes.map((projectType) => <option key={projectType} value={projectType}>{projectType}</option>)}
          </select>
          {fieldErrors.projectType && <p id="project-type-error" role="alert" className="mt-1 text-xs text-[#a13d2d]">{fieldErrors.projectType}</p>}
        </div>
        <div className="min-w-0">
          <label htmlFor="budget" className="text-sm font-medium text-[#16352e]">Budget</label>
          <select id="budget" name="budget" defaultValue="" className={fieldClassName} aria-invalid={Boolean(fieldErrors.budget)} aria-describedby={fieldErrors.budget ? "budget-error" : undefined}>
            <option value="" disabled>Select a budget</option>
            {budgets.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
          </select>
          {fieldErrors.budget && <p id="budget-error" role="alert" className="mt-1 text-xs text-[#a13d2d]">{fieldErrors.budget}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-[#16352e]">Project details</label>
        <textarea id="message" name="message" rows={4} className={`${fieldClassName} resize-y`} aria-invalid={Boolean(fieldErrors.message)} aria-describedby={fieldErrors.message ? "message-error" : undefined} />
        {fieldErrors.message && <p id="message-error" role="alert" className="mt-1 text-xs text-[#a13d2d]">{fieldErrors.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#16352e] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#285344] disabled:cursor-wait disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16352e]">
        {isSubmitting ? <><LoaderCircle aria-hidden="true" className="animate-spin" size={17} /> Sending...</> : <>Send message <Send aria-hidden="true" size={16} /></>}
      </button>
      {formError && <p role="alert" className="text-sm leading-6 text-[#a13d2d]">{formError}</p>}
    </form>
  );
}
