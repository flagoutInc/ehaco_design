export const events = [
  {
    id: 1,
    title: 'DX推進のためのデータ活用戦略セミナー',
    organizer: 'テックイノベーション株式会社',
    organizerLogo:
      'https://ui-avatars.com/api/?name=TI&background=1a3a5c&color=fff&size=40',
    date: '2026年4月15日（水）14:00〜16:00',
    dateShort: '4/15（水）',
    location: 'オンライン（Zoom）',
    category: 'DX推進',
    tags: ['DX推進', 'データ分析', 'AI活用'],
    image:
      'https://placehold.co/400x225/1a3a5c/white?text=DX+Seminar',
    capacity: 200,
    remaining: 45,
    price: '無料',
    deadline: '2026年4月14日',
    isNew: true,
    isDeadlineSoon: false,
    description:
      'DX推進に必要なデータ活用の最新トレンドと、成功企業の具体的な事例を交えながら、実践的な戦略を解説します。',
  },
  {
    id: 2,
    title: 'クラウドセキュリティ最前線 2026',
    organizer: 'セキュアクラウド株式会社',
    organizerLogo:
      'https://ui-avatars.com/api/?name=SC&background=2d5f8a&color=fff&size=40',
    date: '2026年4月18日（金）13:00〜15:00',
    dateShort: '4/18（金）',
    location: 'オンライン（Teams）',
    category: 'セキュリティ',
    tags: ['セキュリティ', 'クラウド', 'ゼロトラスト'],
    image:
      'https://placehold.co/400x225/2d5f8a/white?text=Cloud+Security',
    capacity: 150,
    remaining: 12,
    price: '無料',
    deadline: '2026年4月17日',
    isNew: false,
    isDeadlineSoon: true,
  },
  {
    id: 3,
    title: 'AI×マーケティング実践ワークショップ',
    organizer: 'マーケテック・ラボ',
    organizerLogo:
      'https://ui-avatars.com/api/?name=ML&background=00b8d4&color=fff&size=40',
    date: '2026年4月22日（火）10:00〜12:00',
    dateShort: '4/22（火）',
    location: '東京都渋谷区（ハイブリッド）',
    category: 'マーケティング',
    tags: ['AI活用', 'マーケティング', '自動化'],
    image:
      'https://placehold.co/400x225/00b8d4/white?text=AI+Marketing',
    capacity: 80,
    remaining: 30,
    price: '5,000円',
    deadline: '2026年4月20日',
    isNew: true,
    isDeadlineSoon: false,
  },
  {
    id: 4,
    title: 'サステナビリティ経営と脱炭素戦略',
    organizer: 'グリーンビジネス協議会',
    organizerLogo:
      'https://ui-avatars.com/api/?name=GB&background=22c55e&color=fff&size=40',
    date: '2026年4月25日（金）15:00〜17:00',
    dateShort: '4/25（金）',
    location: 'オンライン（Zoom）',
    category: 'サステナビリティ',
    tags: ['サステナビリティ', 'ESG', '脱炭素'],
    image:
      'https://placehold.co/400x225/22c55e/white?text=Sustainability',
    capacity: 300,
    remaining: 180,
    price: '無料',
    deadline: '2026年4月24日',
    isNew: false,
    isDeadlineSoon: false,
  },
  {
    id: 5,
    title: 'リモートワーク時代の組織マネジメント',
    organizer: 'HRテクノロジーズ',
    organizerLogo:
      'https://ui-avatars.com/api/?name=HR&background=f59e0b&color=fff&size=40',
    date: '2026年4月28日（月）13:00〜14:30',
    dateShort: '4/28（月）',
    location: 'オンライン（Zoom）',
    category: '人事・HR',
    tags: ['人事・HR', 'リモートワーク', '組織開発'],
    image:
      'https://placehold.co/400x225/f59e0b/white?text=Remote+Work',
    capacity: 100,
    remaining: 5,
    price: '無料',
    deadline: '2026年4月27日',
    isNew: false,
    isDeadlineSoon: true,
  },
  {
    id: 6,
    title: 'SaaS事業の成長戦略とPLG',
    organizer: 'SaaSグロース・アカデミー',
    organizerLogo:
      'https://ui-avatars.com/api/?name=SG&background=8b5cf6&color=fff&size=40',
    date: '2026年5月10日（日）10:00〜12:00',
    dateShort: '5/10（日）',
    location: 'オンライン（Zoom）',
    category: 'ビジネス戦略',
    tags: ['SaaS', 'PLG', 'グロース'],
    image:
      'https://placehold.co/400x225/8b5cf6/white?text=SaaS+Growth',
    capacity: 120,
    remaining: 88,
    price: '3,000円',
    deadline: '2026年5月8日',
    isNew: true,
    isDeadlineSoon: false,
  },
];

export const notifications = [
  {
    id: 1,
    type: 'event',
    title: 'イベント申込完了',
    message:
      '「DX推進のためのデータ活用戦略セミナー」への申込が完了しました。',
    dateRelative: '2時間前',
    read: false,
  },
  {
    id: 2,
    type: 'reminder',
    title: 'イベント開催リマインダー',
    message:
      '「クラウドセキュリティ最前線 2026」が明日開催されます。',
    dateRelative: '3時間前',
    read: false,
  },
  {
    id: 3,
    type: 'recommend',
    title: 'おすすめイベント',
    message:
      'あなたの興味に基づくおすすめ：「AI×マーケティング実践ワークショップ」',
    dateRelative: '昨日',
    read: true,
  },
  {
    id: 4,
    type: 'organizer',
    title: 'フォロー中の主催者の新着',
    message:
      'テックイノベーション株式会社が新しいイベントを公開しました。',
    dateRelative: '2日前',
    read: true,
  },
  {
    id: 5,
    type: 'system',
    title: 'ehaco!からのお知らせ',
    message:
      'プロフィール情報を更新すると、よりパーソナライズされたイベント情報をお届けします。',
    dateRelative: '3日前',
    read: true,
  },
  {
    id: 6,
    type: 'event',
    title: 'イベント変更のお知らせ',
    message:
      '「サステナビリティ経営と脱炭素戦略」の開催時間が変更されました。',
    dateRelative: '4日前',
    read: true,
  },
];

export const speakers = [
  {
    name: '山田 太郎',
    title: 'テックイノベーション株式会社 CTO',
    photo:
      'https://ui-avatars.com/api/?name=TY&background=1a3a5c&color=fff&size=80',
    bio: 'エンタープライズDXの推進を15年以上にわたりリード。',
  },
  {
    name: '佐藤 花子',
    title: 'データサイエンス部 部長',
    photo:
      'https://ui-avatars.com/api/?name=HS&background=00b8d4&color=fff&size=80',
    bio: 'データ分析の専門家として、100社以上のコンサルティング実績。',
  },
];

export const user = {
  name: '鈴木 一郎',
  email: 'suzuki@example.com',
  avatar:
    'https://ui-avatars.com/api/?name=IS&background=1a3a5c&color=fff&size=40',
  company: '株式会社サンプル',
  department: '情報システム部',
  position: 'マネージャー',
  interests: ['DX推進', 'AI活用', 'セキュリティ'],
  upcomingEvents: 3,
  favoriteCount: 8,
};

export const categories = [
  'DX推進',
  'セキュリティ',
  'AI活用',
  'マーケティング',
  'サステナビリティ',
  '人事・HR',
  'ビジネス戦略',
  'SaaS',
  'データ分析',
  'クラウド',
  '経営',
  '営業・CS',
];

export const areas = [
  'オンライン',
  '東京',
  '大阪',
  '名古屋',
  '福岡',
  '札幌',
  'その他',
];
