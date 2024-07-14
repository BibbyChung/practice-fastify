<script lang="ts">
  import {
    map,
    Observable,
    scan,
    switchMap,
    takeUntil,
    tap,
    type Unsubscribable,
  } from "rxjs";
  import { onMount } from "svelte";
  import { trpc, trpcWS } from "./lib/common/trpc";
  import { getSubject } from "./lib/services/layout.service";

  const btnGetUser$ = getSubject<boolean>();
  const btnWSStart$ = getSubject<boolean>();
  const btnWSStop$ = getSubject<boolean>();

  const user$ = btnGetUser$.pipe(
    switchMap(() => trpc.user.getUserById.query("0001")),
    map((v) => JSON.stringify(v))
  );

  const wsResultStart$ = btnWSStart$.pipe(
    switchMap(() => {
      let sub: Unsubscribable;
      return new Observable((observer) => {
        sub = trpcWS.chat.getChatNameInfo.subscribe("client001", {
          onData: (v) => observer.next(v),
          onComplete: () => observer.complete(),
          onError: (err) => observer.error(err),
        });
      }).pipe(takeUntil(btnWSStop$.pipe(tap(() => sub?.unsubscribe()))));
    }),
    scan((pre, v) => {
      return `${pre} <br />
${JSON.stringify(v)}`;
    }, "")
  );

  onMount(() => {
    return () => {};
  });
</script>

<main style="padding: 12px; display: flex; flex-direction: column; gap: 6px;">
  <div>
    <button on:click|preventDefault={() => btnGetUser$.next(true)}>
      test trpc
    </button>
  </div>
  {#if $user$}
    <div>
      result0: {$user$}
    </div>
  {/if}
  <div style="display: flex; gap: 6px;">
    <button on:click|preventDefault={() => btnWSStart$.next(true)}>
      trpc-ws start
    </button>
    <button on:click|preventDefault={() => btnWSStop$.next(true)}>
      trpc-ws stop
    </button>
  </div>
  {#if $wsResultStart$}
    <div>
      result1: {@html $wsResultStart$}
    </div>
  {/if}
</main>

<style>
</style>
