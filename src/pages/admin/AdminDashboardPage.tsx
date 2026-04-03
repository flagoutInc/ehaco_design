import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';

const stats = [
  { label: '総ユーザー数', value: '12,458', change: '+234', to: '/admin/users' },
  { label: '審査待ち主催者', value: '3', change: '', to: '/admin/organizers' },
  { label: '今月のPV', value: '284,592', change: '+12.3%', to: '/admin/analytics' },
  { label: '公開イベント数', value: '78', change: '+7', to: '/admin/analytics' },
];

const recentActivity = [
  { type: 'organizer', message: '株式会社デジタルHRが主催者登録を申請', time: '15分前', status: 'pending' },
  { type: 'user', message: '新規ユーザー登録: 田中太郎', time: '30分前', status: 'done' },
  { type: 'user', message: 'ユーザー「佐藤次郎」をアカウント停止', time: '1時間前', status: 'done' },
  { type: 'notice', message: 'メンテナンスお知らせを公開しました', time: '2時間前', status: 'done' },
  { type: 'organizer', message: 'エナジーテック合同会社の審査を完了', time: '3時間前', status: 'done' },
  { type: 'user', message: '新規ユーザー登録: 伊藤美咲', time: '5時間前', status: 'done' },
];

export default function AdminDashboardPage() {
  return (
    <div className="fade-in">
      <div className="mb-8">
        <PageHeader title="管理者ダッシュボード" subtitle="ehaco! サイト全体の管理" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            change={stat.change || undefined}
            to={stat.to}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-ehaco-border">
            <h2 className="font-bold text-ehaco-text">最近のアクティビティ</h2>
          </div>
          <div className="divide-y divide-ehaco-border/50">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3.5">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                  item.status === 'pending' ? 'bg-amber-500' : 'bg-emerald-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ehaco-text">{item.message}</p>
                  <p className="text-xs text-muted mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-ehaco-border">
            <h2 className="font-bold text-ehaco-text">要対応</h2>
          </div>
          <div className="p-5 space-y-3">
            <Link to="/admin/organizers" className="flex items-center justify-between p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5M3.75 3v18m16.5-18v18" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-blue-800">主催者審査待ち</span>
              </div>
              <span className="text-lg font-black text-blue-600">3件</span>
            </Link>
            <Link to="/admin/notices" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gray-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <span className="text-sm font-medium text-gray-700">下書きお知らせ</span>
              </div>
              <span className="text-lg font-black text-gray-500">2件</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
