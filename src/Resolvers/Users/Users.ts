/** @format */

import { User } from "../../entity/Users";
import { Arg, Mutation, Resolver } from "type-graphql";
import { Query } from "type-graphql";
import { UserInput } from "./Inputs/UserInputs";
import { createUserUtil } from "./Utils/Utils";

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
}
