import FileManager from '../lib/FileManager';
import LanguageFactory from '../languages/LanguageControllerFactory';
import { LanguageController } from '../interfaces/LanguageController';
import { SubmissionVerdict, forkSubmissionVerdict, Verdict } from '../interfaces/Verdict';
import TestCase from '../dto/TestCase';
import codeRunner from '../lib/CodeRunner';
import SourceCodeCompiler from '../lib/SourceCodeCompiler';
import commandDispatcher from './helpers/CommandDispatcher';

export default class MainController {
  private fileManager: FileManager;
  private languageController: LanguageController;
  private codeRunner: codeRunner;
  private sourceCodeCompiler: SourceCodeCompiler;

  constructor(languageController: LanguageController) {
    this.languageController = languageController;
    this.fileManager = new FileManager(this.languageController.getExtension());
    this.codeRunner = new codeRunner();
    this.sourceCodeCompiler = new SourceCodeCompiler();
  }

  public async createSubmissionFile(code: string): Promise<void> {
    try {
      await this.fileManager.createSubmissionFile(code);
    } catch (err) {
      throw forkSubmissionVerdict('Error occured while creating submission', Verdict.ERROR);
    }
  }

  public async compileSourceCode(): Promise<string> {
    try {
      const compilationCommand = this.languageController.getCompilationCommand(this.fileManager.getSubmissionFileData());
      const { error, stderr, stdout } = await this.sourceCodeCompiler.compileSourceCode(compilationCommand);
      if (stderr) throw stderr;
      if (error) throw new Error();
      return stdout;
    } catch (err) {
      throw forkSubmissionVerdict(`Compile Time Error\n${err}`, Verdict.COMPILATON);
    }
  }

  public async runCodeWithTestCases(testCases: TestCase[]): Promise<SubmissionVerdict> {
    try {
      const executionCommand = this.languageController.getExecutionCommand(this.fileManager.getSubmissionFileData());
      const runResult: SubmissionVerdict = await this.codeRunner.runCodeWithTestCases(executionCommand, testCases);
      return runResult;
    } catch (err) {
      throw forkSubmissionVerdict(`RUNTIME ERROR`, Verdict.RUNTIME);
    }
  }

  public async runCode(input: string): Promise<SubmissionVerdict> {
    try {
      const executionCommand = this.languageController.getExecutionCommand(this.fileManager.getSubmissionFileData());
      const runResult: SubmissionVerdict = await this.codeRunner.runCode(executionCommand, input);

      return runResult;
    } catch (err) {
      throw forkSubmissionVerdict(`RUNTIME ERROR`, Verdict.RUNTIME);
    }
  }

  public async checkLanguage(): Promise<void> {
    const { error, stderr, stdout } = await commandDispatcher(this.languageController.getCheckCommand());
    if (error) {
      throw new Error(
        `Language compile tools not installed, please make sure by running ${this.languageController.getCheckCommand()} in your terminal`
      );
    }
  }
  public async cleanUp() {
    await this.fileManager.deleteSubmissionFile();
  }
}
