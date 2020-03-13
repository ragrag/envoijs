import { LanguageHandler } from '../../interfaces/LanguageHandler';
import commandDispatcher from '../../lib/helpers/CommandDispatcher';
import SubmissionFile from '../../interfaces/SubmissionFile';
import { SubmissionVerdict, Verdict } from '../../interfaces/Verdict';
import TestCase from '../../interfaces/TestCase';
import TestCaseValidator from '../../lib/TestCaseValidator';

class CppHandler implements LanguageHandler {
  public getExtension(): string {
    return '.cpp';
  }

  public async executeSubmissionWithTestCases(submissionFileData: SubmissionFile, testCases: TestCase[]): Promise<SubmissionVerdict> {
    try {
      const executionCommand = `${submissionFileData.path}\\${submissionFileData.outputFileName}.o`;
      const t0 = Date.now();

      const result: SubmissionVerdict = await TestCaseValidator.validateTestCases(executionCommand, testCases);

      console.log(`total tile for ${testCases.length} : ${(Date.now() - t0) / 1000}`);
      return result;
    } catch (err) {
      return {
        message: 'error in bla bla',
        verdict: Verdict.RUNTIME
      };
    }
  }
  public async compileSubmission(submissionFileData: SubmissionFile): Promise<any> {
    try {
      const { error, stderr, stdout }: any = (await commandDispatcher(
        `g++ ${submissionFileData.path}/${submissionFileData.inputFileName} -std=c++11 -o ${submissionFileData.path}\\${submissionFileData.outputFileName}.o`
      )) as any;
      return { error, stderr, stdout };
    } catch (err) {
      throw err;
    }
  }
}

export default CppHandler;
