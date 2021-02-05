/** @format */

import { ApolloError } from "apollo-server-express";
import { User } from "../../../entity/Users";
import { createUserInterface, loginCredentialsInterface } from "./Interfaces";
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

export const UserLoginUtil = async ({
  Email,
  Password,
}: loginCredentialsInterface) => {
  try {
    const user: User | undefined = await User.findOne({
      where: {
        email: Email,
      },
    });
    if (user === undefined) {
      throw new Error("Invalid User");
    }
    const comparePassword: any = await bcrypt.compare(Password, user.Password);
    if (!comparePassword) {
      throw new Error("Invalid User");
    }
    return user;
  } catch (error) {
    throw new ApolloError(error);
  }
};
