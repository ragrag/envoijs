![ENVOI LOGO](https://github.com/ragrag/envoijs/blob/master/meta/envoi.png?raw=true)

[![PR's Welcome][pr-welcoming-image]][pr-welcoming-url]

Envoi is a lightweight and robust code execution system capable of **executing** or **judging test cases** from source code across multiple languages that are easily extensible/integrated in your usage pattern

Currently Envoi supports: **C++**, **Java**, **Python**, **Go**, **JavaScript (Node)**.

Envoi Doesn't run in sandboxed mode so it's not encouraged to use in production for security risks

##### Envoi is fully compatible with TypeScript

&nbsp;

## Installation

Envoi requires the respective compile/run tools for each language intended to be used installed on the host system and added to PATH. These include
| Language | Tool |
| ------------- |:-------------:|
| C++ | g++ |
| Java | java jdk |
| Python | Python |
| Go | go |
| JavaScript | node |

## Npm installation

```
$ npm install envoijs
```

## Basic Usage - JavaScript

```js
const { Envoi, Languages, Verdict } = require('envoijs');
const runCodeExample = async () => {
  const sourceCode = `print("Hello",input())`;
  const result = await Envoi({
    input: 'From Envoi',
    sourceCode: sourceCode,
    language: Languages.PYTHON
  });
  console.log(result); //{ verdict: 'AC', output: 'Hello From Envoi' }
  if (result.verdict === Verdict.AC)
    //check verdict if accepted (indicating success)
    console.log('success');
};
runCodeExample();
```

## API

### **Envoi(submission) : Promise<[SubmissionVerdict](#SubmissionVerdict)>**

Returns a promise resolving to a SubmissionVerdict

#### Parameters

##### submission

Type: [`Submission`](#Submission)

### **Submission**

An object type representing a submission

#### properties

sourceCode and language are **required**
| Property | Type | description |default |
| ------------- |:-------------:|-------------|--------------|
| sourceCode |`string` | the source code to execute | - |
| language | `string` | the programming language, can use the helper enum [Languages](#Languages) |- |
| input? | `string` | input fed into the program (stdin) | null|
| testCases? | [TestCase[]](#TestCase) | test cases to run against the program | [ ]|
| timeout? | `number` |milliseconds before timing out the program (TLE) | 5000 |

### **SubmissionVerdict**

An object type representing the submission result

#### properties

| Property |         Type          | description                                                                                                                              |
| -------- | :-------------------: | ---------------------------------------------------------------------------------------------------------------------------------------- |
| verdict  | [`Verdict`](#Verdict) | the verdict of the submission -                                                                                                          |
| output   |       `string`        | the output of the program, can also be a description of the compilation error/runtime error or a simple message. i.e "passed test cases" | - |

### **Verdict**

An enum representing the verdict of a submission as strings

#### properties

| Property    |      Value      | description                                                 |
| ----------- | :-------------: | ----------------------------------------------------------- |
| AC          |     `'AC'`      | The source code executed successfully/passed all test cases | - |
| COMPILATION | `'COMPILATION'` | Compilation error                                           | - |
| ERROR       |    `'ERROR'`    | An error during the whole execution process                 |
| MLE         |     `'MLE'`     | Memory limit exceeded (NOT YET IMPLEMENTED)                 |
| PENDING     |   `'PENDING'`   | Submission is pending                                       |
| RUNTIME     |   `'RUNTIME'`   | Runtime error                                               |
| TLE         |     `'TLE'`     | Time limit exceeded (timedout)                              |
| WA          |     `'WA'`      | Wrong answer (Failed test cases)                            |

### **Languages**

An enum representing all the supported languages as string

#### properties

| Property   |     Value      |
| ---------- | :------------: |
| CPP        |    `'c++'`     | - |
| GO         |     `'go'`     |
| JAVA       |    `'java'`    |
| JAVASCRIPT | `'javascript'` |
| PYTHON     |   `'python'`   |

### **TestCase**

An object type representing a submission testcase

#### properties

both properties are **required**
| Property | Type | description |
| ------------- |:-------------:|-------------|
| input |`string` | input for the test case (stdin) |  
| expectedOutput | `string` |expected output for the test case|-

## Running against test cases - JavaScript

```js
const { Envoi, Languages, Verdict } = require('envoijs');
const runCodeExample = async () => {
  const sourceCode = `
  #include <iostream>
  using namespace std;
  int main(){
    int a,b;
    cin>>a>>b;
    cout<<a+b<<endl;
    return 0;
  }`;
  const result = await Envoi({
    sourceCode: sourceCode,
    language: Languages.CPP,
    testCases: [
      {
        input: '2 3',
        expectedOutput: '5'
      },
      {
        input: '21 4',
        expectedOutput: '27' //fail this test case
      }
    ]
  });
  console.log(result); //{ output: 'For input: 21 4\nFound: 25\nExpected:27', verdict: 'WA' }
  if (result.verdict === Verdict.WA) console.log('WRONG ANSWER');
};
runCodeExample();
```

## Running against test cases - TypeScript

```js
import { Envoi, Languages, Verdict, SubmissionVerdict, TestCase } from 'envoijs';
const runCodeExample = async () => {
  const sourceCode = `
    #include <iostream>
    using namespace std;
    int main(){
      int a,b;
      cin>>a>>b;
      cout<<a+b<<endl;
      return 0;
    }`;
  const testCases: TestCase[] = [
    {
      input: '2 3',
      expectedOutput: '5'
    },
    {
      input: '21 4',
      expectedOutput: '27' //fail this test case
    }
  ];
  const result: SubmissionVerdict = await Envoi({
    sourceCode: sourceCode,
    language: Languages.CPP,
    testCases: testCases
  });
  console.log(result); //{ output: 'For input: 21 4\nFound: 25\nExpected:27', verdict: 'WA' }
  if (result.verdict === Verdict.WA) console.log('WRONG ANSWER');
};
runCodeExample();
```

[pr-welcoming-image]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[pr-welcoming-url]: https://github.com/koajs/koa/pull/new
