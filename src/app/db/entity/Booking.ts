import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Booking {
	@PrimaryGeneratedColumn({
		unsigned: true,
	})
	booking_id?: number;

	@Column()
	event_id!: number;

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
