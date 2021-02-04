/** @format */

import { IsEmail, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  Name: string;

  @Field()
  @IsEmail()
  Email: string;

  @Field()
  @Length(8, 16)
  Password: string;
}

@InputType()
export class addAdressInput {
  @Field()
  @Length(1, 100)
  Address: string;
}
