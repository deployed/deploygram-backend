import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  userId: string;

  @ApiProperty()
  @Column()
  postId: string;

  @ApiProperty()
  @Column()
  text: string;

  @ApiProperty()
  @Column()
  createdAt: Date;

  @ApiProperty()
  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
