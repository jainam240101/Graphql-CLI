/** @format */

import { User } from "../../entity/Users";
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Query } from "type-graphql";
import { LoginInput, updateUserInput, UserInput } from "./Inputs/UserInputs";
import {
  createUserUtil,
  deleteUserutil,
  updateUserUtil,
  UserLoginUtil,
} from "./Utils/Utils";
import { MyContext } from "../../Types/MyContext";
import { isAuth } from "../../Middlewares/isAuth";

@Resolver()
export class UserResolver {
  @Query(() => String)
  async helloWorld() {
    return "Hello  World";
  }
  @Mutation(() => User)
  async registerUser(
    @Arg("data") { Email, Name, Password }: UserInput
  ): Promise<User | undefined> {
    return createUserUtil({
      Email,
      Password,
      Name,
    });
  }

  @Mutation(() => User)
  async Login(
    @Arg("data") { Email, Password }: LoginInput,
    @Ctx() ctx: MyContext
  ): Promise<User | undefined> {
    const user: any = await UserLoginUtil({ Email, Password });
    const request: any = ctx.req;
    request.req.userSession.userId = user.id;
    return user;
  }

  @UseMiddleware(isAuth)
  @Query(() => User)
  async me(@Ctx() ctx: MyContext): Promise<User | undefined> {
    try {
      const request: any = ctx.req;
      return User.findOne({
        where: {
          id: request.req.userSession.userId,
        },
      });
    } catch (error) {
      throw new Error("not authenticated");
    }
  }

  @UseMiddleware(isAuth)
  @Mutation(() => User)
  async updateUser(
    @Ctx() ctx: MyContext,
    @Arg("data") { Password, Name, Email }: updateUserInput
  ): Promise<User | undefined> {
    const request: any = ctx.req;
    return updateUserUtil(
      {
        Password,
        Name,
        Email,
      },
      request.req.userSession.userId
    );
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async deleteUser(@Ctx() ctx: MyContext) {
    const request: any = ctx.req;
    return deleteUserutil(request.req.userSession.userId);
  }
}
