Access GitHub public data through REST or GraphQL api **without authorization**

`WIP` Still working in progress

## REST Api

> Documentation for REST Api is not completed yet

## GraphQL Api

- `Api Endpoint` https://ghall.now.sh/api

- `Api Explorer` https://ghall.now.sh/graphiql

the design principle of `ghall` GraphQL api is:

`ghall` GraphQL api should be a subset of [GitHub GraphQL Api](https://docs.github.com/graphql), which means:

- [`ghall` graphql schema](schema.ghall.graphql) should be a subset of [GitHub public graphql schema](https://docs.github.com/public/schema.docs.graphql),

- each query to `ghall` graphql api, should be also a valid query for GitHub GraphQL Api, and have same response

In short: **`ghall` GraphQL api is an implementation for a subset of GitHub GraphQL Api**
