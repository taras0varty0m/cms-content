import { PartialType } from '@nestjs/swagger';
import { CreateContentGroupDto } from './create-content-group.dto';

export class UpdateContentGroupDto extends PartialType(CreateContentGroupDto) {}
