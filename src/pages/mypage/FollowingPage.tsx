import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Organization {
  id: number;
  name: string;
  logo: string;
  industry: string;
  followers: number;
  eventsCount: number;
  latestEvent: string;
}

const followingOrgs: Organization[] = [
  { id: 1, name: 'テックファーム株式会社', logo: 'https://ui-avatars.com/api/?name=TI&background=6366f1&color=fff&size=80', industry: 'IT・テクノロジー', followers: 1234, eventsCount: 28, latestEvent: 'DX推進のためのデータ活用戦略セミナー' },
  { id: 2, name: '株式会社ネオキャリア', logo: 'https://ui-avatars.com/api/?name=SC&background=2d5f8a&color=fff&size=80', industry: 'セキュリティ', followers: 856, eventsCount: 15, latestEvent: 'クラウドセキュリティ最前線 2026' },
  { id: 3, name: '株式会社ミギナナメウエ', logo: 'https://ui-avatars.com/api/?name=ML&background=10b981&color=fff&size=80', industry: 'マーケティング', followers: 2100, eventsCount: 42, latestEvent: 'AI×マーケティング実践ワークショップ' },
  { id: 4, name: 'ファインディ株式会社', logo: 'https://ui-avatars.com/api/?name=AS&background=f59e0b&color=fff&size=80', industry: 'AI・機械学習', followers: 3450, eventsCount: 35, latestEvent: '生成AI活用の最前線' },
  { id: 5, name: 'グリーンテック・ジャパン', logo: 'https://ui-avatars.com/api/?name=GT&background=059669&color=fff&size=80', industry: 'サステナビリティ', followers: 678, eventsCount: 12, latestEvent: 'GX推進セミナー 2026' },
];

export default function FollowingPage() {
  const [following, setFollowing] = useState<Set<number>>(new Set(followingOrgs.map((o) => o.id)));
  const toggleFollow = (id: number): void => {
    setFollowing((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  };

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-black text-ehaco-text">フォロー中</h1>
          <span className="text-sm text-muted bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">{following.size}社</span>
        </div>
        <Link to="/organizers" className="text-sm font-medium text-accent hover:text-accent-light transition flex items-center gap-1">
          主催者を探す
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
        </Link>
      </div>

      <div className="space-y-3">
        {followingOrgs.map((org) => {
          const isFollowing = following.has(org.id);
          return (
            <div key={org.id} className="bg-white rounded-xl ring-1 ring-ehaco-border/50 p-5 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <Link to={`/organizer/${org.id}`}>
                  <img src={org.logo} alt={org.name} className="w-12 h-12 rounded-xl shrink-0" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/organizer/${org.id}`} className="font-bold text-base text-ehaco-text hover:text-accent transition line-clamp-1">
                    {org.name}
                  </Link>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted bg-gray-100 px-1.5 py-0.5 rounded">{org.industry}</span>
                    <span className="text-xs text-muted">{org.eventsCount}イベント</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-ehaco-border/50">
                <Link to={`/event/${org.id}`} className="text-sm text-accent hover:underline line-clamp-1 flex-1 min-w-0 mr-3">
                  {org.latestEvent}
                </Link>
                <button onClick={() => toggleFollow(org.id)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                    isFollowing
                      ? 'border border-ehaco-border text-muted hover:border-red-300 hover:text-red-500'
                      : 'btn-gradient text-xs'
                  }`}>
                  {isFollowing ? 'フォロー中' : 'フォロー'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
