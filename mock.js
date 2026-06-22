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
      { id: 'PRD-A1', title: '开户协议落库', owner: '李一飞', time: '10:18', lane: '需求承接', status: '待承接' },
      { id: 'PRD-A2', title: '账户选择与金额规则', owner: '王产品', time: '10:20', lane: '需求承接', status: '待承接' }
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
      { id: 'PRD-B1', title: '亲情账户充值入口', owner: '王产品', time: '11:03', lane: '需求承接', status: '待承接' },
      { id: 'PRD-B2', title: '交易结果通知', owner: '李产品', time: '11:05', lane: '需求承接', status: '待承接' }
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
      { id: 'PRD-C1', title: '活体鉴权接入', owner: '赵产品', time: '14:20', lane: '已完成', status: '已完成' }
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
      { id: 'PRD-D1', title: '限额规则配置', owner: '产品3', time: '17:20', lane: '业务需求', status: '退回业务补充' },
      { id: 'PRD-D2', title: '灰度名单导入', owner: '产品3', time: '17:20', lane: '业务需求', status: '退回业务补充' }
    ]
  }
];

const seedPoolBoard = [
  { id: 'b101', lane: '业务需求', type: 'business', status: '待提交', title: '全渠道智能客服平台接入升级', personLabel: '创建', person: '王建国', time: '06-15 10:30', domain: '核心链路', domainTone: 'blue', requirementId: 'BR-20260617-001' },
  { id: 'b102', lane: '业务需求', type: 'business', status: '已退回', title: '手机银行亲情账户储蓄充值需求', personLabel: '创建', person: '王建国', time: '06-14 15:20', domain: '营销活动', domainTone: 'orange', requirementId: 'BR-20260617-002' },
  { id: 'p102', lane: '业务需求', type: 'product', status: '已退回', title: '营销中心发券风控链路重构', personLabel: '创建', person: '王建国', time: '06-16 09:15', relation: '个人养老金开户流程改造', domain: '营销活动', domainTone: 'orange', requirementId: 'BR-20260617-001' },
  { id: 'p201', lane: '需求承接', type: 'product', status: '待承接', title: '对公转账凭证回单下载支持', personLabel: '承接', person: '房产品', time: '06-14 10:00', relation: '个人养老金开户流程改造', domain: '基础架构', domainTone: 'purple', requirementId: 'BR-20260617-001' },
  { id: 'p204', lane: '产品拆解', type: 'product', status: '分析中', title: '亲情账户储蓄充值需求说明书', personLabel: '承接', person: '陈产品', time: '06-13 16:20', relation: '个人养老金开户流程改造', domain: '核心链路', domainTone: 'blue', requirementId: 'BR-20260617-002' },
  { id: 'p202', lane: '产品拆解', type: 'product', status: '分析中', title: '大额转账人脸风控拦截组件', personLabel: '承接', person: '吴产品', time: '06-14 15:45', relation: '个人养老金开户流程改造', domain: '基础架构', domainTone: 'purple', requirementId: 'BR-20260617-001' },
  { id: 'p205', lane: '业务审核', type: 'product', status: '待审核', title: '开户协议落库及电子签章节点确认', personLabel: '提交', person: '刘业务', time: '06-14 09:00', relation: '个人养老金开户流程改造', domain: '核心链路', domainTone: 'blue', requirementId: 'BR-20260617-001' },
  { id: 'p206', lane: '已完成', type: 'product', status: '已完成', title: '人脸活体检测鉴权组件接入', personLabel: '完成', person: '周开发', time: '06-13 18:30', relation: '个人养老金开户流程改造', domain: '用户增长', domainTone: 'green', requirementId: 'BR-20260616-004' }
];

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

const assetFrameworkOptions = ['全部框架类型', 'Spring Boot', 'Dubbo', 'MyBatis', 'Vue', 'React'];

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

const initialLogs = [
  { title: '业务需求提出', time: '2026-06-17 09:30', text: '王大陆提交个人养老金开户流程改造需求，AI 创建业务需求说明书。', artifact: '业务需求说明书' },
  { title: 'AI 推荐拆分', time: '2026-06-17 10:12', text: 'AI 建议拆分为开户协议落库、账户与金额规则、开户结果与凭证三个产品需求。', artifact: null },
  { title: '派发承接', time: '2026-06-17 10:18', text: '业务经理通过 @李一飞 派发开户协议落库任务。', artifact: '承接卡片' }
];
