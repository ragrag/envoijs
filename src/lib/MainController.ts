import FileManager from '../lib/FileManager';
import LanguageFactory from '../languages/LanguageFactory';
import { LanguageHandler } from '../interfaces/LanguageHandler';
import { SubmissionVerdict } from '../interfaces/Verdict';
import TestCase from '../interfaces/TestCase';
import codeRunner from '../lib/CodeRunner';
import SourceCodeCompiler from '../lib/SourceCodeCompiler';

export default class MainController {
  private fileManager: FileManager;
  private languageHandler: LanguageHandler;
  private codeRunner: codeRunner;
  private sourceCodeCompiler: SourceCodeCompiler;

  constructor(language: string) {
    this.languageHandler = new LanguageFactory(language) as LanguageHandler;
    this.fileManager = new FileManager(this.languageHandler.getExtension());
    this.codeRunner = new codeRunner();
    this.sourceCodeCompiler = new SourceCodeCompiler();
  }

  public async createSubmissionFile(code: string): Promise<void> {
    try {
      await this.fileManager.createSubmissionFile(code);
    } catch (err) {
      throw err;
    }
  }

  public async compileSourceCode(): Promise<string> {
    try {
      const compilationCommand = this.languageHandler.getCompilationCommand(this.fileManager.getSubmissionFileData());
      const { error, stderr, stdout } = await this.sourceCodeCompiler.compileSourceCode(compilationCommand);
      if (stderr) throw stderr;
      if (error) throw new Error();
      return stdout;
    } catch (err) {
      throw new Error(`Compile Time Error\n${err}`);
    }
  }

  public async runCodeWithTestCases(testCases: TestCase[]): Promise<SubmissionVerdict> {
    try {
      const executionCommand = this.languageHandler.getExecutionCommand(this.fileManager.getSubmissionFileData());
      const runResult: SubmissionVerdict = await this.codeRunner.runCodeWithTestCases(executionCommand, testCases);
      return runResult;
    } catch (err) {
      throw err;
    }
  }

  public async runCode(): Promise<string> {
    try {
      const executionCommand = this.languageHandler.getExecutionCommand(this.fileManager.getSubmissionFileData());
      const runResult: string = await this.codeRunner.runCode(executionCommand);

      return runResult;
    } catch (err) {
      throw err;
    }
  }

  public async cleanUp() {
    await this.fileManager.deleteSubmissionFile();
  }
}
