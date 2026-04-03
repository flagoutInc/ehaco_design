import { useState } from 'react';
import StatusBadge from '../../components/StatusBadge';
import PageHeader from '../../components/PageHeader';
import TabControl from '../../components/TabControl';

type Notice = {
  id: number;
  title: string;
  target: '全体' | 'ユーザー' | '主催者';
  status: '公開中' | '下書き' | '予約';
  publishedAt: string;
  author: string;
};

const dummyNotices: Notice[] = [
  { id: 1, title: '【重要】4月10日メンテナンスのお知らせ', target: '全体', status: '公開中', publishedAt: '2026-04-03 10:00', author: '管理者' },
  { id: 2, title: '新機能リリース: イベントお気に入り機能', target: 'ユーザー', status: '公開中', publishedAt: '2026-04-01 09:00', author: '管理者' },
  { id: 3, title: '主催者向け: アンケート機能アップデート', target: '主催者', status: '公開中', publishedAt: '2026-03-28 14:00', author: '管理者' },
  { id: 4, title: 'GW期間のサポート対応について', target: '全体', status: '下書き', publishedAt: '', author: '管理者' },
  { id: 5, title: '利用規約改定のお知らせ', target: '全体', status: '下書き', publishedAt: '', author: '管理者' },
  { id: 6, title: '5月キャンペーンのお知らせ', target: 'ユーザー', status: '予約', publishedAt: '2026-05-01 00:00', author: '管理者' },
];

const statusColors: Record<string, string> = {
  '公開中': 'bg-emerald-100 text-emerald-700',
  '下書き': 'bg-gray-100 text-gray-700',
  '予約': 'bg-blue-100 text-blue-700',
};

const targetColors: Record<string, string> = {
  '全体': 'bg-purple-100 text-purple-700',
  'ユーザー': 'bg-accent/10 text-accent',
  '主催者': 'bg-amber-100 text-amber-700',
};

export default function AdminNoticesPage() {
  const [tab, setTab] = useState<string>('すべて');
  const filtered = tab === 'すべて' ? dummyNotices : dummyNotices.filter((n) => n.status === tab);

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="お知らせ管理" subtitle="サイト全体のお知らせ作成・管理" />
        <button className="px-4 py-2.5 text-sm font-semibold bg-accent text-white rounded-xl hover:bg-accent-light transition flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          新規作成
        </button>
      </div>

      <div className="mb-6">
        <TabControl
          tabs={['すべて', '公開中', '下書き', '予約']}
          activeTab={tab}
          onTabChange={setTab}
        />
      </div>

      <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm">
        <div className="divide-y divide-ehaco-border/50">
          {filtered.map((notice) => (
            <div key={notice.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 hover:bg-gray-50 transition">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <StatusBadge label={notice.target} colorMap={targetColors} />
                  <StatusBadge label={notice.status} colorMap={statusColors} />
                </div>
                <h3 className="text-sm font-bold text-ehaco-text">{notice.title}</h3>
                <p className="text-xs text-muted mt-0.5">
                  {notice.publishedAt ? `公開: ${notice.publishedAt}` : '未公開'} · {notice.author}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="px-3 py-1.5 text-xs font-medium bg-white border border-ehaco-border text-muted rounded-lg hover:bg-gray-50 transition">
                  編集
                </button>
                {notice.status === '下書き' && (
                  <button className="px-3 py-1.5 text-xs font-medium bg-accent text-white rounded-lg hover:bg-accent-light transition">
                    公開
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 border-t border-ehaco-border text-sm text-muted">
          {filtered.length}件表示
        </div>
      </div>
    </div>
  );
}
