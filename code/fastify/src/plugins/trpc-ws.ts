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
  fastify.register(ws, {
    options: {
      maxPayload: 1048576, // 1MB
      verifyClient: (info, done) => {
        done(true);
      },
      clientTracking: true,
      perMessageDeflate: true,
    },
    errorHandler: (error, connection, _req, _reply) => {
      // error handle
      console.error("ws get error:", error);
      connection.terminate();
    },
    preClose: (done) => {
      // close others
      console.log("closse ws...");
      done();
    },
  });
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
