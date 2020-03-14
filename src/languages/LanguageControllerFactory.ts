import CppHandler from './cpp/CppController';
import JavaHandler from './java/JavaController';
import Languages from '../interfaces/Languages';

class LanguageFactory {
  constructor(language: string) {
    switch (language) {
      case Languages.CPP:
        return new CppHandler();
      case Languages.JAVA:
        return new JavaHandler();
      default:
        throw new Error('Language not supported');
    }
  }
}

export default LanguageFactory;
