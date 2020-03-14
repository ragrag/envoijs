import { promises as fsp } from 'fs';
import * as shortid from 'shortid';
import SubmissionFile from '../interfaces/SubmissionFile';
import FileExtension from 'interfaces/FileExtension';
import { SubmissionVerdict, Verdict, forkSubmissionVerdict } from 'interfaces/Verdict';
import Languages from 'interfaces/Languages';

class FileManager {
  private submissionFileData: SubmissionFile;
  private fileExtension: FileExtension;
  private randomName: string;
  constructor(fileExtension: FileExtension) {
    this.fileExtension = fileExtension;
    this.initializeRandomName();
    this.submissionFileData = {
      inputFileName: `${this.randomName}`,
      outputFileName: `${this.randomName}`,
      path: `${__dirname}\\tmp`
    };
  }
  private initializeRandomName() {
    this.randomName = shortid.generate();
    this.randomName = this.randomName.replace(/-/g, '_');
  }
  public async createSubmissionFile(code: string): Promise<void> {
    try {
      code = this.handleSpecialCases(code);

      await fsp.mkdir(`${this.submissionFileData.path}`, { recursive: true });
      await fsp.writeFile(`${this.submissionFileData.path}/${this.submissionFileData.inputFileName}.${this.fileExtension.inputExtension}`, code, {
        flag: 'w'
      });
    } catch (err) {
      throw err;
    }
  }

  private handleSpecialCases(code: string) {
    if (this.fileExtension.inputExtension === 'java') {
      code = code.replace('class Main', `class ${this.randomName}`);
    }

    return code;
  }
  public async deleteSubmissionFile(): Promise<void> {
    try {
      await fsp.unlink(`${this.submissionFileData.path}/${this.submissionFileData.inputFileName}.${this.fileExtension.inputExtension}`);
    } catch (err) {
      //
    }
    try {
      await fsp.unlink(`${this.submissionFileData.path}/${this.submissionFileData.outputFileName}.${this.fileExtension.outputExtension}`);
    } catch (err) {
      //
    }
  }

  public getSubmissionFileData(): SubmissionFile {
    return this.submissionFileData;
  }
}

export default FileManager;
