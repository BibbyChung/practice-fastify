
# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

## my commands

```bash
cd code

npm install fastify-cli -g
fastify generate fastify --esm --lang=ts --standardlint

pnpm add @trpc/server fastify zod

pnpm add @fastify/websocket
pnpm add @types/ws -D
```

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
