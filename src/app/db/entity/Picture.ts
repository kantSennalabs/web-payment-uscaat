import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Picture {
	@PrimaryGeneratedColumn({
		unsigned: true,
	})
	picture_id?: number;

	@Column({
		type: 'mediumblob',
	})
	picture!: string | ArrayBuffer;

	@Column({
		type: 'datetime',
	})
	createdAt?: Date;
}
