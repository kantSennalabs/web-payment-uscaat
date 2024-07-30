import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admins')
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
    type: 'date',
  })
  createdAt!: Date;

  @Column({
    type: 'date',
  })
  updatedAt!: Date;
}
