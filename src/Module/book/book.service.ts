import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/DataBase/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  async createBook(createBookDto: CreateBookDto) {
    const { title } = createBookDto;
    const book = await this.prisma.book.findFirst({ where: { title } });
    if (book) {
      throw new Error('Book Already exst');
    }
    const addBook = await this.prisma.book.create({ data: createBookDto });
    return { status: 'success', data: addBook };
  }

  async getBooks() {
    const books = await this.prisma.book.findMany();
    return { status: 'success', length: books.length, data: books };
  }

  async getBook(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id: id } });
    if (!book) {
      throw new NotFoundException('Book is not found');
    }
    return { status: 'success', data: book };
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.prisma.book.findUnique({ where: { id: id } });
    if (!book) {
      throw new NotFoundException('Book is not found');
    }
    const newBook = await this.prisma.book.update({
      where: { id: id },
      data: { ...updateBookDto },
    });

    return { status: 'success', data: newBook };
  }

  async DeleteBook(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id: id } });
    if (!book) {
      throw new NotFoundException('Book is not found');
    }
    await this.prisma.book.delete({ where: { id: id } });

    return { status: 'success', message: 'Delete Book is successfully' };
  }
}
