import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Faculty {
  @PrimaryGeneratedColumn({
		unsigned: true,
	})
	faculty_id?: number;

  @Column({
    length: 255,
  })
  faculty_name!: string;
}