import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Admin {
	@PrimaryGeneratedColumn({
		unsigned: true,
	})
	user_id?: number;

	@Column({
		length: 20,
	})
	username!: string;

	@Column({
		length: 65,
	})
	password!: string;

	@Column({
		type: 'datetime',
	})
	createdAt!: Date;

	@Column({
		type: 'datetime',
	})
	updatedAt!: Date;
}
