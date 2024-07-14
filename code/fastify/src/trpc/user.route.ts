import { z } from "zod";
import { procedure } from "./_context.js";
import { HandleOptsType } from "./_init.js";

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

export const userRoute = {
  getUserById: procedure.input(getUserByIdInput).query(getuserByIdHandle),
};
