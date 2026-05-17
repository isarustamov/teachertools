# MathMind AI Azerbaijan

Premium Azerbaijani-first mathematics learning platform for grades 1–11. The architecture combines a Next.js App Router frontend, API routes, Prisma/PostgreSQL, JWT sessions, AI tutoring, teacher dashboards, secure exam-code flows, and gamified student learning.

## Product capabilities

- **Student learning:** grade/topic journey, XP, streaks, badges, weak-topic analytics, recommended lessons.
- **Learning modules:** Azerbaijani explanations, visual math blocks, practice, mini quizzes, timed exam mode.
- **Working task bank:** students choose only grade first, then topic, solve real multiple-choice tasks, receive instant feedback and a final gamified report.
- **AI tutor:** OpenAI-backed Azerbaijani hints that guide step-by-step without revealing answers immediately.
- **Teacher panel:** classroom operations, AI-generated worksheets/tests/homework/olympiad prompts, exam code generation.
- **Exam integrity:** unique codes, one-time attempt schema, timer-ready model, randomized question flag, violation tracking.
- **Admin:** user, teacher approval, grades/topics, subscriptions, AI content moderation, platform analytics.
- **Premium:** unlimited AI tutor, advanced analytics, olympiad prep, parent reports, personalized study plans.

## Stack

- Next.js latest, React, TypeScript, Tailwind CSS
- Framer Motion, Lucide icons, shadcn-style reusable UI primitives
- Next API routes, JWT HTTP-only session cookies
- Prisma ORM with PostgreSQL
- OpenAI API integration
- Vercel-ready and Docker-ready structure

## Getting started

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev
npm run prisma:seed   # loads grades 1–11, topic packs, lessons, quizzes and questions
npm run dev
```

Default seeded admin credentials:

- Email: `admin@mathmind.az`
- Password: `MathMind123!`

## Environment variables

See `.env.example` for required variables:

- `DATABASE_URL`
- `JWT_SECRET`
- `OPENAI_API_KEY`
- Cloudinary placeholders
- `NEXT_PUBLIC_APP_URL`

## Key folders

```text
src/app                 Next.js routes and API endpoints
src/components          Reusable UI and landing sections
src/data                Azerbaijani curriculum and generated task bank
src/lib                 Auth, AI, Prisma, rate limiting, utilities
prisma                  Database schema and seed script
```

## Production notes

1. Use a managed PostgreSQL database with connection pooling.
2. Set a strong 32+ byte `JWT_SECRET` in production.
3. Add a persistent Redis-backed rate limiter before high traffic launch.
4. Moderate AI-generated teacher content before publishing to students.
5. Configure Vercel environment variables and run Prisma migrations in CI/CD.
