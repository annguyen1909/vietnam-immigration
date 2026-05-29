# Vietnam eVisa - Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- Modern, responsive UI for Vietnam eVisa applications
- Blog/news system with MDX support and SEO-friendly frontmatter
- Floating 24/7 Help Box (desktop: always visible, mobile: sticky button)
- Custom NavBar, Footer, and conversion-focused homepage sections
- Linting, Prettier, Husky, and lint-staged for code quality

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Blog/News Posts (MDX)

- Blog/news posts are stored in `src/data/news/*.md` and served at `/blog`.
- **Frontmatter must use double quotes** for all string values (especially if there are apostrophes or special characters):

```yaml
---
title: 'Your Title Here'
date: 'YYYY-MM-DD'
excerpt: 'Short summary.'
image: '/img/Welcome.png'
---
```

- Do **not** use single quotes in frontmatter values.
- If you add new posts, follow this format to avoid YAML errors.

## Floating Help Box

- On desktop: always visible at the top right of the main content (not closable).
- On mobile: sticky "Help 24/7" button at the top right; opens a modal with 24/7 support info.
- All content and layout are responsive and conversion-optimized.

## Contributing

- Please use Prettier and ESLint before committing.
- All UI changes should be responsive and accessible.
- For new blog posts, always use double quotes in frontmatter.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
