import { ApiProperty } from '@nestjs/swagger';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  postId: string;

  @ApiProperty()
  @Column()
  userId: string;

  @ApiProperty()
  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.likes)
  user: User;
}
