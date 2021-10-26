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
	@Field(() => String)
	@Column({ nullable: false, type: "varchar" })
	public desc!: string;
	@Field(() => Int)
	@Column({ default: 0, type: "int" })
	public price!: number;
	@Field(() => String)
	@Column({ nullable: false, type: "varchar" })
	public title!: string;
	@Field(() => [String])
	@Column({ type: "text", array: true, default: [] })
	public tags!: string[];
	@Field(() => Boolean)
	@Column({ default: false })
	public completed!: boolean;
	@Field(() => Client)
	@ManyToOne(() => Client, (client) => client.jobs)
	public author!: Client;
	@Field(() => String)
	@CreateDateColumn()
	public createdAt: Date;
	@Field(() => String)
	@UpdateDateColumn()
	public updatedAt: Date;
}
