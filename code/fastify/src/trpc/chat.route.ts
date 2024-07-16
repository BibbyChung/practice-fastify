import { observable } from "@trpc/server/observable";
import { filter } from "rxjs";
import { z } from "zod";
import { getSubject } from "../common/util.js";
import { procedure } from "./_context.js";
import { HandleOptsType } from "./_init.js";

// validation
export const emptyInput = z.object({}).nullish();

// chat info test
type chatInfoType = { chatNameWithRandomNumber: string };
const chatNameInput = z.string();
const chatNameHandle = async (opts: HandleOptsType<typeof chatNameInput>) =>
  observable<chatInfoType>((emit) => {
    const timer = setInterval(() => {
      emit.next({
        chatNameWithRandomNumber: `${opts.input} => ${Math.random()}`,
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  });

// chat
const msgSubject$ = getSubject<z.infer<typeof sendMsgInput>>();
const sendMsgInput = z.object({
  zoomId: z.number(),
  userId: z.string(),
  msg: z.string(),
});
const sendMsgHandle = async (opts: HandleOptsType<typeof sendMsgInput>) => {
  msgSubject$.next(opts.input);
  return { status: 200 };
};

const receiveMsgInput = z.object({
  roomId: z.number(),
});
const receiveMsgHandle = (opts: HandleOptsType<typeof receiveMsgInput>) =>
  observable<z.infer<typeof sendMsgInput>>((observer) => {
    const sub = msgSubject$
      .pipe(filter((a) => a.zoomId === opts.input.roomId))
      .subscribe(observer);
    return () => {
      sub.unsubscribe();
    };
  });

export const chatRoute = {
  getChatNameInfo: procedure.input(chatNameInput).subscription(chatNameHandle),
  sendMsg: procedure.input(sendMsgInput).mutation(sendMsgHandle),
  receiveMsg: procedure.input(receiveMsgInput).subscription(receiveMsgHandle),
};
