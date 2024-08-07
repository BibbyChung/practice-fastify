import { z } from "zod";
import { middleware, procedure } from "./_context.js";
import { HandleOptsType } from "./_init.js";
// import { TRPCError } from "@trpc/server";

type User = {
  id: string;
  name: string;
};

const users: Record<string, User> = {};
const u: User = {
  id: "0001",
  name: "BB",
};
users[u.id] = u;

const getUserByIdInput = z.string();
const getuserByIdHandle = async (
  opts: HandleOptsType<typeof getUserByIdInput>
) => {
  return users[opts.input];
};

const userMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.user) {
    // do something
    // throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const userRoute = {
  getUserById: procedure
    .use(userMiddleware)
    .input(getUserByIdInput)
    .query(getuserByIdHandle),
};
