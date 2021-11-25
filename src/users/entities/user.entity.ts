import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';

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
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @ApiProperty({ isArray: true })
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ApiProperty({ isArray: true })
  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
