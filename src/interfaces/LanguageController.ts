import SubmissionFile from './SubmissionFile';
import FileExtension from './FileExtension';

interface LanguageController {
  getExtension(): FileExtension;
  needsCompilation(): boolean;
  getCompilationCommand(submissionFileData: SubmissionFile): string;
  getExecutionCommand(submissionFileData: SubmissionFile): string;
  getCheckCommand(): string;
}

export { LanguageController };
