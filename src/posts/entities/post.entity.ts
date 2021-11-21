import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  userId: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ApiProperty({ isArray: true })
  @Column('simple-array')
  images: string[]; // urls

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  createdAt: Date;

  @ApiProperty({ isArray: true })
  @OneToMany(() => Like, (like) => like.postId)
  likes: Like[];

  @ApiProperty({ isArray: true })
  @OneToMany(() => Comment, (comment) => comment.postId)
  comments: Comment[];
}
