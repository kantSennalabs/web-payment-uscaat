import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Attendee {
	@PrimaryGeneratedColumn({
		unsigned: true,
	})
	attendee_id?: number;

	@Column({
		length: 255,
	})
	event_name!: string;

	@Column({
		length: 255,
	})
	attendee_phone!: string;

	@Column({
    length: 255,
	})
	attendee_school!: string;

	@Column({
		type: 'smallint',
	})
	Attendee_gradyear!: number;

	@Column({
		type: 'datetime',
	})
	createdAt!: Date;

	@Column({
		type: 'datetime',
	})
	updatedAt!: Date;
}
