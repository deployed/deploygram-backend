import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './entities/like.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createLikeDto: CreateLikeDto): Promise<Like> {
    const like = this.likesRepository.create(createLikeDto);
    const { postId, userId } = createLikeDto;

    let post = await this.postsRepository.findOne(postId);
    post = { ...post, likes: [like, ...(post.likes || [])] };
    this.postsRepository.update(postId, post);
    this.postsRepository.save(post);

    let user = await this.usersRepository.findOne(userId);
    user = { ...user, likes: [like, ...(user.likes || [])] };
    this.usersRepository.update(userId, user);
    this.usersRepository.save(user);

    return this.likesRepository.save(like);
  }

  findAll(): Promise<Like[]> {
    return this.likesRepository.find();
  }

  findOne(id: string): Promise<Like> {
    try {
      const like = this.likesRepository.findOneOrFail(id);
      return like;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id: string, updateLikeDto: UpdateLikeDto): Promise<Like> {
    let like = await this.findOne(id);
    like = { ...like, ...(updateLikeDto || {}) };

    return this.likesRepository.save(like);
  }

  async remove(id: string): Promise<Like> {
    const like = await this.findOne(id);

    return this.likesRepository.remove(like);
  }
}
