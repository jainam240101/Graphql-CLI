/** @format */

import { ApolloError } from "apollo-server-express";
import { User } from "../../../entity/Users";
import { createUserInterface } from "./Interfaces";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

export const createUserUtil = async ({
  Password,
  Name,
  Email,
}: createUserInterface): Promise<User | undefined> => {
  try {
    const hasedpassword: string = await bcrypt.hash(Password, 12);
    return User.create({
      id: uuid(),
      name: Name,
      email: Email,
      Password: hasedpassword,
    }).save();
  } catch (error) {
    throw new ApolloError(error);
  }
};
