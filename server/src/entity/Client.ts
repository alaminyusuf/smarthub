import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ObjectID,
	ObjectIdColumn,
	OneToMany,
} from "typeorm";
import { Job } from "./Job";

@ObjectType()
@Entity()
export class Client extends BaseEntity {
	@Field(() => String)
	@ObjectIdColumn()
	public id: ObjectID;
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
	@Field(() => Int)
	@Column({ nullable: false, type: "int" })
	public phone!: number;
	@Column({ type: "boolean", default: false })
	@Field(() => Boolean)
	public completed: boolean;
	@OneToMany(() => Job, (job) => job.author)
	public jobs: Job[];
}
