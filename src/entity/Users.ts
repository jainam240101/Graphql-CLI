/** @format */

import { Address } from "../Types/Address";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  Name: string;

  @Field()
  @Column({ unique: true })
  Email: string;

  @Column()
  Password: string;

  @Field(() => [Address], { nullable: true })
  @Column({ type: "jsonb", nullable: true, default: [] })
  Addresses: Address[];
}
