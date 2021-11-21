export class CreateCommentDto {
  userId: string;
  postId: string;
  text: string;
  createdAt: Date;
}
