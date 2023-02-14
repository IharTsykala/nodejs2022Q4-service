import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsUUID } from 'class-validator';

@Entity({ name: 'Users' })
export class User {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ nullable: false })
  login: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ default: 1 })
  version: number; // integer number, increments on update

  // @Column()
  // createdAt: number; // timestamp of creation
  //
  // @Column()
  // updatedAt: number; // timestamp of last update

  @CreateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.getTime(),
    },
  })
  createdAt!: Date; // timestamp of creation;

  @UpdateDateColumn({
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => value.getTime(),
    },
  })
  updatedAt!: Date; // timestamp of last update;

  constructor(fields: Partial<User>) {
    Object.assign(this, fields);
  }

  // toResponse() {
  //   const { id, login, version, createdAt, updatedAt } = this;
  //   return { id, login, version, createdAt, updatedAt };
  // }
}
