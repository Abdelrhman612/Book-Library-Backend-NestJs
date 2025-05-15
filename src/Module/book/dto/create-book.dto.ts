import { IsString, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsString({ message: 'Author must be a string' })
  author: string;

  @IsString({ message: 'Category must be a string' })
  category: string;

  @IsString({ message: 'Description must be a string' })
  description: string;

  @IsString({ message: 'image must be a valid string' })
  image: string;

  @IsOptional()
  @IsString({ message: 'User ID must be a string if provided' })
  userId?: string;
}
