import { FastifyPluginAsync } from "fastify";

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
    return reply.send({
      wording: "hello-world",
    });
  });
};

export default router;
