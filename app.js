const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const serve = require('koa-static');
const index = require('./routes');
const { cacheSomeData } = require('./utils');

const app = new Koa();

global.cache = {
  postsCache: new Map(),
  overviewsCache: new Set(),
};

// 异步缓存各种数据
cacheSomeData();

setTimeout(() => {
  console.log('[global.cache.postsCache]:', global.cache.postsCache.keys());
}, 1000);

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
}));
app.use(json());
app.use(logger());

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

/**
 * 非生产环境下，.dev 中的静态资源会覆盖 public 中的资源
 */
if (process.env.NODE_ENV !== 'production') {
  app.use(serve(path.join(__dirname, '.dev')));
}

app.use(serve(path.join(__dirname, 'public')));

app.use(views(path.join(__dirname, 'views'), {
  map: {
    html: 'ejs',
  },
  extension: 'ejs',
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
