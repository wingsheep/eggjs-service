'use strict';
// app/controller/users.js
const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
  title: {
    required: true,
    type: 'string',
  },
  content: {
    required: true,
    type: 'string',
  },
};

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ArticlesController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const result = await ctx.model.Article.findAll(query);
    ctx.helper.success(ctx, { msg: '文章列表查询成功', code: 200, res: result });
  }

  async show() {
    const ctx = this.ctx;
    const result = await ctx.model.Article.findByPk(ctx.params.id);
    ctx.helper.success(ctx, { msg: '文章详情查询成功', res: result });
  }

  async create() {
    const ctx = this.ctx;
    const params = {
      ...ctx.request.body,
    };
    ctx.validate(createRule, params);
    const result = await ctx.service.article.create(params);
    // const result1 = await ctx.service.article.setArtitleLabel({
    //   article_id: ctx.request.body.id,
    //   sort_id: ctx.request.body.sort_id,
    // });
    ctx.helper.success(ctx, { msg: '创建标签成功', res: result });
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.label.update(ctx.params.id, ctx.request.body);
    if (!result) {
      ctx.helper.fail(ctx, { msg: '更新标签失败', res: result });
      return;
    }
    ctx.helper.success(ctx, { msg: '更新标签成功', res: result });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const result = await ctx.model.Label.findByPk(id);
    if (!result) {
      ctx.helper.fail(ctx, { msg: '删除标签失败', res: result });
      return;
    }
    await result.destroy();
    ctx.helper.success(ctx, { msg: '删除标签成功', res: result });
  }
}

module.exports = ArticlesController;