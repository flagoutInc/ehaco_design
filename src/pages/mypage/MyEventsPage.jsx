import { useState } from 'react';
import { Link } from 'react-router-dom';
import MypageSidebar from '../../components/MypageSidebar';
import { events } from '../../data/dummy';

const tabs = ['すべて', '開催予定', '開催済み'];

export default function MyEventsPage() {
  const [activeTab, setActiveTab] = useState('すべて');

  // Assign statuses to events for demo purposes
  const myEvents = events.slice(0, 3).map((event, index) => ({
    ...event,
    status: index < 2 ? '開催予定' : '開催済み',
  }));

  const filteredEvents =
    activeTab === 'すべて'
      ? myEvents
      : myEvents.filter((e) => e.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <MypageSidebar activePage="events" />
      <div className="mt-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl md:text-2xl font-black text-ehaco-text">申込済みイベント</h1>
            <div className="mt-2 h-1 w-12 bg-accent rounded-full" />
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-ehaco-border mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium transition relative ${
                  activeTab === tab
                    ? 'text-accent'
                    : 'text-gray-500 hover:text-ehaco-text'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Event list */}
          {filteredEvents.length > 0 ? (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl border border-ehaco-border overflow-hidden flex hover:shadow-md transition-shadow"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-[120px] h-[90px] md:w-[180px] md:h-[130px] object-cover shrink-0"
                  />
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            event.status === '開催予定'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {event.status}
                        </span>
                        <span className="text-xs text-gray-500">{event.date}</span>
                      </div>
                      <Link
                        to={`/event/${event.id}`}
                        className="font-bold text-ehaco-text hover:text-accent transition line-clamp-1"
                      >
                        {event.title}
                      </Link>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <img
                            src={event.organizerLogo}
                            alt={event.organizer}
                            className="w-4 h-4 rounded-full"
                          />
                          {event.organizer}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-3">
                      <button className="text-sm font-medium text-white bg-accent hover:bg-accent-light transition rounded-lg px-5 py-2.5 w-full sm:w-auto text-center">
                        参加URLを確認
                      </button>
                      <button className="text-sm text-gray-500 hover:text-red-500 transition border border-ehaco-border rounded-lg px-4 py-2 w-full sm:w-auto text-center">
                        キャンセル
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-ehaco-border p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-bold text-ehaco-text mb-1">申込済みのイベントはありません</p>
              <p className="text-sm text-gray-500 mb-4">気になるイベントを見つけて参加しましょう</p>
              <Link
                to="/search"
                className="inline-flex items-center gap-1 bg-accent hover:bg-accent-light text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
              >
                イベントを探す
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
      </div>
    </div>
  );
}
