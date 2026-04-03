const monthlyData = [
  { month: '2025/11', pv: 182400, users: 8200, events: 45 },
  { month: '2025/12', pv: 195600, users: 8900, events: 52 },
  { month: '2026/01', pv: 210300, users: 9500, events: 58 },
  { month: '2026/02', pv: 238700, users: 10200, events: 64 },
  { month: '2026/03', pv: 261400, users: 11800, events: 71 },
  { month: '2026/04', pv: 284592, users: 12458, events: 78 },
];

const topPages = [
  { path: '/', label: 'トップページ', views: 84200 },
  { path: '/search', label: 'イベント検索', views: 62100 },
  { path: '/event/1', label: 'DX推進のためのデータ活用戦略セミナー', views: 15800 },
  { path: '/event/2', label: 'AI活用最前線セミナー', views: 12400 },
  { path: '/event/5', label: 'サイバーセキュリティ対策の最新動向', views: 9800 },
  { path: '/about', label: 'ehaco!とは', views: 8200 },
  { path: '/for-organizers', label: 'イベント掲載', views: 6500 },
];

const topCategories = [
  { name: 'DX推進', count: 24, percentage: 31 },
  { name: 'AI活用', count: 18, percentage: 23 },
  { name: 'セキュリティ', count: 12, percentage: 15 },
  { name: 'マーケティング', count: 10, percentage: 13 },
  { name: '人事・HR', count: 8, percentage: 10 },
  { name: 'その他', count: 6, percentage: 8 },
];

import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';

export default function AdminAnalyticsPage() {
  const latest = monthlyData[monthlyData.length - 1];

  return (
    <div className="fade-in">
      <div className="mb-6">
        <PageHeader title="アクセス解析" subtitle="サイト全体のアクセス状況" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="今月のPV" value={latest.pv.toLocaleString()} />
        <StatCard label="ユーザー数" value={latest.users.toLocaleString()} />
        <StatCard label="公開イベント数" value={latest.events} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm">
          <div className="px-5 py-4 border-b border-ehaco-border">
            <h2 className="font-bold text-ehaco-text">月別推移</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ehaco-border bg-ehaco-bg/50">
                  <th className="text-left px-5 py-2.5 font-semibold text-muted">月</th>
                  <th className="text-right px-5 py-2.5 font-semibold text-muted">PV</th>
                  <th className="text-right px-5 py-2.5 font-semibold text-muted">ユーザー</th>
                  <th className="text-right px-5 py-2.5 font-semibold text-muted">イベント</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ehaco-border/50">
                {monthlyData.map((d) => (
                  <tr key={d.month} className="hover:bg-gray-50">
                    <td className="px-5 py-2.5 font-medium text-ehaco-text">{d.month}</td>
                    <td className="px-5 py-2.5 text-right text-muted">{d.pv.toLocaleString()}</td>
                    <td className="px-5 py-2.5 text-right text-muted">{d.users.toLocaleString()}</td>
                    <td className="px-5 py-2.5 text-right text-muted">{d.events}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm">
          <div className="px-5 py-4 border-b border-ehaco-border">
            <h2 className="font-bold text-ehaco-text">カテゴリ別イベント数</h2>
          </div>
          <div className="p-5 space-y-3">
            {topCategories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-ehaco-text font-medium">{cat.name}</span>
                  <span className="text-muted">{cat.count}件 ({cat.percentage}%)</span>
                </div>
                <div className="h-2 bg-ehaco-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm">
        <div className="px-5 py-4 border-b border-ehaco-border">
          <h2 className="font-bold text-ehaco-text">人気ページ（今月）</h2>
        </div>
        <div className="divide-y divide-ehaco-border/50">
          {topPages.map((page, i) => (
            <div key={page.path} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition">
              <span className="w-6 text-center text-sm font-bold text-muted">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ehaco-text truncate">{page.label}</p>
                <p className="text-xs text-muted">{page.path}</p>
              </div>
              <span className="text-sm font-bold text-ehaco-text">{page.views.toLocaleString()} PV</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
