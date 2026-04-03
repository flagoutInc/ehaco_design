import { useState } from 'react';
import { Link } from 'react-router-dom';
import { orgStaff } from '../../data/orgDummy';

export default function StaffPage() {
  const [keyword, setKeyword] = useState('');

  const filtered = orgStaff.filter((s) => {
    if (!keyword) return true;
    const q = keyword.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q) ||
      String(s.id).includes(q)
    );
  });

  const statusBadge = (status: string) => {
    if (status === '登録完了') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
          {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200">
        {status}
      </span>
    );
  };

  return (
    <div className="fade-in">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">
            主催者の登録担当者一覧
          </h1>
        </div>

        {/* Search + Add button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
          <div className="relative w-full sm:w-72">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="キーワードで検索"
              value={keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
              className="w-full border border-ehaco-border rounded-lg pl-9 pr-3 py-2.5 text-sm text-ehaco-text bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
            />
          </div>
          <Link to="/org/staff/new" className="text-sm btn-gradient font-medium px-5 py-2.5 rounded-lg transition shadow-sm whitespace-nowrap">
            担当者の追加
          </Link>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted mb-4">
          {filtered.length}件の担当者
        </p>

        {/* Desktop table */}
        <div className="hidden md:block bg-white shadow-sm ring-1 ring-ehaco-border/50 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-ehaco-border">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">主催担当者ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">担当者名</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">メールアドレス</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">電話番号</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted">状態</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-muted">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ehaco-border">
              {filtered.map((staff) => (
                <tr key={staff.id} className="hover:bg-gray-50/60 transition">
                  <td className="px-4 py-4 text-ehaco-text font-medium">{staff.id}</td>
                  <td className="px-4 py-4 text-ehaco-text">{staff.name}</td>
                  <td className="px-4 py-4 text-muted">{staff.email}</td>
                  <td className="px-4 py-4 text-muted">{staff.phone || '---'}</td>
                  <td className="px-4 py-4">{statusBadge(staff.status)}</td>
                  <td className="px-4 py-4 text-right">
                    <Link to={`/org/staff/${staff.id}`} className="text-xs font-medium text-muted border border-ehaco-border hover:bg-accent/5 hover:border-accent hover:text-accent px-3 py-1.5 rounded-lg transition">
                      設定
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {filtered.map((staff) => (
            <div key={staff.id} className="bg-white ring-1 ring-ehaco-border/50 shadow-sm rounded-2xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-bold text-ehaco-text">{staff.name}</p>
                  <p className="text-xs text-muted mt-0.5">ID: {staff.id}</p>
                </div>
                {statusBadge(staff.status)}
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted w-20 shrink-0">メール</span>
                  <span className="text-ehaco-text text-xs truncate">{staff.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted w-20 shrink-0">電話番号</span>
                  <span className="text-ehaco-text text-xs">{staff.phone || '---'}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-ehaco-border flex justify-end">
                <Link to={`/org/staff/${staff.id}`} className="text-xs font-medium text-muted border border-ehaco-border hover:bg-accent/5 hover:border-accent hover:text-accent px-3 py-1.5 rounded-lg transition">
                  設定
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 text-center py-12">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128H5.228A2 2 0 013 17.16V17a6.002 6.002 0 0112-2.07M15 19.128c.158.476.242.98.242 1.5M9 7a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            </div>
            <p className="text-muted text-sm">該当する担当者が見つかりません</p>
          </div>
        )}
    </div>
  );
}
