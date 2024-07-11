import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.get("/hi", async function (request, reply) {
    request.log.info(`router /hi...`);
    fastify.utils.log(`check it => fastify.utils.log`);
    reply.headers({ "Content-Type": "text/html" });
    return reply.send("hello-world");
    // return reply.status(200).send({
    //   wording: "hello-world",
    // });
  });
}

export default root;
