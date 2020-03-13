import { promises as fsp } from 'fs';
import * as shortid from 'shortid';
import SubmissionFile from '../interfaces/SubmissionFile';

class FileManager {
  private submissionFileData: SubmissionFile;

  constructor(fileExtension: string) {
    this.submissionFileData = {
      inputFileName: `${shortid.generate()}.${fileExtension}`,
      outputFileName: `main`,
      path: 'C:\\\\Users\\ragrag\\Desktop\\go-playground\\tmp'
    };
  }
  public async createSubmissionFile(code: string): Promise<void> {
    try {
      await fsp.writeFile(`${this.submissionFileData.path}/${this.submissionFileData.inputFileName}`, code, { flag: 'w' });
    } catch (err) {
      throw err;
    }
  }

  public async deleteSubmissionFile(): Promise<void> {
    try {
      await fsp.unlink(`${this.submissionFileData.path}/${this.submissionFileData.inputFileName}`);
    } catch (err) {
      throw err;
    }
  }

  public getSubmissionFileData(): SubmissionFile {
    return this.submissionFileData;
  }
}

export default FileManager;
