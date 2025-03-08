import { FastifyPluginAsync, FastifyReply } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { EventMessage, FastifySSEPlugin } from 'fastify-sse-v2'
import { interval, tap } from 'rxjs'
import { randomUUID } from 'crypto'
// import { appWSCaller } from "../../trpc/_init.js";

const ssePoolsDic: Record<string, FastifyReply> = {}

const router: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.register(FastifySSEPlugin)

  fastify.withTypeProvider<ZodTypeProvider>().get(
    '/sse-start',
    {
      schema: {
        description: 'sse_description',
        summary: 'sse_summary',
        tags: ['api test'],
        response: {
          200: z.object({
            i: z.string(),
            data: z.string(),
          }),
        },
      },
    },
    function (req, res) {
      const uuid = randomUUID()
      ssePoolsDic[uuid] = res

      const sub = interval(1000)
        .pipe(
          tap((i) => {
            console.log(i)
            const obj: EventMessage = {
              id: i.toString(),
              data: JSON.stringify({
                msg: `msg.index => ${i}`,
                uuid,
              }),
            }
            res.sse(obj)
          })
        )
        .subscribe()

      req.socket.on('close', () => {
        sub.unsubscribe()
      })
    }
  )

  fastify.withTypeProvider<ZodTypeProvider>().post(
    '/sse-close',
    {
      schema: {
        description: 'sse-close_description',
        summary: 'sse-close_summary',
        tags: ['api test'],
        body: z.object({
          uuid: z.string(),
        }),
        response: {
          200: z.object({}).nullable(),
        },
      },
    },
    async function (req, res) {
      const uuid = req.body.uuid
      const sseRes = ssePoolsDic[uuid]
      if (sseRes) {
        sseRes.sse({ event: 'close' })
        sseRes.sseContext.source.end()
      }

      res.status(200)
    }
  )
}

export default router
