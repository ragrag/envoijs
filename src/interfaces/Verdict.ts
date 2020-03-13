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
  message: string;
}

export { Verdict, SubmissionVerdict };
