/*
 * @Author: your name
 * @Date: 2021-07-12 09:33:04
 * @LastEditTime: 2021-07-14 17:43:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/http/index.js
 */

import { HttpClient } from './httpClient';
import { responseMiddleware, noticeMiddleware } from './middleware';

const http = new HttpClient();

http.use(responseMiddleware);
http.use(noticeMiddleware);

export default http;
