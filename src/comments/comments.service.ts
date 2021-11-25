import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdAt = new Date();
    const comment = this.commentsRepository.create({
      createdAt,
      ...createCommentDto,
    });
    const { postId, userId } = createCommentDto;

    let post = await this.postsRepository.findOne(postId);
    post = { ...post, comments: [comment, ...(post.comments || [])] };
    this.postsRepository.update(postId, post);
    this.postsRepository.save(post);

    let user = await this.usersRepository.findOne(userId);
    user = { ...user, comments: [comment, ...(user.comments || [])] };
    this.usersRepository.update(userId, user);
    this.usersRepository.save(user);

    return this.commentsRepository.save(comment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentsRepository.find();
  }

  findOne(id: string): Promise<Comment> {
    try {
      const comment = this.commentsRepository.findOneOrFail(id);
      return comment;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    let comment = await this.findOne(id);
    comment = { ...comment, ...(updateCommentDto || {}) };

    return this.commentsRepository.save(comment);
  }

  async remove(id: string): Promise<Comment> {
    const comment = await this.findOne(id);

    return this.commentsRepository.remove(comment);
  }
}
