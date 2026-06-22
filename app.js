(function () {
  'use strict';

  const LANES = ['业务需求', '需求承接', '需求拆解', '需求审核', '已完成'];
  const PRODUCT_SESSION_ID = 'chat-product-1';
  const LOGO_URL = 'assets/logo.png';
  const AVATARS = {
    business: 'assets/avatars/member.png',
    product: 'assets/avatars/avatar-product.png',
    assistant: 'assets/avatars/avatar-assistant.png'
  };

  const ICONS = {
    home: ['M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8', 'M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'],
    workbench: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
    chat: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
    workflow: ['M6 3v12', 'M18 9v6', 'M6 21a3 3 0 0 1 0-6', 'M18 9a3 3 0 0 1 0-6', 'M6 15h12'],
    log: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 13h8', 'M10 17h6'],
    caret: ['M6 9l6 6 6-6'],
    search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.3-4.3'],
    edit: ['M12 20h9', 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z'],
    send: ['M22 2 11 13', 'M22 2 15 22l-4-9-9-4Z'],
    document: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 13h8', 'M10 17h5'],
    eye: ['M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
    copy: ['M16 16H6a2 2 0 0 1-2-2V6', 'M8 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z'],
    download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
    share: ['M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7', 'M16 6l-4-4-4 4', 'M12 2v13'],
    close: ['M18 6 6 18', 'M6 6l12 12']
  };

  const AGENT_STEPS = [
    { name: '需求分析', text: '识别诉求与范围', done: true },
    { name: '需求收敛', text: '确定职责边界', done: true },
    { name: '需求澄清', text: '消除歧义', done: true },
    { name: '合规分析', text: '合规校验', done: false },
    { name: '文档校验', text: '完整性检查', done: false }
  ];

  const PROGRESS_STAGES = ['业务需求撰写', '需求承接', '产品拆解', '审核产品文档', '完成'];
  const LOG_ROWS = Array.from({ length: 8 }, () => ({ time: '2026-10-10 12:23', content: '派发亲情账户储蓄罐充值需求产品需求', actor: '王大陆' }));

  const state = {
    page: 'home',
    tab: 'chat',
    activeDocMode: 'business',
    activeConversationId: 'chat-business-1',
    expandedPoolLane: null,
    poolKeyword: '',
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
    return { 业务需求: 'lane-blue', 需求承接: 'lane-sky', 需求拆解: 'lane-indigo', 需求审核: 'lane-amber', 已完成: 'lane-emerald' }[lane];
  }

  function partLaneClass(lane) {
    if (lane === '需求承接') return 'col-2';
    if (lane === '需求拆解') return 'col-3';
    if (lane === '需求审核') return 'col-4';
    if (lane === '已完成') return 'col-5';
    return 'col-2';
  }

  function partColumnX(laneClass) {
    return { 'col-2': 300, 'col-3': 500, 'col-4': 700, 'col-5': 900 }[laneClass] ?? 300;
  }

  function partTimeLabel(part) {
    const req = activeRequirement();
    const prefix = part.lane === '需求承接' ? '派发时间' : part.lane === '需求拆解' ? '承接时间' : part.lane === '需求审核' ? '提交时间' : '完成时间';
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

  function poolCards(lane) {
    const keyword = state.poolKeyword.trim();
    return allFlowCards().filter((card) => {
      const laneMatch = lane === '业务需求'
        ? card.type === 'business' || card.status.includes('退回')
        : card.type === 'product' && activeRequirementLane(card) === lane && !card.status.includes('退回');
      const keywordMatch = !keyword || `${card.title}${card.parentTitle || ''}${card.domain}${card.person}`.includes(keyword);
      return laneMatch && keywordMatch;
    });
  }

  function workbenchCards(lane) {
    const req = activeRequirement();
    const returnedToBusiness = req.parts.some((part) => part.lane === '业务需求' && part.status.includes('退回'));
    const productCards = req.parts.map((part, index) => ({
      id: `#${part.id}`,
      lane: part.lane,
      requirementId: req.id,
      title: part.title,
      meta: `关联业务需求：${req.title}`,
      tag: index === 0 ? '核心链路' : '客户体验',
      tagClass: index === 0 ? 'red' : 'blue',
      footer: part.lane === '需求承接' ? `${part.owner} 待承接` : part.lane === '需求拆解' ? `${part.owner} 承接于 ${part.time}` : part.lane === '需求审核' ? `${part.owner} 提交于 2026-10-10 13:40` : `${part.owner} 完成于 2026-10-10 14:10`,
      actor: part.lane === '需求承接' ? '' : part.lane === '需求拆解' ? `${part.owner} 承接于 ${part.time}` : part.lane === '需求审核' ? `${part.owner} 提交于 2026-10-10 13:40` : `${part.owner} 完成于 2026-10-10 14:10`
    }));
    const businessCard = {
      id: `#${req.id}`,
      lane: '业务需求',
      requirementId: req.id,
      title: req.title,
      meta: `${req.creator} 创建于 ${req.createTime.slice(0, 16)}`,
      returned: returnedToBusiness,
      children: showProgressProductCard() ? req.parts.map((part, index) => ({
        tag: index === 0 ? '核心链路' : req.domain,
        tagClass: index === 0 ? 'red' : 'blue',
        part: `产品需求${index + 1}`,
        title: part.title
      })) : []
    };
    const cards = [businessCard, ...(showProgressProductCard() ? productCards : [])];
    const keyword = state.poolKeyword.trim();
    return cards.filter((card) => card.lane === lane && (!keyword || `${card.title}${card.meta}`.includes(keyword)));
  }

  function poolLaneTitle(lane) {
    const count = workbenchCards(lane).length;
    return {
      业务需求: `业务需求 ${count}`,
      需求承接: `需求待承接 ${count}`,
      需求拆解: `产品拆解 ${count}`,
      需求审核: `业务审核中 ${count}`,
      已完成: `已完成 ${count}`
    }[lane];
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
        <div class="role-switch">
          <button class="active">我是业务（我要提出需求）</button>
          <button>我是产品（我要分析需求）</button>
        </div>
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

  function renderPool() {
    return `<section class="pool-view">
      <header class="pool-head">
        <h2>工作台</h2>
        <div class="pool-search">${icon('search', 16)}<input data-field="poolKeyword" value="${esc(state.poolKeyword)}" placeholder="输入需求名称和关键字查找需求文档"/></div>
      </header>
      <div class="pool-kanban">
        ${LANES.map((lane) => {
          const collapsed = state.expandedPoolLane && state.expandedPoolLane !== lane;
          const expanded = state.expandedPoolLane === lane;
          if (collapsed) {
            return `<section class="pool-lane ${laneClass(lane)} collapsed">
              <button class="pool-lane-collapsed" data-action="expand-lane" data-lane="${esc(lane)}">
                <i></i><span>${esc(lane)}</span><b>${poolCards(lane).length}</b>
              </button>
            </section>`;
          }
          const cards = workbenchCards(lane);
          return `<section class="pool-lane ${laneClass(lane)} ${expanded ? 'expanded' : ''}">
            <header class="pool-lane-head"><div><strong>${esc(poolLaneTitle(lane))}</strong></div></header>
            <div class="pool-card-list ${expanded ? 'grid' : ''}">
              ${cards.map((card) => `
                <button class="workbench-card ${card.returned ? 'returned' : ''}" data-action="open-requirement" data-id="${esc(card.requirementId)}">
                  ${card.returned ? '<b class="returned-badge">已退回</b>' : ''}
                  <h3>${esc(card.title)}</h3>
                  <p>${esc(card.meta)}</p>
                  ${card.children?.length ? `<div class="workbench-children">${card.children.map((child) => `
                    <div class="workbench-child">
                      <span class="biz-tag ${child.tagClass}">${esc(child.tag)}</span>
                      <em>${esc(child.part)}</em>
                      <strong>${esc(child.title)}</strong>
                    </div>`).join('')}</div>` : `
                    ${card.tag ? `<span class="biz-tag ${card.tagClass}">${esc(card.tag)}</span>` : ''}
                    <small>${esc(card.footer)}</small>
                    ${!card.children?.length && card.actor ? `<footer>${esc(card.id)}<span>${esc(card.actor)}</span></footer>` : ''}`}
                </button>`).join('')}
            </div>
          </section>`;
        }).join('')}
      </div>
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
      req.parts.forEach((part) => { part.status = '待承接'; part.lane = '需求承接'; });
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
    part.lane = '需求拆解';
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
    req.parts.forEach((part) => { part.status = '待承接'; part.lane = '需求承接'; });
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
    part.lane = '需求审核';
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
    part.lane = '需求拆解';
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
        state.expandedPoolLane = el.dataset.lane;
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
    if (field === 'draft') {
      state.draft = event.target.value;
      const nextMention = state.draft.includes('@');
      if (nextMention !== state.mentionOpen) {
        state.mentionOpen = nextMention;
        render();
      }
    }
  });

  document.getElementById('app').addEventListener('keydown', (event) => {
    if (event.target.dataset.field === 'draft' && event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  });

  function fitViewport() {
    const designW = 1920;
    const designH = 1080;
    const scale = Math.min(window.innerWidth / designW, window.innerHeight / designH, 1);
    const offsetX = (window.innerWidth - designW * scale) / 2;
    const offsetY = (window.innerHeight - designH * scale) / 2;
    const app = document.getElementById('app');
    app.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    document.documentElement.style.setProperty('--app-scale', String(scale));
  }

  window.addEventListener('resize', fitViewport);

  fitViewport();
  render();
})();
