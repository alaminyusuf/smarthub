import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Job } from "./Job";

@ObjectType()
@Entity()
export class Client extends BaseEntity {
	@PrimaryGeneratedColumn({ type: "int" })
	@Field(() => Int)
	public id: number;

	@Column({ type: "varchar", nullable: false })
	@Field(() => String)
	public firstName: string;

	@Column({ type: "varchar", nullable: false })
	@Field(() => String)
	public lastName: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	@Field(() => String)
	public email: string;

	@Column({ type: "varchar", nullable: false })
	public password: string;

	@Column({ type: "varchar", nullable: false })
	@Field(() => String)
	public country: string;

	@Column({ type: "varchar", nullable: false })
	@Field(() => String)
	public companyName: string;

	@Field(() => String)
	@Column({ nullable: false, type: "varchar" })
	public phone!: string;

	@Column({ type: "boolean", default: false })
	@Field(() => Boolean)
	public completed: boolean;

	@OneToMany(() => Job, (job) => job.author)
	@Field(() => [Job], { defaultValue: [] })
	public jobs: Job[];
}
