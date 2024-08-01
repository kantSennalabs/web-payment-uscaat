import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
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

  @Column({ nullable: true })
  user_faculty!: string;

  @Column({
    type: 'smallint',
    unsigned: true,
  })
  user_gradyear!: number;

  @Column({ type: 'timestamp' })
  createdAt?: Date;

  @Column({ type: 'timestamp' })
  updatedAt!: Date;
}
