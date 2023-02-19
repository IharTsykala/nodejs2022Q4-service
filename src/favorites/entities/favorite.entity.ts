import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';

@Entity('Favorite')
export class Favorite {
  // @IsUUID()
  // @PrimaryGeneratedColumn('uuid')
  // @Exclude()
  // id: string;
  //
  // @JoinTable()
  // @ManyToMany(() => Artist, {
  //   onDelete: 'CASCADE',
  //   // onUpdate: 'CASCADE',
  //   eager: true,
  // })
  // artists: string[]; // favorite artists ids
  //
  // @JoinTable()
  // @ManyToMany(() => Album, {
  //   onDelete: 'CASCADE',
  //   // onUpdate: 'CASCADE',
  //   eager: true,
  // })
  // albums: string[]; // favorite albums ids
  //
  // @JoinTable()
  // @ManyToMany(() => Track, {
  //   onDelete: 'CASCADE',
  //   // onUpdate: 'CASCADE',
  //   eager: true,
  // })
  // tracks: string[]; // favorite tracks ids
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: number;

  @Column()
  entity: string;

  @Column()
  entityId: string;
}
