import { SubmissionVerdict, Verdict } from '../interfaces/Verdict';
import TestCase from '../interfaces/TestCase';
import * as child_process from 'child_process';
import Formatter from './helpers/Formatter';
import { start, job, stop } from 'microjob';

export default class CodeRunner {
  public async runCodeWithTestCases(executionCommand: string, testCases: TestCase[]): Promise<SubmissionVerdict> {
    try {
      await start();
      const res = await job(
        data => {
          for (const testCase of data.testCases) {
            const childProcess = require('child_process');
            const input: string = testCase.input;
            const expectedOutput: string = testCase.expectedOutput;

            const result = childProcess.execSync(data.executionCommand, {
              input: input,
              encoding: 'utf-8'
            });

            const userOutput = result.replace(/(\r\n|\n|\r)/gm, '');
            if (userOutput !== expectedOutput) {
              return {
                message: `For input: ${input}\n found: ${userOutput}\nexpected:${expectedOutput}`,
                verdict: data.WA
              };
            }
          }
        },
        { data: { executionCommand, testCases: testCases, WA: Verdict.WA } }
      );

      if (res) return res;
      return {
        message: 'passed!',
        verdict: Verdict.AC
      };
    } catch (err) {
      return {
        message: '',
        verdict: Verdict.RUNTIME
      };
    } finally {
      // stop worker pool
      await stop();
    }
  }

  public async runCode(executionCommand: string): Promise<string> {
    try {
      await start();
      const stdout: string = await job(
        data => {
          const childProcess = require('child_process');

          const consoleOutput: string = childProcess.execSync(data.executionCommand, {
            encoding: 'utf-8'
          });
          return stdout;
        },
        { data: { executionCommand } }
      );
      return stdout;
    } catch (err) {
      throw new Error('RUNTIME ERROR');
    } finally {
      // stop worker pool
      await stop();
    }
  }
}
