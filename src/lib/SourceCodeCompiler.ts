import commandDispatcher from '../lib/helpers/CommandDispatcher';

export default class SourceCodeCompiler {
  public async compileSourceCode(compilationCommand: string): Promise<any> {
    try {
      const { error, stderr, stdout }: any = (await commandDispatcher(`${compilationCommand}`)) as any;
      return { error, stderr, stdout };
    } catch (err) {
      throw err;
    }
  }
}
