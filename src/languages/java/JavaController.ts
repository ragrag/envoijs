import { LanguageController } from '../../interfaces/LanguageController';
import SubmissionFile from '../../interfaces/SubmissionFile';
import FileExtension from 'interfaces/FileExtension';

class JavaHandler implements LanguageController {
  private fileExtension: FileExtension = { inputExtension: 'java', outputExtension: 'class' };
  public getExtension(): FileExtension {
    return this.fileExtension;
  }
  public getExecutionCommand(submissionFileData: SubmissionFile): string {
    try {
      return `cd ${submissionFileData.path} && java ${submissionFileData.outputFileName}`;
    } catch (err) {
      throw err;
    }
  }

  public getCompilationCommand(submissionFileData: SubmissionFile): string {
    return `javac ${submissionFileData.path}\\${submissionFileData.inputFileName}.${this.fileExtension.inputExtension}`;
  }

  public needsCompilation() {
    return true;
  }
  public getCheckCommand(): string {
    return `java --version`;
  }
}

export default JavaHandler;
