import { SubmissionVerdict, Verdict } from '../interfaces/Verdict';
import TestCase from '../dto/TestCase';
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
                output: `For input: ${input}\n found: ${userOutput}\nexpected:${expectedOutput}`,
                verdict: data.WA
              };
            }
          }
        },
        { data: { executionCommand, testCases: testCases, WA: Verdict.WA } }
      );

      if (res) return res;
      return {
        output: 'passed!',
        verdict: Verdict.AC
      };
    } catch (err) {
      throw err;
    } finally {
      // stop worker pool
      await stop();
    }
  }

  public async runCode(executionCommand: string, input: string): Promise<SubmissionVerdict> {
    try {
      await start();
      const stdout: string = await job(
        data => {
          const childProcess = require('child_process');

          const consoleOutput: string = childProcess.execSync(data.executionCommand, {
            encoding: 'utf-8',
            input: data.input
          });
          return consoleOutput;
        },
        { data: { executionCommand, input } }
      );
      return {
        verdict: Verdict.AC,
        output: stdout
      };
    } catch (err) {
      throw err;
    } finally {
      // stop worker pool
      await stop();
    }
  }
}
