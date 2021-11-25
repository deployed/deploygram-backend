import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';
import { CommentsModule } from 'src/comments/comments.module';
import { UsersModule } from 'src/users/users.module';
import { LikesModule } from 'src/likes/likes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User, Comment, Like]),
    forwardRef(() => CommentsModule),
    forwardRef(() => UsersModule),
    forwardRef(() => LikesModule),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
