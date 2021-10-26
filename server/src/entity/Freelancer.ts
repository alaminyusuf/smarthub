import { Field, Int, ObjectType } from "type-graphql";
import {
	BaseEntity,
	Column,
	Entity,
	ManyToOne,
	ObjectID,
	ObjectIdColumn,
} from "typeorm";
import { Proposal } from "./Proposal";

@ObjectType()
@Entity()
export class Freelancer extends BaseEntity {
	@ObjectIdColumn()
	@Field(() => String)
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
	@Field(() => String)
	@Column({ type: "varchar", nullable: false })
	public country: string;
	@Field(() => String)
	@Column({ type: "varchar", nullable: false })
	public about: string;
	@Field(() => Int)
	@Column({ type: "int", nullable: false })
	public phone: string;
	@Field(() => String)
	@Column({ type: "varchar", nullable: false })
	public jobTitle: string;
	@ManyToOne(() => Proposal, (proposal) => proposal.writer)
	@Field(() => [Proposal], { nullable: true })
	public proposals: Proposal[];
}
