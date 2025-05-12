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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/Guards/Auth.Guard';
import { Roles } from 'src/decorator/role.decorator';

@Controller('v1/user') // Base route for all user-related endpoints
@UseGuards(AuthGuard) // Apply authentication guard to protect all routes
export class UserController {
  constructor(private readonly userService: UserService) {} // Inject UserService to handle user-related logic

  /**
   * Create a new user
   * @param createUserDto - Data Transfer Object containing user creation details
   * @returns The created user
   */
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  /**
   * Get a list of all users
   * Restricted to users with the 'admin' role
   * @returns An array of users
   */
  @Roles(['admin'])
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  /**
   * Get details of a specific user by ID
   * Restricted to users with the 'admin' role
   * @param id - The ID of the user to retrieve
   * @returns The user details
   */
  @Get(':id')
  @Roles(['admin'])
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  /**
   * Update a user's details
   * Restricted to users with the 'admin' role
   * @param id - The ID of the user to update
   * @param updateUserDto - Data Transfer Object containing updated user details
   * @returns The updated user
   */
  @Patch(':id')
  @Roles(['admin'])
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Delete a user by ID
   * Restricted to users with the 'admin' role
   * @param id - The ID of the user to delete
   * @returns A confirmation message
   */
  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
