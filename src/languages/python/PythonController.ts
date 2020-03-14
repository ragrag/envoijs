import { LanguageController } from '../../interfaces/LanguageController';
import SubmissionFile from '../../interfaces/SubmissionFile';
import FileExtension from '../../interfaces/FileExtension';

class PythonController implements LanguageController {
  private fileExtension: FileExtension = { inputExtension: 'py', outputExtension: '' };
  public getExtension(): FileExtension {
    return this.fileExtension;
  }

  public getExecutionCommand(submissionFileData: SubmissionFile): string {
    return `python ${submissionFileData.path}\\${submissionFileData.outputFileName}.${this.fileExtension.inputExtension}`;
  }

  public getCompilationCommand(submissionFileData: SubmissionFile): string {
    return null;
  }

  public needsCompilation() {
    return false;
  }
  public getCheckCommand(): string {
    return `python --version`;
  }
}

export default PythonController;
