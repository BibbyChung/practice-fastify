import { z, type ZodTypeAny } from "zod";
import { trpcContext, type Context } from "./_context.js";
import { userRoute } from "./user.route.js";
import { chatRoute } from "./chat.route.js";

// common
export type HandleOptsType<T extends ZodTypeAny> = {
  ctx: Context;
  input: z.infer<T>;
};

// restful
export type AppRouterType = typeof appRouter;
export const appRouter = trpcContext.router({
  user: trpcContext.router(userRoute),
});
export const appCaller = trpcContext.createCallerFactory(appRouter);

// ws
export type AppWSRouterType = typeof appWSRouter;
export const appWSRouter = trpcContext.router({
  chat: trpcContext.router(chatRoute),
});
export const appWSCaller = trpcContext.createCallerFactory(appWSRouter);
