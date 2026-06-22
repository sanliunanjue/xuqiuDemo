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
    chat: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
    log: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 6v6l4 2'],
    caret: ['M6 9l6 6 6-6'],
    search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.3-4.3'],
    edit: ['M12 20h9', 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z'],
    send: ['M22 2 11 13', 'M22 2 15 22l-4-9-9-4Z'],
    document: ['M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z', 'M14 2v4a2 2 0 0 0 2 2h4', 'M10 13h8', 'M10 17h5'],
    fullscreen: ['M15 3h6v6', 'M9 21H3v-6', 'M21 3l-7 7', 'M3 21l7-7'],
    copy: ['M16 16H6a2 2 0 0 1-2-2V6', 'M8 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z'],
    download: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
    upload: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v13'],
    panelLeftClose: ['M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z', 'M9 3v18'],
    panelLeft: ['M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z', 'M9 3v18', 'M15 9l-3 3 3 3'],
    user: ['M20 21a8 8 0 1 0-16 0', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8'],
    assignee: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
    calendar: ['M8 2v4', 'M16 2v4', 'M3 10h18', 'M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'],
    layoutRows: ['M3 6h18', 'M3 12h18', 'M3 18h18'],
    layoutCols: ['M8 6v12', 'M16 6v12', 'M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z'],
    tag: ['M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 0 1 0 2.828l-7 7a2 2 0 0 1-2.828 0l-7-7A1.994 1.994 0 0 1 3 12V7a4 4 0 0 1 4-4z'],
    close: ['M18 6 6 18', 'M6 6l12 12']
  };

  const ICON_FILLED = {
    workbench: {
      viewBox: '0 0 1024 1024',
      path: 'M837.12 112.64H161.28c-43.52 0-76.8 35.84-76.8 76.8v468.48c0 43.52 35.84 76.8 76.8 76.8h276.48v156.16H215.04c-15.36 0-25.6 12.8-25.6 25.6 0 15.36 12.8 25.6 25.6 25.6h570.88c15.36 0 25.6-12.8 25.6-25.6 0-15.36-12.8-25.6-25.6-25.6h-243.2v-156.16h294.4c43.52 0 76.8-35.84 76.8-76.8V189.44c2.56-43.52-33.28-76.8-76.8-76.8z m25.6 545.28c0 15.36-12.8 25.6-25.6 25.6H161.28c-15.36 0-25.6-12.8-25.6-25.6V189.44c0-15.36 12.8-25.6 25.6-25.6h675.84c15.36 0 25.6 12.8 25.6 25.6v468.48z m0 0'
    },
    assetSearch: {
      viewBox: '0 0 1157 1024',
      paths: [
        { d: 'M442.154805 0c237.545766 0 431.498805 62.482909 441.808831 167.382234l0.415169 8.856935V442.154805c0 23.872208-19.374545 43.246753-43.246753 43.246753-88.154182 0-133.753558 11.763117-165.790753 47.329247a221.700156 221.700156 0 0 0-56.947325 148.768831v1.383896c0 18.544208 0.484364 25.809662 2.283429 32.452364 16.053195 58.677195 51.204156 104.345766 118.599896 165.859948a43.246753 43.246753 0 0 1-16.606754 73.277299c-77.221403 23.318649-176.031584 36.258078-280.51574 36.258078-244.050078 0-442.154805-66.011844-442.154805-176.169974V176.239169C0 66.011844 198.104727 0 442.154805 0zM86.493506 711.945351v102.615896c0 36.673247 159.148052 89.745662 355.730494 89.745662 61.375792 0 120.329766-4.843636 172.710234-13.631377l9.410493-1.799065-10.656-11.901506c-28.923429-33.628675-49.958649-66.565403-64.627948-103.584623-34.597403 3.044571-70.371117 4.566857-106.836779 4.566857-145.793455 0-275.18774-23.526234-355.730494-66.011844z m0-212.774026v102.615896c0 36.673247 159.148052 89.745662 355.730494 89.745662 30.653299 0 60.753039-1.176312 89.884052-3.45974l-0.069195-6.504312c0-42.624 8.649351-83.933299 24.91013-121.782857-36.811636 3.59813-75.422338 5.397195-114.724987 5.397195-145.793455 0-275.18774-23.526234-355.730494-66.011844z m355.730494-146.692987c-145.793455 0-275.18774-23.595429-355.730494-66.081039v102.615896c0 36.673247 159.148052 89.745662 355.730494 89.745662 63.866805 0 125.311792-5.18961 179.906493-14.876883 41.932052-41.101714 93.205403-58.46961 167.313039-63.382442l8.580156-0.484363V286.466493c-80.542753 42.48561-209.937039 66.011844-355.799688 66.011845z m0-266.054026c-196.513247 0-355.661299 53.072416-355.661299 89.814857 0 36.673247 159.148052 89.745662 355.661299 89.745662 196.582442 0 355.799688-53.072416 355.799688-89.745662 0-36.742442-159.148052-89.814857-355.799688-89.814857z' },
        { d: 'M807.918545 392.334545a282.591584 282.591584 0 0 1 231.940987 444.023065l102.546702 102.477507a49.82026 49.82026 0 1 1-70.578702 70.578701l-102.477506-102.546701a282.591584 282.591584 0 1 1-161.431481-514.601766z m0 99.709715a182.88187 182.88187 0 1 0 0 365.694545 182.88187 182.88187 0 0 0 0-365.694545z', opacity: 0.55 }
      ]
    },
    assetMatrix: {
      viewBox: '0 0 1156 1024',
      paths: [
        { d: 'M286.758182 4.429255A32.176129 32.176129 0 0 1 317.135325 3.349864l2.004584 1.079391 275.09048 158.82466a32.227528 32.227528 0 0 1 15.985265 25.699784v322.48088a32.124729 32.124729 0 0 1-13.004091 25.699783l-1.798984 1.284989-151.937119 97.659177a32.176129 32.176129 0 0 1-36.493692-52.941554l1.747585-1.233589 137.082644-87.996058V209.719124L303.154643 69.501106 64.352257 209.564925v284.548l133.279076 87.996058a32.176129 32.176129 0 0 1 10.279914 42.764439l-1.130791 1.798985a32.176129 32.176129 0 0 1-42.764439 10.279914l-1.798985-1.130791-147.722354-97.659176a32.07333 32.07333 0 0 1-14.391879-24.671792V191.16388A32.124729 32.124729 0 0 1 14.083481 164.590304l1.901784-1.18219z' },
        { d: 'M832.724377 4.429255a32.07333 32.07333 0 0 1 30.325745-1.18219l2.31298 1.18219 275.09048 158.82466a32.227528 32.227528 0 0 1 15.985265 25.699784v322.48088a32.124729 32.124729 0 0 1-13.00409 25.699783l-1.798985 1.284989-151.937119 97.659177a32.176129 32.176129 0 0 1-36.493692-52.941554l1.747586-1.233589 137.082643-87.996058V209.719124L849.120839 69.501106l-254.736252 149.41854a32.227528 32.227528 0 0 1-42.918638-9.714518l-1.13079-1.798985a32.176129 32.176129 0 0 1 9.714518-42.867238l1.798985-1.130791z m-281.464026 489.272474a32.176129 32.176129 0 0 1 42.764439-10.279914l1.850385 1.079391 147.722354 97.659177a32.176129 32.176129 0 0 1-33.666716 54.791938l-1.798985-1.130791-147.722354-97.659176a32.124729 32.124729 0 0 1-9.149123-44.563425z' },
        { d: 'M676.521095 397.276142a32.227528 32.227528 0 0 1 42.815839-10.279913l1.798984 1.13079 147.722355 97.659176a32.227528 32.227528 0 0 1 14.340479 24.723192v322.48088a32.227528 32.227528 0 0 1-13.980682 26.522177l-1.953184 1.233589-270.875716 158.824661a32.07333 32.07333 0 0 1-30.325744 1.18219l-2.055982-1.027992-274.936282-158.87606a32.278928 32.278928 0 0 1-16.036665-25.699783V512.719568a32.02193 32.02193 0 0 1 13.004091-25.699783l1.798985-1.23359 151.885719-97.659176a32.176129 32.176129 0 0 1 36.493692 52.941553l-1.747585 1.23359-137.134044 87.944658v284.136804l242.760153 140.218018 239.007984-140.063819v-284.548l-133.638873-88.150257a32.124729 32.124729 0 0 1-10.279913-42.764439l1.079391-1.798985z' }
      ]
    },
    workflow: {
      viewBox: '0 0 1024 1024',
      path: 'M864 706.112c0-60.928-35.328-106.432-77.824-119.616-13.312 28.416-40.448 51.84-79.616 51.84H310.656c-42.432 0-70.784-27.52-82.688-59.008-75.392-15.552-128.896-88.768-131.456-171.456l-0.384-12.8C92.8 289.728 166.656 193.792 268.8 193.792h124.992C405.056 159.232 435.008 128 480.704 128v64c-15.36 0-27.84 14.4-27.84 32.128s12.48 32.128 27.84 32.128h334.592l5.632-0.64a30.336 30.336 0 0 0 21.696-24.96l0.512-6.528c0-15.488-9.536-28.48-22.208-31.488L815.296 192V128c58.944 0 91.84 51.84 91.84 96.128 0 44.224-32.896 96.128-91.84 96.128H480.704c-44.16 0-73.792-29.184-85.76-62.464H268.8c-57.408 0-111.296 56.768-108.8 135.296l0.448 12.8c1.664 52.864 31.04 92.224 67.072 106.624 11.712-31.936 40.256-60.032 83.072-60.032h395.904v64H310.656c-13.824 0-25.024 12.992-25.024 28.928 0 14.016 8.576 25.6 19.968 28.352l5.12 0.64h395.84l5.056-0.64c11.392-2.688 20.032-14.336 20.032-28.352 0-15.936-11.264-28.928-25.088-28.928v-64c46.976 0 76.672 33.792 85.952 69.312 79.808 16.832 135.488 96.32 135.488 184.32 0 99.2-70.656 187.52-167.04 187.52H457.28a90.56 90.56 0 0 1-57.024 61.44 87.232 87.232 0 0 1-104.96-40.064 97.024 97.024 0 0 1 0-96.512c22.272-38.4 65.92-53.76 104.96-40.128 24.96 8.704 43.904 27.648 53.632 51.328h307.072c52.8 0 103.04-50.944 103.04-123.52z m-477.824 128.512a41.6 41.6 0 0 0-28.16-0.384 35.968 35.968 0 0 0-24.96 32.512c0 11.136 7.68 26.432 24.96 32.512a41.6 41.6 0 0 0 28.16-0.384 38.592 38.592 0 0 0 19.904-16.256 32.128 32.128 0 0 0 4.16-12.16l0.256-3.712a31.808 31.808 0 0 0-4.416-15.872 38.656 38.656 0 0 0-19.904-16.256zM815.296 128v64H480.704V128h334.592z'
    },
    fullscreen: {
      viewBox: '0 0 1024 1024',
      path: 'M983.04 727.04a40.96 40.96 0 0 0-40.96 40.96v173.592381h-174.08a40.96 40.96 0 1 0 0 82.407619h173.592381A82.407619 82.407619 0 0 0 1024 941.592381v-173.592381a40.96 40.96 0 0 0-40.96-40.96zM941.592381 0h-173.592381a40.96 40.96 0 1 0 0 82.407619h173.592381v173.592381a40.96 40.96 0 1 0 82.407619 0V82.407619A82.407619 82.407619 0 0 0 941.592381 0zM256 941.592381H82.407619v-173.592381a40.96 40.96 0 1 0-82.407619 0v173.592381A82.407619 82.407619 0 0 0 82.407619 1024h173.592381a40.96 40.96 0 1 0 0-82.407619zM40.96 296.96a40.96 40.96 0 0 0 40.96-40.96V82.407619h174.08a40.96 40.96 0 1 0 0-82.407619H82.407619A82.407619 82.407619 0 0 0 0 82.407619v173.592381a40.96 40.96 0 0 0 40.96 40.96z m682.666667 425.20381H301.83619V301.83619h420.815239z m82.407619 0V301.83619a82.407619 82.407619 0 0 0-83.870476-82.407619H301.83619A82.407619 82.407619 0 0 0 219.428571 301.83619v420.815239a82.407619 82.407619 0 0 0 82.407619 81.92h420.815239a82.407619 82.407619 0 0 0 81.92-82.407619z'
    },
    copy: {
      viewBox: '0 0 1024 1024',
      path: 'M230.4 665.6a25.6 25.6 0 1 1 0 51.2h-102.4A128 128 0 0 1 0 588.8v-460.8A128 128 0 0 1 128 0h460.8A128 128 0 0 1 716.8 128v102.4a25.6 25.6 0 1 1-51.2 0v-102.4A76.8 76.8 0 0 0 588.8 51.2h-460.8A76.8 76.8 0 0 0 51.2 128v460.8A76.8 76.8 0 0 0 128 665.6h102.4z m204.8-307.2A76.8 76.8 0 0 0 358.4 435.2v460.8A76.8 76.8 0 0 0 435.2 972.8h460.8a76.8 76.8 0 0 0 76.8-76.8v-460.8A76.8 76.8 0 0 0 896 358.4h-460.8z m0-51.2h460.8A128 128 0 0 1 1024 435.2v460.8a128 128 0 0 1-128 128h-460.8A128 128 0 0 1 307.2 896v-460.8A128 128 0 0 1 435.2 307.2z'
    }
  };

  const AGENT_STEPS = [
    { name: '需求分析', text: '识别诉求与范围', done: true },
    { name: '需求收敛', text: '确定职责边界', done: true },
    { name: '需求澄清', text: '消除歧义', done: true },
    { name: '合规分析', text: '合规校验', done: false },
    { name: '文档校验', text: '完整性检查', done: false }
  ];

  const PROGRESS_STAGES = ['业务需求撰写', '需求待承接', '产品拆解', '审核产品文档', '完成'];
  const PROGRESS_LAYOUT = {
    bizColTop: 70,
    bizCardPadding: 16,
    bizTitleBlock: 26,
    bizOwnerBlock: 44,
    bizSectionGap: 10,
    bizChildHeight: 54,
    bizChildGap: 8,
    miniCardHeight: 126,
    miniCardGap: 20,
    colTop: { 'col-2': 70, 'col-3': 238, 'col-4': 238, 'col-5': 418 }
  };
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
    railCollapsed: false,
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
    const filled = ICON_FILLED[name];
    if (filled) {
      const body = filled.paths
        ? filled.paths.map((p) => {
          const opacity = p.opacity != null ? ` opacity="${p.opacity}"` : '';
          return `<path d="${p.d}" fill="currentColor"${opacity}/>`;
        }).join('')
        : `<path d="${filled.path}" fill="currentColor"/>`;
      return `<svg class="app-icon app-icon-filled ${extraClass}" width="${size}" height="${size}" viewBox="${filled.viewBox}" aria-hidden="true">${body}</svg>`;
    }
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

  function progressChildAnchorY(index) {
    const L = PROGRESS_LAYOUT;
    const childrenTop = L.bizColTop + L.bizCardPadding + L.bizTitleBlock + 8 + L.bizOwnerBlock + L.bizSectionGap;
    return childrenTop + index * (L.bizChildHeight + L.bizChildGap) + L.bizChildHeight / 2;
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
    const L = PROGRESS_LAYOUT;
    const columnBottoms = columns.map((column) => {
      const top = L.colTop[column.className] ?? 70;
      return top + column.cards.length * (L.miniCardHeight + L.miniCardGap);
    });
    const childrenCount = progressBusinessChildren().length;
    const childrenBottom = childrenCount
      ? progressChildAnchorY(childrenCount - 1) + L.bizChildHeight / 2
      : L.bizColTop + 220;
    return Math.max(520, ...columnBottoms, childrenBottom) + 80;
  }

  function updateProgressFlowLines() {
    const canvas = document.querySelector('.progress-canvas-v3');
    const svg = canvas?.querySelector('.flow-lines-v3');
    if (!canvas || !svg || !showProgressProductCard()) return;

    const width = canvas.clientWidth;
    const height = canvas.scrollHeight;
    if (!width || !height) return;

    const scale = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--app-scale')) || 1;
    const canvasRect = canvas.getBoundingClientRect();

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));
    svg.style.width = `${width}px`;
    svg.style.height = `${height}px`;

    const paths = activeRequirement().parts.map((part) => {
      const fromEl = canvas.querySelector(`.progress-child[data-flow-id="${part.id}"]`);
      const toEl = canvas.querySelector(`.progress-mini-card[data-flow-id="${part.id}"]`);
      if (!fromEl || !toEl) return '';

      const fromBox = fromEl.getBoundingClientRect();
      const fromAnchor = fromEl.querySelector('strong') || fromEl;
      const toAnchor = toEl.querySelector('h3') || toEl;
      const fromAnchorRect = fromAnchor.getBoundingClientRect();
      const toBox = toEl.getBoundingClientRect();
      const toAnchorRect = toAnchor.getBoundingClientRect();

      const startX = (fromBox.right - canvasRect.left) / scale;
      const startY = (fromAnchorRect.top + fromAnchorRect.height / 2 - canvasRect.top) / scale + canvas.scrollTop;
      const endX = (toBox.left - canvasRect.left) / scale;
      const endY = (toAnchorRect.top + toAnchorRect.height / 2 - canvasRect.top) / scale + canvas.scrollTop;
      const midX = (startX + endX) / 2;
      return `<path d="M${startX} ${startY} C${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}"/>`;
    }).filter(Boolean);

    svg.innerHTML = paths.join('');
  }

  function bindProgressCanvasEvents(root) {
    const canvas = root.querySelector('.progress-canvas-v3');
    if (!canvas || canvas.dataset.flowBound) return;
    canvas.dataset.flowBound = '1';
    canvas.addEventListener('scroll', () => requestAnimationFrame(updateProgressFlowLines));
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
    return `<article class="progress-mini-card" data-flow-id="${esc(card.id)}">
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

  function assetTagHierarchy(item) {
    return seedAssetTagHierarchy[item?.id] || {
      valueChain: '个人金融价值链',
      domain: '核心账务领域',
      activity: '默认主题活动'
    };
  }

  function assetDocumentMeta(type) {
    if (type === 'business-asset') return { abbr: 'BRD', label: '业务需求说明书' };
    if (type === 'product-asset') return { abbr: 'PRD', label: '产品需求文档' };
    return { abbr: 'FDD', label: '功能文档' };
  }

  function buildDefaultAssetDocumentSections(item) {
    const doc = assetDocumentMeta(item.type);
    const meta = assetDetailMeta(item);
    const tags = assetTagHierarchy(item);

    if (item.type === 'business-asset') {
      return [
        { title: '1. 文档说明', paragraphs: [`本文档为「${item.name}」的业务需求说明书（BRD），编码 ${item.code}，用于明确业务诉求、流程边界、合规要求及与下游产品拆解的衔接关系。`, `文档归属${tags.valueChain} / ${tags.domain} / ${tags.activity}，由 ${item.owner} 负责维护，当前版本 ${meta.version}。`] },
        { title: '1.1 文档目的', paragraphs: ['帮助业务、产品、研发、测试对需求范围形成一致理解，减少 BRD 到 PRD 之间的信息断点。', '作为业务验收与产品拆解的基准输入，支撑资产库版本管理与复用检索。'] },
        { title: '1.2 适用范围', paragraphs: [`适用于与「${item.name}」相关的银行移动端、柜面及远程银行协同办理场景。`, '不含已下线渠道及未纳入本期改造的遗留流程。'] },
        { title: '1.3 角色受众', items: ['业务经理：提出需求、组织评审、业务验收', '产品经理：承接 BRD、拆解 PRD', '研发/测试：依据 PRD 设计与验证', '合规与风控：审核规则与留痕要求'] },
        { title: '2. 业务背景', paragraphs: [item.desc, '随着线上办理比例提升，客户对流程连贯性、结果可追溯性要求更高，需通过标准化业务资产沉淀可复用能力。'] },
        { title: '3. 业务目标', items: ['实现核心流程线上化，降低网点人工介入比例', '关键节点留痕完整，满足内外部审计要求', '与关联产品资产形成清晰上下游映射', '支持后续渠道快速复用与差异化配置'] },
        { title: '4. 业务范围', paragraphs: ['本节界定本期纳入与排除的业务能力，避免与关联项目产生范围重叠。'] },
        { title: '4.1 纳入范围', items: [`${item.name}主流程及关键分支`, '客户身份核验与协议确认环节', '结果反馈、凭证生成与异常提示', '与限额、风控规则的基础联动'] },
        { title: '4.2 排除范围', items: ['非本主题活动的增值营销能力', '跨行清算细节（由支付领域资产承接）', '历史数据迁移与批处理补偿（另行立项）'] },
        { title: '5. 业务流程', paragraphs: ['标准流程分为客户发起、资格校验、协议/信息确认、核心交易处理、结果反馈五个阶段。', '任一步骤失败须给出可理解的错误原因，并保留可恢复路径（如返回上一步或联系客服）。'] },
        { title: '6. 业务规则', items: ['客户须完成实名认证且账户状态正常', '单笔/单日限额遵循风控策略与监管要求', '协议签署未完成不得进入交易提交', '关键操作需记录操作人、渠道、时间与设备信息'] },
        { title: '7. 合规与安全', paragraphs: ['涉及个人信息与交易数据的采集、传输、存储须符合银行信息安全规范。', '对外展示文案需经合规审核；涉及协议文本须使用最新发布版本。'] },
        { title: '8. 验收标准', items: ['主流程端到端通过率不低于 98%', '关键节点留痕字段完整率 100%', '与关联 PRD 范围一致且无遗漏业务规则', '业务方完成 UAT 并签署验收结论'] },
        { title: '9. 附录', paragraphs: [`文档创建：${meta.createTime}，最近更新：${meta.updateTime}，发布状态：${meta.status}，完备度：${meta.completeness}。`, `责任部门：${meta.department}。本文档由资产库自动生成摘要，完整版以正式归档文件为准。`] }
      ];
    }

    if (item.type === 'product-asset') {
      return [
        { title: '1. 文档说明', paragraphs: [`本文档为「${item.name}」的产品需求文档（PRD），编码 ${item.code}，定义产品功能、交互规则、数据规范及异常处理逻辑。`, `承接上游 BRD，归属${tags.activity}主题活动，负责人 ${item.owner}，版本 ${meta.version}。`] },
        { title: '1.1 文档目的', paragraphs: ['为 UI 设计、前后端开发、测试用例编写提供统一依据。', '明确与关联业务功能、下游研发任务的接口与边界。'] },
        { title: '1.2 术语定义', items: ['BRD：业务需求说明书', 'PRD：产品需求文档', 'FDD：功能设计文档', '留痕：可审计的操作记录'] },
        { title: '2. 功能概述', paragraphs: [item.desc, '本 PRD 聚焦单一产品能力交付，不包含跨产品编排的完整客户旅程（由业务资产统一定义）。'] },
        { title: '3. 用户故事', items: [`作为客户，我希望顺利完成「${item.name}」，以便继续后续银行业务操作`, '作为产品经理，我希望配置规则与文案模板，以便快速响应监管或业务变更', '作为客服，我希望查询操作记录，以便解答客户咨询'] },
        { title: '4. 功能详述', paragraphs: ['功能按页面/模块拆分，每个模块需定义入口、主路径、异常路径与空态。'] },
        { title: '4.1 主流程', paragraphs: ['进入功能 → 加载必要上下文（账户/协议/限额） → 用户确认 → 提交核心服务 → 展示结果。', '加载中展示骨架屏；超过 3 秒给出等待提示。'] },
        { title: '4.2 页面与交互', items: ['必填项未满足时禁用提交按钮并提示缺失项', '协议/条款支持展开全文与勾选联动', '错误提示需包含错误码与建议操作', '成功页提供下一步引导（返回首页/继续办理）'] },
        { title: '5. 数据规范', paragraphs: ['与数据标准团队对齐字段命名、类型、长度与枚举值。关键交易须生成全局流水号。'] },
        { title: '5.1 核心字段', items: ['requestId：请求唯一标识', 'userId / custId：客户标识', 'channelCode：渠道编码', 'deviceId：设备指纹', 'bizStatus：业务处理状态', 'timestamp：服务端处理时间'] },
        { title: '6. 接口依赖', items: ['用户中心：身份与账户状态', '协议中心：模板与签署记录', '风控/限额服务：规则校验', '消息中心：结果通知（如适用）'] },
        { title: '7. 异常处理', paragraphs: ['网络超时：支持重试 3 次，仍失败则提示稍后再试。', '业务拒绝：展示明确原因，不可使用系统异常等模糊文案。', '部分成功：需定义补偿或对账机制并告知客户。'] },
        { title: '8. 非功能需求', items: ['接口 P99 响应 < 800ms（不含第三方）', '关键操作日志可追溯 ≥ 180 天', '支持灰度发布与快速回滚'] },
        { title: '9. 测试要点', items: ['主流程 happy path 与边界值', '弱网/超时/重复提交', '多端适配（iOS/Android/鸿蒙）', '与 BRD 业务规则一致性'] },
        { title: '10. 版本记录', paragraphs: [`v${meta.version.replace(/^v/, '')}（${meta.updateTime}）：当前发布版本。`, `维护人：${item.owner}，部门：${meta.department}。`] }
      ];
    }

    return [
      { title: '1. 文档说明', paragraphs: [`本文档为「${item.name}」的功能文档（FDD），编码 ${item.code}，描述功能定义、处理逻辑、输入输出及上下游依赖。`, `功能挂载于${tags.domain} / ${tags.activity}，由 ${item.owner} 维护。`] },
      { title: '1.1 功能定位', paragraphs: [item.desc, '功能文档面向研发与测试，作为单点能力实现与联调验收的依据。'] },
      { title: '2. 功能入口', items: ['手机银行 APP 对应业务办理页', '远程银行坐席辅助入口（如适用）', '内部运营查询工具（只读）'] },
      { title: '3. 处理流程', paragraphs: ['接收请求后完成参数校验 → 调用领域服务 → 聚合结果 → 返回标准响应码。', '异步步骤需返回受理中状态并支持结果回查。'] },
      { title: '4. 输入输出', paragraphs: ['输入输出遵循接口规范，字段说明如下。'] },
      { title: '4.1 输入参数', items: ['custId：客户号（必填）', 'acctNo：账号（条件必填）', 'bizScene：业务场景码（必填）', 'extInfo：扩展 JSON（可选）'] },
      { title: '4.2 输出参数', items: ['resultCode：结果码，0000 为成功', 'resultMsg：结果描述', 'bizData：业务数据体', 'traceId：链路追踪 ID'] },
      { title: '5. 业务规则', items: ['账户状态异常则拒绝办理', '触发风控拦截时返回专用错误码', '幂等键重复提交返回原结果', '关键状态变更写操作日志'] },
      { title: '6. 依赖服务', items: ['核心账务服务', '用户认证服务', '限额与风控服务', '日志与监控平台'] },
      { title: '7. 异常与降级', paragraphs: ['依赖服务不可用时，按预设降级策略返回友好提示或排队受理。', '严禁静默失败；所有异常须上报监控并关联 traceId。'] },
      { title: '8. 性能与容量', items: ['峰值 TPS ≥ 500（单实例）', '超时阈值 3000ms', '支持水平扩展无状态部署'] },
      { title: '9. 验收标准', items: ['功能测试用例通过率 100%', '与 PRD/BRD 规则一致', '日志与监控埋点完整', '安全扫描无高危漏洞'] },
      { title: '10. 修订记录', paragraphs: [`最近更新：${meta.updateTime}，版本 ${meta.version}，状态 ${meta.status}。`, `文档责任人：${item.owner}（${meta.department}）。`] }
    ];
  }

  function assetDocumentSections(item) {
    if (seedAssetDocumentSections[item.id]) return seedAssetDocumentSections[item.id];
    return buildDefaultAssetDocumentSections(item);
  }

  function renderAssetDocSection(section, index) {
    const bodyHtml = section.paragraphs
      ? section.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')
      : section.body
        ? `<p>${esc(section.body)}</p>`
        : '';
    const listHtml = section.items?.length
      ? `<ul class="asset-doc-list">${section.items.map((entry) => `<li>${esc(entry)}</li>`).join('')}</ul>`
      : '';
    return `<section class="asset-doc-section">
      <h2 class="${index === 0 ? 'selected' : ''}">${esc(section.title)}</h2>
      ${bodyHtml}
      ${listHtml}
    </section>`;
  }

  function renderAssetTagChain(item, compact = false) {
    const tags = assetTagHierarchy(item);
    return `<div class="asset-tag-chain${compact ? ' compact' : ''}" aria-label="标签维度">
      <div class="asset-tag-chain-item"><em>价值链</em><span>${esc(tags.valueChain)}</span></div>
      <i class="asset-tag-chain-arrow" aria-hidden="true"></i>
      <div class="asset-tag-chain-item"><em>领域</em><span>${esc(tags.domain)}</span></div>
      <i class="asset-tag-chain-arrow" aria-hidden="true"></i>
      <div class="asset-tag-chain-item"><em>主题活动</em><span>${esc(tags.activity)}</span></div>
    </div>`;
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

  function renderAssetDetailDocument(item) {
    const doc = assetDocumentMeta(item.type);
    const sections = assetDocumentSections(item);
    const meta = assetDetailMeta(item);
    return `<div class="asset-detail-doc-panel">
      <div class="asset-doc-type-badge"><strong>${esc(doc.abbr)}</strong><span>${esc(doc.label)}</span><em>${esc(meta.version)} · ${esc(meta.updateTime)} 更新 · 共 ${sections.length} 节</em></div>
      <div class="asset-doc-body">
        <nav class="asset-doc-outline">
          <a class="active">${esc(item.name.length > 14 ? `${item.name.slice(0, 14)}…` : item.name)}</a>
          ${sections.map((section) => `<a>${esc(section.title)}</a>`).join('')}
        </nav>
        <div class="asset-doc-scroll">
          <article class="doc-article asset-doc-article">
            <h1>${esc(item.name)}</h1>
            <p class="asset-doc-subtitle">${esc(doc.label)} · ${esc(item.code)} · ${esc(item.owner)} · ${esc(meta.department)}</p>
            ${sections.map(renderAssetDocSection).join('')}
          </article>
        </div>
      </div>
    </div>`;
  }

  function relatedAssetsInActivity(item) {
    const activity = assetTagHierarchy(item).activity;
    return seedAssetResults.filter((asset) => assetTagHierarchy(asset).activity === activity);
  }

  function renderAssetDetailTags(item) {
    const tags = assetTagHierarchy(item);
    const meta = assetDetailMeta(item);
    const related = relatedAssetsInActivity(item);
    const levels = [
      { key: 'valueChain', label: '价值链标签', tone: 'blue', parent: null },
      { key: 'domain', label: '领域标签', tone: 'indigo', parent: tags.valueChain },
      { key: 'activity', label: '主题活动标签', tone: 'purple', parent: tags.domain }
    ];

    return `<div class="asset-detail-tags-panel">
      <div class="asset-tags-hero">
        <div class="asset-tags-hero-text">
          <strong>标签信息</strong>
          <p>${esc(item.name)} · ${esc(item.code)} · ${esc(assetTypeLabel(item.type))}</p>
        </div>
        ${renderAssetTagChain(item)}
      </div>

      <div class="asset-tags-main">
        <section class="asset-tags-tree-card">
          <h4>标签层级</h4>
          <div class="asset-tag-timeline">
            ${levels.map((level, index) => `
              <article class="asset-tag-timeline-item tone-${level.tone}${index === levels.length - 1 ? ' last' : ''}">
                <div class="asset-tag-timeline-axis">
                  <span class="asset-tag-level-badge tone-${level.tone}">L${index + 1}</span>
                  ${index < levels.length - 1 ? '<i class="asset-tag-timeline-line" aria-hidden="true"></i>' : ''}
                </div>
                <div class="asset-tag-timeline-body">
                  <div class="asset-tag-timeline-head">
                    <strong>${esc(level.label)}</strong>
                    ${level.parent ? `<em>上级：${esc(level.parent)}</em>` : '<em>根级标签</em>'}
                  </div>
                  <span class="asset-detail-tag tone-${level.tone} asset-tag-timeline-value">${esc(tags[level.key])}</span>
                </div>
              </article>`).join('')}
          </div>
        </section>

        <aside class="asset-tags-aside">
          <section class="asset-tags-aside-card">
            <h4>标注概览</h4>
            <dl class="asset-tags-kv">
              <div><dt>负责人</dt><dd>${esc(item.owner)}</dd></div>
              <div><dt>责任部门</dt><dd>${esc(meta.department)}</dd></div>
              <div><dt>标注来源</dt><dd>资产库自动标注</dd></div>
              <div><dt>最近更新</dt><dd>${esc(meta.updateTime)}</dd></div>
            </dl>
          </section>
          <section class="asset-tags-aside-card">
            <h4>同主题资产</h4>
            <p class="asset-tags-aside-count">「${esc(tags.activity)}」下共 <b>${related.length}</b> 项</p>
            <ul class="asset-tags-related-list">
              ${related.slice(0, 5).map((asset) => `
                <li>
                  <span>${esc(asset.name)}</span>
                  <em>${esc(assetTypeLabel(asset.type))}</em>
                </li>`).join('')}
            </ul>
          </section>
        </aside>
      </div>
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
    else tabContent = renderAssetDetailDocument(item);

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
      <div class="asset-detail-body ${state.assetDetailTab === 'lineage' ? 'lineage-mode' : ''} ${state.assetDetailTab === 'detail' ? 'doc-mode' : ''} ${state.assetDetailTab === 'tags' ? 'tags-mode' : ''}">${tabContent}</div>
    </section>`;
  }

  function assetResultsBaseFilter() {
    return seedAssetResults.filter((item) => {
      if (item.type !== state.assetActiveType) return false;
      if (state.assetScope === 'mine' && !item.mine && !assetMineOwners().includes(item.owner)) return false;
      return true;
    });
  }

  function filteredAssetResults() {
    const keyword = state.assetKeyword.trim().toLowerCase();
    const base = assetResultsBaseFilter();
    if (!keyword) return base;
    const matched = base.filter((item) => {
      const haystack = `${item.name}${item.code}${item.desc}${item.tag}${item.owner}`.toLowerCase();
      return haystack.includes(keyword);
    });
    return matched.length ? matched : base;
  }

  function assetResultTotal() {
    const stat = assetStats.find((item) => item.id === state.assetActiveType);
    const filtered = filteredAssetResults();
    if (!state.assetKeyword.trim() && state.assetScope === 'all') {
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
      ${renderAssetTagChain(item, true)}
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
      </div>
      <div class="asset-result-grid">
        ${cards.length ? cards.map(renderAssetResultCard).join('') : '<div class="asset-result-empty">暂无匹配资产，请调整关键词</div>'}
      </div>
      ${renderAssetPagination(total)}
    </section>`;
  }

  function runAssetSearch() {
    state.assetShowResults = true;
    state.assetPage = 1;
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
        <button class="chat-title-toggle tool-toggle" title="${state.railCollapsed ? '展开菜单' : '收起菜单'}" data-action="toggle-rail">${icon(state.railCollapsed ? 'panelLeft' : 'panelLeftClose', 18)}</button>
        <h2>${esc(chat?.title || '')}</h2>
        <div class="tools">
          <button class="tool-toggle ${state.showProgress ? 'active' : ''}" title="执行进度" data-action="open-progress">${icon('workflow', 18)}</button>
          <button class="tool-toggle ${state.tab === 'log' ? 'active' : ''}" title="${state.tab === 'log' ? '返回会话' : '流转日志'}" data-action="toggle-log">${icon(state.tab === 'log' ? 'chat' : 'log', 18)}</button>
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
              <b><span>需求2</span>账户选择与金额规则</b>
              <div>${avatar('product', 24, 1)}王产品 <em>零售金融部门</em><strong>客户体验</strong></div>
            </div>
            <div class="dispatch-item">
              <b><span>需求3</span>开户结果与凭证</b>
              <div>${avatar('product', 24, 2)}房产品 <em>渠道产品部门</em><strong>用户增长</strong></div>
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
          <button class="tool-toggle doc-tool" title="全屏">${icon('fullscreen', 18)}</button>
          <button class="tool-toggle doc-tool" title="复制">${icon('copy', 18)}</button>
          <button class="tool-toggle doc-tool" title="下载">${icon('download', 18)}</button>
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
    return `<aside class="progress-drawer">
      <header><h2>流程进度看板</h2><button class="drawer-close" data-action="close-progress" title="关闭">${icon('close', 18)}</button></header>
      <div class="progress-stage-bar">${PROGRESS_STAGES.map((stage) => `<span>${esc(stage)}</span>`).join('')}</div>
      <div class="progress-canvas progress-canvas-v3" style="min-height:${height}px">
        ${PROGRESS_STAGES.map((stage) => `<div class="progress-lane-shade"></div>`).join('')}
        ${showProgressProductCard() ? '<svg class="flow-lines flow-lines-v3" aria-hidden="true"></svg>' : ''}
        <div class="progress-col col-1">
          <article class="progress-demand-card">
            <h3>${esc(req.title)}</h3>
            <div class="progress-owner progress-owner-inline">
              ${avatar('business', 24)}<b>${esc(req.creator)}</b><em>创建于 ${esc(req.createTime.slice(0, 16))}</em>
            </div>
            ${children.length ? `<div class="progress-demand-children">${children.map((child) => `
              <div class="progress-child" data-flow-id="${esc(child.id)}">
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

    root.innerHTML = `<div class="app-shell ${state.page === 'workspace' ? 'workspace-mode' : ''} ${state.page === 'workspace' && state.railCollapsed ? 'rail-collapsed' : ''}">
      <aside class="rail ${state.page === 'workspace' && !state.railCollapsed ? 'rail-expanded' : ''}">
        <img class="logo-img" src="${LOGO_URL}" alt="业务需求平台"/>
        <nav class="rail-nav">
          <button class="rail-icon ${state.page === 'home' ? 'active' : ''}" data-action="nav" data-page="home" title="首页">${icon('home')}</button>
          <button class="rail-icon ${state.page === 'pool' ? 'active' : ''}" data-action="nav" data-page="pool" title="工作台">${icon('workbench')}</button>
          <button class="rail-icon ${['asset-search', 'asset-detail'].includes(state.page) ? 'active' : ''}" data-action="nav" data-page="asset-search" title="资产检索">${icon('assetSearch')}</button>
          <button class="rail-icon ${['asset-matrix', 'asset-domain-detail'].includes(state.page) ? 'active' : ''}" data-action="nav" data-page="asset-matrix" title="资产矩阵">${icon('assetMatrix')}</button>
          <button class="rail-icon ${state.page === 'workspace' ? 'active' : ''}" data-action="open-conversation" data-id="${esc(state.activeConversationId)}" title="会话">${icon('chat')}</button>
        </nav>
        ${state.page === 'workspace' && !state.railCollapsed ? renderRailSessions() : ''}
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
    fitViewport();
    if (state.showProgress) {
      bindProgressCanvasEvents(root);
      requestAnimationFrame(() => updateProgressFlowLines());
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
    pushMessage({ id: Date.now(), from: 'ai', html: '已派发 3 条承接任务。' });
    state.logs.push({ title: 'AI 推荐派发', time: '刚刚', text: '业务经理同意 AI 推荐派发方案，系统生成李一飞、王产品、房产品的承接任务。', artifact: '承接卡片' });
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
      case 'toggle-rail':
        state.railCollapsed = !state.railCollapsed;
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
        render();
        break;
      case 'open-asset-results':
        state.assetActiveType = el.dataset.type;
        runAssetSearch();
        break;
      case 'set-asset-type':
        state.assetActiveType = el.dataset.type;
        state.assetPage = 1;
        render();
        break;
      case 'set-asset-scope':
        state.assetScope = el.dataset.scope;
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
    const baseDesignH = 1080;
    const vw = document.documentElement.clientWidth || window.innerWidth;
    const vh = document.documentElement.clientHeight || window.innerHeight;
    const scaleW = vw / designW;
    let designH = baseDesignH;
    let scale = scaleW;
    let offsetX = 0;
    if (state.page === 'workspace') {
      const bottomInset = 32;
      designH = Math.min(baseDesignH, Math.floor((vh - bottomInset) / scaleW));
    }
    const scaledH = designH * scale;
    const offsetY = state.page === 'workspace'
      ? 0
      : (scaledH <= vh ? (vh - scaledH) / 2 : 0);
    const app = document.getElementById('app');
    document.documentElement.style.setProperty('--design-height', String(designH));
    app.style.transformOrigin = 'top left';
    app.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    document.documentElement.style.setProperty('--app-scale', String(scale));
    if (state.showProgress) {
      requestAnimationFrame(() => updateProgressFlowLines());
    }
  }

  window.addEventListener('resize', fitViewport);

  fitViewport();
  bindLineageCanvasEvents();
  render();
})();
