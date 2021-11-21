import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  images: string[];
  @ApiProperty()
  description: string;
  @ApiProperty()
  userId: string;
}
