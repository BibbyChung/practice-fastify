import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import fp from "fastify-plugin";
import { createContext } from "../trpc/_context.js";
import { appRouter, type AppRouterType } from "../trpc/_init.js";

export interface TrpcPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<TrpcPluginOptions>(async (fastify, opts) => {
  fastify.register(fastifyTRPCPlugin, {
    prefix: "/api/trpc",
    trpcOptions: {
      router: appRouter,
      createContext,
      onError({ path, error }) {
        // report to error monitoring
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    } satisfies FastifyTRPCPluginOptions<AppRouterType>["trpcOptions"],
  });
});
