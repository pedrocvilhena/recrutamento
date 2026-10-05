# SET Recruitment task

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install project dependencies:
```bash
yarn install
```

Run the development server:
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Documentation

To learn more about the tecnologies used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
### Frontend
- [Learn React](https://react.dev/learn) - an introduction to the 80% of React concepts that you will use on a daily basis
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.

### Backend
- [Next API Decorators](https://next-api-decorators.vercel.app/docs/) - Collection of decorators to create typed Next.js API routes, with easy request validation and transformation
- [Prisma ORM](https://www.prisma.io/docs) - Open source Node.js and TypeScript ORM with an intuitive data model, automated migrations, type-safety, and auto-completion
## Todo API

Setup:

    yarn install
    echo DATABASE_URL="file:./dev.db" > .env
    yarn prisma generate
    yarn prisma db push
    yarn dev

Endpoints:
- GET /api/todos
- GET /api/todos/:id
- POST /api/todos  { "title": "..." }
- PATCH /api/todos/:id  { "title"?: "...", "completed"?: true }
- DELETE /api/todos/:id