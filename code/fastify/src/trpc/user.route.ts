import { z } from 'zod'
import { middleware, procedure } from './_context.js'
import { HandleOptsType } from './_init.js'
import { interval, map } from "rxjs";
// import { TRPCError } from "@trpc/server";

type User = {
  id: string
  name: string
}

const users: Record<string, User> = {}
const u: User = {
  id: '0001',
  name: 'BB',
}
users[u.id] = u

const inputGetUserByIdSchema = z.string()

const userMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    // do something
    // throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  })
})

const getUserByIdHandle = async (opts: HandleOptsType<typeof inputGetUserByIdSchema>) => {
  return users[opts.input]
}

// sse
const getNowInputSchema = z
  .object({
    lastEventId: z.string().nullish(),
  })
  .optional()

// const getNowOutputSchema = z
//   .object({
//     now: z.number(),
//     msg: z.string()
//   })
//   .optional()  

const getNowHandle = async function* (opts: HandleOptsType<typeof getNowInputSchema>) {
  if (opts.input?.lastEventId) {
  }
  const sub = interval(1000)
    .pipe(
      map((i) => {
        const now = new Date()
        return {
          now: now.getTime(),
          msg: `===> ${i}`,
        }
      })
    )
    .subscribe()

  return sub
}

export const userRoute = {
  getUserById: procedure.use(userMiddleware).input(inputGetUserByIdSchema).query(getUserByIdHandle),
  getNow: procedure.input(getNowInputSchema).subscription(getNowHandle),
}
