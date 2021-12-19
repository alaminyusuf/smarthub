import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Proposal } from "./Proposal";

@ObjectType()
@Entity()
export class Freelancer extends BaseEntity {
	@PrimaryGeneratedColumn({ type: "int" })
	@Field(() => Int)
	public id: number;

	@Column({ nullable: false })
	@Field(() => String)
	public firstName: string;

	@Column({ type: "varchar", nullable: false })
	@Field(() => String)
	public lastName: string;

	@Column({ nullable: false, unique: true })
	@Field(() => String)
	public email: string;

	@Column({ nullable: false })
	public password: string;

	@Field(() => String)
	@Column({ nullable: false })
	public country: string;

	@Field(() => String)
	@Column({ nullable: false })
	public about: string;

	@Field(() => Int)
	@Column({ type: "int", nullable: false })
	public phone: number;

	@Field(() => String)
	@Column({ nullable: false })
	public jobTitle: string;

	@OneToMany(() => Proposal, (proposal) => proposal.writer)
	@Field(() => [Proposal], { defaultValue: [] })
	public proposals: Proposal[];
}
