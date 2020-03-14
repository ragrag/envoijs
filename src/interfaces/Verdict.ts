enum Verdict {
  AC = 'AC',
  WA = 'WA',
  COMPILATON = 'COMPILATION',
  RUNTIME = 'RUNTIME',
  TLE = 'TLE',
  MLE = 'MLE',
  PENDING = 'PENDING',
  ERROR = 'ERROR'
}

interface SubmissionVerdict {
  verdict: string;
  output: string;
}

const forkSubmissionVerdict = (output: string, verdict: string): SubmissionVerdict => {
  return {
    output,
    verdict
  };
};
export { Verdict, SubmissionVerdict, forkSubmissionVerdict };
