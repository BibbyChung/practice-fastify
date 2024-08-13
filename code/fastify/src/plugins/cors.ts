import fp from 'fastify-plugin'
import cors from '@fastify/cors'

export interface CorsPluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<CorsPluginOptions>(async (fastify, opts) => {
  // add cors
  fastify.register(cors, {
    hook: 'preHandler',
    delegator: (req, callback) => {
      const corsOptions = {
        origin: false,
      }
      if (/localhost:4200$/m.test(req.headers.origin ?? '')) {
        corsOptions.origin = true
      }
      callback(null, corsOptions)
    },
  })
})
