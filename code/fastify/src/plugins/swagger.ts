import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerui from '@fastify/swagger-ui'

import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  // createJsonSchemaTransform,
} from 'fastify-type-provider-zod'

export interface TrpcWsPluginOptions {
  // Specify Support plugin options here
}

export default fp<TrpcWsPluginOptions>(async (fastify, opts) => {
  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler)

  fastify.register(swagger, {
    openapi: {
      info: {
        title: 'SampleApi',
        description: 'Sample backend service',
        version: '1.0.0',
      },
      servers: [],
    },
    transform: jsonSchemaTransform,

    // You can also create transform with custom skiplist of endpoints that should not be included in the specification:
    //
    // transform: createJsonSchemaTransform({
    //   skipList: [ '/documentation/static/*' ]
    // })
  })

  fastify.register(swaggerui, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: (request: any, reply: any, next: () => void) => {
        next()
      },
      preHandler: (request: any, reply: any, next: () => void) => {
        next()
      },
    },
    staticCSP: true,
    transformStaticCSP: (header: any) => header,
    transformSpecification: (swaggerObject: any, request: any, reply: any) => {
      return swaggerObject
    },
    transformSpecificationClone: true,
  })

  // exclude some routes
  fastify.addHook('onRoute', (routeOptions) => {
    const shouldHide = routeOptions.url.indexOf('/api/trpc') !== -1

    if (shouldHide) {
      routeOptions.schema ??= {}
      routeOptions.schema.hide = true
    }
  })
})
