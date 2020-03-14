import TestCase from 'dto/TestCase';
import { IsString, IsNotEmpty, IsOptional, ValidateNested, IsIn } from 'class-validator';
import Languages from '../interfaces/Languages';

export default class Submission {
  @IsString()
  @IsNotEmpty()
  public sourceCode: string;

  @IsString()
  @IsNotEmpty()
  @IsIn([...Object.values(Languages)])
  public language: string;

  @ValidateNested()
  @IsOptional()
  public testCases: TestCase[] = [];

  @IsString()
  @IsOptional()
  public input: string = null;
}
