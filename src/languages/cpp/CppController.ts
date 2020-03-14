import { LanguageController } from '../../interfaces/LanguageController';
import SubmissionFile from '../../interfaces/SubmissionFile';
import FileExtension from 'interfaces/FileExtension';

class CppHandler implements LanguageController {
  private fileExtension: FileExtension = { inputExtension: 'cpp', outputExtension: 'o' };
  public getExtension(): FileExtension {
    return this.fileExtension;
  }

  public getExecutionCommand(submissionFileData: SubmissionFile): string {
    return `${submissionFileData.path}\\${submissionFileData.outputFileName}.${this.fileExtension.outputExtension}`;
  }

  public getCompilationCommand(submissionFileData: SubmissionFile): string {
    return `g++ ${submissionFileData.path}/${submissionFileData.inputFileName}.${this.fileExtension.inputExtension} -std=c++11 -o ${submissionFileData.path}\\${submissionFileData.outputFileName}.${this.fileExtension.outputExtension}`;
  }

  public needsCompilation() {
    return true;
  }
  public getCheckCommand(): string {
    return `g++ --version`;
  }
}

export default CppHandler;
