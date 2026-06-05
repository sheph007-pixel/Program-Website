# Kennion Program Website

Next.js (App Router) + Prisma (PostgreSQL) benefits site. Deployed on Railway
(Dockerfile, `output: "standalone"`, Node/Alpine). Production branch:
`claude/build-responsive-website-X1pDH`.

## Writing / copy rules (must follow, no exceptions)

- NEVER use an em dash (Unicode U+2014) or en dash (U+2013) anywhere: not in
  user-facing copy, button or CTA labels, headings, plan content, code
  comments, or commit messages. Use a hyphen ("-"), comma, colon, or restructure
  the sentence instead. This applies site-wide and to every future edit.
- Buttons and CTA labels use proper Title Case (capitalize main words; keep
  short connector words like a, an, the, to, of, for, and, in lowercase).

## Build / verify

- `npm run build` must pass before pushing.
- No live database in the dev environment; schema columns self-heal on deploy
  via the idempotent `ALTER TABLE` statements in `src/lib/db.ts`.
