import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

if (!CreateUserDto) {
  throw new Error('CreateUserDto is not defined or imported correctly.');
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
