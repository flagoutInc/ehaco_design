import { Link, useParams } from 'react-router-dom';
import { orgApplicants, orgEvents } from '../../data/orgDummy';

export default function ApplicantDetailPage() {
  const { id } = useParams<{ id: string }>();
  const applicant = orgApplicants.find((a) => a.id === Number(id)) || orgApplicants[0];
  const event = orgEvents.find((e) => e.id === applicant.eventId) || orgEvents[0];

  const statusColors: Record<string, string> = {
    '確定': 'bg-green-100 text-green-700 border-green-200',
    'キャンセル': 'bg-gray-100 text-gray-500 border-gray-200',
    '未確定': 'bg-blue-100 text-blue-700 border-blue-200',
  };

  return (
    <div className="fade-in">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link to="/org/applicants" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          申込者一覧に戻る
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text border-l-4 border-accent pl-4 mb-8">
        申込者詳細
      </h1>

      <div className="max-w-3xl space-y-6">
        {/* Profile */}
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-xl font-bold text-accent flex-shrink-0">
              {applicant.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-ehaco-text">{applicant.name}</h2>
                <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${statusColors[applicant.status] || statusColors['未確定']}`}>
                  {applicant.status}
                </span>
              </div>
              <p className="text-sm text-muted">{applicant.company}</p>
            </div>
          </div>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
            <div>
              <dt className="text-muted mb-0.5">メールアドレス</dt>
              <dd className="font-medium text-ehaco-text">{applicant.email}</dd>
            </div>
            <div>
              <dt className="text-muted mb-0.5">電話番号</dt>
              <dd className="font-medium text-ehaco-text">{(applicant as Record<string, unknown>).phone as string || '—'}</dd>
            </div>
            <div>
              <dt className="text-muted mb-0.5">部署・役職</dt>
              <dd className="font-medium text-ehaco-text">{(applicant as Record<string, unknown>).department as string || '経営企画部'} / {(applicant as Record<string, unknown>).position as string || 'マネージャー'}</dd>
            </div>
            <div>
              <dt className="text-muted mb-0.5">申込日時</dt>
              <dd className="font-medium text-ehaco-text">{applicant.date} {(applicant as Record<string, unknown>).time as string || ''}</dd>
            </div>
          </dl>
        </div>

        {/* Event info */}
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6">
          <h3 className="font-bold text-ehaco-text mb-4 pl-3 border-l-4 border-accent">申込イベント</h3>
          <div className="flex gap-4 items-start">
            <img src={event.image} alt={event.title} className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />
            <div>
              <Link to={`/org/events/${event.id}/edit`} className="font-medium text-ehaco-text hover:text-accent transition">
                {event.title}
              </Link>
              <p className="text-sm text-muted mt-1">開催日: {event.date}</p>
              <p className="text-sm text-muted">チケット: {(applicant as Record<string, unknown>).ticket as string || '一般参加'}</p>
            </div>
          </div>
        </div>

        {/* Questionnaire answers */}
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6">
          <h3 className="font-bold text-ehaco-text mb-4 pl-3 border-l-4 border-accent">アンケート回答</h3>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-muted mb-1">参加の動機</dt>
              <dd className="text-ehaco-text bg-gray-50 rounded-lg p-3">DX推進に必要な知識を体系的に学びたいため。特にデータ活用戦略に興味があります。</dd>
            </div>
            <div>
              <dt className="text-muted mb-1">御社の業種</dt>
              <dd className="text-ehaco-text bg-gray-50 rounded-lg p-3">IT・テクノロジー</dd>
            </div>
            <div>
              <dt className="text-muted mb-1">従業員数</dt>
              <dd className="text-ehaco-text bg-gray-50 rounded-lg p-3">100〜299名</dd>
            </div>
          </dl>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button className="btn-gradient px-6 py-2.5 rounded-xl text-sm font-medium cursor-pointer active:scale-[0.97] transition">
            ステータスを変更
          </button>
          <button className="border border-ehaco-border text-ehaco-text px-6 py-2.5 rounded-xl text-sm font-medium hover:border-accent hover:text-accent transition cursor-pointer">
            メールを送信
          </button>
          <button className="border border-red-300 text-red-500 px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-red-50 transition cursor-pointer">
            申込をキャンセル
          </button>
        </div>
      </div>
    </div>
  );
}
