import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { Like } from 'src/likes/entities/like.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column()
  image: string; // url

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Like, (like) => like.postId)
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.postId)
  comments: Comment[];
}
