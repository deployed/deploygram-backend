export class CreateCommentDto {
  userId: number;
  postId: number;
  text: string;
  createdAt: Date;
}
