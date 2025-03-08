import { FastifyPluginAsync } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
// import { appWSCaller } from "../../trpc/_init.js";

const router: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/healthz',
    {
      schema: {
        description: 'check healthz',
        summary: 'check healthz',
        tags: ['utils'],
        querystring: z.object({}),
        response: {
          200: z.object({
            msg: z.string(),
          }),
        },
      },
    },
    async function (request, reply) {
      const info = {
        msg: 'success',
      }
      return reply.status(200).send(info)
    }
  )
}

export default router
