import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Payment {
	@PrimaryGeneratedColumn({
		unsigned: true,
	})
	payment_id?: number;

	@Column({
		unsigned: true,
	})
	event_id!: number;

	@Column({
		unsigned: true,
	})
	booking_id!: number;

	@Column({
		type: 'decimal',
		unsigned: true,
		precision: 10,
		scale: 2,
	})
	amount!: number;

  @Column({
		type: 'datetime',
	})
	payment_date!: Date;

  @Column({
    type: 'tinyint',
		unsigned: true,
	})
	status!: number;

  @Column({
		type: 'mediumblob',
	})
	payment_image!: string;

  @Column({
		type: 'datetime',
	})
	createdAt!: Date;

	@Column({
		type: 'datetime',
	})
	updatedAt!: Date;
}
