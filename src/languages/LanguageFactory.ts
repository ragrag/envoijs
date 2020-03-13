import CppHandler from './cpp/CppHandler';
import JavaHandler from './java/JavaHandler';

class LanguageFactory {
  constructor(language: string) {
    switch (language) {
      case 'c++':
        return new CppHandler();
      case 'java':
        return new JavaHandler();
      default:
        throw new Error('Language not supported');
    }
  }
}

export default LanguageFactory;
