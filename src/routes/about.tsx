import { createFileRoute } from "@tanstack/react-router";
import { PageHead, Section, Swatch } from "@/components/site-layout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — LoopE" },
      {
        name: "description",
        content:
          "LoopE's mission, vision and the principle behind it: connecting Singapore's pet owners with local sustainability through upcycled textiles.",
      },
      { property: "og:title", content: "About — LoopE" },
      { property: "og:description", content: "Why LoopE exists and how we work." },
    ],
  }),
  component: About,
});

const vps = ["Operations", "Product", "Marketing", "Sustainability"];

function About() {
  return (
    <>
      <PageHead index="02" name="About" title="Pet owners and a pile of fabric">
        LoopE connects Singapore's pet-owning community with local sustainability work, using
        textiles that were on their way to the bin.
      </PageHead>

      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3">
            <p className="label sticky top-8 text-ink-soft">Mission</p>
          </aside>
          <div className="space-y-6 md:col-span-8">
            <p className="text-2xl leading-snug first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[5.5rem] first-letter:leading-[0.8] first-letter:font-extrabold first-letter:text-moss sm:text-3xl">
              We source recycled fabric from local suppliers, work with upcycling partners, and
              design pet accessories around problems owners actually have. The goal is gear that
              lasts and keeps textiles out of landfill.
            </p>
            <p className="text-ink-soft">
              Making eco-friendly products is only part of it. We want pet owners to have a real
              hand in reducing waste, whether that's telling us what to build or backing the local
              environmental projects we work with. That's what a circular
              economy looks like at the scale of one dog and one leash.
            </p>
            <p className="text-ink-soft">
              Underneath all of it is a bet we'd like to win in public: sustainability doesn't
              have to cost you quality, convenience or style. It can just be how pet ownership
              works.
            </p>
          </div>
        </div>
      </Section>

      <Section className="mt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3">
            <p className="label text-ink-soft">How we decide what to make</p>
          </aside>
          <div className="border-l-2 border-moss pl-6 md:col-span-8 sm:pl-10">
            <p className="font-serif text-3xl leading-tight italic sm:text-4xl">
              We don't begin by assuming what pet owners want or what materials can be reused.
            </p>
            <p className="mt-6 text-ink-soft">
              We begin by listening to local pet owners, understanding their needs, and working
              with local textile partners to develop products that hold up on a long walk and do less
              damage on the way.
            </p>
          </div>
        </div>
      </Section>

      <div className="mx-auto mt-24 grid max-w-7xl gap-4 px-4 sm:px-8 md:grid-cols-12">
        <Swatch label="the team at work" className="h-72 md:col-span-7 md:h-96" />
        <Swatch label="fabric offcuts" className="h-72 md:col-span-5 md:mt-16 md:h-80" />
      </div>

      <Section className="mt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <aside className="md:col-span-3">
            <p className="label text-ink-soft">Vision</p>
          </aside>
          <div className="md:col-span-8">
            <p className="text-2xl leading-snug sm:text-3xl">
              A long-term circular system where Singapore's discarded textiles become everyday pet
              products, and sustainability is simply part of having a pet.
            </p>
            <p className="mt-6 text-ink-soft">
              We'll get there by building a trusted network of local textile suppliers, upcycling
              partners and pet owners, then growing it into a model for circular design that is
              practical, run with the community, and measured honestly.
            </p>
          </div>
        </div>
      </Section>

      <Section className="mt-32">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-6">
          <h2 className="text-5xl sm:text-7xl">The people</h2>
          <p className="label text-ink-soft">Names and photos coming soon</p>
        </div>

        <div className="grid gap-8 border-b border-ink/20 py-10 md:grid-cols-12">
          <Swatch label="CEO" className="aspect-[4/5] md:col-span-4" />
          <div className="md:col-span-7 md:col-start-6 md:self-end">
            <p className="label text-moss">Chief Executive Officer</p>
            <h3 className="mt-3 text-4xl">CEO name</h3>
            <p className="mt-4 text-ink-soft">
              A short bio: background, what got them into this, and what they think LoopE should
              become.
            </p>
          </div>
        </div>

        <ul>
          {vps.map((v) => (
            <li
              key={v}
              className="grid gap-2 border-b border-ink/20 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-6"
            >
              <p className="label text-moss sm:col-span-3">VP, {v}</p>
              <h3 className="text-2xl sm:col-span-3">VP name</h3>
              <p className="text-ink-soft sm:col-span-6">A short bio goes here.</p>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
