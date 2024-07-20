import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
	@PrimaryGeneratedColumn({
		unsigned: true,
	})
	event_id?: number;

	@Column({
		length: 255,
	})
	event_name!: string;

	@Column({
		type: 'datetime',
	})
	event_datetime!: Date;

	@Column({
		type: 'date',
	})
	register_before!: Date;

	@Column({
		type: 'text',
	})
	event_description!: string;

	@Column({
		length: 255,
	})
	event_address!: string;

	@Column({
		length: 255,
	})
	event_location!: string;

	@Column({
		type: 'tinyint',
	})
	parking!: boolean;

	@Column({
		type: 'tinyint',
	})
	fee_required!: boolean;

	@Column('decimal', { precision: 10, scale: 2 })
	fee_amount!: boolean;

	@Column({
		type: 'smallint',
		unsigned: true,
	})
	max_attendees!: number;

	@Column({
		type: 'mediumblob',
	})
	image!: string;

	@Column({	
    length: 20
	})
	contact!: string;

	@Column({
		type: 'datetime',
	})
	createdAt?: Date;

	@Column({
		type: 'datetime',
	})
	updatedAt!: Date;
}
