import CppController from './cpp/CppController';
import JavaController from './java/JavaController';
import PythonController from './python/PythonController';
import Languages from '../interfaces/Languages';

class LanguageFactory {
  constructor(language: string) {
    switch (language) {
      case Languages.CPP:
        return new CppController();
      case Languages.JAVA:
        return new JavaController();
      case Languages.PYTHON:
        return new PythonController();
      default:
        throw new Error('Language not supported');
    }
  }
}

export default LanguageFactory;
