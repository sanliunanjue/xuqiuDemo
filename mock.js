const seedRequirements = [
  {
    id: 'BR-20260617-001',
    title: '个人养老金开户流程改造',
    domain: '客户体验',
    creator: '王大陆',
    createTime: '2026-06-17 09:30',
    receiver: '李一飞',
    flowTime: '2026-06-17 10:18',
    status: '待承接',
    parts: [
      { id: 'PRD-A1', title: '开户协议落库', owner: '李一飞', time: '10:18', lane: '需求待承接', status: '待承接' },
      { id: 'PRD-A2', title: '账户选择与金额规则', owner: '王产品', time: '10:35', lane: '产品拆解', status: '拆解中' },
      { id: 'PRD-A3', title: '开户结果与凭证', owner: '房产品', time: '11:02', lane: '业务审核中', status: '待审核' }
    ]
  },
  {
    id: 'BR-20260617-002',
    title: '亲情账户储蓄罐充值需求说明书',
    domain: '客户体验',
    creator: '王大陆',
    createTime: '2026-06-17 09:42',
    receiver: '王产品',
    flowTime: '2026-06-17 11:03',
    status: '待承接',
    parts: [
      { id: 'PRD-B1', title: '亲情账户充值入口', owner: '王产品', time: '11:03', lane: '需求待承接', status: '待承接' },
      { id: 'PRD-B2', title: '交易结果通知', owner: '陈产品', time: '11:20', lane: '产品拆解', status: '拆解中' },
      { id: 'PRD-B3', title: '充值限额校验', owner: '吴产品', time: '11:45', lane: '已完成', status: '已完成' }
    ]
  },
  {
    id: 'BR-20260616-004',
    title: '人脸活体鉴权检测接入',
    domain: '客户体验',
    creator: '运营经理',
    createTime: '2026-06-16 16:10',
    receiver: '赵产品',
    flowTime: '2026-06-17 14:20',
    status: '已完成',
    parts: [
      { id: 'PRD-C1', title: '活体鉴权接入', owner: '赵产品', time: '14:20', lane: '需求待承接', status: '已完成' },
      { id: 'PRD-C2', title: '人脸采集引导', owner: '周开发', time: '15:10', lane: '产品拆解', status: '已完成' },
      { id: 'PRD-C3', title: '鉴权结果回调', owner: '李一飞', time: '16:30', lane: '已完成', status: '已完成' }
    ]
  },
  {
    id: 'BR-20260615-006',
    title: '交易限额规则灰度发布',
    domain: '风控合规',
    creator: '风控经理',
    createTime: '2026-06-15 15:20',
    receiver: '产品3',
    flowTime: '2026-06-16 17:20',
    status: '产品拒绝',
    rejectReason: '业务需求不合理，且信息缺失',
    parts: [
      { id: 'PRD-D1', title: '限额规则配置', owner: '产品3', time: '17:20', lane: '需求待承接', status: '退回业务补充' },
      { id: 'PRD-D2', title: '灰度名单导入', owner: '产品3', time: '17:22', lane: '产品拆解', status: '退回业务补充' },
      { id: 'PRD-D3', title: '规则生效通知', owner: '产品3', time: '17:25', lane: '业务审核中', status: '退回业务补充' }
    ]
  }
];

const seedPoolBoard = {
  business: [
    {
      id: 'biz-1',
      requirementId: 'BR-20260617-001',
      title: '个人养老金开户流程改造',
      creator: '夏彤',
      createTime: '2026-10-10 12:00',
      status: null,
      children: [
        { tag: '核心链路', tagClass: 'red', title: '开户协议落库', label: '产品需求1' },
        { tag: '客户体验', tagClass: 'blue', title: '账户选择与金额规则', label: '产品需求2' },
        { tag: '用户增长', tagClass: 'orange', title: '开户结果与凭证', label: '产品需求3' }
      ]
    },
    {
      id: 'biz-2',
      requirementId: 'BR-20260617-002',
      title: '个人结售汇产品升级业务需求',
      creator: '夏彤',
      createTime: '2026-10-10 12:00',
      status: null,
      children: [
        { tag: '客户体验', tagClass: 'blue', title: '亲情账户充值入口', label: '产品需求1' },
        { tag: '用户增长', tagClass: 'orange', title: '交易结果通知', label: '产品需求2' },
        { tag: '核心链路', tagClass: 'red', title: '充值限额校验', label: '产品需求3' }
      ]
    },
    {
      id: 'biz-3',
      requirementId: 'BR-20260615-006',
      title: '个人结售汇产品升级业务需求',
      creator: '夏彤',
      createTime: '2026-10-10 12:00',
      status: '已退回',
      children: [
        { tag: '核心链路', tagClass: 'red', title: '限额规则配置', label: '产品需求1' },
        { tag: '客户体验', tagClass: 'blue', title: '灰度名单导入', label: '产品需求2' },
        { tag: '用户增长', tagClass: 'orange', title: '规则生效通知', label: '产品需求3' }
      ]
    },
    {
      id: 'biz-4',
      requirementId: 'BR-20260616-004',
      title: '手机银行转账限额规则优化',
      creator: '夏彤',
      createTime: '2026-10-09 16:30',
      status: null,
      children: [
        { tag: '核心链路', tagClass: 'red', title: '活体鉴权接入', label: '产品需求1' },
        { tag: '客户体验', tagClass: 'blue', title: '人脸采集引导', label: '产品需求2' },
        { tag: '用户增长', tagClass: 'orange', title: '鉴权结果回调', label: '产品需求3' }
      ]
    },
    {
      id: 'biz-5',
      requirementId: 'BR-20260614-003',
      title: '全渠道智能客服平台接入升级',
      creator: '夏彤',
      createTime: '2026-10-08 11:00',
      status: null,
      children: [
        { tag: '用户增长', tagClass: 'orange', title: '会话路由统一', label: '产品需求1' }
      ]
    }
  ],
  tasks: [
    { id: 'B1001-001', lane: '需求待承接', title: '开户协议落库', domain: '客户体验', domainTone: 'blue', relation: '个人养老金开户流程改造', requirementId: 'BR-20260617-001', person: null, timeLabel: null },
    { id: 'B1001-002', lane: '产品拆解', title: '账户选择与金额规则', domain: '客户体验', domainTone: 'blue', relation: '个人养老金开户流程改造', requirementId: 'BR-20260617-001', person: '王产品', timeLabel: '承接于 2026-06-17 10:35' },
    { id: 'B1001-003', lane: '业务审核中', title: '开户结果与凭证', domain: '用户增长', domainTone: 'orange', relation: '个人养老金开户流程改造', requirementId: 'BR-20260617-001', person: '房产品', timeLabel: '提交于 2026-06-17 11:02' },
    { id: 'B1002-001', lane: '需求待承接', title: '亲情账户充值入口', domain: '客户体验', domainTone: 'blue', relation: '亲情账户储蓄罐充值需求说明书', requirementId: 'BR-20260617-002', person: null, timeLabel: null },
    { id: 'B1002-002', lane: '产品拆解', title: '交易结果通知', domain: '用户增长', domainTone: 'orange', relation: '亲情账户储蓄罐充值需求说明书', requirementId: 'BR-20260617-002', person: '陈产品', timeLabel: '承接于 2026-06-17 11:20' },
    { id: 'B1002-003', lane: '已完成', title: '充值限额校验', domain: '核心链路', domainTone: 'red', relation: '亲情账户储蓄罐充值需求说明书', requirementId: 'BR-20260617-002', person: '吴产品', timeLabel: '完成于 2026-06-17 11:45' }
  ]
};

const seedConversations = [
  { id: 'chat-business-1', group: '业务需求', title: '个人养老金开户流程改造', tag: '客户体验', status: '待承接', lastOpen: '2026-09-09', activeRequirementId: 'BR-20260617-001' },
  { id: 'chat-business-2', group: '业务需求', title: '亲情账户储蓄罐充值需求说明书', tag: '客户体验', status: '待承接', lastOpen: '2026-09-09', activeRequirementId: 'BR-20260617-002' },
  { id: 'chat-business-3', group: '业务需求', title: '交易限额规则灰度发布', tag: '风控合规', status: '产品拒绝', lastOpen: '2026-09-09', activeRequirementId: 'BR-20260615-006' },
  { id: 'chat-product-1', group: '产品需求', title: '开户协议落库', tag: '客户体验', status: '已完成', lastOpen: '2026-09-09', activeRequirementId: 'BR-20260617-001' }
];

const documentSections = [
  { title: '1. 文档说明', body: '本文档为银行 APP 线上存款与个人养老金开户改造的产品需求说明书，用于明确功能业务流程、交互规则、数据规范、安全限制及异常处理逻辑。' },
  { title: '1.1 文档目的', body: '帮助业务、产品、研发、测试对需求范围形成一致理解，并减少 BRD 到 PRD 之间的信息断点。' },
  { title: '1.2 适用范围', body: '适用于银行移动端 APP 个人养老金开户、协议落库、资金账户选择、交易结果反馈等业务场景。' },
  { title: '1.3 角色受众', body: '产品、UI 设计师、前端开发、后端开发、测试工程师、运维人员。' },
  { title: '2. 功能背景与目标', body: '现有 APP 仅支持余额查询、转账、理财购买功能，线上自主办理能力不足。本需求希望提升用户体验，降低线下网点服务压力。' },
  { title: '3. 开户协议落库', body: '用户完成协议确认后，系统需将协议版本、签署时间、渠道、设备信息和用户标识同步落库，并支持后续查询。' },
  { title: '4. 亲情账户储蓄罐充值需求', body: '支持选择亲情账户、输入充值金额、校验限额规则，并在交易成功后更新账户余额与交易凭证。' }
];

const assetStats = [
  { id: 'business-asset', label: '业务资产', count: 1286, tone: 'blue', glyph: 'biz' },
  { id: 'product-asset', label: '产品资产', count: 964, tone: 'green', glyph: 'prod' },
  { id: 'business-function', label: '业务功能', count: 438, tone: 'purple', glyph: 'func' }
];

const seedAssetResults = [
  { id: 'a1', type: 'business-asset', name: '个人养老金开户流程', code: 'BA-PNSA', desc: '覆盖协议确认、账户选择与开户结果凭证的完整业务资产。', tag: '业务资产', owner: '王大陆', framework: 'Spring Boot', mine: true },
  { id: 'a2', type: 'business-asset', name: '亲情账户储蓄罐充值', code: 'BA-FASA', desc: '亲情账户充值、限额校验与交易凭证生成的业务资产包。', tag: '业务资产', owner: '王建国', framework: 'Dubbo', mine: false },
  { id: 'a3', type: 'business-asset', name: '托管手机应用服务', code: 'BA-TRMA', desc: '面向手机银行托管场景的核心业务资产，承载账户与交易能力。', tag: '业务资产', owner: '陈静', framework: 'Spring Boot', mine: true },
  { id: 'a4', type: 'business-asset', name: '对公转账凭证回单', code: 'BA-CTVS', desc: '对公转账凭证回单下载与电子签章相关业务资产。', tag: '业务资产', owner: '陈产品', framework: 'Spring Boot', mine: false },
  { id: 'a5', type: 'business-asset', name: '交易限额规则灰度', code: 'BA-TLRE', desc: '交易限额规则配置、灰度发布与名单导入业务资产。', tag: '业务资产', owner: '风控经理', framework: 'Spring Boot', mine: false },
  { id: 'a6', type: 'business-asset', name: '营销中心发券链路', code: 'BA-MCCS', desc: '营销活动发券、核销与风控链路相关业务资产。', tag: '业务资产', owner: '吴产品', framework: 'MyBatis', mine: false },
  { id: 'a7', type: 'business-asset', name: '全渠道智能客服平台', code: 'BA-AICS', desc: '智能客服平台接入升级，统一会话路由与知识库调用。', tag: '业务资产', owner: '刘业务', framework: 'Dubbo', mine: false },
  { id: 'a8', type: 'business-asset', name: '人脸活体鉴权接入', code: 'BA-FACE', desc: '活体检测与鉴权组件接入，支持大额转账风控拦截。', tag: '业务资产', owner: '周开发', framework: 'Spring Boot', mine: false },
  { id: 'a9', type: 'product-asset', name: '开户协议落库', code: 'PA-AGRT', desc: '协议版本管理、签署记录落库与查询的产品资产。', tag: '产品资产', owner: '李一飞', framework: 'Spring Boot', mine: false },
  { id: 'a10', type: 'product-asset', name: '账户选择与金额规则', code: 'PA-ACCT', desc: '开户账户选择、金额规则校验相关产品设计资产。', tag: '产品资产', owner: '王产品', framework: 'React', mine: false },
  { id: 'a11', type: 'product-asset', name: '开户结果与凭证', code: 'PA-VOUC', desc: '开户结果页展示、凭证生成与回执处理产品资产。', tag: '产品资产', owner: '房产品', framework: 'Vue', mine: false },
  { id: 'a12', type: 'product-asset', name: '应用开发平台网关', code: 'PA-APGW', desc: '统一接入网关前置子系统的产品能力资产。', tag: '产品资产', owner: '王大陆', framework: 'Spring Boot', mine: true },
  { id: 'a13', type: 'product-asset', name: '应用开发平台前端', code: 'PA-APFE', desc: '研发平台前端子系统，提供可视化配置与发布能力。', tag: '产品资产', owner: '李一飞', framework: 'React', mine: false },
  { id: 'a14', type: 'product-asset', name: '远程服务应用服务', code: 'PA-RSAS', desc: '对接远程银行服务编排的产品资产定义。', tag: '产品资产', owner: '赵敏', framework: 'Dubbo', mine: false },
  { id: 'a15', type: 'product-asset', name: '手机银行协议中心', code: 'PA-MBAC', desc: '协议模板、签署流程与版本管理产品资产。', tag: '产品资产', owner: '王大陆', framework: 'Spring Boot', mine: true },
  { id: 'a16', type: 'business-function', name: '账户查询', code: 'BF-ACCT-QRY', desc: '提供账户余额、明细与状态查询的标准业务功能。', tag: '业务功能', owner: '陈静', framework: 'Dubbo', mine: true },
  { id: 'a17', type: 'business-function', name: '协议签署', code: 'BF-AGRT-SIGN', desc: '支持协议模板渲染、电子签章与签署结果回写。', tag: '业务功能', owner: '李一飞', framework: 'Spring Boot', mine: false },
  { id: 'a18', type: 'business-function', name: '限额校验', code: 'BF-LIMIT', desc: '统一限额规则校验与灰度名单匹配功能。', tag: '业务功能', owner: '风控经理', framework: 'Spring Boot', mine: false },
  { id: 'a19', type: 'business-function', name: '开户协议未确认校验', code: 'BF-E001', desc: '用户未完成协议确认即提交开户申请时的拦截功能。', tag: '业务功能', owner: '赵敏', framework: 'Spring Boot', mine: false },
  { id: 'a20', type: 'business-function', name: '交易结果通知', code: 'BF-NOTIFY', desc: '充值、转账完成后向用户推送交易结果通知。', tag: '业务功能', owner: '王产品', framework: 'Dubbo', mine: false }
];

const seedDomainMatrix = [
  {
    id: 'l0-channel',
    label: '渠道管理',
    domains: ['客服', '对客线下渠道管理', '个人对客线上渠道管理', '企业对客线上渠道管理', '同业对客线上渠道管理', '内部工作渠道管理']
  },
  {
    id: 'l0-product',
    label: '产品服务',
    domains: [
      '个人存款', '对公存款', '个人贷款', '小微贷款', '企业贷款', '信用卡', '国内贸易融资', '国际结算', '票据业务', '保函业务', '投资理财', '基金代销', '保险代销', '贵金属', '外汇买卖',
      '代理政府结算', '代理收付', '行业生态', '现金管理', '托管业务', '供应链金融', '资产托管', '债券承销', '投行顾问', '金融租赁', '票据贴现', '其他产品服务'
    ]
  },
  {
    id: 'l0-marketing',
    label: '客户与市场营销管理',
    domains: ['客户体验管理', '产品管理', '合作伙伴管理', '客户管理', '个人营销管理', '小微营销管理', '企业营销管理', '同业营销管理']
  },
  {
    id: 'l0-support',
    label: '业务支撑',
    domains: ['战略管理', '股权管理', '品牌管理', '党建纪检', '法律法务', '采购管理', 'IT管理', '数据资产管理', '办公管理', '后勤保卫管理', '人力资源管理']
  },
  {
    id: 'l0-ops',
    label: '运营管理',
    domains: ['机构管理', '用户及权限管理', '清算管理', '业务运营管理', '集中运营服务']
  },
  {
    id: 'l0-risk',
    label: '风险与合规管理',
    domains: ['信用风险管理', '流动性风险管理', '市场风险管理', '业务连续性管理', '操作风险管理', '关联交易管理', '声誉风险管理', '内部审计', '不良资产管理', '内控与合规管理', '反洗钱与反欺诈']
  },
  {
    id: 'l0-report',
    label: '报告与决策',
    domains: ['财务与税务管理', '会计核算', '预算与考核管理', '管理会计', '对外报告', '资产负债管理', '资本管理', '定价管理']
  }
];

const seedDomainDetails = {
  'l0-channel:客服': {
    domain: '客服',
    l0Id: 'l0-channel',
    valueStream: '默认价值流(未归档)',
    topics: [
      { id: 'CSVC_1', name: '客服坐席管理', desc: '暂无业务描述', functions: [] },
      { id: 'CSVC_5', name: '公共主题', desc: '暂无业务描述', functions: [] },
      { id: 'CSVC_2', name: '智能客服业务', desc: '暂无业务描述', functions: [] },
      { id: 'CSVC_3', name: '客服外呼业务', desc: '暂无业务描述', functions: [] },
      { id: 'CSVC_4', name: '客服质检管理', desc: '暂无业务描述', functions: [] },
      { id: 'CSVC_6', name: '客服呼入业务', desc: '暂无业务描述', functions: [] },
      { id: 'CSVC_7', name: '视频客服业务', desc: '暂无业务描述', functions: [] },
      { id: 'CSVC_8', name: '话务管理', desc: '暂无业务描述', functions: [] },
      { id: 'CSVC_9', name: '112', desc: '暂无业务描述', functions: [] },
      { id: 'CSVC_10', name: '客服队列管理', desc: '暂无业务描述', functions: [] }
    ]
  }
};

const initialLogs = [
  { title: '业务需求提出', time: '2026-06-17 09:30', text: '王大陆提交个人养老金开户流程改造需求，AI 创建业务需求说明书。', artifact: '业务需求说明书' },
  { title: 'AI 推荐拆分', time: '2026-06-17 10:12', text: 'AI 建议拆分为开户协议落库、账户与金额规则、开户结果与凭证三个产品需求。', artifact: null },
  { title: '派发承接', time: '2026-06-17 10:18', text: '业务经理通过 @李一飞 派发开户协议落库任务。', artifact: '承接卡片' }
];

const seedAssetTagHierarchy = {
  a1: { valueChain: '个人金融价值链', domain: '核心账务领域', activity: '存款与账户管理' },
  a2: { valueChain: '个人金融价值链', domain: '核心账务领域', activity: '充值与转账' },
  a3: { valueChain: '个人金融价值链', domain: '电子渠道领域', activity: '手机银行运营' },
  a4: { valueChain: '对公与同业价值链', domain: '支付结算领域', activity: '对公转账服务' },
  a5: { valueChain: '全面风险与合规价值链', domain: '操作风险领域', activity: '限额与灰度管控' },
  a6: { valueChain: '客户与市场营销价值链', domain: '营销管理领域', activity: '发券与核销' },
  a7: { valueChain: '个人金融价值链', domain: '电子渠道领域', activity: '智能客服接入' },
  a8: { valueChain: '全面风险与合规价值链', domain: '反欺诈领域', activity: '活体鉴权接入' },
  a9: { valueChain: '个人金融价值链', domain: '核心账务领域', activity: '存款与账户管理' },
  a10: { valueChain: '个人金融价值链', domain: '核心账务领域', activity: '存款与账户管理' },
  a11: { valueChain: '个人金融价值链', domain: '核心账务领域', activity: '存款与账户管理' },
  a12: { valueChain: '科技赋能价值链', domain: '应用开发平台领域', activity: '网关接入管理' },
  a13: { valueChain: '科技赋能价值链', domain: '应用开发平台领域', activity: '前端配置发布' },
  a14: { valueChain: '个人金融价值链', domain: '电子渠道领域', activity: '远程服务编排' },
  a15: { valueChain: '个人金融价值链', domain: '电子渠道领域', activity: '手机银行运营' },
  a16: { valueChain: '个人金融价值链', domain: '核心账务领域', activity: '存款与账户管理' },
  a17: { valueChain: '个人金融价值链', domain: '电子渠道领域', activity: '手机银行运营' },
  a18: { valueChain: '全面风险与合规价值链', domain: '操作风险领域', activity: '限额与灰度管控' },
  a19: { valueChain: '个人金融价值链', domain: '核心账务领域', activity: '存款与账户管理' },
  a20: { valueChain: '个人金融价值链', domain: '核心账务领域', activity: '充值与转账' }
};

const seedAssetDocumentSections = {};

const seedAssetDetailMeta = {
  a1: { domain: '个人存款', valueStream: '开户与账户管理', version: 'v2.1.0', createTime: '2025-03-12', updateTime: '2026-05-08', status: '已发布', completeness: '已完备', department: '零售金融部门' },
  a2: { domain: '个人存款', valueStream: '充值与转账', version: 'v1.4.2', createTime: '2025-06-18', updateTime: '2026-04-22', status: '已发布', completeness: '已完备', department: '零售金融部门' },
  a9: { domain: '个人存款', valueStream: '开户与账户管理', version: 'v1.0.3', createTime: '2025-08-01', updateTime: '2026-03-15', status: '已发布', completeness: '已完备', department: '小微企业金融部门' }
};

const seedLineageRoot = {
  id: 'root-bank',
  label: '银行科技资产架构',
  type: '根节点',
  status: 'normal',
  children: [
    {
      id: 'vc-retail', label: '个人金融价值链', type: '价值链', status: 'normal',
      children: [
        {
          id: 'domain-core-acc', label: '核心账务领域', type: '领域', status: 'normal',
          children: [
            {
              id: 'activity-deposit', label: '存款与账户管理', type: '主题活动', status: 'normal',
              children: [
                { id: 'func-acc-open', label: '个人一类户开立', type: '业务功能', status: 'normal' },
                { id: 'func-pnsa', label: '个人养老金开户流程', type: '业务功能', status: 'normal', highlight: true },
                { id: 'func-acc-freeze', label: '账户单边冻结', type: '业务功能', status: 'warning' },
                { id: 'func-acc-balance', label: '核心余额高频查询', type: '业务功能', status: 'normal' }
              ]
            },
            {
              id: 'activity-eod', label: '日终批处理', type: '主题活动', status: 'normal',
              children: [
                { id: 'func-batch-interest', label: '批量结息与记账', type: '业务功能', status: 'normal' },
                { id: 'func-batch-gl', label: '总账分账核对', type: '业务功能', status: 'offline' }
              ]
            }
          ]
        },
        {
          id: 'domain-channel', label: '电子渠道领域', type: '领域', status: 'normal',
          children: [
            {
              id: 'activity-mobile-ops', label: '手机银行运营', type: '主题活动', status: 'normal',
              children: [
                { id: 'func-auth-login', label: '统一身份认证与登录', type: '业务功能', status: 'normal' },
                { id: 'func-agrt', label: '开户协议落库', type: '业务功能', status: 'normal' },
                { id: 'func-msg-push', label: '动账通知触达', type: '业务功能', status: 'normal' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'vc-risk-comp', label: '全面风险与合规价值链', type: '价值链', status: 'normal',
      children: [
        {
          id: 'domain-credit-risk', label: '信贷风控领域', type: '领域', status: 'normal',
          children: [
            {
              id: 'activity-pre-loan', label: '贷前反欺诈审查', type: '主题活动', status: 'normal',
              children: [
                { id: 'func-pboc-query', label: '人行二代征信数据调用', type: '业务功能', status: 'normal' },
                { id: 'func-graph-rule', label: '关系图谱团伙欺诈识别', type: '业务功能', status: 'normal' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'vc-data', label: '数据资产与洞察价值链', type: '价值链', status: 'normal',
      children: [
        {
          id: 'domain-data-mid', label: '数据中台领域', type: '领域', status: 'normal',
          children: [
            {
              id: 'activity-data-gov', label: '数据治理与质量', type: '主题活动', status: 'normal',
              children: [
                { id: 'func-metadata', label: '元数据管理体系', type: '业务功能', status: 'normal' },
                { id: 'func-lineage', label: '全链路血缘分析', type: '业务功能', status: 'normal' }
              ]
            }
          ]
        }
      ]
    }
  ]
};
