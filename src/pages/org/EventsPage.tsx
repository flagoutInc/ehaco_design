import { useState } from 'react';
import { Link } from 'react-router-dom';
import { orgEvents } from '../../data/orgDummy';
import TabControl from '../../components/TabControl';
import EmptyState from '../../components/EmptyState';
import { FormInput } from '../../components/FormInput';

const statusTabs = ['すべて', '公開中', '公開前', '下書き', '終了'];

function statusBadge(status: string): string {
  const map: Record<string, string> = {
    '公開中': 'bg-green-100 text-green-700 border border-green-200',
    '公開前': 'bg-blue-100 text-blue-700 border border-blue-200',
    '下書き': 'bg-gray-100 text-gray-500 border border-gray-200',
    '終了': 'bg-gray-100 text-gray-500 border border-gray-200',
  };
  return map[status] || 'bg-gray-100 text-gray-500 border border-gray-200';
}

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('すべて');
  const [searchName, setSearchName] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [surveyFilter, setSurveyFilter] = useState('');
  const [targetFilter, setTargetFilter] = useState('');

  const filtered = orgEvents.filter((ev) => {
    if (activeTab !== 'すべて' && ev.status !== activeTab) return false;
    if (searchName && !ev.title.includes(searchName)) return false;
    if (dateFrom && ev.date < dateFrom) return false;
    if (dateTo && ev.date > dateTo) return false;
    return true;
  });

  const countByStatus = (status: string): number =>
    orgEvents.filter((ev) => status === 'すべて' || ev.status === status).length;

  return (
    <div className="fade-in">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">イベント一覧</h1>
        <Link
          to="/org/events/new"
          className="inline-flex items-center justify-center gap-1.5 btn-gradient font-medium text-sm px-5 py-2.5 rounded-lg shadow-sm transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          イベント作成
        </Link>
      </div>

      {/* Search filters + Tabs (sticky) */}
      <div className="sticky top-14 z-20 bg-ehaco-bg/95 backdrop-blur-sm -mx-4 sm:-mx-6 px-4 sm:px-6 pb-4">
      <div className="bg-white rounded-xl border border-ehaco-border p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Date range */}
          <div>
            <label className="block text-xs font-medium text-muted mb-1">開始日</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateFrom(e.target.value)}
              className="w-full border border-ehaco-border rounded-lg px-3 py-2 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted mb-1">終了日</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDateTo(e.target.value)}
              className="w-full border border-ehaco-border rounded-lg px-3 py-2 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            />
          </div>
          {/* Event name search */}
          <FormInput
            label="イベント名"
            value={searchName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchName(e.target.value)}
            placeholder="キーワードで検索"
          />
          {/* Survey dropdown */}
          <div>
            <label className="block text-xs font-medium text-muted mb-1">アンケート名</label>
            <select
              value={surveyFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSurveyFilter(e.target.value)}
              className="w-full border border-ehaco-border rounded-lg px-3 py-2 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            >
              <option value="">すべて</option>
              <option value="参加者満足度アンケート">参加者満足度アンケート</option>
              <option value="セミナー改善フィードバック">セミナー改善フィードバック</option>
              <option value="参加者プロフィール調査">参加者プロフィール調査</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
          {/* Target dropdown */}
          <div>
            <label className="block text-xs font-medium text-muted mb-1">ターゲット名</label>
            <select
              value={targetFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTargetFilter(e.target.value)}
              className="w-full border border-ehaco-border rounded-lg px-3 py-2 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent"
            >
              <option value="">すべて</option>
              <option value="IT部門マネージャー">IT部門マネージャー</option>
              <option value="経営企画・DX推進">経営企画・DX推進</option>
              <option value="マーケティング担当者">マーケティング担当者</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <TabControl
          tabs={statusTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="underline"
          renderSuffix={(tab) => (
            <span className="ml-1 text-xs">({countByStatus(tab)})</span>
          )}
        />
      </div>
      </div>

      {/* Event cards */}
      {filtered.length > 0 ? (
        <div className="space-y-5 md:space-y-6">
          {filtered.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <img
                src={ev.image}
                alt={ev.title}
                className="w-full h-48 sm:w-[280px] md:w-[340px] sm:h-auto object-cover shrink-0"
              />

              {/* Info */}
              <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                <div>
                  {/* Status & date */}
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusBadge(ev.status)}`}
                    >
                      {ev.status}
                    </span>
                    <span className="text-xs text-muted">{ev.date}</span>
                    <span className="text-xs text-gray-400">{ev.eventNo}</span>
                  </div>

                  {/* Title */}
                  <Link
                    to={`/org/events/${ev.id}/edit`}
                    className="text-lg md:text-xl font-bold text-ehaco-text hover:text-accent transition line-clamp-2 leading-snug"
                  >
                    {ev.title}
                  </Link>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-3 text-sm">
                    <span className="text-muted">
                      募集人数：<span className="font-semibold text-ehaco-text">{ev.capacity}名</span>
                    </span>
                    <span className="text-muted">
                      申込人数：
                      <span className={`font-semibold ${ev.applicants > 0 ? 'text-accent' : 'text-ehaco-text'}`}>
                        {ev.applicants}名
                      </span>
                    </span>
                    <span className="text-muted">
                      応募期限：<span className="font-semibold text-ehaco-text">{ev.deadline}</span>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mt-4">
                  <Link
                    to={`/org/events/${ev.id}/edit`}
                    className="inline-flex items-center justify-center gap-1.5 border border-accent text-accent hover:bg-accent/5 font-medium text-sm px-4 py-2 rounded-lg transition-colors w-full sm:w-auto text-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    イベントの編集
                  </Link>
                  <Link
                    to={`/org/events/${ev.id}/messages`}
                    className="inline-flex items-center justify-center gap-1.5 text-muted hover:text-accent text-sm transition w-full sm:w-auto text-center"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    参加者に連絡
                  </Link>
                  <button className="inline-flex items-center justify-center gap-1.5 text-muted hover:text-accent text-sm transition w-full sm:w-auto text-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Excelダウンロード
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          title="該当するイベントがありません"
          subtitle="検索条件を変更してください"
        />
      )}
    </div>
  );
}
