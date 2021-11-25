import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    forwardRef(() => PostsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
