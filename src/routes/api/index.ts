import { FastifyPluginAsync } from "fastify";
import { appWSCaller } from "../../trpc/_init.js";

const router: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/healthz", async function (request, reply) {
    const info = {
      msg: "success",
    };
    return reply.status(200).send(info);
  });

  fastify.get("/hi", async function (request, reply) {
    fastify.utils.log(`check it => fastify.utils.log`);
    reply.headers({ "Content-Type": "text/plain" });
    return reply.status(200).send("hello-world");
  });

  fastify.get("/hi-json", async function (request, reply) {
    // appWSCaller({ request, reply } as any)
    //   .chat.getChatNameInfo("xxx")
    //   .then((o) => {
    //     return o.subscribe({
    //       next: (v) => {
    //         console.log(v);
    //       },
    //     });
    //   });

    return reply.send({
      wording: "hello-world",
    });
  });
};

export default router;
