'use strict';
/**
 * Copyright (c) 2016 Baidu.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file httpClientExt类
 * @author baiduAip
 */

const HttpClient = require('./httpClient');
const code = require('../const/code');
const HttpHeader = require('../const/httpHeader');
const CONTENT_TYPE_JSON = 'application/json';

/**
 * HttpClientExt类
 * 图像审核某个接口调用需要json的Content-type,请求body为json字符串
 *
 * @class
 * @extends HttpClientExt
 * @constructor
 */
class HttpClientExt extends HttpClient {
    constructor() {
        super();
    }
    postWithInfo(requestInfo) {
        let body = this.createBody(requestInfo.params);
        let options = {
            method: requestInfo.method,
            url: requestInfo.getUrl(),
            headers: requestInfo.headers,
            encoding: null,
            timeout: HttpClient.DEFAULT_TIMEOUT,
            body: body
        };
        this.req(options);
        return this;
    }
    createBody(param) {
        let body = JSON.stringify(param);
        return body;
    }
}

HttpClientExt.EVENT_DATA = HttpClient.EVENT_DATA;

module.exports = HttpClientExt;