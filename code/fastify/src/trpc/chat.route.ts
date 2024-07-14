import { z } from "zod";
import { procedure } from "./_context.js";
import { HandleOptsType } from "./_init.js";
import { observable } from "@trpc/server/observable";

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

export const chatRoute = {
  getChatNameInfo: procedure.input(chatNameInput).subscription(chatNameHandle),
};
