(function () {
  'use strict';

  const LANES = ['业务需求', '需求待承接', '产品拆解', '业务审核中', '已完成'];
  const POOL_LANE_META = {
    业务需求: { subtitle: '' },
    需求待承接: { subtitle: '' },
    产品拆解: { subtitle: '' },
    业务审核中: { subtitle: '' },
    已完成: { subtitle: '' }
  };
  const PRODUCT_SESSION_ID = 'chat-product-1';
  const LOGO_URL = 'assets/logo.png';
  const AVATARS = {
    business: 'assets/avatars/member.png',
    product: 'assets/avatars/avatar-product.png',
    assistant: 'assets/avatars/avatar-assistant.png'
  };

  const ICONS = {
    home: ['M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
    workbench: ['M3 5h18', 'M7 9h6', 'M7 16h10', 'M3 12h18', 'M3 19h18'],
    chat: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
    workflow: ['M6 3v12', 'M18 9v6', 'M6 21a3 3 0 0 1 0-6', 'M18 9a3 3 0 0 1 0-6', 'M6 15h12'],
    log: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 13h8', 'M10 17h6'],
    caret: ['M6 9l6 6 6-6'],
    search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.3-4.3'],
    assetSearch: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M11 18h.01', 'M11 14h.01', 'M11 10h.01'],
    assetMatrix: ['M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', 'M3.3 7l8.7 5 8.7-5', 'M12 22V12'],
    edit: ['M12 20h9', 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z'],
    send: ['M22 2 11 13', 'M22 2 15 22l-4-9-9-4Z'],
    document: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 13h8', 'M10 17h5'],
    eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
    copy: ['M16 16H6a2 2 0 0 1-2-2V6', 'M8 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z'],
    download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
    upload: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v13'],
    share: ['M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7', 'M16 6l-4-4-4 4', 'M12 2v13'],
    user: ['M20 21a8 8 0 1 0-16 0', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8'],
    assignee: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
    calendar: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'],
    layoutRows: ['M3 6h18', 'M3 12h18', 'M3 18h18'],
    layoutCols: ['M8 6v12', 'M16 6v12', 'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z'],
    tag: ['M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 0 1 0 2.828l-7 7a2 2 0 0 1-2.828 0l-7-7A1.994 1.994 0 0 1 3 12V7a4 4 0 0 1 4-4z'],
    close: ['M18 6 6 18', 'M6 6l12 12']
  };

  const AGENT_STEPS = [
    { name: '需求分析', text: '识别诉求与范围', done: true },
    { name: '需求收敛', text: '确定职责边界', done: true },
    { name: '需求澄清', text: '消除歧义', done: true },
    { name: '合规分析', text: '合规校验', done: false },
    { name: '文档校验', text: '完整性检查', done: false }
  ];

  const PROGRESS_STAGES = ['业务需求撰写', '需求待承接', '产品拆解', '审核产品文档', '完成'];
  const LOG_ROWS = Array.from({ length: 8 }, () => ({ time: '2026-10-10 12:23', content: '派发亲情账户储蓄罐充值需求产品需求', actor: '王大陆' }));

  const state = {
    page: 'home',
    tab: 'chat',
    activeDocMode: 'business',
    activeConversationId: 'chat-business-1',
    expandedPoolLane: null,
    poolView: 'vertical',
    poolFilter: 'all',
    poolFilterOpen: false,
    poolKeyword: '',
    poolBoard: JSON.parse(JSON.stringify(seedPoolBoard)),
    assetKeyword: '',
    assetShowResults: false,
    assetActiveType: 'business-asset',
    assetScope: 'all',
    assetFramework: '全部框架类型',
    assetFrameworkOpen: false,
    assetPage: 1,
    assetPageSize: 15,
    matrixExpandedDomain: null,
    assetDomainKey: null,
    assetTopicId: null,
    assetDetailKeyword: '',
    assetDetailId: null,
    assetDetailTab: 'detail',
    lineageKeyword: '',
    homePrompt: '我想做一个个人养老金开户流程改造，需要开户协议落库、账户选择和结果凭证。',
    draft: '',
    mentionOpen: false,
    showProgress: false,
    currentRole: 'business',
    roleMenuOpen: false,
    docOutlineCollapsed: false,
    agentExpanded: false,
    collapsedGroups: { 业务需求: false, 产品需求: false },
    requirements: JSON.parse(JSON.stringify(seedRequirements)),
    conversations: JSON.parse(JSON.stringify(seedConversations)),
    logs: [...initialLogs],
    productSessionNoticeVisible: false,
    productSessionAvailable: false,
    aiDispatchRecommended: true,
    dispatchCompleted: false,
    reviewPromptVisible: false,
    reviewStickyVisible: false,
    conversationMessages: {
      'chat-business-1': [
        { id: 1, from: 'ai', html: '您是想做存钱的功能吗？' },
        { id: 2, from: 'me', html: '是的' },
        { id: 3, from: 'ai', html: '好的，我来整理需求文档。' }
      ],
      [PRODUCT_SESSION_ID]: []
    }
  };

  function esc(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function cls(list) {
    return list.filter(Boolean).join(' ');
  }

  function icon(name, size = 20, extraClass = '') {
    const paths = (ICONS[name] || []).map((d) => `<path d="${d}"/>`).join('');
    return `<svg class="app-icon ${extraClass}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
  }

  function avatar(role, size = 36, tone = 0) {
    const humanAvatars = [AVATARS.business, AVATARS.product, AVATARS.assistant];
    let src = humanAvatars[tone % humanAvatars.length];
    let alt = '业务成员';
    if (role === 'business') { src = AVATARS.business; alt = '业务成员'; }
    else if (role === 'product') { src = humanAvatars[tone % humanAvatars.length]; alt = '产品经理'; }
    else if (role === 'ai') { src = AVATARS.assistant; alt = 'AI 助手'; }
    else if (role === 'agent') { alt = 'AI 成员'; }
    return `<span class="member-avatar ${role}" style="width:${size}px;height:${size}px"><img src="${src}" alt="${alt}"/></span>`;
  }

  function statusPill(status) {
    const kind = status.includes('拒绝') ? 'reject' : status.includes('完成') ? 'done' : 'wait';
    return `<span class="status ${kind}">${esc(status)}</span>`;
  }

  function poolStatusKind(status) {
    if (status.includes('退回')) return 'reject';
    if (status.includes('完成')) return 'done';
    if (status.includes('审核')) return 'review';
    if (status.includes('分析')) return 'analyze';
    if (status.includes('承接')) return 'accept';
    return 'draft';
  }

  function poolStatusPill(status) {
    return `<span class="pool-status ${poolStatusKind(status)}">${esc(status)}</span>`;
  }

  function hatTone(key) {
    const tones = ['indigo', 'orange', 'emerald', 'sky'];
    let hash = 0;
    for (let i = 0; i < key.length; i += 1) hash = key.charCodeAt(i) + ((hash << 5) - hash);
    return tones[Math.abs(hash) % tones.length];
  }

  function poolPersonIcon(card) {
    return card.type === 'business' ? icon('user', 14) : icon('assignee', 14);
  }

  function activeConversation() {
    return state.conversations.find((c) => c.id === state.activeConversationId);
  }

  function activeRequirement() {
    const chat = activeConversation();
    return state.requirements.find((r) => r.id === chat?.activeRequirementId) || state.requirements[0];
  }

  function activeDocTitle() {
    const chat = activeConversation();
    return state.activeDocMode === 'product' ? (chat?.title || '开户协议落库') : activeRequirement().title;
  }

  function isProductConversation() {
    return activeConversation()?.group === '产品需求';
  }

  function currentRoleLabel() {
    return state.currentRole === 'business' ? '业务经理' : '产品经理';
  }

  function currentRoleAvatar() {
    return state.currentRole === 'business' ? '王' : '产';
  }

  function productSessionTitle() {
    return state.conversations.find((c) => c.id === PRODUCT_SESSION_ID)?.title || '开户协议落库';
  }

  function messages() {
    return state.conversationMessages[state.activeConversationId] ?? [];
  }

  function showProgressProductCard() {
    const req = activeRequirement();
    return state.dispatchCompleted || req.parts.some((part) => part.status !== '待承接');
  }

  function pendingForRole() {
    if (state.currentRole !== 'product' || isProductConversation()) return null;
    const part = activeRequirement().parts.find((p) => p.status === '待承接');
    return part ? { title: part.title } : null;
  }

  function dispatchRecommendationVisible() {
    return state.aiDispatchRecommended && !state.productSessionNoticeVisible;
  }

  function groupedConversations(group) {
    return state.conversations.filter((chat) => chat.group === group && (chat.id !== PRODUCT_SESSION_ID || state.productSessionAvailable));
  }

  function laneClass(lane) {
    return { 业务需求: 'lane-blue', 需求待承接: 'lane-amber', 产品拆解: 'lane-sky', 业务审核中: 'lane-indigo', 已完成: 'lane-emerald' }[lane];
  }

  function partLaneClass(lane) {
    if (lane === '需求待承接' || lane === '需求承接') return 'col-2';
    if (lane === '产品拆解' || lane === '需求拆解') return 'col-3';
    if (lane === '业务审核中' || lane === '业务审核' || lane === '需求审核') return 'col-4';
    if (lane === '已完成') return 'col-5';
    return 'col-2';
  }

  function partColumnX(laneClass) {
    return { 'col-2': 300, 'col-3': 500, 'col-4': 700, 'col-5': 900 }[laneClass] ?? 300;
  }

  function partTimeLabel(part) {
    const req = activeRequirement();
    const prefix = (part.lane === '需求待承接' || part.lane === '需求承接') ? '派发时间' : (part.lane === '产品拆解' || part.lane === '需求拆解') ? '承接时间' : (part.lane === '业务审核中' || part.lane === '业务审核' || part.lane === '需求审核') ? '提交时间' : '完成时间';
    const stamp = part.time?.includes('-') ? part.time : `${req.createTime.slice(0, 10)} ${part.time || '10:00'}`;
    return `${prefix}：${stamp}`;
  }

  function progressBusinessChildren() {
    if (!showProgressProductCard()) return [];
    const req = activeRequirement();
    return req.parts.map((part, index) => ({
      id: part.id,
      tag: index === 0 ? '核心链路' : req.domain,
      tagClass: index === 0 ? 'red' : 'blue',
      partLabel: `产品需求${index + 1}`,
      title: part.title
    }));
  }

  function progressProductCards() {
    if (!showProgressProductCard()) return [];
    return activeRequirement().parts.map((part, index) => ({
      id: part.id,
      title: part.title,
      time: partTimeLabel(part),
      person: part.owner,
      laneClass: partLaneClass(part.lane),
      tone: index
    }));
  }

  function progressColumns() {
    const grouped = new Map();
    for (const card of progressProductCards()) {
      if (!grouped.has(card.laneClass)) grouped.set(card.laneClass, []);
      grouped.get(card.laneClass).push(card);
    }
    return ['col-2', 'col-3', 'col-4', 'col-5']
      .filter((className) => grouped.has(className))
      .map((className) => ({ className, cards: grouped.get(className) }));
  }

  function progressCanvasHeight() {
    const columns = progressColumns();
    const columnDepths = columns.map((column) => column.cards.length);
    const maxDepth = Math.max(1, ...columnDepths, progressBusinessChildren().length);
    return Math.max(520, 180 + maxDepth * 150);
  }

  function progressFlowLines() {
    if (!showProgressProductCard()) return [];
    const req = activeRequirement();
    const columnStacks = new Map();
    const partCount = req.parts.length;
    const startSpacing = partCount > 1 ? 44 : 0;
    const startBaseY = 108;
    const columnTopMap = { 'col-2': 70, 'col-3': 238, 'col-4': 238, 'col-5': 418 };

    return req.parts.map((part, globalIndex) => {
      const laneCls = partLaneClass(part.lane);
      const indexInColumn = columnStacks.get(laneCls) ?? 0;
      columnStacks.set(laneCls, indexInColumn + 1);
      const startY = startBaseY + globalIndex * startSpacing;
      const columnTop = columnTopMap[laneCls] ?? 70;
      const endY = columnTop + indexInColumn * 150 + 72;
      const endX = partColumnX(laneCls);
      const midX = (150 + endX) / 2;
      return `M150 ${startY} C${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
    });
  }

  function allFlowCards() {
    return state.requirements.flatMap((req) => {
      const businessVisible = !req.receiver || req.status.includes('拒绝');
      const businessCard = businessVisible ? [{
        id: `# ${req.id}`,
        type: 'business',
        title: req.title,
        domain: req.domain,
        status: req.status,
        person: req.creator,
        time: req.createTime.slice(5),
        requirementId: req.id
      }] : [];
      const partCards = req.parts.map((part) => ({
        id: `# ${part.id}`,
        type: 'product',
        title: part.title,
        domain: req.domain,
        status: part.status,
        person: part.owner,
        time: part.time,
        requirementId: req.id,
        parentTitle: req.title
      }));
      return [...businessCard, ...partCards];
    });
  }

  function activeRequirementLane(card) {
    const req = state.requirements.find((item) => item.id === card.requirementId);
    const part = req?.parts.find((item) => `# ${item.id}` === card.id);
    return part?.lane || '业务需求';
  }

  function poolBusinessCards() {
    const keyword = state.poolKeyword.trim();
    const mineNames = state.currentRole === 'business' ? ['夏彤', '王建国', '王大陆', '刘业务'] : ['房产品', '陈产品', '吴产品', '周开发', '李一飞', '王产品'];
    return state.poolBoard.business.filter((card) => {
      if (state.poolFilter === 'mine' && !mineNames.includes(card.creator)) return false;
      const haystack = `${card.title}${card.creator}${card.children.map((c) => c.title).join('')}`;
      return !keyword || haystack.includes(keyword);
    });
  }

  function poolTaskCards(lane) {
    const keyword = state.poolKeyword.trim();
    const mineNames = state.currentRole === 'business' ? ['王建国', '王大陆', '刘业务', '王大路'] : ['房产品', '陈产品', '吴产品', '周开发', '李一飞', '王产品', '王大路'];
    return state.poolBoard.tasks.filter((card) => {
      if (card.lane !== lane) return false;
      if (state.poolFilter === 'mine' && card.person && !mineNames.includes(card.person)) return false;
      const haystack = `${card.title}${card.relation || ''}${card.id}${card.person || ''}`;
      return !keyword || haystack.includes(keyword);
    });
  }

  function poolLaneCount(lane) {
    return lane === '业务需求' ? poolBusinessCards().length : poolTaskCards(lane).length;
  }

  function renderBusinessPoolCard(card) {
    const returnedBadge = card.status === '已退回' ? '<span class="returned-badge">已退回</span>' : '';
    return `<button class="pool-card-wrap pool-biz-card" data-action="open-requirement" data-id="${esc(card.requirementId)}" data-biz-group="${esc(card.title)}">
      <div class="card-inner-box">
        ${returnedBadge}
        <h3>${esc(card.title)}</h3>
        <div class="pool-biz-meta">${esc(card.creator)} 创建于 ${esc(card.createTime)}</div>
        <div class="pool-biz-children">${card.children.map((child) => `
          <div class="workbench-child">
            <span class="biz-tag ${child.tagClass}">${esc(child.tag)}</span>
            <em>${esc(child.label)}</em>
            <strong>${esc(child.title)}</strong>
          </div>`).join('')}</div>
      </div>
    </button>`;
  }

  function renderTaskPoolCard(card, horizontal) {
    const footerHtml = card.person && card.timeLabel
      ? `<div class="pool-task-footer"><span class="pool-task-id">#${esc(card.id)}</span><span>${esc(card.person)} ${esc(card.timeLabel)}</span></div>`
      : `<div class="pool-task-id">#${esc(card.id)}</div>`;
    return `<button class="pool-card-wrap pool-task-card${horizontal ? ' horizontal-card' : ''}" data-action="open-requirement" data-id="${esc(card.requirementId)}" data-biz-group="${esc(card.relation)}">
      <div class="card-inner-box">
        <div class="pool-task-head">
          <h3>${esc(card.title)}</h3>
          <span class="domain-tag domain-${card.domainTone || 'blue'}">${esc(card.domain || '')}</span>
        </div>
        <p class="pool-task-relation">关联业务需求：${esc(card.relation)}</p>
        ${footerHtml}
      </div>
    </button>`;
  }

  function renderPoolLaneHead(lane, count, horizontal) {
    if (horizontal) {
      const meta = POOL_LANE_META[lane];
      return `<div class="pool-lane-rail ${laneClass(lane)}">
        <i></i>
        <div class="pool-lane-rail-text">
          <strong>${esc(lane)}</strong>
          ${meta.subtitle ? `<span>${esc(meta.subtitle)}</span>` : ''}
        </div>
        <b>${count}</b>
      </div>`;
    }
    return `<header class="pool-lane-head-v2 pool-lane-head-simple">
      <div class="pool-lane-title">
        <strong>${esc(lane)}</strong>
        <b>${count}</b>
      </div>
    </header>`;
  }

  function pushMessage(msg) {
    const id = state.activeConversationId;
    if (!state.conversationMessages[id]) state.conversationMessages[id] = [];
    state.conversationMessages[id].push(msg);
  }

  function renderProgressMiniCard(card) {
    return `<article class="progress-mini-card">
      <h3>${esc(card.title)}</h3>
      <p>${esc(card.time)}</p>
      <div class="progress-owner">${avatar('product', 24, card.tone)}<b>${esc(card.person)}</b><em>小微企业金融部门</em></div>
    </article>`;
  }

  function renderRailSessions() {
    if (state.page !== 'workspace') return '';
    const groups = ['业务需求', '产品需求'];
    return `<div class="rail-sessions">
      <div class="chat-list-head">
        <h2>聊天</h2>
        <button class="new-demand" data-action="create-conversation">${icon('edit', 16)}新需求</button>
      </div>
      ${groups.map((group) => {
        const chats = groupedConversations(group);
        const collapsed = state.collapsedGroups[group];
        return `<div class="group">
          <button class="group-title" data-action="toggle-group" data-group="${esc(group)}">
            ${icon('caret', 12, collapsed ? 'closed' : '')}
            <span>${esc(group)} ${chats.length}</span>
          </button>
          ${collapsed ? '' : `<div class="group-items">${chats.map((chat) => `
            <button class="chat-item ${chat.id === state.activeConversationId ? 'active' : ''}" data-action="open-conversation" data-id="${esc(chat.id)}">
              <strong>${esc(chat.title)}</strong>
              <span>最近一次打开：${esc(chat.lastOpen)}</span>
              <div><em>${esc(chat.tag)}</em>${statusPill(chat.status)}</div>
            </button>`).join('')}</div>`}
        </div>`;
      }).join('')}
    </div>`;
  }

  function renderHome() {
    return `<section class="home-view">
      <div class="hero-block">
        <div class="brand"><img class="brand-logo-img" src="${LOGO_URL}" alt=""/>业务需求平台</div>
        <h1>做需求 更简单</h1>
        <div class="home-input">
          <textarea data-field="homePrompt" placeholder="请描述一下你想要做什么～">${esc(state.homePrompt)}</textarea>
          <button data-action="create-conversation" title="生成会话">${icon('send', 18)}</button>
        </div>
      </div>
      <div class="home-list">
        <div class="list-head">
          <div><button class="tab active">待办事项</button><button class="tab">最近事项</button></div>
          <button class="link" data-action="nav" data-page="pool">查看更多</button>
        </div>
        <div class="task-grid">
          ${state.requirements.slice(0, 4).map((item) => `
            <button class="home-card" data-action="open-requirement" data-id="${esc(item.id)}">
              <div class="card-meta"><span>${esc(item.createTime.slice(0, 10))} ｜ ${esc(item.domain)}</span>${statusPill(item.status)}</div>
              <h3>${esc(item.title)}</h3>
              <div class="card-progress">
                <span>${item.rejectReason ? `产品：${esc(item.receiver)}　${esc(item.rejectReason)}` : `提出人：${esc(item.creator)}`}</span>
                <b>等待处理 &gt;</b>
              </div>
            </button>`).join('')}
        </div>
      </div>
    </section>`;
  }

  function domainKey(l0Id, domain) {
    return `${l0Id}:${domain}`;
  }

  function getDomainDetail(l0Id, domain) {
    const key = domainKey(l0Id, domain);
    if (seedDomainDetails[key]) return seedDomainDetails[key];
    return {
      domain,
      l0Id,
      valueStream: '默认价值流(未归档)',
      topics: [
        { id: `${l0Id}-1`, name: '公共主题', desc: '暂无业务描述', functions: [] },
        { id: `${l0Id}-2`, name: '核心业务流程', desc: '暂无业务描述', functions: [] },
        { id: `${l0Id}-3`, name: '支撑能力主题', desc: '暂无业务描述', functions: [] }
      ]
    };
  }

  function activeDomainDetail() {
    if (!state.assetDomainKey) return null;
    const [l0Id, ...rest] = state.assetDomainKey.split(':');
    return getDomainDetail(l0Id, rest.join(':'));
  }

  function activeDomainTopic() {
    const detail = activeDomainDetail();
    if (!detail) return null;
    return detail.topics.find((topic) => topic.id === state.assetTopicId) || detail.topics[0];
  }

  function filteredTopicFunctions(topic) {
    const keyword = state.assetDetailKeyword.trim().toLowerCase();
    if (!keyword) return topic.functions || [];
    return (topic.functions || []).filter((item) => (
      item.id.toLowerCase().includes(keyword)
      || item.name.toLowerCase().includes(keyword)
      || (item.desc || '').toLowerCase().includes(keyword)
    ));
  }

  function renderAssetStatIcon(item, compact = false) {
    const cls = compact ? 'asset-tab-icon' : 'asset-stat-icon';
    if (item.glyph === 'biz') {
      return `<span class="${cls} tone-${item.tone} shape-square"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16v12H4z"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M9 12h6"/></svg></span>`;
    }
    if (item.glyph === 'prod') {
      return `<span class="${cls} tone-${item.tone}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7l8.7 5 8.7-5"/></svg></span>`;
    }
    if (item.glyph === 'func') {
      return `<span class="${cls} tone-${item.tone}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></span>`;
    }
    if (item.glyph === 'node') {
      return `<span class="${cls} tone-${item.tone} shape-square"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></span>`;
    }
    if (item.glyph === 'table') {
      return `<span class="${cls} tone-${item.tone}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 10h16M4 15h16M10 4v16"/></svg></span>`;
    }
    if (item.glyph === 'alert') {
      return `<span class="${cls} tone-${item.tone}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg></span>`;
    }
    return `<span class="${cls} tone-${item.tone}"><em>${esc(item.glyph)}</em></span>`;
  }

  function assetMineOwners() {
    return state.currentRole === 'business' ? ['王大陆', '王建国', '陈静'] : ['房产品', '陈产品', '李一飞'];
  }

  const lineageState = {
    expandedIds: new Set(),
    transform: { x: 80, y: 60, scale: 0.72 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    filteredRoot: seedLineageRoot
  };

  const LINEAGE_NODE_CLASS = {
    '根节点': 'lineage-node-root',
    '价值链': 'lineage-node-vc',
    '领域': 'lineage-node-domain',
    '主题活动': 'lineage-node-activity',
    '业务功能': 'lineage-node-func'
  };

  function activeAssetItem() {
    return seedAssetResults.find((item) => item.id === state.assetDetailId) || null;
  }

  function assetDetailMeta(item) {
    return seedAssetDetailMeta[item?.id] || {
      domain: '未归档领域',
      valueStream: '默认价值流',
      version: 'v1.0.0',
      createTime: '2025-01-01',
      updateTime: '2026-01-01',
      status: '已发布',
      completeness: '待补充',
      department: '—'
    };
  }

  function assetDetailTags(item) {
    if (seedAssetTags[item?.id]) return seedAssetTags[item.id];
    return [
      { category: '业务标签', name: item?.tag || '通用', tone: 'blue' },
      { category: '技术标签', name: item?.framework || '未标注', tone: 'green' }
    ];
  }

  function assetTypeLabel(type) {
    return assetStats.find((s) => s.id === type)?.label || '资产';
  }

  function lineageGetAllParentIds(node, ids = new Set()) {
    if (node.children && node.children.length > 0) {
      ids.add(node.id);
      node.children.forEach((child) => lineageGetAllParentIds(child, ids));
    }
    return ids;
  }

  function lineageFilterTree(node, query) {
    if (!query) return node;
    const lowerQuery = query.toLowerCase();
    if (node.label.toLowerCase().includes(lowerQuery)) return node;
    if (node.children) {
      const filteredChildren = node.children.map((child) => lineageFilterTree(child, query)).filter(Boolean);
      if (filteredChildren.length > 0) return { ...node, children: filteredChildren };
    }
    return null;
  }

  function lineageInitExpanded() {
    lineageState.expandedIds = new Set([seedLineageRoot.id]);
    seedLineageRoot.children.forEach((vc) => {
      lineageState.expandedIds.add(vc.id);
      if (vc.children) vc.children.forEach((domain) => lineageState.expandedIds.add(domain.id));
    });
  }

  function lineageRenderNodeCard(node, isExpanded, isMatch) {
    const typeClass = LINEAGE_NODE_CLASS[node.type] || LINEAGE_NODE_CLASS['业务功能'];
    const hasChildren = node.children && node.children.length > 0;
    const highlightClass = node.highlight ? ' lineage-node-current' : (isMatch ? ' lineage-node-match' : '');
    let statusHtml = '';
    if (node.status !== 'normal' && node.type === '业务功能') {
      const statusClass = node.status === 'offline' ? 'offline' : 'warning';
      statusHtml = `<span class="lineage-node-status ${statusClass}"></span>`;
    }
    let toggleHtml = '';
    if (hasChildren) {
      const badgeHtml = !isExpanded ? `<span class="lineage-child-count">${node.children.length}</span>` : '';
      toggleHtml = `
        <button class="lineage-node-toggle" data-action="lineage-toggle" data-id="${esc(node.id)}" type="button">
          ${badgeHtml}
          <span class="lineage-toggle-btn">${isExpanded ? '−' : '+'}</span>
        </button>`;
    }
    return `
      <div class="lineage-node-card ${typeClass}${highlightClass}">
        ${statusHtml}
        <div class="lineage-node-icon">${esc(node.type.slice(0, 1))}</div>
        <div class="lineage-node-text">
          <div class="lineage-node-type">${esc(node.type)}</div>
          <div class="lineage-node-label" title="${esc(node.label)}">${esc(node.label)}</div>
        </div>
        ${toggleHtml}
      </div>`;
  }

  function lineageRenderMindMapNode(node) {
    const isExpanded = lineageState.expandedIds.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const keyword = state.lineageKeyword.trim();
    const isMatch = keyword && node.label.toLowerCase().includes(keyword.toLowerCase());
    let html = `<div class="lineage-branch"><div class="lineage-node-wrap">${lineageRenderNodeCard(node, isExpanded, isMatch)}</div>`;
    if (hasChildren && isExpanded) {
      html += `<div class="lineage-children"><div class="lineage-connector-h"></div><div class="lineage-children-col">`;
      node.children.forEach((child, index) => {
        const isFirst = index === 0;
        const isLast = index === node.children.length - 1;
        const isSingle = node.children.length === 1;
        let lineClass = 'mid';
        if (isFirst && !isLast) lineClass = 'first';
        if (isLast && !isFirst) lineClass = 'last';
        html += `
          <div class="lineage-child-row">
            <div class="lineage-connector-v ${isSingle ? 'single' : lineClass}">
              <div class="lineage-connector-h-inner"></div>
            </div>
            <div class="lineage-child-node">${lineageRenderMindMapNode(child)}</div>
          </div>`;
      });
      html += `</div></div>`;
    }
    html += `</div>`;
    return html;
  }

  function lineageUpdateTransform() {
    const content = document.getElementById('lineage-canvas-content');
    const container = document.getElementById('lineage-canvas');
    const zoomDisplay = document.getElementById('lineage-zoom-level');
    if (!content || !container) return;
    const { x, y, scale } = lineageState.transform;
    content.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    container.style.backgroundSize = `${20 * scale}px ${20 * scale}px`;
    container.style.backgroundPosition = `${x}px ${y}px`;
    if (zoomDisplay) zoomDisplay.textContent = `${Math.round(scale * 100)}%`;
  }

  function lineageRenderTree() {
    const container = document.getElementById('lineage-canvas-content');
    if (!container) return;
    const keyword = state.lineageKeyword.trim();
    const root = keyword
      ? (lineageFilterTree(seedLineageRoot, keyword) || { ...seedLineageRoot, children: [] })
      : seedLineageRoot;
    lineageState.filteredRoot = root;
    if (root.children && root.children.length === 0 && keyword) {
      container.innerHTML = `<div class="lineage-empty">未找到包含 "${esc(keyword)}" 的资产节点</div>`;
    } else {
      container.innerHTML = lineageRenderMindMapNode(root);
    }
    lineageUpdateTransform();
  }

  function bindLineageCanvasEvents() {
    const app = document.getElementById('app');
    if (app.dataset.lineageBound === '1') return;
    app.dataset.lineageBound = '1';

    app.addEventListener('mousedown', (e) => {
      const canvas = e.target.closest('#lineage-canvas');
      if (!canvas || e.target.closest('.lineage-node-toggle')) return;
      lineageState.isDragging = true;
      canvas.classList.add('dragging');
      lineageState.dragStart = { x: e.clientX - lineageState.transform.x, y: e.clientY - lineageState.transform.y };
    });

    window.addEventListener('mousemove', (e) => {
      if (!lineageState.isDragging) return;
      lineageState.transform.x = e.clientX - lineageState.dragStart.x;
      lineageState.transform.y = e.clientY - lineageState.dragStart.y;
      lineageUpdateTransform();
    });

    window.addEventListener('mouseup', () => {
      if (!lineageState.isDragging) return;
      lineageState.isDragging = false;
      const canvas = document.getElementById('lineage-canvas');
      if (canvas) canvas.classList.remove('dragging');
    });

    app.addEventListener('wheel', (e) => {
      const canvas = e.target.closest('#lineage-canvas');
      if (!canvas) return;
      e.preventDefault();
      const scaleChange = e.deltaY > 0 ? 0.9 : 1.1;
      lineageState.transform.scale = Math.max(0.2, Math.min(lineageState.transform.scale * scaleChange, 2));
      lineageUpdateTransform();
    }, { passive: false });
  }

  function renderAssetDetailInfo(item) {
    const meta = assetDetailMeta(item);
    const stat = assetStats.find((s) => s.id === item.type) || assetStats[0];
    const rows = [
      ['资产名称', item.name],
      ['资产编码', item.code],
      ['资产类型', assetTypeLabel(item.type)],
      ['负责人', item.owner],
      ['所属部门', meta.department],
      ['业务领域', meta.domain],
      ['价值流', meta.valueStream],
      ['框架类型', item.framework],
      ['版本号', meta.version],
      ['发布状态', meta.status],
      ['规范完备度', meta.completeness],
      ['创建时间', meta.createTime],
      ['最近更新', meta.updateTime]
    ];
    return `<div class="asset-detail-info-panel">
      <header class="asset-detail-info-head">
        <span class="asset-result-icon">${renderAssetStatIcon(stat, true)}</span>
        <div>
          <h2>${esc(item.name)}</h2>
          <code>${esc(item.code)}</code>
        </div>
      </header>
      <p class="asset-detail-desc">${esc(item.desc)}</p>
      <div class="asset-detail-info-grid">
        ${rows.map(([label, value]) => `
          <div class="asset-detail-info-item">
            <span>${esc(label)}</span>
            <strong>${esc(value)}</strong>
          </div>`).join('')}
      </div>
    </div>`;
  }

  function renderAssetDetailTags(item) {
    const tags = assetDetailTags(item);
    const grouped = tags.reduce((acc, tag) => {
      if (!acc[tag.category]) acc[tag.category] = [];
      acc[tag.category].push(tag);
      return acc;
    }, {});
    return `<div class="asset-detail-tags-panel">
      <header class="asset-detail-tags-head">
        <strong>资产标签</strong>
        <span>共 ${tags.length} 个标签</span>
      </header>
      ${Object.entries(grouped).map(([category, list]) => `
        <section class="asset-detail-tag-group">
          <h3>${esc(category)}</h3>
          <div class="asset-detail-tag-list">
            ${list.map((tag) => `<span class="asset-detail-tag tone-${tag.tone}">${esc(tag.name)}</span>`).join('')}
          </div>
        </section>`).join('')}
      <table class="asset-detail-tag-table">
        <thead><tr><th>标签分类</th><th>标签名称</th><th>来源</th></tr></thead>
        <tbody>
          ${tags.map((tag) => `<tr><td>${esc(tag.category)}</td><td><span class="asset-detail-tag tone-${tag.tone}">${esc(tag.name)}</span></td><td>资产库自动标注</td></tr>`).join('')}
        </tbody>
      </table>
    </div>`;
  }

  function renderAssetDetailLineage() {
    return `<div class="asset-detail-lineage-panel">
      <div class="lineage-toolbar">
        <div class="lineage-toolbar-left">
          <span class="lineage-toolbar-title">${icon('assetMatrix', 16)}资产血缘脑图</span>
          <div class="lineage-search">${icon('search', 14)}<input data-field="lineageKeyword" value="${esc(state.lineageKeyword)}" placeholder="搜索节点名称..."/></div>
        </div>
        <div class="lineage-toolbar-right">
          <button class="lineage-tool-btn" data-action="lineage-expand-all" type="button">全部展开</button>
          <button class="lineage-tool-btn" data-action="lineage-collapse-all" type="button">仅看核心</button>
          <div class="lineage-zoom-group">
            <button class="lineage-tool-btn icon" data-action="lineage-zoom-in" type="button" title="放大">+</button>
            <span id="lineage-zoom-level">72%</span>
            <button class="lineage-tool-btn icon" data-action="lineage-zoom-out" type="button" title="缩小">−</button>
            <button class="lineage-tool-btn icon" data-action="lineage-center" type="button" title="居中">${icon('home', 14)}</button>
          </div>
        </div>
      </div>
      <div id="lineage-canvas" class="lineage-canvas">
        <div id="lineage-canvas-content" class="lineage-canvas-content"></div>
      </div>
    </div>`;
  }

  function renderAssetDetail() {
    const item = activeAssetItem();
    if (!item) return renderAssetResults();
    const stat = assetStats.find((s) => s.id === item.type) || assetStats[0];
    const tabs = [
      { id: 'detail', label: '详细信息' },
      { id: 'tags', label: '标签信息' },
      { id: 'lineage', label: '血缘信息' }
    ];
    let tabContent = '';
    if (state.assetDetailTab === 'tags') tabContent = renderAssetDetailTags(item);
    else if (state.assetDetailTab === 'lineage') tabContent = renderAssetDetailLineage();
    else tabContent = renderAssetDetailInfo(item);

    return `<section class="asset-detail-view">
      <header class="asset-detail-head">
        <button class="asset-back-btn" data-action="back-asset-results">${icon('caret', 14, 'back-icon')}返回列表</button>
        <div class="asset-detail-head-main">
          <span class="asset-result-icon">${renderAssetStatIcon(stat, true)}</span>
          <div>
            <h1>${esc(item.name)}</h1>
            <div class="asset-detail-head-meta">
              <code>${esc(item.code)}</code>
              <span class="asset-result-tag">${esc(item.tag)}</span>
              <span class="asset-detail-owner">${esc(item.owner)}</span>
            </div>
          </div>
        </div>
        <div class="asset-detail-tabs">
          ${tabs.map((tab) => `
            <button class="asset-detail-tab ${state.assetDetailTab === tab.id ? 'active' : ''}" data-action="set-asset-detail-tab" data-tab="${tab.id}">${esc(tab.label)}</button>`).join('')}
        </div>
      </header>
      <div class="asset-detail-body ${state.assetDetailTab === 'lineage' ? 'lineage-mode' : ''}">${tabContent}</div>
    </section>`;
  }

  function filteredAssetResults() {
    const keyword = state.assetKeyword.trim().toLowerCase();
    return seedAssetResults.filter((item) => {
      if (item.type !== state.assetActiveType) return false;
      if (state.assetScope === 'mine' && !item.mine && !assetMineOwners().includes(item.owner)) return false;
      if (state.assetFramework !== '全部框架类型' && item.framework !== state.assetFramework) return false;
      const haystack = `${item.name}${item.code}${item.desc}${item.tag}${item.owner}`.toLowerCase();
      return !keyword || haystack.includes(keyword);
    });
  }

  function assetResultTotal() {
    const stat = assetStats.find((item) => item.id === state.assetActiveType);
    const filtered = filteredAssetResults();
    if (!state.assetKeyword.trim() && state.assetScope === 'all' && state.assetFramework === '全部框架类型') {
      return stat?.count ?? filtered.length;
    }
    return filtered.length;
  }

  function paginatedAssetResults() {
    const filtered = filteredAssetResults();
    if (filtered.length === 0) return [];

    const total = assetResultTotal();
    const pages = Math.max(1, Math.ceil(total / state.assetPageSize));
    const page = Math.min(state.assetPage, pages);
    const start = (page - 1) * state.assetPageSize;
    const count = Math.min(state.assetPageSize, Math.max(0, total - start));

    if (filtered.length >= total) {
      return filtered.slice(start, start + count);
    }

    return Array.from({ length: count }, (_, index) => filtered[(start + index) % filtered.length]);
  }

  function renderAssetSearchBar(compact = false) {
    return `<div class="asset-search-bar ${compact ? 'compact' : ''}">
      <input data-field="assetKeyword" value="${esc(state.assetKeyword)}" placeholder="请输入应用节点/资产的名称、编码关键词搜索"/>
      <button class="asset-search-submit ${compact ? 'text-btn' : ''}" data-action="asset-search" title="搜索">${compact ? '搜索' : icon('send', 18)}</button>
    </div>`;
  }

  function renderAssetCategoryTabs() {
    return `<div class="asset-category-tabs">${assetStats.map((item) => `
      <button class="asset-category-tab ${state.assetActiveType === item.id ? 'active' : ''}" data-action="set-asset-type" data-type="${esc(item.id)}">
        ${renderAssetStatIcon(item, true)}
        <span>${esc(item.label)}</span>
      </button>`).join('')}</div>`;
  }

  function renderAssetResultCard(item) {
    return `<article class="asset-result-card" data-action="open-asset-detail" data-id="${esc(item.id)}">
      <div class="asset-result-card-head">
        <span class="asset-result-icon">${renderAssetStatIcon(assetStats.find((s) => s.id === item.type) || assetStats[0], true)}</span>
        <div class="asset-result-titles">
          <h3>${esc(item.name)}</h3>
          <code>${esc(item.code)}</code>
        </div>
      </div>
      <p class="asset-result-desc">${esc(item.desc)}</p>
      <span class="asset-result-tag">${esc(item.tag)}</span>
      <footer class="asset-result-footer">
        <span class="asset-result-owner">${esc(item.owner)}</span>
        <div class="asset-result-actions">
          <button class="primary" data-action="asset-knowledge" data-id="${esc(item.id)}">查看知识库</button>
          <button class="outline" data-action="asset-rd-flow" data-id="${esc(item.id)}">前往研发流程</button>
        </div>
      </footer>
    </article>`;
  }

  function renderAssetPagination(total) {
    const pages = Math.max(1, Math.ceil(total / state.assetPageSize));
    const current = Math.min(state.assetPage, pages);
    const pageItems = [];
    if (pages <= 8) {
      for (let i = 1; i <= pages; i += 1) pageItems.push(i);
    } else {
      pageItems.push(1, 2, 3, 4, 5, 6, '...', pages);
    }
    return `<div class="asset-pagination">
      <span class="asset-page-total">共 ${total.toLocaleString('zh-CN')} 条</span>
      <div class="asset-page-nav">
        <button class="asset-page-btn" data-action="set-asset-page" data-page="${current - 1}" ${current <= 1 ? 'disabled' : ''}>&lt;</button>
        ${pageItems.map((page) => {
          if (page === '...') return '<span class="asset-page-ellipsis">...</span>';
          return `<button class="asset-page-btn ${page === current ? 'active' : ''}" data-action="set-asset-page" data-page="${page}">${page}</button>`;
        }).join('')}
        <button class="asset-page-btn" data-action="set-asset-page" data-page="${current + 1}" ${current >= pages ? 'disabled' : ''}>&gt;</button>
      </div>
      <label class="asset-page-size">
        <select data-field="assetPageSize">
          ${[15, 30, 50].map((size) => `<option value="${size}" ${state.assetPageSize === size ? 'selected' : ''}>${size}条/页</option>`).join('')}
        </select>
      </label>
    </div>`;
  }

  function renderAssetResults() {
    const total = assetResultTotal();
    const cards = paginatedAssetResults();
    return `<section class="asset-search-view asset-results-view">
      <div class="asset-results-top">
        <button class="asset-back-btn" data-action="back-asset-home">${icon('caret', 14, 'back-icon')}返回</button>
        ${renderAssetSearchBar(true)}
        ${renderAssetCategoryTabs()}
      </div>
      <div class="asset-results-toolbar">
        <div class="asset-scope-tabs">
          <button class="${state.assetScope === 'all' ? 'active' : ''}" data-action="set-asset-scope" data-scope="all">全平台</button>
          <button class="${state.assetScope === 'mine' ? 'active' : ''}" data-action="set-asset-scope" data-scope="mine">我负责的</button>
        </div>
        <div class="asset-framework-filter ${state.assetFrameworkOpen ? 'open' : ''}">
          <button class="asset-framework-btn" data-action="toggle-asset-framework">${esc(state.assetFramework)}${icon('caret', 12)}</button>
          ${state.assetFrameworkOpen ? `<div class="asset-framework-menu">
            ${assetFrameworkOptions.map((option) => `<button class="${state.assetFramework === option ? 'active' : ''}" data-action="set-asset-framework" data-framework="${esc(option)}">${esc(option)}</button>`).join('')}
          </div>` : ''}
        </div>
      </div>
      <div class="asset-result-grid">
        ${cards.length ? cards.map(renderAssetResultCard).join('') : '<div class="asset-result-empty">暂无匹配资产，请调整关键词或筛选条件</div>'}
      </div>
      ${renderAssetPagination(total)}
    </section>`;
  }

  function runAssetSearch() {
    state.assetShowResults = true;
    state.assetPage = 1;
    state.assetFrameworkOpen = false;
    render();
  }

  function renderAssetSearch() {
    if (state.assetShowResults) return renderAssetResults();

    const statsMarkup = assetStats.map((item) => `
      <button class="asset-stat-card" data-action="open-asset-results" data-type="${esc(item.id)}">
        ${renderAssetStatIcon(item)}
        <div class="asset-stat-body">
          <strong>${esc(item.label)}</strong>
          <b>${item.count.toLocaleString('zh-CN')}</b>
        </div>
      </button>`).join('');

    return `<section class="asset-search-view">
      <div class="asset-search-hero">
        <h1 class="asset-search-title">
          <span class="title-main">资产库</span><span class="title-accent">全局搜索</span>
          <i class="title-swoosh" aria-hidden="true"></i>
        </h1>
        <p class="asset-search-types">业务资产、产品资产、业务功能</p>
        ${renderAssetSearchBar(false)}
      </div>
      <div class="asset-stats-panel">
        <div class="asset-stats-grid">${statsMarkup}</div>
      </div>
    </section>`;
  }

  function renderDomainExpandPanel(detail) {
    const valueStreamChip = `<span class="domain-matrix-topic domain-matrix-topic-stream">${esc(detail.valueStream)}</span>`;
    const topicChips = detail.topics.map((topic) => `
      <button class="domain-matrix-topic" data-action="open-domain-topic" data-id="${esc(detail.l0Id)}" data-domain="${esc(detail.domain)}" data-topic="${esc(topic.id)}">${esc(topic.name)}</button>`).join('');
    return `<div class="domain-matrix-expand">
      <header class="domain-matrix-expand-head">${esc(detail.domain)} · L2价值流 / L2.5业务主题</header>
      <div class="domain-matrix-expand-grid">${valueStreamChip}${topicChips}</div>
    </div>`;
  }

  function renderDomainMatrixRow(row) {
    const chips = row.domains.map((domain) => {
      const key = domainKey(row.id, domain);
      const expanded = state.matrixExpandedDomain === key;
      return `<button class="domain-matrix-chip ${expanded ? 'active' : ''}" data-action="toggle-domain" data-id="${esc(row.id)}" data-domain="${esc(domain)}" title="${esc(domain)}">${esc(domain)}</button>`;
    }).join('');

    const expandedKey = state.matrixExpandedDomain;
    const expandedInRow = expandedKey && expandedKey.startsWith(`${row.id}:`);
    let expandPanel = '';
    if (expandedInRow) {
      const domainName = expandedKey.slice(row.id.length + 1);
      expandPanel = renderDomainExpandPanel(getDomainDetail(row.id, domainName));
    }

    return `<div class="domain-matrix-row ${expandedInRow ? 'expanded' : ''}">
      <div class="domain-matrix-l0"><span>${esc(row.label)}</span></div>
      <div class="domain-matrix-l1-area">
        <div class="domain-matrix-l1-grid">${chips}</div>
        ${expandPanel}
      </div>
    </div>`;
  }

  function renderDomainMatrixPanorama() {
    return `<div class="domain-matrix-panel">
      <header class="domain-matrix-panel-head">
        <strong>领域总览</strong>
        <span>L0 价值链 · L1 业务领域</span>
      </header>
      <div class="domain-matrix-body">
        ${seedDomainMatrix.map(renderDomainMatrixRow).join('')}
      </div>
    </div>`;
  }

  function renderAssetDomainDetail() {
    const detail = activeDomainDetail();
    const topic = activeDomainTopic();
    if (!detail || !topic) return renderAssetMatrix();

    const functions = filteredTopicFunctions(topic);
    const functionRows = functions.length
      ? functions.map((item) => `
        <tr>
          <td><code>${esc(item.id)}</code></td>
          <td><strong>${esc(item.name)}</strong><p>${esc(item.desc || '暂无描述')}</p></td>
          <td><span class="domain-detail-complete ${item.complete ? 'done' : 'pending'}">${item.complete ? '已完备' : '待补充'}</span></td>
          <td><button class="outline" data-action="asset-topic-entry" data-id="${esc(item.id)}">查看详情</button></td>
        </tr>`).join('')
      : '<tr class="domain-detail-empty-row"><td colspan="4">此主题下没有匹配的业务功能。</td></tr>';

    const treeItems = detail.topics.map((item) => `
      <button class="domain-detail-tree-item ${item.id === topic.id ? 'active' : ''}" data-action="select-domain-topic" data-topic="${esc(item.id)}">
        <span>${esc(item.name)}</span>
        ${item.functions?.length ? `<em>${item.functions.length}</em>` : ''}
      </button>`).join('');

    return `<section class="asset-view asset-domain-detail-view">
      <header class="domain-detail-head">
        <nav class="domain-detail-breadcrumb">
          <button class="domain-detail-crumb home" data-action="back-asset-matrix" title="返回矩阵">${icon('home', 16)}</button>
          <span class="domain-detail-crumb">${esc(detail.domain)} <em>(业务领域)</em></span>
          <span class="domain-detail-sep">›</span>
          <span class="domain-detail-crumb">${esc(detail.valueStream)} <em>(价值流)</em></span>
          <span class="domain-detail-sep">›</span>
          <span class="domain-detail-crumb current">${esc(topic.name)} <em>(业务主题)</em></span>
        </nav>
        <div class="domain-detail-search">${icon('search', 16)}<input data-field="assetDetailKeyword" value="${esc(state.assetDetailKeyword)}" placeholder="模糊搜索当前视图资产..."/></div>
      </header>
      <div class="domain-detail-body">
        <aside class="domain-detail-sidebar">
          <div class="domain-detail-sidebar-head">
            <strong>${esc(detail.domain)}</strong>
            <span>BUSINESS INDEX TREE</span>
          </div>
          <div class="domain-detail-tree">
            <div class="domain-detail-tree-group">
              <div class="domain-detail-tree-stream">${esc(detail.valueStream)}</div>
              ${treeItems}
            </div>
          </div>
        </aside>
        <div class="domain-detail-main">
          <header class="domain-detail-main-head">
            <div class="domain-detail-level">L2.5 业务主题 <span>ID: ${esc(topic.id)}</span></div>
            <h2>${esc(topic.name)}</h2>
            <p>${esc(topic.desc || '暂无业务描述')}</p>
          </header>
          <section class="domain-detail-table-panel">
            <header class="domain-detail-table-head">
              <strong>下辖 L3 业务功能清单</strong>
              <span>${functions.length.toLocaleString('zh-CN')} 项资产</span>
            </header>
            <div class="domain-detail-table-wrap">
              <table class="domain-detail-table">
                <thead>
                  <tr>
                    <th>功能 ID</th>
                    <th>业务功能名称 &amp; 描述</th>
                    <th>规范完备度</th>
                    <th>操作入口</th>
                  </tr>
                </thead>
                <tbody>${functionRows}</tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </section>`;
  }

  function renderAssetMatrix() {
    return `<section class="asset-view asset-matrix-view">
      <header class="domain-matrix-head">
        <div class="domain-matrix-head-text">
          <h2>全行级业务领域矩阵 <em>(L0价值链 → L1业务领域)</em></h2>
          <p>点击领域卡片可查看 L2 价值流 / L2.5 业务主题；点击业务主题进入左树右表明细。</p>
        </div>
      </header>
      <div class="domain-matrix-scroll">
        ${renderDomainMatrixPanorama()}
      </div>
    </section>`;
  }

  function renderPool() {
    const horizontal = state.poolView === 'horizontal';
    const kanbanClass = horizontal ? 'pool-kanban pool-kanban-horizontal kanban-scroll' : 'pool-kanban pool-kanban-vertical kanban-scroll';
    const laneMarkup = LANES.map((lane) => {
      const count = poolLaneCount(lane);
      const isBusiness = lane === '业务需求';
      const cards = isBusiness ? poolBusinessCards() : poolTaskCards(lane);
      const laneClassName = `${laneClass(lane)} ${horizontal ? 'pool-lane-row' : 'pool-lane-col'}`;
      const listClass = `pool-card-list${horizontal ? ' horizontal' : ''}`;
      const cardHtml = isBusiness
        ? cards.map((c) => renderBusinessPoolCard(c)).join('')
        : cards.map((c) => renderTaskPoolCard(c, horizontal)).join('');

      if (horizontal) {
        return `<section class="pool-lane ${laneClassName}">
          ${renderPoolLaneHead(lane, count, true)}
          <div class="${listClass}">${cardHtml}</div>
        </section>`;
      }
      return `<section class="pool-lane ${laneClassName}">
        ${renderPoolLaneHead(lane, count, false)}
        <div class="${listClass}">${cardHtml}</div>
      </section>`;
    }).join('');

    return `<section class="pool-view">
      <header class="pool-head pool-head-v2">
        <div class="pool-search pool-search-wide">${icon('search', 16)}<input data-field="poolKeyword" value="${esc(state.poolKeyword)}" placeholder="输入需求名称和关键字查找需求文档"/></div>
        <div class="pool-head-tools">
          <div class="pool-filter ${state.poolFilterOpen ? 'open' : ''}">
            <button class="pool-filter-btn" data-action="toggle-pool-filter">${esc(state.poolFilter === 'all' ? '全部' : '与我相关')}${icon('caret', 12)}</button>
            ${state.poolFilterOpen ? `<div class="pool-filter-menu">
              <button class="${state.poolFilter === 'all' ? 'active' : ''}" data-action="set-pool-filter" data-filter="all">全部</button>
              <button class="${state.poolFilter === 'mine' ? 'active' : ''}" data-action="set-pool-filter" data-filter="mine">与我相关</button>
            </div>` : ''}
          </div>
          <div class="pool-view-toggle">
            <button class="${horizontal ? 'active' : ''}" data-action="set-pool-view" data-view="horizontal">${icon('layoutRows', 14)}横向</button>
            <button class="${!horizontal ? 'active' : ''}" data-action="set-pool-view" data-view="vertical">${icon('layoutCols', 14)}纵向</button>
          </div>
        </div>
      </header>
      <div class="${kanbanClass}">${laneMarkup}</div>
    </section>`;
  }

  function renderChatPanel() {
    const chat = activeConversation();
    const pending = pendingForRole();
    const msgs = messages();
    return `<section class="chat-panel">
      <header class="chat-title">
        <h2>${esc(chat?.title || '')}</h2>
        <div class="tools">
          <button class="tool-toggle" title="执行进度" data-action="open-progress">${icon('workflow', 18)}</button>
          <button class="tool-toggle ${state.tab === 'log' ? 'active' : ''}" title="${state.tab === 'log' ? '返回会话' : '流转日志'}" data-action="toggle-log">
            ${icon(state.tab === 'log' ? 'chat' : 'log', 18)}
          </button>
        </div>
      </header>
      <div class="messages">
        ${pending ? `<div class="sticky-action">
          <span class="doc-icon">${icon('document', 18)}</span>
          <b>待承接：${esc(pending.title)}</b>
          <div>
            <button class="primary" data-action="accept-task">承接</button>
            <button class="danger" data-action="reject-task">拒绝</button>
            <button class="muted" data-action="assign-other">转派他人</button>
          </div>
        </div>` : ''}
        ${state.reviewStickyVisible && state.currentRole === 'business' && isProductConversation() ? `<div class="sticky-action review-sticky">
          <span class="doc-icon">${icon('document', 18)}</span>
          <b>待审核：${esc(productSessionTitle())}</b>
          <div>
            <button class="primary" data-action="approve-review">审核通过</button>
            <button class="danger" data-action="return-review">退回修改</button>
          </div>
        </div>` : ''}
        ${!pending && !isProductConversation() ? `<section class="agent-card ${state.agentExpanded ? '' : 'collapsed'}">
          <button class="agent-card-head" data-action="toggle-agent">
            ${avatar('ai')}
            <div><b>需求澄清师</b><span> 追问中</span></div>
            <strong>3/5</strong>
            <i class="${state.agentExpanded ? 'open' : ''}"></i>
          </button>
          <div class="progress-segments">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= 3 ? 'active' : ''}"></i>`).join('')}</div>
          ${state.agentExpanded ? `<div class="agent-list">${AGENT_STEPS.map((agent, index) => `
            <div class="agent-row ${agent.done ? '' : 'muted'}">
              ${avatar('agent', 36, index)}
              <div><b>${esc(agent.name)}</b><span>${esc(agent.text)}</span></div>
              ${agent.done ? '<em></em>' : ''}
            </div>`).join('')}</div>` : ''}
        </section>` : ''}
        ${msgs.map((msg) => `
          <div class="message ${msg.from}">
            ${msg.from === 'ai' ? avatar('ai') : msg.from === 'product' ? avatar('product') : ''}
            <div class="bubble">${msg.html}</div>
            ${msg.from === 'me' ? avatar('business') : ''}
          </div>`).join('')}
        ${dispatchRecommendationVisible() && !isProductConversation() ? `<div class="message ai">
          ${avatar('ai')}
          <article class="dispatch-card">
            <h3>建议派发</h3>
            <div class="dispatch-item">
              <b><span>需求1</span>开户协议落库</b>
              <div>${avatar('product', 24)}陈产品 <em>小微企业金融部门</em><strong>核心链路</strong></div>
            </div>
            <div class="dispatch-item">
              <b><span>需求2</span>账户选择与结果凭证</b>
              <div>${avatar('product', 24)}王产品 <em>零售金融部门</em><strong>客户体验</strong></div>
            </div>
            <footer><button class="primary" data-action="agree-dispatch">同意派发</button><small>可输入 @产品姓名 调整</small></footer>
          </article>
        </div>` : ''}
        ${state.reviewPromptVisible && isProductConversation() && !state.reviewStickyVisible ? `<div class="message ai">
          ${avatar('ai')}
          <article class="review-prompt-card">
            <h3>提交业务审核？</h3>
            <button class="primary" data-action="submit-review">提交审核</button>
          </article>
        </div>` : ''}
        ${state.productSessionNoticeVisible && !isProductConversation() ? `<div class="message ai">
          ${avatar('ai')}
          <button class="session-created-card" data-action="enter-product-session">
            <span class="doc-glyph-inline">${icon('document', 16)}</span>
            <span><b>${esc(productSessionTitle())}</b><small>产品需求会话</small></span>
            <em>进入 &gt;</em>
          </button>
        </div>` : ''}
      </div>
      <footer class="composer">
        ${state.mentionOpen ? `<div class="mention-pop">
          <p>选择派发的产品负责人</p>
          <button data-action="select-mention" data-name="王产品">王产品 <span>小微企业金融部门</span></button>
          <button data-action="select-mention" data-name="李产品">李产品 <span>零售金融部门</span></button>
        </div>` : ''}
        <textarea data-field="draft" placeholder="请描述一下你想要做什么～">${esc(state.draft)}</textarea>
        <button data-action="send-message">${icon('send', 18)}</button>
      </footer>
    </section>`;
  }

  function renderDocPanel() {
    const req = activeRequirement();
    return `<aside class="doc-panel">
      <header class="doc-topbar ${isProductConversation() ? '' : 'no-tabs'}">
        <span class="doc-state">${state.activeDocMode === 'product' ? '修改于 10:56' : '文档正在生成中，请等待...'}</span>
        ${isProductConversation() ? `<div class="doc-tabs">
          <button class="${state.activeDocMode === 'business' ? 'active' : ''}" data-action="set-doc-mode" data-mode="business">业务需求说明书</button>
          <button class="${state.activeDocMode === 'product' ? 'active' : ''}" data-action="set-doc-mode" data-mode="product">产品需求文档</button>
        </div>` : ''}
        <nav class="doc-tools">
          <button class="tool-toggle doc-tool" title="预览">${icon('eye', 18)}</button>
          <button class="tool-toggle doc-tool" title="复制">${icon('copy', 18)}</button>
          <button class="tool-toggle doc-tool" title="下载">${icon('download', 18)}</button>
          <button class="tool-toggle doc-tool" title="分享">${icon('share', 18)}</button>
          <button class="tool-toggle doc-tool" title="关闭">${icon('close', 18)}</button>
        </nav>
      </header>
      <div class="doc-body">
        <nav class="doc-outline ${state.docOutlineCollapsed ? 'collapsed' : ''}">
          <button class="outline-toggle" data-action="toggle-outline">
            ${icon('caret', 12, state.docOutlineCollapsed ? 'closed' : '')}
          </button>
          ${state.docOutlineCollapsed ? '' : `<div>
            <a class="active">标题生成文字-存款功能需...</a>
            ${documentSections.map((section) => `<a>${esc(section.title)}</a>`).join('')}
          </div>`}
        </nav>
        <article class="doc-article">
          <h1>${esc(activeDocTitle())}</h1>
          ${documentSections.map((section, index) => `
            <section>
              <h2 class="${index === 0 ? 'selected' : ''}">${esc(section.title)}</h2>
              <p>${esc(section.body)}</p>
            </section>`).join('')}
        </article>
      </div>
      <footer class="doc-footer">
        <button class="primary icon-primary" data-action="dispatch-or-review">
          ${icon('send', 16)}${state.activeDocMode === 'product' ? '发送审核' : '立即派发'}
        </button>
      </footer>
    </aside>`;
  }

  function renderProgressDrawer() {
    const req = activeRequirement();
    const height = progressCanvasHeight();
    const children = progressBusinessChildren();
    const columns = progressColumns();
    const lines = progressFlowLines();
    return `<aside class="progress-drawer">
      <header><h2>流程进度看板</h2><button class="drawer-close" data-action="close-progress" title="关闭">${icon('close', 18)}</button></header>
      <div class="progress-stage-bar">${PROGRESS_STAGES.map((stage) => `<span>${esc(stage)}</span>`).join('')}</div>
      <div class="progress-canvas progress-canvas-v3" style="min-height:${height}px">
        ${PROGRESS_STAGES.map((stage) => `<div class="progress-lane-shade"></div>`).join('')}
        ${showProgressProductCard() ? `<svg class="flow-lines flow-lines-v3" viewBox="0 0 1000 ${height}" preserveAspectRatio="none">${lines.map((d) => `<path d="${d}"/>`).join('')}</svg>` : ''}
        <div class="progress-col col-1">
          <article class="progress-demand-card">
            <h3>${esc(req.title)}</h3>
            <div class="progress-owner progress-owner-inline">
              ${avatar('business', 24)}<b>${esc(req.creator)}</b><em>创建于 ${esc(req.createTime.slice(0, 16))}</em>
            </div>
            ${children.length ? `<div class="progress-demand-children">${children.map((child) => `
              <div class="progress-child">
                <span class="biz-tag ${child.tagClass}">${esc(child.tag)}</span>
                <em>${esc(child.partLabel)}</em>
                <strong>${esc(child.title)}</strong>
              </div>`).join('')}</div>` : `
              <div class="progress-child">
                <span class="biz-tag blue">${esc(req.domain)}</span>
                <em>业务需求</em>
                <strong>${esc(req.title)}</strong>
              </div>`}
          </article>
        </div>
        ${columns.map((column) => `
          <div class="progress-col ${column.className}">
            <div class="progress-col-stack">${column.cards.map(renderProgressMiniCard).join('')}</div>
          </div>`).join('')}
      </div>
    </aside>`;
  }

  function renderLogDrawer() {
    return `<aside class="log-drawer">
      <header><h2>流转日志</h2><button class="drawer-close" data-action="close-log" title="关闭">${icon('close', 18)}</button></header>
      <div class="log-table-wrap">
        <table>
          <thead><tr><th>操作时间</th><th>日志内容</th><th>操作人</th></tr></thead>
          <tbody>${LOG_ROWS.map((row) => `<tr><td>${esc(row.time)}</td><td>${esc(row.content)}</td><td>${esc(row.actor)}</td></tr>`).join('')}</tbody>
        </table>
      </div>
    </aside>`;
  }

  function renderWorkspace() {
    const showChat = !state.showProgress && state.tab !== 'log';
    return `<section class="workspace-view ${state.showProgress ? 'progress-open' : ''} ${state.tab === 'log' ? 'log-open' : ''}">
      ${showChat ? renderChatPanel() : ''}
      ${state.tab !== 'log' && !state.showProgress ? renderDocPanel() : ''}
      ${state.showProgress ? renderProgressDrawer() : ''}
      ${state.tab === 'log' ? renderLogDrawer() : ''}
    </section>`;
  }

  function renderMain() {
    if (state.page === 'home') return renderHome();
    if (state.page === 'pool') return renderPool();
    if (state.page === 'asset-search') return renderAssetSearch();
    if (state.page === 'asset-detail') return renderAssetDetail();
    if (state.page === 'asset-domain-detail') return renderAssetDomainDetail();
    if (state.page === 'asset-matrix') return renderAssetMatrix();
    return renderWorkspace();
  }

  function render() {
    const root = document.getElementById('app');
    const scrollMessages = root.querySelector('.messages');
    const msgScrollTop = scrollMessages ? scrollMessages.scrollTop : 0;

    root.innerHTML = `<div class="app-shell ${state.page === 'workspace' ? 'workspace-mode' : ''}">
      <aside class="rail ${state.page === 'workspace' ? 'rail-expanded' : ''}">
        <img class="logo-img" src="${LOGO_URL}" alt="业务需求平台"/>
        <nav class="rail-nav">
          <button class="rail-icon ${state.page === 'home' ? 'active' : ''}" data-action="nav" data-page="home" title="首页">${icon('home')}</button>
          <button class="rail-icon ${state.page === 'pool' ? 'active' : ''}" data-action="nav" data-page="pool" title="工作台">${icon('workbench')}</button>
          <button class="rail-icon ${['asset-search', 'asset-detail'].includes(state.page) ? 'active' : ''}" data-action="nav" data-page="asset-search" title="资产检索">${icon('assetSearch')}</button>
          <button class="rail-icon ${['asset-matrix', 'asset-domain-detail'].includes(state.page) ? 'active' : ''}" data-action="nav" data-page="asset-matrix" title="资产矩阵">${icon('assetMatrix')}</button>
          <button class="rail-icon ${state.page === 'workspace' ? 'active' : ''}" data-action="open-conversation" data-id="${esc(state.activeConversationId)}" title="会话">${icon('chat')}</button>
        </nav>
        ${renderRailSessions()}
        <div class="rail-grow"></div>
        <div class="user-menu">
          <button class="avatar user-avatar" data-action="toggle-role-menu" title="当前：${esc(currentRoleLabel())}">${esc(currentRoleAvatar())}</button>
          ${state.roleMenuOpen ? `<div class="role-menu">
            <p>切换登录人</p>
            <button class="${state.currentRole === 'business' ? 'active' : ''}" data-action="set-role" data-role="business"><b>王</b><span>业务经理</span></button>
            <button class="${state.currentRole === 'product' ? 'active' : ''}" data-action="set-role" data-role="product"><b>产</b><span>产品经理</span></button>
          </div>` : ''}
        </div>
      </aside>
      <main class="main">${renderMain()}</main>
    </div>`;

    const newMessages = root.querySelector('.messages');
    if (newMessages) newMessages.scrollTop = msgScrollTop;
    bindPoolCardHover(root);
    if (state.page === 'asset-detail' && state.assetDetailTab === 'lineage') {
      lineageRenderTree();
    }
  }

  function bindPoolCardHover(root) {
    root.querySelectorAll('.pool-card-wrap[data-biz-group]').forEach((card) => {
      const group = card.dataset.bizGroup;
      card.addEventListener('mouseenter', () => {
        root.querySelectorAll(`.pool-card-wrap[data-biz-group="${CSS.escape(group)}"] .card-inner-box`).forEach((box) => box.classList.add('highlighted'));
      });
      card.addEventListener('mouseleave', () => {
        root.querySelectorAll(`.pool-card-wrap[data-biz-group="${CSS.escape(group)}"] .card-inner-box`).forEach((box) => box.classList.remove('highlighted'));
      });
    });
  }

  function openConversation(id) {
    if (id === PRODUCT_SESSION_ID) state.productSessionAvailable = true;
    state.activeConversationId = id;
    state.page = 'workspace';
    state.tab = 'chat';
    const chat = state.conversations.find((c) => c.id === id);
    state.activeDocMode = chat?.group === '产品需求' ? 'product' : 'business';
    state.reviewPromptVisible = false;
    render();
  }

  function openRequirement(id) {
    const chat = state.conversations.find((c) => c.activeRequirementId === id) || state.conversations[0];
    openConversation(chat.id);
  }

  function createConversation() {
    pushMessage({ id: Date.now(), from: 'me', html: state.homePrompt });
    pushMessage({ id: Date.now() + 1, from: 'ai', html: '会话已创建。' });
    state.page = 'workspace';
    render();
  }

  function setRole(role) {
    state.currentRole = role;
    state.roleMenuOpen = false;
    if (state.currentRole === 'product' && activeRequirement().parts.some((p) => p.status === '待承接')) {
      pushMessage({ id: Date.now(), from: 'ai', html: '已切换视角，待承接任务已置顶。' });
    }
    render();
  }

  function sendMessage() {
    const text = state.draft.trim();
    if (!text) return;
    pushMessage({ id: Date.now(), from: 'me', html: esc(text) });
    const pending = pendingForRole();
    const isAcceptReply = !!pending && text.includes('承接') && !text.includes('@') && !text.includes('派发');
    if (isAcceptReply) {
      acceptTask();
      state.draft = '';
      state.mentionOpen = false;
      render();
      return;
    }
    const isReviewReply = isProductConversation() && (text.includes('审核') || text.includes('提交'));
    if (isReviewReply) {
      submitReview();
      state.draft = '';
      state.mentionOpen = false;
      render();
      return;
    }
    const shouldAssign = text.includes('@') || text.includes('派发');
    const req = activeRequirement();
    if (shouldAssign) {
      state.aiDispatchRecommended = false;
      state.dispatchCompleted = true;
      req.status = '待承接';
      req.parts.forEach((part) => { part.status = '待承接'; part.lane = '需求待承接'; });
      pushMessage({ id: Date.now() + 1, from: 'ai', html: '已派发给对应产品经理。' });
      state.logs.push({ title: 'AI 调用承接接口', time: '刚刚', text, artifact: '承接卡片' });
    } else {
      pushMessage({ id: Date.now() + 1, from: 'ai', html: '已更新到需求说明书。' });
    }
    state.draft = '';
    state.mentionOpen = false;
    render();
  }

  function acceptTask() {
    const req = activeRequirement();
    req.status = '已承接';
    const part = req.parts.find((p) => p.status === '待承接') || req.parts[0];
    part.status = '拆解中';
    part.lane = '产品拆解';
    state.aiDispatchRecommended = false;
    state.productSessionNoticeVisible = true;
    state.productSessionAvailable = false;
    pushMessage({ id: Date.now(), from: 'ai', html: '已承接，可进入产品需求会话。' });
    state.logs.push({ title: '产品承接', time: '刚刚', text: '李一飞承接开户协议落库，并开始拆解 PRD。', artifact: '产品需求文档' });
    render();
  }

  function agreeAiDispatch() {
    const req = activeRequirement();
    state.aiDispatchRecommended = false;
    state.productSessionNoticeVisible = false;
    state.productSessionAvailable = false;
    state.dispatchCompleted = true;
    req.status = '待承接';
    req.parts.forEach((part) => { part.status = '待承接'; part.lane = '需求待承接'; });
    pushMessage({ id: Date.now(), from: 'ai', html: '已派发 2 条承接任务。' });
    state.logs.push({ title: 'AI 推荐派发', time: '刚刚', text: '业务经理同意 AI 推荐派发方案，系统生成陈产品、王产品的承接任务。', artifact: '承接卡片' });
    render();
  }

  function enterProductSession() {
    state.productSessionAvailable = true;
    state.collapsedGroups['产品需求'] = false;
    state.productSessionNoticeVisible = false;
    state.reviewPromptVisible = false;
    state.conversationMessages[PRODUCT_SESSION_ID] = [];
    openConversation(PRODUCT_SESSION_ID);
  }

  function rejectTask() {
    const req = activeRequirement();
    req.status = '产品拒绝';
    req.rejectReason = '业务需求不合理，且信息缺失';
    req.parts.forEach((part) => { part.status = '退回业务补充'; part.lane = '业务需求'; });
    state.dispatchCompleted = false;
    pushMessage({ id: Date.now(), from: 'product', html: '拒绝承接：信息缺失。' });
    render();
  }

  function assignToOther() {
    pushMessage({ id: Date.now(), from: 'product', html: '已转派他人。' });
    render();
  }

  function dispatchOrReview() {
    if (state.activeDocMode === 'business') state.aiDispatchRecommended = true;
    else state.reviewPromptVisible = true;
    render();
  }

  function submitReview() {
    const req = activeRequirement();
    const part = req.parts.find((p) => p.status === '拆解中') || req.parts[0];
    part.lane = '业务审核中';
    part.status = '待业务审核';
    state.reviewPromptVisible = false;
    state.reviewStickyVisible = true;
    pushMessage({ id: Date.now(), from: 'ai', html: '已提交业务审核。' });
    state.logs.push({ title: '提交审核', time: '刚刚', text: '产品经理提交产品需求文档，业务经理收到置顶审核卡片。', artifact: '产品需求文档' });
    render();
  }

  function approveReview() {
    const req = activeRequirement();
    const part = req.parts.find((p) => p.status === '待业务审核') || req.parts[0];
    part.lane = '已完成';
    part.status = '已完成';
    state.reviewStickyVisible = false;
    pushMessage({ id: Date.now(), from: 'ai', html: '审核已通过。' });
    render();
  }

  function returnReview() {
    const req = activeRequirement();
    const part = req.parts.find((p) => p.status === '待业务审核') || req.parts[0];
    part.lane = '产品拆解';
    part.status = '退回修改';
    state.reviewStickyVisible = false;
    state.reviewPromptVisible = false;
    pushMessage({ id: Date.now(), from: 'ai', html: '已退回，请继续补充。' });
    render();
  }

  function handleAction(action, el) {
    switch (action) {
      case 'nav':
        state.page = el.dataset.page;
        state.poolFilterOpen = false;
        if (el.dataset.page !== 'asset-detail') state.assetDetailId = null;
        render();
        break;
      case 'open-conversation':
        openConversation(el.dataset.id);
        break;
      case 'open-requirement':
        openRequirement(el.dataset.id);
        break;
      case 'create-conversation':
        createConversation();
        break;
      case 'toggle-group':
        state.collapsedGroups[el.dataset.group] = !state.collapsedGroups[el.dataset.group];
        render();
        break;
      case 'toggle-role-menu':
        state.roleMenuOpen = !state.roleMenuOpen;
        render();
        break;
      case 'set-role':
        setRole(el.dataset.role);
        break;
      case 'expand-lane':
        state.expandedPoolLane = state.expandedPoolLane === el.dataset.lane ? null : el.dataset.lane;
        render();
        break;
      case 'toggle-pool-filter':
        state.poolFilterOpen = !state.poolFilterOpen;
        render();
        break;
      case 'set-pool-filter':
        state.poolFilter = el.dataset.filter;
        state.poolFilterOpen = false;
        render();
        break;
      case 'set-pool-view':
        state.poolView = el.dataset.view;
        if (state.poolView === 'horizontal') state.expandedPoolLane = null;
        render();
        break;
      case 'open-progress':
        state.tab = 'chat';
        state.showProgress = true;
        render();
        break;
      case 'toggle-log':
        state.showProgress = false;
        state.tab = state.tab === 'log' ? 'chat' : 'log';
        render();
        break;
      case 'close-progress':
        state.showProgress = false;
        render();
        break;
      case 'close-log':
        state.tab = 'chat';
        render();
        break;
      case 'toggle-agent':
        state.agentExpanded = !state.agentExpanded;
        render();
        break;
      case 'accept-task':
        acceptTask();
        break;
      case 'reject-task':
        rejectTask();
        break;
      case 'assign-other':
        assignToOther();
        break;
      case 'agree-dispatch':
        agreeAiDispatch();
        break;
      case 'enter-product-session':
        enterProductSession();
        break;
      case 'submit-review':
        submitReview();
        break;
      case 'approve-review':
        approveReview();
        break;
      case 'return-review':
        returnReview();
        break;
      case 'select-mention':
        state.draft = state.draft.replace('@', `@${el.dataset.name} `);
        state.mentionOpen = false;
        render();
        break;
      case 'send-message':
        sendMessage();
        break;
      case 'set-doc-mode':
        state.activeDocMode = el.dataset.mode;
        render();
        break;
      case 'toggle-outline':
        state.docOutlineCollapsed = !state.docOutlineCollapsed;
        render();
        break;
      case 'dispatch-or-review':
        dispatchOrReview();
        break;
      case 'asset-search':
        runAssetSearch();
        break;
      case 'back-asset-home':
        state.assetShowResults = false;
        state.assetFrameworkOpen = false;
        render();
        break;
      case 'open-asset-results':
        state.assetActiveType = el.dataset.type;
        runAssetSearch();
        break;
      case 'set-asset-type':
        state.assetActiveType = el.dataset.type;
        state.assetPage = 1;
        state.assetFrameworkOpen = false;
        render();
        break;
      case 'set-asset-scope':
        state.assetScope = el.dataset.scope;
        state.assetPage = 1;
        render();
        break;
      case 'toggle-asset-framework':
        state.assetFrameworkOpen = !state.assetFrameworkOpen;
        render();
        break;
      case 'set-asset-framework':
        state.assetFramework = el.dataset.framework;
        state.assetFrameworkOpen = false;
        state.assetPage = 1;
        render();
        break;
      case 'set-asset-page': {
        const total = assetResultTotal();
        const pages = Math.max(1, Math.ceil(total / state.assetPageSize));
        const nextPage = Number(el.dataset.page);
        if (!Number.isNaN(nextPage) && nextPage >= 1 && nextPage <= pages) {
          state.assetPage = nextPage;
          render();
        }
        break;
      }
      case 'asset-knowledge':
      case 'asset-rd-flow':
        break;
      case 'open-asset-detail':
        state.assetDetailId = el.dataset.id;
        state.assetDetailTab = 'detail';
        state.lineageKeyword = '';
        state.page = 'asset-detail';
        lineageInitExpanded();
        render();
        break;
      case 'back-asset-results':
        state.page = 'asset-search';
        state.assetShowResults = true;
        state.assetDetailId = null;
        render();
        break;
      case 'set-asset-detail-tab':
        state.assetDetailTab = el.dataset.tab;
        if (el.dataset.tab === 'lineage') {
          lineageInitExpanded();
          lineageState.transform = { x: 80, y: 60, scale: 0.72 };
        }
        render();
        break;
      case 'lineage-toggle': {
        const nodeId = el.dataset.id;
        if (lineageState.expandedIds.has(nodeId)) lineageState.expandedIds.delete(nodeId);
        else lineageState.expandedIds.add(nodeId);
        lineageRenderTree();
        break;
      }
      case 'lineage-expand-all':
        lineageState.expandedIds = lineageGetAllParentIds(seedLineageRoot);
        lineageRenderTree();
        break;
      case 'lineage-collapse-all':
        lineageState.expandedIds = new Set([seedLineageRoot.id]);
        lineageRenderTree();
        break;
      case 'lineage-zoom-in':
        lineageState.transform.scale = Math.min(lineageState.transform.scale * 1.2, 2);
        lineageUpdateTransform();
        break;
      case 'lineage-zoom-out':
        lineageState.transform.scale = Math.max(lineageState.transform.scale * 0.8, 0.2);
        lineageUpdateTransform();
        break;
      case 'lineage-center':
        lineageState.transform = { x: 80, y: 60, scale: 0.72 };
        lineageUpdateTransform();
        break;
      case 'open-domain':
        break;
      case 'toggle-domain': {
        const key = domainKey(el.dataset.id, el.dataset.domain);
        state.matrixExpandedDomain = state.matrixExpandedDomain === key ? null : key;
        render();
        break;
      }
      case 'open-domain-topic':
        state.assetDomainKey = domainKey(el.dataset.id, el.dataset.domain);
        state.assetTopicId = el.dataset.topic;
        state.assetDetailKeyword = '';
        state.page = 'asset-domain-detail';
        render();
        break;
      case 'select-domain-topic':
        state.assetTopicId = el.dataset.topic;
        render();
        break;
      case 'back-asset-matrix':
        state.page = 'asset-matrix';
        state.assetDetailKeyword = '';
        render();
        break;
      default:
        break;
    }
  }

  document.getElementById('app').addEventListener('click', (event) => {
    const el = event.target.closest('[data-action]');
    if (!el) return;
    event.preventDefault();
    handleAction(el.dataset.action, el);
  });

  document.getElementById('app').addEventListener('input', (event) => {
    const field = event.target.dataset.field;
    if (field === 'homePrompt') state.homePrompt = event.target.value;
    if (field === 'poolKeyword') {
      state.poolKeyword = event.target.value;
      render();
    }
    if (field === 'assetKeyword') state.assetKeyword = event.target.value;
    if (field === 'assetDetailKeyword') {
      state.assetDetailKeyword = event.target.value;
      render();
    }
    if (field === 'lineageKeyword') {
      state.lineageKeyword = event.target.value;
      if (state.lineageKeyword.trim()) {
        lineageState.expandedIds = lineageGetAllParentIds(
          lineageFilterTree(seedLineageRoot, state.lineageKeyword.trim()) || seedLineageRoot
        );
      } else {
        lineageInitExpanded();
      }
      lineageRenderTree();
    }
    if (field === 'draft') {
      state.draft = event.target.value;
      const nextMention = state.draft.includes('@');
      if (nextMention !== state.mentionOpen) {
        state.mentionOpen = nextMention;
        render();
      }
    }
  });

  document.getElementById('app').addEventListener('change', (event) => {
    if (event.target.dataset.field === 'assetPageSize') {
      state.assetPageSize = Number(event.target.value) || 15;
      state.assetPage = 1;
      render();
    }
  });

  document.getElementById('app').addEventListener('keydown', (event) => {
    if (event.target.dataset.field === 'draft' && event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
    if (event.target.dataset.field === 'assetKeyword' && event.key === 'Enter') {
      event.preventDefault();
      runAssetSearch();
    }
  });

  function fitViewport() {
    const designW = 1920;
    const designH = 1080;
    const vw = document.documentElement.clientWidth || window.innerWidth;
    const vh = document.documentElement.clientHeight || window.innerHeight;
    const scale = vw / designW;
    const scaledH = designH * scale;
    const offsetX = 0;
    const offsetY = scaledH <= vh ? (vh - scaledH) / 2 : 0;
    const app = document.getElementById('app');
    app.style.transformOrigin = 'top left';
    app.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    document.documentElement.style.setProperty('--app-scale', String(scale));
  }

  window.addEventListener('resize', fitViewport);

  fitViewport();
  bindLineageCanvasEvents();
  render();
})();
