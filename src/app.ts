import { ResponseError, Context } from 'umi-request';

const MOCK_HTTP_PREFIX = 'https://alitahaha';
const LOCAL_TOKEN_KEY = 'yourTokenKey';
const MOCK_MESSAGES = {
  '200': '',
};
const middleware = async (ctx: Context, next: any) => {
  // 可以在这写一些请求前做的事情 操作ctx.req
  const token = window.localStorage.getItem(LOCAL_TOKEN_KEY) || '';
  ctx.req.options.headers = {
    ...ctx.req.options.headers,
    'X-AUTH-Token': token,
  };
  if (ctx.req.url === `${MOCK_HTTP_PREFIX}/api/hello`) {
    const { data } = ctx.req.options;
    // mock http
    ctx.res = {
      data: {
        message: MOCK_MESSAGES[data],
        status: data,
        config: {
          url: ctx.req.options.url,
          headers: ctx.req.options.headers,
          data: ctx.req.options.data,
          method: ctx.req.options.method,
        },
      },
      success: true,
    };
  } else {
    await next();
  }

  // 可以在这里对响应数据做一些操作 操作ctx.res
};
export const request = {
  prefix: '',
  method: 'post',
  middlewares: [middleware],
  errorHandler: (error: ResponseError) => {
    // 集中处理错误
    console.log(error);
  },
};
