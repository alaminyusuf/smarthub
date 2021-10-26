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
import { Freelancer } from "./Freelancer";

@ObjectType()
@Entity()
export class Proposal extends BaseEntity {
	@Field(() => Int)
	@PrimaryGeneratedColumn({ type: "int" })
	public id!: number;
	@Field(() => [Freelancer], { nullable: true })
	@ManyToOne(() => Freelancer, (freelancer) => freelancer.proposals)
	public writer!: Freelancer[];
	@Field(() => Int)
	@Column()
	public writerId!: number;
	@Field(() => String)
	@Column({ nullable: false })
	public desc!: string;
	@Field(() => String)
	@Column({ default: 0, type: "int" })
	public price!: number;
	@Field(() => String)
	@Column({ nullable: false })
	public title!: string;
	@Field(() => String)
	@CreateDateColumn()
	public createdAt: Date;
	@Field(() => String)
	@UpdateDateColumn()
	public updatedAt: Date;
}
