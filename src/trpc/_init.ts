import { z, type ZodTypeAny } from "zod";
import { trpcContext, type Context } from "./_context.js";
import { userRoute } from "./user.route.js";

// validation
export const emptyInput = z.object({}).optional();

// base
export type AppRouterType = typeof appRouter;

export type HandleOptsType<T extends ZodTypeAny> = {
  ctx: Context;
  input: z.infer<T>;
};

export const appRouter = trpcContext.router({
  user: trpcContext.router(userRoute),
});

export const appCaller = trpcContext.createCallerFactory(appRouter);
