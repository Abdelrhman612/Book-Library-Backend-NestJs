import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/DataBase/prisma.service';
import { CreateReviewDto } from './dto/create.review.dto';
import { UpdateReviewDto } from './dto/update.review.dto';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async GetReview() {
    const reviews = await this.prisma.review.findMany({
      include: { user: true, book: true },
    });
    return { status: 'success', length: reviews.length, data: reviews };
  }
  async CreateReview(createReviewDto: CreateReviewDto) {
    const { rating, comment, userId, bookId } = createReviewDto;
    // Check if the user exists
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      return { status: 'error', message: 'User not found' };
    }

    // Check if the book exists
    const bookExists = await this.prisma.book.findUnique({
      where: { id: bookId },
    });
    if (!bookExists) {
      return { status: 'error', message: 'Book not found' };
    }

    // Create the review
    const review = await this.prisma.review.create({
      data: {
        rating,
        comment,
        userId,
        bookId,
      },
      include: { user: true, book: true },
    });

    return { status: 'success', data: review };
  }
  async UpdateReview(id: string, updateReviewDto: UpdateReviewDto) {
    const { rating, comment, userId, bookId } = updateReviewDto;

    // Check if the review exists
    const reviewExists = await this.prisma.review.findUnique({
      where: { id },
    });
    if (!reviewExists) {
      return { status: 'error', message: 'Review not found' };
    }

    // Update the review
    const updatedReview = await this.prisma.review.update({
      where: { id },
      data: {
        rating,
        comment,
        userId,
        bookId,
      },
    });

    return { status: 'success', data: updatedReview };
  }
  async DeleteReview(id: string) {
    // Check if the review exists
    const reviewExists = await this.prisma.review.findUnique({
      where: { id },
    });
    if (!reviewExists) {
      return { status: 'error', message: 'Review not found' };
    }

    // Delete the review
    await this.prisma.review.delete({
      where: { id },
    });

    return { status: 'success', message: 'Review deleted successfully' };
  }
}
