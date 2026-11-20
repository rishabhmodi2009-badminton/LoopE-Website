# LoopE Website

Site for LoopE: pet accessories made from Singapore's discarded textiles.
Built with TanStack Start, React and Tailwind.

## Run locally

```sh
npm install
cp .env.example .env   # then paste your Resend API key into .env
npm run dev
```

## Orders

The `/purchase` form emails each order to `loope.leashes@gmail.com` (set in
`src/lib/company.ts`) through [Resend](https://resend.com). It needs a
`RESEND_API_KEY` environment variable, both in `.env` locally and in the
hosting provider's settings. The Resend account must be registered with
`loope.leashes@gmail.com`, because without a verified domain Resend only
delivers to the account owner's address.
