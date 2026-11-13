import { useState } from "react";

const field =
  "w-full border-0 border-b-2 border-paper/30 bg-transparent px-0 py-3 text-paper placeholder:text-paper/40 outline-none focus:border-moss";

export function PetSurvey() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border-l-2 border-moss pl-6">
        <p className="font-display text-3xl font-extrabold uppercase [font-stretch:75%]">Got it. Thank you.</p>
        <p className="mt-3 text-paper/70">
          Every answer goes into what we make next. We'll write back if we have questions.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-6 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label className="block">
        <span className="label text-paper/60">Your name</span>
        <input className={field} name="name" required />
      </label>
      <label className="block">
        <span className="label text-paper/60">Email</span>
        <input className={field} name="email" type="email" required />
      </label>
      <label className="block sm:col-span-2">
        <span className="label text-paper/60">Who are you shopping for?</span>
        <select className={`${field} [&>option]:text-ink`} name="pet" defaultValue="">
          <option value="" disabled>
            Pick one
          </option>
          <option>A dog that pulls</option>
          <option>A dog that doesn't</option>
          <option>A cat</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="label text-paper/60">What annoys you about the gear you use now?</span>
        <textarea className={field} name="message" rows={3} required />
      </label>
      <div className="sm:col-span-2">
        <button className="label bg-moss px-6 py-4 text-paper transition-colors hover:bg-paper hover:text-ink">
          Send it
        </button>
      </div>
    </form>
  );
}
