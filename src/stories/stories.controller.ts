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
  {
    id: 'bcc95a36-4bd0-44f7-b543-7828031f8bbf',
    username: 'Adam Małysz',
    image: 'http://picsum.photos/1200/1200',
  },
  {
    id: 'fe50ed41-5e98-4282-8d5d-4d5a6575f330',
    username: 'Dawid',
    image: 'http://picsum.photos/1200/1200',
  },
  {
    id: '3b501954-98e1-4071-af86-2f390495bd33',
    username: 'Janne Ahonen',
    image: 'http://picsum.photos/1200/1200',
  },
  {
    id: '025a5def-9059-42df-8757-d8b7d7f62c0d',
    username: 'Tami Kiuru',
    image: 'http://picsum.photos/1200/1200',
  },
  {
    id: 'e0a0fc0d-32f2-4ec9-85e6-71ea2999d2ce',
    username: 'Noriaki Kasai',
    image: 'http://picsum.photos/1200/1200',
  },
  {
    id: '3dd10e09-f7f0-479d-bc0e-61f07502698c',
    username: 'Ville Larinto',
    image: 'http://picsum.photos/1200/1200',
  },
  {
    id: 'b28abd44-fc81-4440-b703-c6df60ea3c92',
    username: 'Martin Schmitt',
    image: 'http://picsum.photos/1200/1200',
  },
  {
    id: 'd187b627-5d3b-4324-9c43-12e854d20c97',
    username: 'Kimmo Yliriesto',
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
