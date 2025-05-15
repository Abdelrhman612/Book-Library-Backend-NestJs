import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/Guards/Auth.Guard';
import { Roles } from 'src/decorator/role.decorator';

@Controller('v1/book')
@UseGuards(AuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @Roles(['admin'])
  create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createBookDto: CreateBookDto,
  ) {
    return this.bookService.createBook(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.getBooks();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.getBook(id);
  }

  @Patch(':id')
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(id, updateBookDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.bookService.DeleteBook(id);
  }
}
