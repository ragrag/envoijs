import SubmissionFile from './SubmissionFile';
import { SubmissionVerdict } from './Verdict';
import TestCase from './TestCase';
import FileExtension from './FileExtension';

interface LanguageHandler {
  getExtension(): FileExtension;
  needsCompilation(): boolean;
  getCompilationCommand(submissionFileData: SubmissionFile): string;
  getExecutionCommand(submissionFileData: SubmissionFile): string;
}

export { LanguageHandler };
