import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Linkedin } from "lucide-react";
import { PageHero, Section } from "@/components/site-layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LoopE Leashes" },
      { name: "description", content: "Get in touch with the LoopE team." },
      { property: "og:title", content: "Contact — LoopE Leashes" },
      { property: "og:description", content: "Get in touch with the LoopE team." },
    ],
  }),
  component: Contact,
});

const field = "w-full rounded-lg border border-input bg-card px-4 py-3 text-foreground outline-none focus:border-accent";

function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Say Hello" />
      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-3 text-muted-foreground">
            <p>Email: hello@loope.example</p>
            <p>Phone: +00 0000 0000</p>
            <p>We reply within 1–2 business days.</p>
            <div className="flex flex-wrap gap-3 pt-4">
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground">
                <Instagram className="h-4 w-4" /> Instagram
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-3 font-semibold text-foreground hover:bg-secondary">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll be in touch."); }}>
            <input className={field} placeholder="Your name" required />
            <input className={field} type="email" placeholder="Your email" required />
            <textarea className={field} rows={5} placeholder="Your message" required />
            <button className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground">Send message</button>
          </form>
        </div>
      </Section>
    </>
  );
}
