import { SubmissionVerdict, forkSubmissionVerdict, Verdict } from '../interfaces/Verdict';

export default class ErrorHandler {
  public static handle(err: any): SubmissionVerdict {
    if (err.verdict) {
      return err;
    }
    throw err;
  }
}
