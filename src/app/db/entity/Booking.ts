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
    type: 'jsonb',
  })
  user_id!: number[];

  @Column({
    type: 'date',
  })
  createdAt!: Date;

  @Column({
    type: 'date',
  })
  updatedAt!: Date;
}
