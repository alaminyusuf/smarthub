import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { Client } from "./Client";

@ObjectType()
@Entity()
export class Job extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn({ type: "int" })
	public id!: number;
	@Field(() => Client)
	@ManyToOne(() => Client, (client) => client.jobs)
	public author!: Client;
	@Field(() => Int)
	@Column({ type: "int" })
	public authorId!: number;
	@Field(() => String)
	@Column({ nullable: false })
	public desc!: string;
	@Field(() => Int)
	@Column({ nullable: false, type: "int" })
	public price!: number;
	@Field(() => String)
	@Column({ nullable: false })
	public title!: string;
	@Field(() => [String])
	@Column({ nullable: false })
	public tags!: string[];
	@Field(() => Boolean)
	@Column({ nullable: false, default: false })
	public completed!: boolean;
	@Field(() => String)
	@CreateDateColumn()
	public createdAt: Date;
	@Field(() => String)
	@UpdateDateColumn()
	public updatedAt: Date;
}
