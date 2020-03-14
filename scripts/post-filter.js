'use strict';
// 生成前过滤文章
hexo.extend.filter.register('before_generate', function () {
  const all_posts = this.locals.get('posts');
  // 找到所有 hide: true 的文章
  const hide_posts = this.locals.get('posts').find({ 'hide': true });
  // 过滤 hide 文章
  const normal_posts = this.locals.get('posts').filter(post => !post['hide']);

  this._bindLocals();

  this.locals.set('all_posts', all_posts);
  this.locals.set('hide_posts', hide_posts);
  this.locals.set('posts', normal_posts);
});

const original_post_generator = hexo.extend.generator.get('post');

hexo.extend.generator.register('post', function (locals) {
  // 发送时需要把过滤的页面也加入
  return original_post_generator.bind(this)({
    posts: new locals.posts.constructor(
      locals.posts.data.concat(locals.hide_posts.data),
    ),
  });
});
