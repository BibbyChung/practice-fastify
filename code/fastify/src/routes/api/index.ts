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

  const inputSchemaHi = z.object({
    name: z.number(),
  })

  fastify.get(
    '/hi-text',
    {
      schema: {
        description: 'hi',
        summary: 'hi',
        tags: ['api test'],
        querystring: inputSchemaHi,
        response: {
          200: z.object({
            msg: z.string(),
          }),
        },
      },
    },
    async function (request, reply) {
      fastify.utils.log(`check it => fastify.utils.log`)
      const q = request.query as z.infer<typeof inputSchemaHi>
      const msg = `hello-world, ${q.name}`

      reply.headers({ 'Content-Type': 'text/plain' })
      return reply.status(200).send(msg)
    }
  )

  fastify.get(
    '/hi-json',
    {
      schema: {
        description: 'hi-json',
        summary: 'hi-json',
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
