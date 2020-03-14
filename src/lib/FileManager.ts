import { promises as fsp } from 'fs';
import * as shortid from 'shortid';
import SubmissionFile from '../interfaces/SubmissionFile';
import FileExtension from 'interfaces/FileExtension';

class FileManager {
  private submissionFileData: SubmissionFile;

  constructor(fileExtension: FileExtension) {
    const randomName = shortid.generate();
    this.submissionFileData = {
      inputFileName: `${randomName}.${fileExtension.inputExtension}`,
      outputFileName: `${randomName}.${fileExtension.outputExtension}`,
      path: `${__dirname}/tmp`
    };
  }
  public async createSubmissionFile(code: string): Promise<void> {
    try {
      await fsp.mkdir(`${this.submissionFileData.path}`, { recursive: true });
      await fsp.writeFile(`${this.submissionFileData.path}/${this.submissionFileData.inputFileName}`, code, { flag: 'w' });
    } catch (err) {
      throw err;
    }
  }

  public async deleteSubmissionFile(): Promise<void> {
    try {
      await fsp.unlink(`${this.submissionFileData.path}/${this.submissionFileData.inputFileName}`);
    } catch (err) {
      //
    }
    try {
      await fsp.unlink(null);
    } catch (err) {
      //
    }
  }

  public getSubmissionFileData(): SubmissionFile {
    return this.submissionFileData;
  }
}

export default FileManager;
