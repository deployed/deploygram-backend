import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  nickname: string;

  @ApiProperty()
  @Column()
  bio: string;

  @ApiProperty({ isArray: true })
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
