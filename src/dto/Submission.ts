import TestCase from 'dto/TestCase';
import { IsString, IsNotEmpty, IsOptional, ValidateNested, IsIn, IsNumber } from 'class-validator';
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
  public testCases?: TestCase[] = [];

  @IsString()
  @IsOptional()
  public input?: string = null;

  @IsNumber()
  @IsOptional()
  public timeout?: number = 5000;

  // constructor(sourceCode: string, language: string , testCases: TestCase[] =[],input:string=null,timeout:number=5000) {
  //  this.sourceCode=sourceCode;
  //  this.language=language;
  //  this.testCases=testCases;
  //  this.input=input;
  //  this.timeout=timeout;
  // }
}
