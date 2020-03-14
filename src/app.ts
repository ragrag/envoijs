import MainController from './lib/MainController';
import { SubmissionVerdict } from './interfaces/Verdict';
import LanguageFactory from './languages/LanguageControllerFactory';
import { LanguageController } from './interfaces/LanguageController';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

import Submission from './dto/Submission';
import Languages from './interfaces/Languages';

const Envoi = async (submission: Submission): Promise<SubmissionVerdict> => {
  try {
    const errors: ValidationError[] = await validate(plainToClass(Submission, submission), { skipMissingProperties: false });
    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
      throw message;
    }
  } catch (err) {
    throw err;
  }
  const languageHandler: LanguageController = new LanguageFactory(submission.language) as LanguageController;
  const mainInstance: MainController = new MainController(languageHandler);
  try {
    await mainInstance.checkLanguage();
    await mainInstance.createSubmissionFile(submission.sourceCode);
    if (languageHandler.needsCompilation()) await mainInstance.compileSourceCode();
    let subissionResult: SubmissionVerdict;
    if (submission.testCases.length > 1) subissionResult = await mainInstance.runCodeWithTestCases(submission.testCases);
    else subissionResult = await mainInstance.runCode(submission.input);

    return subissionResult;
  } catch (err) {
    if (err.verdict) return err;
    throw err;
  } finally {
    await mainInstance.cleanUp();
  }
};

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
  const codeJava: string = `
class Main 
{ 
    // Your program begins with a call to main(). 
    // Prints "Hello, World" to the terminal window. 
    public static void main(String args[]) 
    { 
        System.out.println("Hello, World"); 
    } 
} `;
  const res: SubmissionVerdict = await Envoi({
    input: '2 2 3',
    language: Languages.JAVA,
    sourceCode: codeJava,
    testCases: []
  });
  console.log(res.output);
}

(async () => {
  try {
    await init();
  } catch (err) {
    console.log(err);
  }
})();
