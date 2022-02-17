/**
 * 返回报文格式
 * @date:2022-02-16
 */
export interface ResponseInterface {
  code: number;
  msg: string;
  token?: string;
  data?: object;
}
