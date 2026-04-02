import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { events, user } from '../data/dummy';

export default function ApplyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === Number(id)) || events[0];
  const [agree, setAgree] = useState(false);
  const [followOrganizer, setFollowOrganizer] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/event/${id}/apply/complete`);
  };

  const profileItems = [
    { label: 'メールアドレス', value: user.email },
    { label: '氏名', value: user.name },
    { label: '会社名', value: user.company },
    { label: '会社URL', value: user.companyUrl },
    { label: '電話番号', value: user.phone },
    { label: '業種', value: user.industry },
    { label: '従業員規模', value: user.employees },
    { label: '職種', value: user.department },
    { label: '役職', value: user.position },
  ];

  return (
    <div className="min-h-screen bg-ehaco-bg pb-12 fade-in">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Back */}
        <Link to={`/event/${id}`} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ehaco-text transition-colors mb-6">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          イベント詳細に戻る
        </Link>

        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text mb-6">
          お申込み確認
        </h1>

        {/* Event summary */}
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 mb-6">
          <div className="flex gap-4 items-start">
            <img src={event.image} alt={event.title} className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />
            <div className="min-w-0">
              <h2 className="font-bold text-ehaco-text line-clamp-2 leading-snug">{event.title}</h2>
              <p className="text-sm text-muted mt-1">{event.date}</p>
              <p className="text-sm text-muted">{event.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-ehaco-border/50 text-sm text-muted">
            <span>申込 {event.capacity - event.remaining}/{event.capacity}名</span>
            <span>締切 {event.deadline}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Profile info (read-only) */}
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-ehaco-text pl-3 border-l-4 border-accent">お申込者情報</h2>
              <Link to="/mypage/profile" className="text-xs text-accent hover:text-accent-light transition">
                変更する →
              </Link>
            </div>
            <p className="text-xs text-muted mb-4">以下の登録情報でお申込みします。変更が必要な場合はマイページから編集してください。</p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
              {profileItems.map((item) => (
                <div key={item.label} className="contents">
                  <dt className="text-muted whitespace-nowrap">{item.label}</dt>
                  <dd className="text-ehaco-text font-medium truncate">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Follow organizer */}
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 mb-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={followOrganizer} onChange={(e) => setFollowOrganizer(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-ehaco-border text-accent focus:ring-accent" />
              <div>
                <p className="text-sm font-medium text-ehaco-text">イベントの主催者をフォローする</p>
                <p className="text-xs text-muted mt-0.5">
                  <span className="font-medium">{event.organizer}</span> が新しいイベントを公開したときに通知が届きます。
                </p>
              </div>
            </label>
          </div>

          {/* Privacy consent */}
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 mb-6">
            <h3 className="font-bold text-ehaco-text text-sm mb-3">ご提供頂く個人情報の取り扱いについて</h3>
            <div className="text-xs text-muted space-y-2 mb-4">
              <p>本サイトからの申込みに際して、以下の事項に同意されたものと見なします。</p>
              <ul className="space-y-1.5 pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">○</span>
                  <span>ご入力頂いた個人情報は、イベント主催企業及び共催企業、コンテンツ提供元企業へ収集されます。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">○</span>
                  <span>イベント主催企業及び共催企業、コンテンツ提供元企業からのメールマガジン、電話、送付物による情報提供を受け取ります。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">○</span>
                  <span>提供された個人情報は、各情報提供元企業のプライバシーポリシー下で適切に取り扱われます。</span>
                </li>
              </ul>
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-ehaco-border text-accent focus:ring-accent" />
              <span className="text-sm text-ehaco-text">個人情報の取扱いに同意します</span>
            </label>
          </div>

          {/* Deadline reminder */}
          <div className="flex items-center gap-2 text-xs text-muted mb-4 justify-end">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            申込締切 {event.deadline}
          </div>

          {/* Submit */}
          <button type="submit" disabled={!agree}
            className="w-full btn-gradient text-lg font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg">
            この内容で申し込む
          </button>

        </form>
      </div>
    </div>
  );
}
