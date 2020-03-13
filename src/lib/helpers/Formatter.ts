export default class Formatter {
  public static removeLineBreaks(s: string) {
    return s.replace(/(\r\n|\n|\r)/gm, '');
  }
}
