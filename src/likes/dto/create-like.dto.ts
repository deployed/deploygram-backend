import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty()
  postId: string;
  @ApiProperty()
  userId: string;
}
