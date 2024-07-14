import fp from "fastify-plugin";
import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import { createContext } from "../trpc/_context.js";
import { appWSRouter, type AppWSRouterType } from "../trpc/_init.js";
import ws from "@fastify/websocket";

export interface TrpcPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<TrpcPluginOptions>(async (fastify, opts) => {
  fastify.register(ws);

  fastify.register(fastifyTRPCPlugin, {
    prefix: "/api/trpc-ws",
    trpcOptions: {
      router: appWSRouter,
      createContext,
      onError({ path, error }) {
        // report to error monitoring
        console.error(`Error in tRPC handler on path '${path}':`, error);
      },
    } satisfies FastifyTRPCPluginOptions<AppWSRouterType>["trpcOptions"],
    useWSS: true,
  });
});
