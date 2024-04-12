import {
  IsDefined,
  IsEmail,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { CardDto } from './card.dto';
import { Type } from 'class-transformer';

export class CreateChargeDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @IsDefined()
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  amount: number;
}
