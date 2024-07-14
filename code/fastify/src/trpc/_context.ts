import { initTRPC } from "@trpc/server";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export const createContext = ({ req, res }: CreateFastifyContextOptions) => {
  const user = { name: req.headers.username ?? "anonymous" };

  return { req, res, user };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

export const trpcContext = initTRPC.context<Context>().create();

export const procedure = trpcContext.procedure;

// export const createMyContext =
//   (
//     apiContext: APIContext<
//       Record<string, any>,
//       Record<string, string | undefined>
//     >
//   ) =>
//   ({ req, resHeaders }: FetchCreateContextFnOptions) => {
//     return {
//       req,
//       resHeaders,
//       locals: apiContext.locals,
//       cookies: apiContext.cookies,
//     };
//   };

// export type Context = Awaited<ReturnType<ReturnType<typeof createMyContext>>>;
