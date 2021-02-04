/** @format */

import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Address {
  @Field()
  number: number;

  @Field()
  address: string;
}
