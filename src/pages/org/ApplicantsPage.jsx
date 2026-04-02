import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { orgApplicants } from '../../data/orgDummy';

export default function ApplicantsPage() {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [eventSearch, setEventSearch] = useState('');
  const [nameSearch, setNameSearch] = useState('');

  const filtered = useMemo(() => {
    return orgApplicants.filter((a) => {
      // Date range filter (compare date portion of appliedAt)
      const appliedDate = a.appliedAt.slice(0, 10);
      if (dateFrom && appliedDate < dateFrom) return false;
      if (dateTo && appliedDate > dateTo) return false;
      // Event name filter
      if (eventSearch && !a.eventName.toLowerCase().includes(eventSearch.toLowerCase())) return false;
      // Company or applicant name filter
      if (nameSearch) {
        const q = nameSearch.toLowerCase();
        if (!a.company.toLowerCase().includes(q) && !a.name.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [dateFrom, dateTo, eventSearch, nameSearch]);

  const handleExportCsv = () => {
    const headers = ['申込み日時', 'イベント名', 'チケット名', '会社名', '氏名', '担当領域', 'キャンセル日付'];
    const rows = filtered.map((a) => [
      a.appliedAt,
      a.eventName,
      a.ticketName,
      a.company,
      a.name,
      a.field,
      a.cancelledAt || '',
    ]);
    const csvContent = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'applicants.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">
            イベント申込者一覧
          </h1>
        </div>
        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 btn-gradient font-medium text-sm px-5 py-2.5 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
          </svg>
          Excelダウンロード
        </button>
      </div>

      {/* Search Filters */}
      <div className="bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-4 md:p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Date range */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="block text-xs font-medium text-muted mb-1">申込み期間</label>
            <div className="flex items-center gap-1">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="flex-1 min-w-0 border border-ehaco-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
              <span className="text-muted text-xs shrink-0">〜</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="flex-1 min-w-0 border border-ehaco-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              />
            </div>
          </div>
          {/* Event name */}
          <div>
            <label className="block text-xs font-medium text-muted mb-1">イベント名</label>
            <input
              type="text"
              value={eventSearch}
              onChange={(e) => setEventSearch(e.target.value)}
              placeholder="イベント名で検索"
              className="w-full border border-ehaco-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
            />
          </div>
          {/* Company / applicant name */}
          <div>
            <label className="block text-xs font-medium text-muted mb-1">会社名・申込者名</label>
            <input
              type="text"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
              placeholder="会社名・氏名で検索"
              className="w-full border border-ehaco-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted">
          <span className="font-bold text-ehaco-text">{filtered.length}</span> 件の申込み
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white shadow-sm ring-1 ring-ehaco-border/50 rounded-2xl overflow-hidden">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-ehaco-border">
                  <th className="text-left px-4 py-3 text-xs md:text-sm font-semibold text-muted whitespace-nowrap">申込み日時</th>
                  <th className="text-left px-4 py-3 text-xs md:text-sm font-semibold text-muted whitespace-nowrap">イベント名</th>
                  <th className="text-left px-4 py-3 text-xs md:text-sm font-semibold text-muted whitespace-nowrap">チケット名</th>
                  <th className="text-left px-4 py-3 text-xs md:text-sm font-semibold text-muted whitespace-nowrap">会社名</th>
                  <th className="text-left px-4 py-3 text-xs md:text-sm font-semibold text-muted whitespace-nowrap">氏名</th>
                  <th className="text-left px-4 py-3 text-xs md:text-sm font-semibold text-muted whitespace-nowrap">担当領域</th>
                  <th className="text-left px-4 py-3 text-xs md:text-sm font-semibold text-muted whitespace-nowrap">キャンセル日付</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((a) => (
                  <tr
                    key={a.id}
                    onClick={() => window.location.hash = `/org/applicants/${a.id}`}
                    className={`border-b border-ehaco-border last:border-b-0 hover:bg-gray-50/60 transition-colors cursor-pointer ${
                      a.cancelledAt ? 'text-muted line-through' : 'text-ehaco-text'
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">{a.appliedAt}</td>
                    <td className="px-4 py-4 max-w-[240px] truncate">{a.eventName}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{a.ticketName}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{a.company}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{a.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-block bg-accent/10 text-accent text-xs font-medium px-2 py-0.5 rounded-full">
                        {a.field}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {a.cancelledAt ? (
                        <span className="text-red-500 no-underline" style={{ textDecoration: 'none' }}>
                          {a.cancelledAt}
                        </span>
                      ) : (
                        <span className="text-accent/40">--</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <p className="font-bold text-ehaco-text mb-1">該当する申込者がいません</p>
            <p className="text-sm text-gray-500">検索条件を変更してお試しください</p>
          </div>
        )}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.length > 0 ? (
          filtered.map((a) => (
            <div
              key={a.id}
              onClick={() => window.location.hash = `/org/applicants/${a.id}`}
              className={`bg-white ring-1 ring-ehaco-border/50 shadow-sm rounded-2xl p-4 cursor-pointer active:scale-[0.99] transition ${
                a.cancelledAt ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className={`font-bold text-sm ${a.cancelledAt ? 'text-muted line-through' : 'text-ehaco-text'}`}>
                  {a.name}
                </p>
                {a.cancelledAt && (
                  <span className="text-xs font-medium text-red-500 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full shrink-0">
                    キャンセル済
                  </span>
                )}
              </div>
              <p className={`text-xs mb-1 ${a.cancelledAt ? 'text-muted line-through' : 'text-muted'}`}>
                {a.company}
              </p>
              <p className={`text-sm mb-2 ${a.cancelledAt ? 'text-muted line-through' : 'text-ehaco-text'}`}>
                {a.eventName}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span>{a.appliedAt}</span>
                <span className="w-px h-3 bg-ehaco-border" />
                <span>{a.ticketName}</span>
                <span className="w-px h-3 bg-ehaco-border" />
                <span className="inline-block bg-accent/10 text-accent font-medium px-2 py-0.5 rounded-full">
                  {a.field}
                </span>
              </div>
              {a.cancelledAt && (
                <p className="text-xs text-red-500 mt-2">キャンセル日: {a.cancelledAt}</p>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <p className="font-bold text-ehaco-text mb-1">該当する申込者がいません</p>
            <p className="text-sm text-gray-500">検索条件を変更してお試しください</p>
          </div>
        )}
      </div>
    </div>
  );
}
