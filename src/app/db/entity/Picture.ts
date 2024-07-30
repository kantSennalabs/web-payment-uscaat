import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pictures')
export class Picture {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  picture_id?: number;

  @Column()
  picture!: string;

  @Column({ type: 'timestamp' })
  createdAt?: Date;
}
