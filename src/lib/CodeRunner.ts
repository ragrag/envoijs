import { SubmissionVerdict, Verdict } from '../interfaces/Verdict';
import TestCase from '../dto/TestCase';

import * as execa from 'execa';

export default class CodeRunner {
  public async runCodeWithTestCases(executionCommand: string, testCases: TestCase[]): Promise<SubmissionVerdict> {
    try {
      for (const testCase of testCases) {
        const input: string = testCase.input;
        const expectedOutput: string = testCase.expectedOutput;

        const subprocess = execa.command(executionCommand, {
          input: input,
          cleanup: true,
          stripFinalNewline: true,
          timeout: 5000,
          killSignal: 'SIGKILL'
        });

        const { stdout } = await subprocess;

        const userOutput = stdout;
        if (userOutput !== expectedOutput) {
          return {
            output: `For input: ${input}\nFound: ${userOutput}\nExpected:${expectedOutput}`,
            verdict: Verdict.WA
          };
        }
      }

      return {
        output: 'passed!',
        verdict: Verdict.AC
      };
    } catch (err) {
      if (err.timedOut) {
        return {
          output: `Time limit exceeded`,
          verdict: Verdict.TLE
        };
      }

      throw err;
    }
  }

  public async runCode(executionCommand: string, input: string): Promise<SubmissionVerdict> {
    try {
      const { stdout } = await execa.command(executionCommand, {
        input: input,
        cleanup: true,
        stripFinalNewline: true,
        timeout: 5000,
        killSignal: 'SIGKILL'
      });
      return {
        verdict: Verdict.AC,
        output: stdout
      };
    } catch (err) {
      if (err.timedOut) {
        return {
          output: `Time limit exceeded`,
          verdict: Verdict.TLE
        };
      }

      throw err;
    }
  }
}
