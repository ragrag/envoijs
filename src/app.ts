import Envoi from './lib/Envoi';
import { SubmissionVerdict } from './interfaces/Verdict';
import Languages from './interfaces/Languages';
import TestCase from './dto/TestCase';
import Submission from './dto/Submission';

export { Envoi, SubmissionVerdict, Languages, TestCase, Submission };

// async function init() {
//   //   const { stderr, stdout } = (await execShellCommand(cppCMD)) as any;

//   const code = `#include <iostream>
// using namespace std;
// #include <vector>
// bool checkUnique(string s)
// {
//     bool mp[256]{false};
//     for (auto c : s)
//     {
//         if (mp[c])
//         {
//             return false;
//         }
//         mp[c] = true;
//     }
//     return true;
// }

// int main()
// {

// int n,a,b;
// cin>>n;
// int sums = 0;
// for(int i=0;i<n;i++)
// {
//   int x;
//   cin>>x;
//   sums+=x;
// }
// cout<<sums<<endl;
//     //checkUnique(s) ? cout << "True\\n" : cout << "False\\n";
//     return 0;
// }
// `;
//   const codeJava: string = `
// class Main
// {
//     // Your program begins with a call to main().
//     // Prints "Hello, World" to the terminal window.
//     public static void main(String args[])
//     {
//         System.out.println("Hello, World");
//     }
// } `;
//   const res: SubmissionVerdict = await Envoi({
//     input: '2 2 3',
//     language: Languages.JAVA,
//     sourceCode: '',
//     testCases: []
//   });
//   console.log(res.output);
// }

// (async () => {
//   try {
//     await init();
//   } catch (err) {
//     console.log(err);
//   }
// })();
