import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-intro">
        <div className="eyebrow">LET'S WORK TOGETHER</div>
        <h2>Ready to build<br /><em>something?</em></h2>
        <p>Tell us what you need. We'll come back with a clear proposal within one business day, no commitment required.</p>
        <a className="calendly-link" href="mailto:hello@nepalexportingit.com">hello@nepalexportingit.com <span>↗</span></a>
        <a className="calendly-link" href="https://calendly.com/nepalexportingit" target="_blank" rel="noreferrer">
          Prefer to pick a time? Open Calendly <span>↗</span>
        </a>
      </div>
      <div className="contact-form-wrap">
        <ContactForm />
      </div>
    </section>
  );
}
