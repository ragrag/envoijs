import FileManager from './lib/FileManager';
import LanguageFactory from './languages/LanguageFactory';
import { LanguageHandler } from './interfaces/LanguageHandler';
import { SubmissionVerdict } from './interfaces/Verdict';
import TestCase from './interfaces/TestCase';

class Judge {
  private fileManager: FileManager;
  private languageHandler: LanguageHandler;
  constructor(language: string) {
    this.languageHandler = new LanguageFactory(language) as LanguageHandler;
    this.fileManager = new FileManager(this.languageHandler.getExtension());
  }

  public async createSubmissionFile(code: string): Promise<void> {
    try {
      await this.fileManager.createSubmissionFile(code);
    } catch (err) {
      // throw boom 500, unable to create file
      console.log('caught', err.message);
      throw err;
    }
  }

  public async compileSubmission(): Promise<string> {
    try {
      const { error, stderr, stdout } = await this.languageHandler.compileSubmission(this.fileManager.getSubmissionFileData());
      if (stderr) throw stderr;
      if (error) throw new Error('Compile Time Error');
      return stdout;
    } catch (err) {
      await this.fileManager.deleteSubmissionFile();
      throw new Error(`Compile Time Error\n${err}`);
    }
  }

  public async executeSubissionWithTestCases(testCases: TestCase[]): Promise<SubmissionVerdict> {
    try {
      const submissionResult: SubmissionVerdict = await this.languageHandler.executeSubmissionWithTestCases(
        this.fileManager.getSubmissionFileData(),
        testCases
      );
      await this.fileManager.deleteSubmissionFile();
      return submissionResult;
    } catch (err) {
      await this.fileManager.deleteSubmissionFile();
      throw err;
    }
  }
}

async function init() {
  //   const { stderr, stdout } = (await execShellCommand(cppCMD)) as any;

  const code = `#include <iostream>
using namespace std;
#include <vector>
bool checkUnique(string s)
{
    bool mp[256]{false};
    for (auto c : s)
    {
        if (mp[c])
        {
            return false;
        }
        mp[c] = true;
    }
    return true;
}

int main()
{
int n,a,b;
cin>>n;
int sums = 0;
for(int i=0;i<n;i++)
{
  int x;
  cin>>x;
  sums+=x;
}
cout<<sums<<endl;
    //checkUnique(s) ? cout << "True\\n" : cout << "False\\n";
    return 0;
}
`;

  try {
    const judgeInstance: Judge = new Judge('c++');
    await judgeInstance.createSubmissionFile(code);
    await judgeInstance.compileSubmission();
    const testCases: TestCase[] = [
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' },
      { input: '4 2 3 5 7', expectedOutput: '17' },
      { input: '2 2 3', expectedOutput: '5' }
    ];
    const submissionResult: SubmissionVerdict = await judgeInstance.executeSubissionWithTestCases(testCases);
    console.log('output ', submissionResult);
  } catch (err) {
    throw err;
  }
}

(async () => {
  try {
    await init();
  } catch (err) {
    console.log(err.message);
  }
})();
