import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { orgSurveys } from '../../data/orgDummy';

const TABS = ['使用可', 'アーカイブ', 'すべて'];

export default function SurveysPage() {
  const [activeTab, setActiveTab] = useState('すべて');
  const [keyword, setKeyword] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  const filtered = useMemo(() => {
    return orgSurveys.filter((s) => {
      if (activeTab !== 'すべて' && s.status !== activeTab) return false;
      if (keyword && !s.name.includes(keyword)) return false;
      if (dateFrom && s.createdAt < dateFrom) return false;
      if (dateTo && s.createdAt > dateTo) return false;
      return true;
    });
  }, [activeTab, keyword, dateFrom, dateTo]);

  return (
    <div className="fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">
            アンケート一覧
          </h1>
          <Link
            to="/org/surveys/new"
            className="inline-flex items-center gap-2 btn-gradient font-medium text-sm px-5 py-2.5 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            アンケート作成
          </Link>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-4 md:p-5 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted whitespace-nowrap">期間</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="border border-ehaco-border rounded-lg px-3 py-1.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
              <span className="text-muted text-sm">〜</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="border border-ehaco-border rounded-lg px-3 py-1.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="キーワード検索"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full border border-ehaco-border rounded-lg pl-9 pr-3 py-1.5 text-sm text-ehaco-text placeholder-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-ehaco-border mb-4">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium transition-colors relative ${
                activeTab === tab
                  ? 'text-accent'
                  : 'text-muted hover:text-ehaco-text'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-t" />
              )}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted mb-4">
          {filtered.length}件 1〜{filtered.length}件を表示
        </p>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white shadow-sm ring-1 ring-ehaco-border/50 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-ehaco-bg border-b border-ehaco-border">
                <th className="text-left text-xs font-semibold text-muted px-4 py-3">作成日</th>
                <th className="text-left text-xs font-semibold text-muted px-4 py-3">アンケート名</th>
                <th className="text-left text-xs font-semibold text-muted px-4 py-3">ステータス</th>
                <th className="text-left text-xs font-semibold text-muted px-4 py-3">アンケート項目数</th>
                <th className="text-left text-xs font-semibold text-muted px-4 py-3">使用しているイベント数</th>
                <th className="text-left text-xs font-semibold text-muted px-4 py-3">アンケート回答者数</th>
                <th className="w-10 px-2"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((survey) => (
                <tr key={survey.id} className="border-b border-ehaco-border last:border-b-0 hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-4 text-sm text-ehaco-text">{survey.createdAt}</td>
                  <td className="px-4 py-4">
                    <Link
                      to={`/org/surveys/${survey.id}`}
                      className="text-sm font-medium text-accent hover:underline"
                    >
                      {survey.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        survey.status === '使用可'
                          ? 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}
                    >
                      {survey.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-ehaco-text">
                    {survey.questionCount}/{survey.maxQuestions}
                  </td>
                  <td className="px-4 py-4 text-sm text-ehaco-text">{survey.linkedEvents}</td>
                  <td className="px-4 py-4 text-sm text-ehaco-text">{survey.responses}</td>
                  <td className="px-2 py-4 relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === survey.id ? null : survey.id)}
                      className="p-1 rounded hover:bg-ehaco-border transition-colors text-muted"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="5" r="1.5" />
                        <circle cx="12" cy="12" r="1.5" />
                        <circle cx="12" cy="19" r="1.5" />
                      </svg>
                    </button>
                    {openMenuId === survey.id && (
                      <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-ehaco-border py-1 z-10">
                        <Link to={`/org/surveys/${survey.id}`} className="block px-4 py-2 text-sm text-ehaco-text hover:bg-ehaco-bg">編集</Link>
                        <Link to={`/org/surveys/${survey.id}/results`} className="block px-4 py-2 text-sm text-ehaco-text hover:bg-ehaco-bg">集計結果</Link>
                        <button className="w-full text-left px-4 py-2 text-sm text-ehaco-text hover:bg-ehaco-bg">複製</button>
                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">削除</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted">
              該当するアンケートがありません
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-3">
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted">
              該当するアンケートがありません
            </div>
          )}
          {filtered.map((survey) => (
            <div key={survey.id} className="bg-white ring-1 ring-ehaco-border/50 shadow-sm rounded-2xl p-4">
              <div className="flex items-start justify-between mb-2">
                <Link
                  to={`/org/surveys/${survey.id}`}
                  className="text-sm font-medium text-accent hover:underline flex-1"
                >
                  {survey.name}
                </Link>
                <div className="relative ml-2">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === survey.id ? null : survey.id)}
                    className="p-1 rounded hover:bg-ehaco-border transition-colors text-muted"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </button>
                  {openMenuId === survey.id && (
                    <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-ehaco-border py-1 z-10">
                      <button className="w-full text-left px-4 py-2 text-sm text-ehaco-text hover:bg-ehaco-bg">編集</button>
                      <button className="w-full text-left px-4 py-2 text-sm text-ehaco-text hover:bg-ehaco-bg">複製</button>
                      <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">削除</button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs text-muted">{survey.createdAt}</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    survey.status === '使用可'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-gray-50 text-gray-600 border border-gray-200'
                  }`}
                >
                  {survey.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-ehaco-bg rounded-lg py-2 px-1">
                  <p className="text-xs text-muted mb-0.5">項目数</p>
                  <p className="text-sm font-semibold text-ehaco-text">{survey.questionCount}/{survey.maxQuestions}</p>
                </div>
                <div className="bg-ehaco-bg rounded-lg py-2 px-1">
                  <p className="text-xs text-muted mb-0.5">イベント数</p>
                  <p className="text-sm font-semibold text-ehaco-text">{survey.linkedEvents}</p>
                </div>
                <div className="bg-ehaco-bg rounded-lg py-2 px-1">
                  <p className="text-xs text-muted mb-0.5">回答者数</p>
                  <p className="text-sm font-semibold text-ehaco-text">{survey.responses}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}
