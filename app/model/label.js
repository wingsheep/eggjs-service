'use strict';

const db = require('../db');
module.exports = app => {
  const { TEXT, STRING } = app.Sequelize;
  const Label = db.defineModel(app, 'label', {
    name: {
      type: STRING(20),
      comment: '标签名称',
    },
    alias: {
      type: STRING(15),
      comment: '标签别名',
    },
    description: {
      type: TEXT,
      comment: '标签描述',
    },
  });

  return Label;
};
