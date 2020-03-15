import { SubmissionVerdict, Verdict } from '../interfaces/Verdict';
import TestCase from '../dto/TestCase';
import * as child_process from 'child_process';
import Formatter from './helpers/Formatter';
import { start, job, stop } from 'microjob';
import * as execa from 'execa';

export default class CodeRunner {
  public async runCodeWithTestCases(executionCommand: string, testCases: TestCase[]): Promise<SubmissionVerdict> {
    let subprocess: execa.ExecaChildProcess<string>;
    try {
      // await start();
      // const res = await job(
      //   async data => {
      for (const testCase of testCases) {
        // const execa = require('execa');
        // const childProcess = require('child_process');
        const input: string = testCase.input;
        const expectedOutput: string = testCase.expectedOutput;
        // console.log('IN');

        subprocess = execa.command(executionCommand, {
          input: input,

          cleanup: true,
          stripFinalNewline: true,
          timeout: 5000,
          killSignal: 'SIGKILL'
        });

        const { stdout } = await subprocess;

        // const userOutput = stdout.replace(/(\r\n|\n|\r)/gm, '');
        const userOutput = stdout;
        if (userOutput !== expectedOutput) {
          return {
            output: `For input: ${input}\nFound: ${userOutput}\nExpected:${expectedOutput}`,
            verdict: Verdict.WA
          };
        }
      }
      //   },
      //   { data: { executionCommand, testCases: testCases, WA: Verdict.WA } }
      // );

      // if (res) return res;
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
    // finally {
    //   // stop worker pool
    //   await stop();
    // }
  }

  public async runCode(executionCommand: string, input: string): Promise<SubmissionVerdict> {
    try {
      // const execa = require('execa');
      // const childProcess = require('child_process');

      // console.log('IN');

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
      // const result = childProcess.execSync(data.executionCommand, {
      //   input: input,
      //   encoding: 'utf-8'
      // });
      // console.log(stdout, failed);
      // const userOutput = stdout.replace(/(\r\n|\n|\r)/gm, '');

      // await start();
      // const stdout: string = await job(
      //   data => {
      //     const childProcess = require('child_process');

      //     const consoleOutput: string = childProcess.execSync(data.executionCommand, {
      //       encoding: 'utf-8',
      //       input: data.input
      //     });
      //     return consoleOutput;
      //   },
      //   { data: { executionCommand, input } }
      // );
      // return {
      //   verdict: Verdict.AC,
      //   output: stdout
      // };
    } catch (err) {
      if (err.timedOut) {
        return {
          output: `Time limit exceeded`,
          verdict: Verdict.TLE
        };
      }

      throw err;
    }
    // finally {
    //   // stop worker pool
    //   await stop();
    // }
  }
}
