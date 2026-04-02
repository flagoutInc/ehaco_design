// 主催者管理画面用ダミーデータ

export const orgProfile = {
  companyName: 'テックファーム株式会社',
  displayName: 'テックファーム株式会社',
  pageUrl: 'tech-innovation',
  industry: 'IT・テクノロジー',
  employees: '100〜299名',
  revenue: '10億〜50億円',
  logoUrl: 'https://ui-avatars.com/api/?name=TI&background=6366f1&color=fff&size=120',
  contactUrl: 'https://tech-innovation.example.com/contact',
  contactEmail: 'events@tech-innovation.example.com',
  websiteUrl: 'https://tech-innovation.example.com',
  phone: '03-1234-5678',
  description: 'テックファーム株式会社は、DX推進とAIソリューションを提供するテクノロジー企業です。企業のデジタル変革を支援し、最新技術の社会実装に取り組んでいます。',
};

export const orgStaff = [
  { id: 101, name: '田中 太郎', email: 'tanaka@tech-innovation.example.com', phone: '03-1234-5678', status: '登録完了', role: '管理者' },
  { id: 102, name: '佐藤 花子', email: 'sato@tech-innovation.example.com', phone: '03-1234-5679', status: '登録完了', role: '編集者' },
  { id: 103, name: '鈴木 一郎', email: 'suzuki@tech-innovation.example.com', phone: '', status: '招待中', role: '閲覧者' },
];

export const orgEvents = [
  {
    id: 1,
    title: 'DX推進リーダーのためのデータ活用戦略セミナー',
    eventNo: 'EV-2026-001',
    image: '/ehaco_design/event-thumb-findy.png',
    date: '2026年4月15日（水）',
    capacity: 200,
    applicants: 147,
    deadline: '2026-04-14 18:00',
    status: '公開中',
    tickets: [
      { name: '一般参加', capacity: 150 },
      { name: 'VIP席', capacity: 50 },
    ],
  },
  {
    id: 2,
    title: 'AI×マーケティング実践ワークショップ',
    eventNo: 'EV-2026-002',
    image: '/ehaco_design/event-thumb-miginaname.png',
    date: '2026年4月22日（水）',
    capacity: 80,
    applicants: 63,
    deadline: '2026-04-21 23:59',
    status: '公開中',
    tickets: [
      { name: '一般参加', capacity: 80 },
    ],
  },
  {
    id: 3,
    title: 'クラウドセキュリティ最前線 2026',
    eventNo: 'EV-2026-003',
    image: '/ehaco_design/event-thumb-supporters.png',
    date: '2026年4月18日（金）',
    capacity: 300,
    applicants: 0,
    deadline: '2026-04-17 18:00',
    status: '公開前',
    tickets: [
      { name: '一般参加', capacity: 300 },
    ],
  },
  {
    id: 4,
    title: 'エンジニア採用の市場トレンドと求人訴求方法',
    eventNo: 'EV-2025-048',
    image: '/ehaco_design/event-thumb-dx-customer.png',
    date: '2026年3月10日（火）',
    capacity: 150,
    applicants: 132,
    deadline: '2026-03-09 18:00',
    status: '終了',
    tickets: [
      { name: '一般参加', capacity: 150 },
    ],
  },
  {
    id: 5,
    title: 'SaaS事業者向け カスタマーサクセス設計講座',
    eventNo: 'EV-2025-045',
    image: '/ehaco_design/event-thumb-dx-design.png',
    date: '2026年2月20日（金）',
    capacity: 100,
    applicants: 89,
    deadline: '2026-02-19 18:00',
    status: '終了',
    tickets: [
      { name: '一般参加', capacity: 100 },
    ],
  },
  {
    id: 6,
    title: 'リモートワーク時代の組織マネジメント',
    eventNo: 'EV-2026-004',
    image: '/ehaco_design/event-thumb-chokusai.png',
    date: '2026年5月10日（日）',
    capacity: 120,
    applicants: 0,
    deadline: '2026-05-09 18:00',
    status: '下書き',
    tickets: [],
  },
];

export const orgApplicants = [
  { id: 1, appliedAt: '2026-04-01 10:23', date: '2026-04-01', time: '10:23', eventName: 'DX推進リーダーのためのデータ活用戦略セミナー', eventTitle: 'DX推進リーダーのためのデータ活用戦略セミナー', eventId: 1, ticketName: '一般参加', ticket: '一般参加', company: '株式会社デジタルフロント', name: '山田 健太', email: 'yamada@digitalfront.example.com', phone: '03-1111-2222', field: 'IT・情報システム', status: '確定', cancelledAt: null },
  { id: 2, appliedAt: '2026-04-01 11:05', date: '2026-04-01', time: '11:05', eventName: 'DX推進リーダーのためのデータ活用戦略セミナー', eventTitle: 'DX推進リーダーのためのデータ活用戦略セミナー', eventId: 1, ticketName: 'VIP席', ticket: 'VIP席', company: 'グローバルコンサルティング合同会社', name: '高橋 美咲', email: 'takahashi@globalconsul.example.com', phone: '03-2222-3333', field: '経営企画', status: '確定', cancelledAt: null },
  { id: 3, appliedAt: '2026-04-02 09:15', date: '2026-04-02', time: '09:15', eventName: 'AI×マーケティング実践ワークショップ', eventTitle: 'AI×マーケティング実践ワークショップ', eventId: 2, ticketName: '一般参加', ticket: '一般参加', company: 'マーケティングプロ株式会社', name: '伊藤 直樹', email: 'ito@marketingpro.example.com', phone: '03-3333-4444', field: 'マーケティング', status: '確定', cancelledAt: null },
  { id: 4, appliedAt: '2026-04-02 14:30', date: '2026-04-02', time: '14:30', eventName: 'DX推進リーダーのためのデータ活用戦略セミナー', eventTitle: 'DX推進リーダーのためのデータ活用戦略セミナー', eventId: 1, ticketName: '一般参加', ticket: '一般参加', company: '東京製造株式会社', name: '渡辺 さくら', email: 'watanabe@tokyoseizo.example.com', phone: '', field: 'DX推進', status: '確定', cancelledAt: null },
  { id: 5, appliedAt: '2026-03-28 16:45', date: '2026-03-28', time: '16:45', eventName: 'DX推進リーダーのためのデータ活用戦略セミナー', eventTitle: 'DX推進リーダーのためのデータ活用戦略セミナー', eventId: 1, ticketName: '一般参加', ticket: '一般参加', company: '日本通信サービス株式会社', name: '中村 翔太', email: 'nakamura@nihontsushin.example.com', phone: '03-5555-6666', field: 'IT・情報システム', status: 'キャンセル', cancelledAt: '2026-03-30' },
  { id: 6, appliedAt: '2026-04-03 08:50', date: '2026-04-03', time: '08:50', eventName: 'AI×マーケティング実践ワークショップ', eventTitle: 'AI×マーケティング実践ワークショップ', eventId: 2, ticketName: '一般参加', ticket: '一般参加', company: 'クリエイティブワークス株式会社', name: '小林 由美', email: 'kobayashi@creativeworks.example.com', phone: '03-6666-7777', field: 'マーケティング', status: '確定', cancelledAt: null },
  { id: 7, appliedAt: '2026-04-03 10:10', date: '2026-04-03', time: '10:10', eventName: 'DX推進リーダーのためのデータ活用戦略セミナー', eventTitle: 'DX推進リーダーのためのデータ活用戦略セミナー', eventId: 1, ticketName: '一般参加', ticket: '一般参加', company: 'アドバンスシステム株式会社', name: '加藤 大輝', email: 'kato@advance-sys.example.com', phone: '', field: 'エンジニアリング', status: '確定', cancelledAt: null },
  { id: 8, appliedAt: '2026-04-03 13:20', date: '2026-04-03', time: '13:20', eventName: 'AI×マーケティング実践ワークショップ', eventTitle: 'AI×マーケティング実践ワークショップ', eventId: 2, ticketName: '一般参加', ticket: '一般参加', company: 'サンライズ商事株式会社', name: '吉田 真理', email: 'yoshida@sunrise.example.com', phone: '03-8888-9999', field: '営業', status: '確定', cancelledAt: null },
];

export const orgSurveys = [
  { id: 1, name: '参加者満足度アンケート', createdAt: '2026-03-15', status: '使用可', questionCount: 3, maxQuestions: 3, linkedEvents: 3, responses: 89 },
  { id: 2, name: 'セミナー改善フィードバック', createdAt: '2026-02-20', status: '使用可', questionCount: 3, maxQuestions: 3, linkedEvents: 2, responses: 45 },
  { id: 3, name: '参加者プロフィール調査', createdAt: '2026-01-10', status: 'アーカイブ', questionCount: 3, maxQuestions: 3, linkedEvents: 1, responses: 132 },
];

export const orgTargets = [
  { id: 1, name: 'IT部門マネージャー', industry: 'IT・ソフトウェア', employees: '100名以上', revenue: '', role: '部長・課長', position: 'マネージャー以上' },
  { id: 2, name: '経営企画・DX推進', industry: '', employees: '300名以上', revenue: '50億以上', role: '経営企画', position: '担当者以上' },
  { id: 3, name: 'マーケティング担当者', industry: '', employees: '', revenue: '', role: 'マーケティング', position: '' },
];
