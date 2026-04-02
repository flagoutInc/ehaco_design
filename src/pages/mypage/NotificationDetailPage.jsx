import { Link, useParams } from 'react-router-dom';
import { notifications } from '../../data/dummy';

const typeLabels = {
  event: 'イベント', reminder: 'リマインダー', recommend: 'おすすめ',
  organizer: '主催者', system: 'システム',
};

const typeColors = {
  event: 'bg-accent text-white', reminder: 'bg-amber-500 text-white',
  recommend: 'bg-purple-500 text-white', organizer: 'bg-green-500 text-white',
  system: 'bg-gray-400 text-white',
};

const detailMessages = {
  1: 'お申し込みが完了しました。イベント当日のご参加をお待ちしております。\n\n■ イベント名\nDX推進のためのデータ活用戦略セミナー\n\n■ 日時\n2026年4月15日（水）14:00〜16:00\n\n■ 場所\nオンライン（Zoom）\n\n参加URLはイベント前日にメールでお送りします。',
  2: 'お申し込みいただいたイベントが明日開催されます。\n\n■ イベント名\nクラウドセキュリティ最前線 2026\n\n■ 日時\n2026年4月18日（金）13:00〜15:00\n\n■ 参加URL\nhttps://teams.microsoft.com/l/xxxxxxxxx\n\n開始10分前からご入室いただけます。',
  3: 'あなたの興味に基づいて、おすすめのイベントをご紹介します。\n\n■ AI×マーケティング実践ワークショップ\n2026年4月22日（火）\n東京都渋谷区（ハイブリッド開催）\n\nAIを活用したマーケティング戦略の実践手法を学べるワークショップです。',
  4: 'フォロー中の主催者が新しいイベントを公開しました。\n\n■ 主催者\nテックファーム株式会社\n\n■ 新着イベント\nデータドリブン経営の実践セミナー\n2026年5月10日（土）14:00〜\n\nぜひチェックしてみてください。',
  5: 'プロフィール情報を更新すると、あなたの興味に合ったイベントがより正確におすすめされます。\n\n■ 更新をおすすめする項目\n・興味のある分野タグ\n・業種\n・職種\n\nマイページのアカウント設定から更新できます。',
  6: 'お申し込みいただいたイベントの開催時間が変更されました。\n\n■ イベント名\nサステナビリティ経営と脱炭素戦略\n\n■ 変更前\n2026年4月20日（日）13:00〜15:00\n\n■ 変更後\n2026年4月20日（日）14:00〜16:00\n\nご不便をおかけして申し訳ございません。',
  7: '主催者からメッセージが届きました。\n\n■ 送信元\nテックファーム株式会社\n\n■ イベント\nDX推進のためのデータ活用戦略セミナー\n\n■ メッセージ\n参加者の皆様\n\nセミナー当日の資料を事前に共有いたします。以下のURLからダウンロードしてください。\n\nhttps://example.com/materials/dx-seminar.pdf\n\n事前にご一読いただくと、より理解が深まります。\n当日のご参加をお待ちしております。',
  8: '主催者から参加URLが届きました。\n\n■ 送信元\nファインディ株式会社\n\n■ イベント\nAI時代のエンジニア採用\n\n■ 参加URL\nhttps://zoom.us/j/xxxxxxxxx\nパスコード: 456789\n\n■ 開催日時\n2026年3月25日（水）9:30〜\n\n開始10分前からご入室いただけます。\nご不明点がございましたら主催者までお問い合わせください。',
};

export default function NotificationDetailPage() {
  const { id } = useParams();
  const notif = notifications.find((n) => n.id === Number(id));

  if (!notif) return (
    <div className="text-center py-16">
      <p className="text-lg font-bold text-ehaco-text mb-2">お知らせが見つかりません</p>
      <Link to="/mypage/notifications" className="text-sm text-accent hover:text-accent-light font-medium">お知らせ一覧に戻る</Link>
    </div>
  );

  const eventLink = notif.eventId ? `/event/${notif.eventId}` : null;

  return (
    <div className="fade-in">
      <div className="max-w-2xl">
        <div className="mb-6">
          <Link to="/mypage/notifications" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            お知らせ一覧
          </Link>
        </div>

        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeColors[notif.type] || typeColors.system}`}>
              {typeLabels[notif.type] || 'お知らせ'}
            </span>
            <span className="text-sm text-muted">{notif.dateRelative}</span>
          </div>

          <h1 className="text-xl md:text-2xl font-black text-ehaco-text mb-2">{notif.title}</h1>
          <p className="text-base text-muted mb-6">{notif.message}</p>

          <div className="border-t border-ehaco-border pt-6">
            <pre className="text-base text-ehaco-text whitespace-pre-wrap leading-relaxed">{detailMessages[notif.id] || notif.message}</pre>
          </div>

          {eventLink && (
            <div className="mt-6 pt-6 border-t border-ehaco-border">
              <Link to={eventLink} className="inline-flex items-center gap-2 btn-gradient font-medium text-sm px-5 py-2.5 rounded-lg transition active:scale-[0.97]">
                イベント詳細を見る
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
