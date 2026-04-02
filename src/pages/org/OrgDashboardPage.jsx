import { Link } from 'react-router-dom';
import { orgEvents, orgApplicants } from '../../data/orgDummy';

const stats = [
  { label: '今月の申込数', value: '147', change: '+23', up: true, icon: 'M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z' },
  { label: '公開中のイベント', value: '2', change: '', up: null, icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5' },
  { label: '総フォロワー', value: '1,234', change: '+45', up: true, icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
  { label: 'ページビュー', value: '8,562', change: '+12%', up: true, icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' },
];

export default function OrgDashboardPage() {
  const activeEvents = orgEvents.filter((e) => e.status === '公開中');
  const recentApplicants = orgApplicants.slice(0, 5);

  return (
    <div className="fade-in">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text border-l-4 border-accent pl-4">
          ダッシュボード
        </h1>
        <p className="text-sm text-muted mt-2 pl-5">主催者管理画面の概要</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
            </div>
            <p className="text-2xl font-black text-ehaco-text">{stat.value}</p>
            <p className="text-xs text-muted mt-1">{stat.label}</p>
            {stat.change && (
              <p className={`text-xs font-medium mt-1 ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                {stat.change} <span className="text-muted font-normal">先月比</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Events */}
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-ehaco-text">公開中のイベント</h2>
            <Link to="/org/events" className="text-xs text-accent hover:text-accent-light font-medium transition">すべて見る →</Link>
          </div>
          <div className="space-y-4">
            {activeEvents.map((event) => {
              const pct = Math.round((event.applicants / event.capacity) * 100);
              return (
                <div key={event.id} className="flex gap-4 items-start">
                  <img src={event.image} alt="" className="w-16 h-11 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Link to={`/org/events/${event.id}/edit`} className="text-sm font-medium text-ehaco-text hover:text-accent transition line-clamp-1">
                      {event.title}
                    </Link>
                    <p className="text-xs text-muted mt-0.5">{event.date}　申込 {event.applicants}/{event.capacity}名 ({pct}%)</p>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                      <div className={`h-full rounded-full ${pct > 80 ? 'bg-amber-500' : 'bg-accent'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
            {activeEvents.length === 0 && (
              <p className="text-sm text-muted text-center py-4">公開中のイベントはありません</p>
            )}
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-ehaco-text">最近の申込者</h2>
            <Link to="/org/applicants" className="text-xs text-accent hover:text-accent-light font-medium transition">すべて見る →</Link>
          </div>
          <div className="space-y-3">
            {recentApplicants.map((a) => (
              <Link key={a.id} to={`/org/applicants/${a.id}`} className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 transition">
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-sm font-bold text-accent flex-shrink-0">
                  {a.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ehaco-text">{a.name}</p>
                  <p className="text-xs text-muted truncate">{a.company} · {a.eventTitle}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  a.status === '確定' ? 'bg-green-100 text-green-700 border-green-200' :
                  a.status === 'キャンセル' ? 'bg-gray-100 text-gray-500 border-gray-200' :
                  'bg-blue-100 text-blue-700 border-blue-200'
                }`}>{a.status}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/org/events/new" className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 flex items-center gap-4 card-hover group">
          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-sm text-ehaco-text">新規イベント作成</p>
            <p className="text-xs text-muted">イベントを登録する</p>
          </div>
        </Link>
        <Link to="/org/surveys" className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 flex items-center gap-4 card-hover group">
          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-sm text-ehaco-text">アンケート管理</p>
            <p className="text-xs text-muted">アンケートを作成・編集</p>
          </div>
        </Link>
        <Link to="/org/company" className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 flex items-center gap-4 card-hover group">
          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition">
            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-sm text-ehaco-text">企業設定</p>
            <p className="text-xs text-muted">企業情報を編集</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
