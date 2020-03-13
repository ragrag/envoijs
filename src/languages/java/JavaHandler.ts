import { LanguageHandler } from '../../interfaces/LanguageHandler';
import commandDispatcher from '../../lib/helpers/CommandDispatcher';
import SubmissionFile from '../../interfaces/SubmissionFile';
import * as child_process from 'child_process';
import { SubmissionVerdict, Verdict } from '../../interfaces/Verdict';
import TestCase from '../../interfaces/TestCase';
import TestCaseValidator from '../../lib/TestCaseValidator';

class JavaHandler implements LanguageHandler {
  public getExtension(): string {
    return '.java';
  }
  public async executeSubmissionWithTestCases(submissionFileData: SubmissionFile, testCases: TestCase[]): Promise<SubmissionVerdict> {
    try {
      const executionCommand = `${submissionFileData.path}\\${submissionFileData.outputFileName}.o`;
      const result: SubmissionVerdict = await TestCaseValidator.validateTestCases(executionCommand, testCases);
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
      const { stderr, stdout }: any = (await commandDispatcher(
        `javac ${submissionFileData.path}/${submissionFileData.inputFileName} -d ${submissionFileData.path}`
      )) as any;
      return { stderr, stdout };
    } catch (err) {
      throw err;
    }
  }
}

export default JavaHandler;
