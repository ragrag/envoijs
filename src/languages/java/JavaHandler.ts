import { LanguageHandler } from '../../interfaces/LanguageHandler';
import SubmissionFile from '../../interfaces/SubmissionFile';
import FileExtension from 'interfaces/FileExtension';

class JavaHandler implements LanguageHandler {
  public getExtension(): FileExtension {
    return { inputExtension: 'java', outputExtension: 'class' };
  }

  public getExecutionCommand(submissionFileData: SubmissionFile): string {
    try {
      return `${submissionFileData.path}\\${submissionFileData.outputFileName}`;
    } catch (err) {
      throw err;
    }
  }

  public getCompilationCommand(submissionFileData: SubmissionFile): string {
    return `g++ ${submissionFileData.path}/${submissionFileData.inputFileName} -std=c++11 -o ${submissionFileData.path}\\${submissionFileData.outputFileName}`;
  }

  public needsCompilation() {
    return true;
  }
}

export default JavaHandler;
