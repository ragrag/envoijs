import * as child_process from 'child_process';
/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
export default function commandDispatcher(cmd: string): Promise<any> {
  const exec = child_process.exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      resolve({ error, stderr, stdout });
    });
  });
}
