import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Like } from 'src/likes/entities/like.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,
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

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find();

    return await Promise.all(
      posts.map(async (post) => {
        const comments = await this.getPostComments(post.id);
        const likes = await this.getPostLikes(post.id);

        return {
          ...post,
          comments,
          likes,
        };
      }),
    );

    // return this.postsRepository
    //   .createQueryBuilder('post')
    //   .leftJoinAndSelect('post.user', 'user')
    //   .getMany();
    // // .innerJoinAndMapMany(
    // //   'post.comments',
    // //   Comment,
    // //   'comment',
    // //   'post.id = comment.postId',
    // // )
  }

  async findOne(id: string): Promise<Post> {
    try {
      const post = await this.postsRepository.findOneOrFail(id);
      post.comments = await this.getPostComments(id);
      post.user = await this.usersRepository.findOneOrFail(post.userId);
      post.likes = await this.getPostLikes(id);

      return post;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    let post = await this.findOne(id);
    post = { ...post, ...(updatePostDto || {}) };

    return this.postsRepository.save(post);
  }

  async remove(id: string): Promise<Post> {
    const post = await this.findOne(id);

    return this.postsRepository.remove(post);
  }

  async getPostComments(postId: string): Promise<Comment[]> {
    try {
      const comments = await this.commentsRepository
        .createQueryBuilder('comment')
        .where('comment.postId = :postId', { postId })
        .getMany();

      return await Promise.all(
        comments.map(async (comment) => {
          const user = await this.usersRepository.findOne(comment.userId);

          return {
            ...comment,
            user,
          };
        }),
      );
    } catch (err) {
      return [];
    }
  }

  async getPostLikes(postId: string): Promise<Like[]> {
    try {
      const likes = await this.likesRepository
        .createQueryBuilder('like')
        .where('like.postId = :postId', { postId })
        .getMany();

      return await Promise.all(
        likes.map(async (like) => {
          const user = await this.usersRepository.findOne(like.userId);

          return {
            ...like,
            user,
          };
        }),
      );
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
