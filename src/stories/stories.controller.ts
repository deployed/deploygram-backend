import { Controller, Get, Param } from '@nestjs/common';
import { Story } from './entities/story.entity';

const stories = [
  {
    id: '03021dc7-9db8-459a-b8ea-ae2d762f1973',
    username: 'Deployed',
    image: 'http://picsum.photos/1200/1200',
  },
  {
    id: 'adbc05f2-6eec-4698-9568-764a3b8e0f52',
    username: 'Marcin',
    image: 'http://picsum.photos/1200/1200',
  },
  {
    id: 'e558c792-9abf-4e35-aaef-0588a02bc654',
    username: 'Karol',
    image: 'http://picsum.photos/1200/1200',
  },
  {
    id: '9d405b30-1121-45af-9a30-7baaaad53eb5',
    username: 'Adrian',
    image: 'http://picsum.photos/1200/1200',
  },
];

@Controller('stories')
export class StoriesController {
  @Get()
  findAll(): Story[] {
    return stories;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Story {
    return stories[id];
  }
}
