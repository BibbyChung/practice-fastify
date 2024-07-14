import {
  createTRPCProxyClient,
  createWSClient,
  httpBatchLink,
  wsLink,
} from "@trpc/client";
import { tap } from "rxjs";
import type {
  AppRouterType,
  AppWSRouterType,
} from "../../../../fastify/src/trpc/_init";

const consoleFn = (isLog: boolean) => () => {
  if (isLog) {
    return ({ op, next }: { op: any; next: any }) => {
      console.log("->", op.type, op.path, op.input);

      return next(op).pipe(
        tap({
          next(result) {
            console.log("<-", op.type, op.path, op.input, ":", result);
          },
        })
      );
    };
  }
  return ({ op, next }: { op: any; next: any }) => next(op);
};

export const trpc = createTRPCProxyClient<AppRouterType>({
  links: [
    consoleFn(false),
    httpBatchLink({
      url: "http://localhost:3000/api/trpc",
      headers() {
        return {
          ["Authorization"]: `Bearer xxxxxxxxx`,
        };
      },
    }),
  ],
});

// configure TRPCClient to use WebSockets transport
export const trpcWS = createTRPCProxyClient<AppWSRouterType>({
  links: [
    wsLink({
      client: createWSClient({
        url: `ws://localhost:3000/api/trpc-ws`,
      }),
    }),
  ],
});
