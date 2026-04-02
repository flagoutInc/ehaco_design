import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { events } from '../data/dummy';
import EventCard from '../components/EventCard';

const orgData = {
  1: {
    name: 'テックイノベーション株式会社',
    logo: 'https://ui-avatars.com/api/?name=TI&background=6366f1&color=fff&size=120',
    followers: 1234,
    eventsCount: 28,
    description: 'テックイノベーション株式会社は、DX推進とAIソリューションを提供するテクノロジー企業です。企業のデジタル変革を支援し、最新技術の社会実装に取り組んでいます。定期的にDX・AI関連のセミナーやワークショップを開催しています。',
    website: 'https://tech-innovation.example.com',
    industry: 'IT・テクノロジー',
    founded: '2015年',
  },
};

export default function OrganizerProfilePage() {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);
  const [tab, setTab] = useState('upcoming');

  const org = orgData[id] || orgData[1];
  const orgEvents = events.filter((_, i) => i % 3 === 0);
  const upcomingEvents = orgEvents.slice(0, 4);
  const pastEvents = orgEvents.slice(2, 6);
  const displayEvents = tab === 'upcoming' ? upcomingEvents : pastEvents;

  const tabs = [
    { key: 'upcoming', label: '開催予定', count: upcomingEvents.length },
    { key: 'past', label: '過去のイベント', count: pastEvents.length },
  ];

  return (
    <div className="min-h-screen bg-ehaco-bg pb-12 fade-in">
      {/* Hero */}
      <div className="bg-primary h-32 md:h-44" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-12 relative z-10">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-lg ring-1 ring-ehaco-border/50 p-6 md:p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <img src={org.logo} alt={org.name} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl ring-4 ring-white shadow-md flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight text-ehaco-text">{org.name}</h1>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`shrink-0 px-5 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                    isFollowing
                      ? 'bg-gray-100 text-muted hover:bg-gray-200'
                      : 'btn-gradient'
                  }`}>
                  {isFollowing ? 'フォロー中' : 'フォローする'}
                </button>
              </div>
              <p className="text-sm text-muted mb-3">{org.industry}</p>
              <div className="flex gap-6 text-sm">
                <div><span className="font-bold text-ehaco-text">{org.followers.toLocaleString()}</span> <span className="text-muted">フォロワー</span></div>
                <div><span className="font-bold text-ehaco-text">{org.eventsCount}</span> <span className="text-muted">イベント開催</span></div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-ehaco-border/50">
            <p className="text-sm text-gray-600 leading-relaxed">{org.description}</p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                {org.website}
              </span>
              <span className="flex items-center gap-1.5 text-muted">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                設立 {org.founded}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 border-b border-ehaco-border">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-3 text-sm font-medium transition relative cursor-pointer ${
                tab === t.key ? 'text-accent' : 'text-muted hover:text-ehaco-text'
              }`}>
              {t.label}
              <span className="ml-1.5 text-xs text-muted">({t.count})</span>
              {tab === t.key && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />}
            </button>
          ))}
        </div>

        {/* Event list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayEvents.map((event) => (
            <EventCard key={event.id} event={event} variant="vertical" />
          ))}
        </div>

        {displayEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <p className="font-bold text-ehaco-text mb-2">イベントはありません</p>
            <p className="text-sm text-muted mb-4">この主催者はまだイベントを公開していません</p>
            <Link to="/" className="text-sm text-accent hover:text-accent-light font-medium transition">他のイベントを探す →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
