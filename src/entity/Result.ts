/**
 * 统一返回结果对象
 */
export class Result {
  /**
   * 成功
   * @param data
   * @param message
   */
  static success(data: any, message?: string) {
    return { code: 200, message, date: new Date() , data};
  }
  /**
   * 失败
   * @param data
   * @param message
   */
  static fail(code: number, message?: string) {
    return { code, message, date: new Date() };
  }
}
