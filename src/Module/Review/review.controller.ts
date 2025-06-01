import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create.review.dto';
import { AuthGuard } from 'src/Guards/Auth.Guard';

@Controller('v1/review')
@UseGuards(AuthGuard)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async getReviews() {
    return this.reviewService.GetReview();
  }
  @Post()
  async createReview(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.CreateReview(createReviewDto);
  }
  @Patch(':id')
  async updateReview(id: string, updateReviewDto: CreateReviewDto) {
    return this.reviewService.UpdateReview(id, updateReviewDto);
  }
  @Delete(':id')
  async deleteReview(id: string) {
    return this.reviewService.DeleteReview(id);
  }
}
