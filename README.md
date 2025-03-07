
# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

## my commands

https://github.com/turkerdev/fastify-type-provider-zod
pnpm add @fastify/swagger @fastify/swagger-ui fastify-type-provider-zod

```bash
cd code

npm install fastify-cli -g
fastify generate fastify --esm --lang=ts --standardlint
npx fastify-cli generate app01  --esm --lang=ts --standardlint

pnpm add @trpc/server fastify zod

pnpm add @fastify/websocket
pnpm add @types/ws -D

pnpm add @trpc/client rxjs

pnpm add svelte-routing
npx @svelte-add/tailwindcss@latest --typography false

// open api
https://github.com/turkerdev/fastify-type-provider-zod
pnpm add @fastify/swagger @fastify/swagger-ui fastify-type-provider-zod


```

## todos

- upgrade trpc to v11
- sse

## project struecture

```bash
tree -L 3

.
├── README.md
└── code
    ├── fastify
    │   ├── dist
    │   ├── node_modules
    │   ├── package.json
    │   ├── src
    │   ├── test
    │   └── tsconfig.json
    ├── node_modules
    ├── package.json
    ├── pnpm-lock.yaml
    └── pnpm-workspace.yaml

```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://fastify.dev/docs/latest/).
