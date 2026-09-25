import { Star } from "lucide-react";

type Review = {
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
};

const reviews: Review[] = [
  {
    quote:
      "They shipped in three weeks what our previous agency quoted six months for. The senior-only staffing claim actually held up.",
    name: "Sarah Whitfield",
    role: "CTO, Fintech Startup",
    location: "London, UK",
    rating: 5,
  },
  {
    quote:
      "Overlap with our working hours meant standups actually worked. No handoff lag, no surprises at review time.",
    name: "Marcus Chen",
    role: "VP Engineering",
    location: "Austin, TX",
    rating: 5,
  },
  {
    quote:
      "Our AWS bill dropped 38% in the first month after their infrastructure review. Paid for the engagement on its own.",
    name: "Priya Nair",
    role: "Head of Product",
    location: "Singapore",
    rating: 4,
  },
];

export default function Testimonials() {
  return (
    <section className="border-b border-slate-800 bg-slate-900 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50">
            Trusted by teams worldwide
          </h2>
          <p className="mt-4 text-slate-400">
            Direct feedback from the people who signed off on the invoice.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-lg border border-slate-700 bg-slate-800/50 p-6"
            >
              <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-700 text-slate-700"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                "{review.quote}"
              </blockquote>

              <figcaption className="mt-6 border-t border-slate-700 pt-4">
                <div className="text-sm font-medium text-slate-50">{review.name}</div>
                <div className="mt-0.5 text-sm text-slate-400">{review.role}</div>
                <div className="mt-0.5 font-mono text-xs text-slate-500">{review.location}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
