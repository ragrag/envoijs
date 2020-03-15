import { LanguageController } from '../../interfaces/LanguageController';
import SubmissionFile from '../../interfaces/SubmissionFile';
import FileExtension from 'interfaces/FileExtension';

class CppController implements LanguageController {
  private fileExtension: FileExtension = { inputExtension: 'js', outputExtension: '' };
  public getExtension(): FileExtension {
    return this.fileExtension;
  }

  public getExecutionCommand(submissionFileData: SubmissionFile): string {
    return `node ${submissionFileData.path}\\${submissionFileData.inputFileName}.${this.fileExtension.inputExtension}`;
  }

  public getCompilationCommand(submissionFileData: SubmissionFile): string {
    return null;
  }

  public needsCompilation() {
    return false;
  }
  public getCheckCommand(): string {
    return `node --version`;
  }
}

export default CppController;
