import { IsInt, IsString, IsUUID, Max } from 'class-validator';

export class CreateReviewDto {
  @IsInt({ message: 'Rating must be an integer' })
  @Max(5, { message: 'Rating must not exceed 5' })
  rating: number;
  @IsString({ message: 'Comment must be a string' })
  comment: string;
  @IsUUID(undefined, { message: 'User ID must be a valid UUID' })
  userId: string;
  @IsUUID(undefined, { message: 'Book ID must be a valid UUID' })
  bookId: string;
}
