import SubmissionFile from './SubmissionFile';
import { SubmissionVerdict } from './Verdict';
import TestCase from './TestCase';

interface LanguageHandler {
  getExtension(): string;
  compileSubmission(submissionFileData: SubmissionFile): Promise<any>;
  executeSubmissionWithTestCases(submissionFileData: SubmissionFile, testCases: TestCase[]): Promise<SubmissionVerdict>;
}

export { LanguageHandler };
