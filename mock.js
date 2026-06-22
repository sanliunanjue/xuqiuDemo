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

const initialLogs = [
  { title: '业务需求提出', time: '2026-06-17 09:30', text: '王大陆提交个人养老金开户流程改造需求，AI 创建业务需求说明书。', artifact: '业务需求说明书' },
  { title: 'AI 推荐拆分', time: '2026-06-17 10:12', text: 'AI 建议拆分为开户协议落库、账户与金额规则、开户结果与凭证三个产品需求。', artifact: null },
  { title: '派发承接', time: '2026-06-17 10:18', text: '业务经理通过 @李一飞 派发开户协议落库任务。', artifact: '承接卡片' }
];
