import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      posts: [],
      ...(createUserDto || {}),
    });
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    try {
      const user = this.usersRepository.findOneOrFail(id);
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    let user = await this.findOne(id);

    user = { ...user, ...(updateUserDto || {}) };

    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);

    return this.usersRepository.remove(user);
  }

  async getUserPosts(userId: string): Promise<Post[]> {
    return this.postsRepository
      .createQueryBuilder('post')
      .where('post.userId = :userId', { userId })
      .getMany();
  }
}
