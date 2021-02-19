Access GitHub public data through REST or GraphQL api **without authorization**

## REST Api

## GraphQL Api

the design principle of `ghall` GraphQL api is:

`ghall` GraphQL api should be a subset of [GitHub GraphQL Api](https://docs.github.com/graphql), which means:

- [`ghall` graphql schema](schema.ghall.graphql) should be a subset of [GitHub public graphql schema](https://docs.github.com/public/schema.docs.graphql),

- each query to `ghall` graphql api, should be also a valid query for GitHub GraphQL Api, and have same response

For short: **`ghall` GraphQL api is an implementation for a subset of GitHub GraphQL Api**

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
