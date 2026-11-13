import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHead } from "@/components/site-layout";
import { PetSurvey } from "@/components/pet-survey";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — LoopE" },
      { name: "description", content: "Get in touch with LoopE, or tell us what your pet needs." },
      { property: "og:title", content: "Contact — LoopE" },
      { property: "og:description", content: "Get in touch with the LoopE team." },
    ],
  }),
  component: Contact,
});

const field =
  "w-full border-0 border-b-2 border-ink/30 bg-transparent px-0 py-3 outline-none placeholder:text-ink-soft/60 focus:border-moss";

const channels = [
  { k: "Email", v: "hello@loope.example", href: "mailto:hello@loope.example" },
  { k: "Phone", v: "+65 0000 0000", href: undefined },
  { k: "Instagram", v: "@loope", href: "https://www.instagram.com/" },
  { k: "LinkedIn", v: "LoopE", href: "https://www.linkedin.com/" },
] as const;

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHead index="05" name="Contact" title="Say hello">
        Orders, partnerships, a pile of old fabric you want gone. We usually reply within two
        working days.
      </PageHead>

      <section className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-8 md:grid-cols-12">
        <dl className="border-t-2 border-ink md:col-span-4">
          {channels.map((c) => (
            <div key={c.k} className="border-b border-ink/20 py-4">
              <dt className="label text-ink-soft">{c.k}</dt>
              <dd className="mt-1 text-xl">
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="link-under">
                    {c.v}
                  </a>
                ) : (
                  c.v
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="md:col-span-7 md:col-start-6">
          <h2 className="text-4xl sm:text-5xl">Send a message</h2>
          {sent ? (
            <p className="mt-8 border-l-2 border-moss pl-6 text-xl">Thanks. We'll be in touch soon.</p>
          ) : (
            <form
              className="mt-8 grid gap-6 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="block">
                <span className="label text-ink-soft">Name</span>
                <input className={field} required />
              </label>
              <label className="block">
                <span className="label text-ink-soft">Email</span>
                <input className={field} type="email" required />
              </label>
              <label className="block sm:col-span-2">
                <span className="label text-ink-soft">Message</span>
                <textarea className={field} rows={4} required />
              </label>
              <div>
                <button className="label bg-ink px-6 py-4 text-paper hover:bg-moss">Send message</button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section className="weave-ink mt-32 py-24 text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-moss">Got a pet?</p>
            <h2 className="mt-6 text-5xl sm:text-6xl">Tell us what to make next</h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <PetSurvey />
          </div>
        </div>
      </section>
    </>
  );
}
