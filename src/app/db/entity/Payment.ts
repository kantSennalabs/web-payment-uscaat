import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id?: number;

  @Column()
  event_id?: number;

  @Column()
  booking_id?: number;

  @Column({
    type: 'decimal',
    unsigned: true,
    precision: 10,
    scale: 2,
  })
  amount?: number;

  @Column({
    type: 'date',
  })
  payment_date?: Date;

  @Column({
    type: 'boolean',
    unsigned: true,
  })
  status?: boolean;

  @Column({
    nullable: true,
  })
  payment_image?: string;

  @Column({
    type: 'date',
  })
  createdAt?: Date;

  @Column({
    type: 'date',
  })
  updatedAt?: Date;
}
