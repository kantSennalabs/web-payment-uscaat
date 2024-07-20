import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Booking {
	@PrimaryGeneratedColumn({
		unsigned: true,
	})
	booking_id?: number;

	@Column({
		length: 255,
	})
	event_id!: string;

	@Column({
		type: 'json'
	})
	user_id!: number[];

	@Column({
		type: 'datetime',
	})
	createdAt!: Date;

	@Column({
		type: 'datetime',
	})
	updatedAt!: Date;
}
