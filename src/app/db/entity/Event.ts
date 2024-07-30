import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  event_id?: number;

  @Column({
    length: 255,
  })
  event_name!: string;

  @Column({ type: 'timestamp' })
  event_datetime!: Date;

  @Column({
    type: 'date',
  })
  register_before!: Date | string;

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

  @Column({ type: 'boolean' })
  parking!: boolean;

  @Column({ type: 'boolean' })
  fee_required!: boolean;

  @Column('decimal', { precision: 10, scale: 2 })
  fee_amount!: number;

  @Column({
    type: 'smallint',
    unsigned: true,
  })
  max_attendees!: number;

  @Column({
    type: 'jsonb',
  })
  picture_id!: string[];

  @Column({
    length: 20,
  })
  contact!: string;

  @Column({ type: 'timestamp' })
  createdAt?: Date;

  @Column({ type: 'timestamp' })
  updatedAt!: Date;
}
