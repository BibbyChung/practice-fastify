import fp from 'fastify-plugin'
import { Redis } from 'ioredis'

export interface RedisPluginOptions {
  // Specify Support plugin options here
}

// to export the decorators to the outer scope
export default fp<RedisPluginOptions>(async (fastify, opts) => {
  const redis = new Redis({
    port: 6379, // Redis port
    host: '127.0.0.1', // Redis host
    // username: "default", // needs Redis >= 6
    password: '1234',
    // db: 0, // Defaults to 0
  })

  redis.on('connect', () => {
    console.log('redis is ready')

    // redis.set("bbKey", 'bbbb100', "EX", 100);
  })

  fastify.decorate('redis', redis)
})

declare module 'fastify' {
  export interface FastifyInstance {
    redis: Redis
  }
}
