import { useState } from 'react';
import { Link } from 'react-router-dom';
import { events } from '../../data/dummy';

const tabs = ['すべて', '開催予定', '開催済み'];

const myEvents = events.slice(0, 5).map((event, i) => ({
  ...event,
  status: i < 3 ? '開催予定' : '開催済み',
}));

export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState('すべて');
  const filtered = activeTab === 'すべて' ? myEvents : myEvents.filter((e) => e.status === activeTab);
  const upcomingCount = myEvents.filter((e) => e.status === '開催予定').length;
  const pastCount = myEvents.filter((e) => e.status === '開催済み').length;

  const tabCount = (tab) => tab === 'すべて' ? myEvents.length : tab === '開催予定' ? upcomingCount : pastCount;

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-ehaco-text">申込済みイベント</h1>
        <Link to="/" className="text-sm text-accent hover:text-accent-light font-medium transition hidden sm:block">イベントを探す →</Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab
                ? 'bg-accent text-white shadow-sm'
                : 'bg-white text-muted ring-1 ring-ehaco-border hover:ring-accent/30 hover:text-accent'
            }`}>
            {tab} <span className="ml-1 opacity-70">{tabCount(tab)}</span>
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((event) => (
            <Link key={event.id} to={`/event/${event.id}`}
              className="bg-white rounded-xl ring-1 ring-ehaco-border/50 p-4 flex gap-4 items-center hover:shadow-md transition-all group">
              <img src={event.image} alt={event.title} loading="lazy"
                className="w-16 h-16 md:w-20 md:h-16 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    event.status === '開催予定'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-gray-100 text-gray-500 border border-gray-200'
                  }`}>{event.status}</span>
                  <span className="text-xs text-muted">{event.dateShort}</span>
                </div>
                <p className="font-bold text-base text-ehaco-text line-clamp-1 group-hover:text-accent transition">{event.title}</p>
                <p className="text-sm text-muted mt-0.5 hidden sm:block">{event.organizer} · {event.location}</p>
              </div>
              <svg className="w-5 h-5 text-muted group-hover:text-accent transition shrink-0 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <p className="font-bold text-lg text-ehaco-text mb-2">申込済みイベントはありません</p>
          <p className="text-sm text-muted mb-5">気になるイベントを見つけて参加しましょう</p>
          <Link to="/" className="btn-gradient font-medium text-sm px-6 py-2.5 rounded-xl transition active:scale-[0.97]">イベントを探す</Link>
        </div>
      )}
    </div>
  );
}
