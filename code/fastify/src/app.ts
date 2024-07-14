import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import cors from "@fastify/cors";
import { FastifyPluginAsync } from "fastify";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

declare module "fastify" {
  interface FastifyInstance {
    utils: {
      log: (...args: string[]) => void;
    };
  }

  interface FastifyRequest {
    user: {
      name: string;
    };
  }
}

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: opts,
    forceESM: true,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: opts,
    forceESM: true,
  });

  // add cors
  fastify.register(cors, {
    hook: "preHandler",
    delegator: (req, callback) => {
      const corsOptions = {
        origin: false,
      };
      if (/localhost:4200$/m.test(req.headers.origin ?? "")) {
        corsOptions.origin = true;
      }
      callback(null, corsOptions);
    },
  });

  // add decorators
  fastify.decorate("utils", {
    log: (...args: string[]) => console.log(...args),
  });
  fastify.decorateRequest("user", { name: "BBBB" });

  // add hooks
  fastify.addHook("onReady", (done) => {
    fastify.log.info(`onReady hook`);
    console.log(fastify.printRoutes({ commonPrefix: false }));
    done();
  });

  fastify.addHook("onRequest", (req, res, done) => {
    console.log(`onRequest hook`);
    console.log(`user: ${req.user.name}`);
    done();
  });
  fastify.addHook("onResponse", (req, res, done) => {
    console.log(`onResponse hook`);
    done();
  });

  fastify.addHook("onError", (request, reply, error, done) => {
    console.log(`onError hook`);
    done();
  });
};

export default app;
export { app, options };
