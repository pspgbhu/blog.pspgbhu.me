const { readFileAndParse, cachePost } = require('../utils');

/**
 * 获取单篇文章的信息
 * @param {String} title 文件名，不用包含后缀
 */
module.exports = async (slug) => {
  // 先看本地缓存中是否有对应的文章
  if (global.postsCache.has(slug)) {
    console.log('[Controller --> getOnePost]: ', '从缓存中获取数据');
    return global.postsCache.get(slug);
  }

  const info = await readFileAndParse(slug);

  // 缓存在本地
  if (info) {
    cachePost({ slug, info });
  }

  return info;
};
