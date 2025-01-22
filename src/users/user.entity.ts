import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  lastName?: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  @Index()
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  password: string;
}
