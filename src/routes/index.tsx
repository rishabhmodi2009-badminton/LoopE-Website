import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, Stitch } from "@/components/site-layout";
import { PetSurvey } from "@/components/pet-survey";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LoopE — Pet gear made from Singapore's discarded textiles" },
      {
        name: "description",
        content:
          "LoopE turns discarded textiles from local suppliers into leashes, collars and other pet accessories, built around what Singapore's pet owners tell us they need.",
      },
      { property: "og:title", content: "LoopE — Singapore's old clothes, walking its dogs" },
      {
        property: "og:description",
        content: "Pet gear made from textiles Singapore was going to throw away.",
      },
    ],
  }),
  component: Index,
});

const careLabel = [
  ["Made from", "Discarded textiles"],
  ["Sourced in", "Singapore"],
  ["Made with", "Local upcycling partners"],
  ["Designed by", "Pet owners, mostly"],
] as const;

const journey = [
  { n: "01", title: "Collected", text: "Offcuts and unwanted fabric come in from local textile suppliers." },
  { n: "02", title: "Sorted", text: "We keep the pieces strong enough to hold a dog that sees a cat." },
  { n: "03", title: "Made", text: "Upcycling partners cut, braid and stitch them into gear." },
  { n: "04", title: "Walked", text: "It goes home with someone who lives a few MRT stops away." },
] as const;

const loop = [
  {
    who: "Pet owners",
    what: "Tell us what breaks, what chafes and what you wish existed. That list is our design brief.",
    tag: "That's you",
  },
  {
    who: "Textile suppliers",
    what: "Local businesses send us fabric that would otherwise be binned.",
    tag: "Source",
  },
  {
    who: "Upcycling partners",
    what: "Makers who turn that fabric into something you'd trust on a busy road.",
    tag: "Make",
  },
  {
    who: "Local initiatives",
    what: "Sustainability groups we work with so the loop reaches further than one product.",
    tag: "Reach",
  },
] as const;

function Index() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-8 sm:pt-24">
        <h1 className="text-[clamp(3.25rem,12vw,10.5rem)]">
          Singapore's
          <br />
          old clothes,
          <br />
          <span className="text-moss">walking its dogs.</span>
        </h1>

        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-xl sm:text-2xl">
              LoopE turns textiles Singapore throws away into leashes, collars and everyday gear
              for pets. Before we make anything, we ask the people holding the leash what they
              actually need.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#ask" className="label bg-ink px-6 py-4 text-paper hover:bg-moss">
                Tell us about your pet
              </a>
              <Link to="/shop" className="label link-under">
                See what we're making
              </Link>
            </div>
          </div>

          <dl className="self-end border-2 border-ink md:col-span-5 md:col-start-8">
            <div className="label bg-ink px-4 py-2 text-paper">Care label</div>
            {careLabel.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 border-t border-ink/20 px-4 py-3 first-of-type:border-t-0">
                <dt className="label pt-1 text-ink-soft">{k}</dt>
                <dd className="leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="weave mt-20 h-16 sm:h-24" aria-hidden />

      <Section className="mt-24">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="label text-ink-soft md:col-span-3">How a shirt becomes a leash</p>
          <h2 className="text-5xl sm:text-7xl md:col-span-9">From wardrobe to walk</h2>
        </div>

        <ol className="relative mt-14 grid gap-10 md:grid-cols-4 md:gap-8">
          <Stitch className="absolute top-[1.15rem] left-0 hidden text-moss md:block" />
          {journey.map((s) => (
            <li key={s.n} className="relative">
              <span className="label relative inline-block bg-paper pr-3 text-base text-moss">{s.n}</span>
              <h3 className="mt-4 text-3xl">{s.title}</h3>
              <p className="mt-3 text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="label mt-10 text-ink-soft">
          When it wears out, it goes back to <span className="text-moss">01</span>.
        </p>
      </Section>

      <section className="mt-32 bg-paper-deep py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-8">
          <p className="label text-ink-soft">The rule we work by</p>
          <blockquote className="mt-6 font-serif text-[clamp(1.9rem,4.5vw,3.6rem)] leading-[1.15] italic">
            We don't begin by assuming what pet owners want, or what materials can be reused.
          </blockquote>
          <p className="mt-8 max-w-2xl text-xl text-ink-soft">
            We begin by listening to people who walk their dogs at 7am in the rain, and by
            working with textile partners who know which fabrics last. The products come after
            that.
          </p>
        </div>
      </section>

      <Section className="mt-32">
        <div className="grid gap-6 md:grid-cols-12">
          <p className="label text-ink-soft md:col-span-3">Who's in the loop</p>
          <h2 className="text-5xl sm:text-7xl md:col-span-9">It takes a neighbourhood</h2>
        </div>
        <ul className="mt-12 border-t-2 border-ink">
          {loop.map((row) => (
            <li
              key={row.who}
              className="grid gap-3 border-b border-ink/20 py-7 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <h3 className="text-3xl md:col-span-4 md:text-4xl">{row.who}</h3>
              <p className="max-w-xl text-ink-soft md:col-span-6">{row.what}</p>
              <span className="label text-moss md:col-span-2 md:text-right">{row.tag}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="mt-32">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="label text-ink-soft md:col-span-3">Where this goes</p>
          <div className="md:col-span-8">
            <p className="text-2xl leading-snug sm:text-3xl">
              Picture a city where a torn bedsheet can end up as a dog's harness instead of in
              Semakau. That's the long game: a circular system for Singapore's textiles, built out
              of local suppliers, makers and pet owners who trust each other.
            </p>
            <p className="mt-6 max-w-2xl text-ink-soft">
              We want to show that being sustainable doesn't mean settling for weaker, uglier or
              more expensive gear. If it does, we haven't done our job. Read the{" "}
              <Link to="/about" className="link-under text-ink">
                full mission
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>

      <section id="ask" className="weave-ink mt-32 scroll-mt-8 py-24 text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="label text-moss">Start here</p>
            <h2 className="mt-6 text-5xl sm:text-7xl">What does your pet actually need?</h2>
            <p className="mt-6 text-paper/70">
              It takes about two minutes, and your answer shapes the next thing we make.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <PetSurvey />
          </div>
        </div>
      </section>
    </>
  );
}
