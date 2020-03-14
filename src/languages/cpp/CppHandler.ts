import { LanguageHandler } from '../../interfaces/LanguageHandler';
import SubmissionFile from '../../interfaces/SubmissionFile';
import FileExtension from 'interfaces/FileExtension';

class CppHandler implements LanguageHandler {
  public getExtension(): FileExtension {
    return { inputExtension: 'cpp', outputExtension: 'o' };
  }

  public getExecutionCommand(submissionFileData: SubmissionFile): string {
    return `${submissionFileData.path}\\${submissionFileData.outputFileName}`;
  }

  public getCompilationCommand(submissionFileData: SubmissionFile): string {
    return `g++ ${submissionFileData.path}/${submissionFileData.inputFileName} -std=c++11 -o ${submissionFileData.path}\\${submissionFileData.outputFileName}`;
  }

  public needsCompilation() {
    return true;
  }
}

export default CppHandler;
