/** @format */

import { User } from "../entity/Users";
import { MiddlewareFn } from "type-graphql";

import { MyContext } from "../Types/MyContext";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const request: any = context.req;
  if (!request.req.userSession.userId) {
    throw new Error("not authenticated");
  }
  const user: User | undefined = await User.findOne({
    where: {
      id: request.req.userSession.userId,
    },
  });
  if (!user) {
    throw new Error("not authenticated");
  }
  return next();
};
