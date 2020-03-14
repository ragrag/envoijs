import { IsString } from 'class-validator';

export default class TestCase {
  @IsString()
  input: string;
  @IsString()
  expectedOutput: string;
}
