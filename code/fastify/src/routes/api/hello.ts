import { FastifyPluginAsync } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
// import { appWSCaller } from "../../trpc/_init.js";

const router: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/hi-text',
    {
      logLevel: 'trace',
      schema: {
        description: 'hi_description',
        summary: 'hi_summary',
        tags: ['api test'],
        querystring: z.object({
          name: z.string(),
        }),
        response: {
          200: z.string(),
        },
      },
    },
    async function (request, reply) {
      fastify.utils.log(`check it => fastify.utils.log`)
      const msg = `hello-world, ${request.query.name}`

      reply.headers({ 'Content-Type': 'text/plain' })
      return reply.status(200).send(msg)
    }
  )

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/hi-json',
    {
      logLevel: 'trace',
      schema: {
        description: 'hi-json_description',
        summary: 'hi-json_summary',
        tags: ['api test'],
        querystring: z.object({}),
        response: {
          200: z.object({
            wording: z.string(),
            user: z.object({
              name: z.string(),
            }),
          }),
        },
      },
    },
    async function (req, res) {
      const ctx = { req, res, user: req.user }
      // console.log('===>', res)
      // appWSCaller(ctx)
      //   .chat.getChatNameInfo("xxx")
      //   .then((o) => {
      //     return o.subscribe({
      //       next: (v) => {
      //         console.log(v);
      //       },
      //     });
      //   });

      return res.send({
        wording: 'hello-world',
        user: {
          name: ctx.user.name,
        },
      })
    }
  )
}

export default router
