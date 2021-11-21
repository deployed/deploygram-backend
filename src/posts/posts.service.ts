import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdAt = new Date();
    const user = await this.usersRepository.findOne(createPostDto.userId);

    const post = this.postsRepository.create({
      ...createPostDto,
      likes: [],
      comments: [],
      createdAt,
      user,
    });
    return this.postsRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  findOne(id: string): Promise<Post> {
    try {
      const post = this.postsRepository.findOneOrFail(id);
      return post;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    let post = await this.findOne(id);
    post = { ...post, ...updatePostDto };

    return this.postsRepository.save(post);
  }

  async remove(id: string): Promise<Post> {
    const post = await this.findOne(id);

    return this.postsRepository.remove(post);
  }
}
