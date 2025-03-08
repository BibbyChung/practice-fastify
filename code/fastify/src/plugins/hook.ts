import fp from 'fastify-plugin'

// https://fastify.dev/docs/latest/Reference/Hooks

export interface DecoratePluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<DecoratePluginOptions>(async (fastify, opts) => {
  // add Application hooks
  fastify.addHook('onRoute', (routeOptions) => {
    // disable log info by default
    if (!routeOptions.logLevel) {
      routeOptions.logLevel = 'silent'
    }
  })

  // add Request/Reply hooks
  fastify.addHook('onReady', (done) => {
    fastify.log.info(`onReady hook`)
    console.log(fastify.printRoutes({ commonPrefix: false }))
    done()
  })

  fastify.addHook('onRequest', (req, res, done) => {
    console.log(`onRequest hook => ${req.url}`)
    // console.log(`user: ${req.user.name}`)

    done()
  })
  fastify.addHook('onResponse', (req, res, done) => {
    // console.log(`onResponse hook`)
    done()
  })

  fastify.addHook('onError', (request, reply, error, done) => {
    console.log(`onError hook`)
    done()
  })
})
