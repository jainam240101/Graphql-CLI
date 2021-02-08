/** @format */

import { ApolloError } from "apollo-server-express";
import { User } from "../../../entity/Users";
import { createUserInterface, loginCredentialsInterface } from "./Interfaces";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { createQueryBuilder } from "typeorm";

export const createUserUtil = async ({
  Password,
  Name,
  Email,
}: createUserInterface): Promise<User | undefined> => {
  try {
    const hasedpassword: string = await bcrypt.hash(Password, 12);
    return User.create({
      id: uuid(),
      Name: Name,
      Email: Email,
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
        Email: Email,
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

export const updateUserUtil = async (
  args: any,
  id: string
): Promise<User | undefined> => {
  try {
    const user: any = await User.findOne({
      where: {
        id: id,
      },
    });
    Object.keys(args).map(async (element: string) => {
      if (args[element] !== undefined) {
        if (element === "Password") {
          const hasedpassword: string = await bcrypt.hash(args[element], 12);
          user[element] = hasedpassword;
        } else {
          user[element] = args[element];
        }
      }
    });
    return user.save();
  } catch (error) {
    throw new ApolloError(error);
  }
};

export const deleteUserutil = async (
  id: string
): Promise<Boolean | undefined> => {
  try {
    await createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id: id })
      .execute();
    return true;
  } catch (error) {
    throw new ApolloError(error);
  }
};
