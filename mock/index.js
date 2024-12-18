// mock/index.js
import menu from './menu';

const Mock = require('mockjs');


Mock.mock(/api\/user\/list/, 'get', {
  'code': 200,
  'data|10': [{
    'id|+1': 1,
    'name': '@name',
    'addr': '@address',
    'role': '管理员',
    'roleId': 'admin'
  }],
  'total': 30,
  'message': '获取数据成功'
});

Mock.mock(/api\/user\/login/, 'post', {
  'code': 200,
  'data': {
    'name': '@name',
    'addr': '@address',
    'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzeXNfdXNlcjoxIiwicm5TdHIiOiJwR2RBSUhibFRSRTJINHF3NWx1Zm1KMHFHSEk3V1VmbCIsInVzZXJJZCI6MX0.xpPtH2i-gtiU9IDFdAAP-P5pTSN1h6qVLH97OmfxUoo',
    'role': 'admin'
  },
  'message': '登录成功'
});


Mock.mock(/api\/user\/logout/, 'post', {});


Mock.mock(/api\/user\/routes/, 'get', menu);

// 可以继续添加更多的mock数据配置
