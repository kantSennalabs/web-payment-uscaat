import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
		unsigned: true,
	})
	user_id?: number;

  @Column({
    length: 255,
  })
  user_name!: string;

  @Column({
    length: 50,
  })
  user_nickname!: string;

  @Column({
    length: 20,
  })
  user_phone!: string;

  @Column({
    type: 'tinyint',
    unsigned: true,
  })
  user_faculty!: number;

  @Column({
    type: 'smallint',
    unsigned: true,
  })
  user_gradyear!: number;

  @Column({
		type: 'datetime',
	})
	createdAt?: Date;

	@Column({
		type: 'datetime',
	})
	updatedAt!: Date;
}