import MainController from '../lib/MainController';
import { SubmissionVerdict } from '../interfaces/Verdict';
import LanguageFactory from '../languages/LanguageControllerFactory';
import { LanguageController } from '../interfaces/LanguageController';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

import Submission from '../dto/Submission';
const validateSubmission = async (submission: Submission): Promise<Submission> => {
  try {
    submission = plainToClass(Submission, submission);
    const errors: ValidationError[] = await validate(submission, { skipMissingProperties: false });
    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
      throw message;
    }
    return submission;
  } catch (err) {
    throw err;
  }
};
const Envoi = async (submission: Submission): Promise<SubmissionVerdict> => {
  try {
    submission = await validateSubmission(submission);
  } catch (err) {
    throw err;
  }
  // submission = new Submission(submission.sourceCode,submission.language,submission.);
  const languageHandler: LanguageController = new LanguageFactory(submission.language) as LanguageController;
  const mainInstance: MainController = new MainController(languageHandler);
  try {
    await mainInstance.checkLanguage();
    await mainInstance.createSubmissionFile(submission.sourceCode);
    if (languageHandler.needsCompilation()) await mainInstance.compileSourceCode();
    let subissionResult: SubmissionVerdict;
    if (submission.testCases.length > 1) subissionResult = await mainInstance.runCodeWithTestCases(submission.testCases, submission.timeout);
    else subissionResult = await mainInstance.runCode(submission.input, submission.timeout);

    return subissionResult;
  } catch (err) {
    if (err.verdict) return err;
    throw err;
  } finally {
    await mainInstance.cleanUp();
  }
};

export default Envoi;
