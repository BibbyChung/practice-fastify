import fp from 'fastify-plugin'

export interface DecoratePluginOptions {
  // Specify Support plugin options here
}

// The use of fastify-plugin is required to be able
// to export the decorators to the outer scope
export default fp<DecoratePluginOptions>(async (fastify, opts) => {
  // add decorators
  fastify.decorate('utils', {
    log: (...args: string[]) => console.log(...args),
  })

  fastify.decorateRequest('user', {
    getter() {
      return { name: 'BBBBB' }
    },
  })
})
