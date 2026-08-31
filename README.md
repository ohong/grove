# Grove

Grove is a source-first directory for public Grok Bot templates. It turns an
`x.ai/bot/{id}` link into a searchable listing while keeping the original
creator and x.ai preview attached.

## Product surfaces

- Homepage discovery with instant task, tool, and creator search
- Four verified public templates: Echo, Chicken Joe, dr eggbot, and AI Harness
  Assistant
- Individual `/b/[slug]` pages with direct Grok Bot import links, shares,
  Grove-only likes/add clicks, source context, and generated Open Graph images
- `/submit` two-step x.ai preview lookup and recorded review queue
- Ten homepage sponsor slots with the fixed doubling ladder from $200 to
  $102,400
- `/sponsors` claim form that records intent without presenting it as a charge
- `/about` methodology and plain-language metric definitions

The initial catalog contains no seeded engagement numbers. Likes begin at zero;
"add clicks" means a click on Grove's official Grok Bot import action, not a
confirmed x.ai install.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Useful checks:

```bash
npm run typecheck
npm run lint
npm run build
```

## Runtime records

The app uses dependency-free JSON Lines logs for the small amount of mutable
state in this version:

- `bot-events.jsonl` — Grove likes and add clicks
- `bot-submissions.jsonl` — x.ai previews waiting for review
- `sponsor-intents.jsonl` — brand, URL, contact, chosen slot, and published price

By default these files are created in `.data/`, which is gitignored. Set
`GROVE_DATA_DIR` to a directory on a persistent mounted volume in production.
If the directory is not writable, mutation endpoints return a clear error
instead of pretending the record or payment succeeded.

There is intentionally no payment simulation. Until a real checkout is wired,
the sponsor form records purchase intent only and states that no card is charged.

## Environment

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-production-origin.example
GROVE_DATA_DIR=/path/to/persistent/grove-data
```

`NEXT_PUBLIC_SITE_URL` supplies canonical, sitemap, and social-card origins.
The x.ai preview lookup needs outbound HTTPS access to `x.ai` but does not use an
xAI API key or request private bot configuration.
