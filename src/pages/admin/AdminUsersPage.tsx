import { useState } from 'react';
import StatusBadge from '../../components/StatusBadge';
import PageHeader from '../../components/PageHeader';
import SearchFilterBar from '../../components/SearchFilterBar';

type User = {
  id: number;
  name: string;
  email: string;
  role: '一般' | '主催者' | '管理者';
  status: '有効' | '停止';
  registeredAt: string;
  lastLogin: string;
};

const dummyUsers: User[] = [
  { id: 1, name: '田中太郎', email: 'tanaka@example.com', role: '一般', status: '有効', registeredAt: '2026-01-15', lastLogin: '2026-04-03' },
  { id: 2, name: '鈴木花子', email: 'suzuki@example.com', role: '主催者', status: '有効', registeredAt: '2025-11-20', lastLogin: '2026-04-02' },
  { id: 3, name: '佐藤次郎', email: 'sato@example.com', role: '一般', status: '停止', registeredAt: '2025-08-10', lastLogin: '2026-02-15' },
  { id: 4, name: '山田恵子', email: 'yamada@example.com', role: '主催者', status: '有効', registeredAt: '2026-02-01', lastLogin: '2026-04-03' },
  { id: 5, name: '高橋健一', email: 'takahashi@example.com', role: '管理者', status: '有効', registeredAt: '2024-06-01', lastLogin: '2026-04-03' },
  { id: 6, name: '伊藤美咲', email: 'ito@example.com', role: '一般', status: '有効', registeredAt: '2026-03-20', lastLogin: '2026-04-01' },
  { id: 7, name: '渡辺翔太', email: 'watanabe@example.com', role: '一般', status: '有効', registeredAt: '2026-03-28', lastLogin: '2026-04-03' },
  { id: 8, name: '小林あかり', email: 'kobayashi@example.com', role: '主催者', status: '停止', registeredAt: '2025-09-05', lastLogin: '2025-12-20' },
];

const roleColors: Record<string, string> = {
  '一般': 'bg-gray-100 text-gray-700',
  '主催者': 'bg-accent/10 text-accent',
  '管理者': 'bg-red-100 text-red-700',
};

const statusColors: Record<string, string> = {
  '有効': 'bg-emerald-100 text-emerald-700',
  '停止': 'bg-red-100 text-red-700',
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('すべて');

  const filtered = dummyUsers.filter((u) => {
    if (search && !u.name.includes(search) && !u.email.includes(search)) return false;
    if (roleFilter !== 'すべて' && u.role !== roleFilter) return false;
    return true;
  });

  return (
    <div className="fade-in">
      <div className="mb-6">
        <PageHeader title="ユーザー管理" subtitle="登録ユーザーの一覧と管理" />
      </div>

      <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm">
        <SearchFilterBar
          searchValue={search}
          onSearchChange={setSearch}
          placeholder="名前・メールで検索..."
        >
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-ehaco-border rounded-xl px-3 py-2.5 text-sm bg-white"
          >
            <option>すべて</option>
            <option>一般</option>
            <option>主催者</option>
            <option>管理者</option>
          </select>
        </SearchFilterBar>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ehaco-border bg-ehaco-bg/50">
                <th className="text-left px-5 py-3 font-semibold text-muted">名前</th>
                <th className="text-left px-5 py-3 font-semibold text-muted hidden md:table-cell">メール</th>
                <th className="text-left px-5 py-3 font-semibold text-muted">権限</th>
                <th className="text-left px-5 py-3 font-semibold text-muted">ステータス</th>
                <th className="text-left px-5 py-3 font-semibold text-muted hidden lg:table-cell">登録日</th>
                <th className="text-left px-5 py-3 font-semibold text-muted hidden lg:table-cell">最終ログイン</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ehaco-border/50">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition">
                  <td className="px-5 py-3.5 font-medium text-ehaco-text">{u.name}</td>
                  <td className="px-5 py-3.5 text-muted hidden md:table-cell">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <StatusBadge label={u.role} colorMap={roleColors} />
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge label={u.status} colorMap={statusColors} />
                  </td>
                  <td className="px-5 py-3.5 text-muted hidden lg:table-cell">{u.registeredAt}</td>
                  <td className="px-5 py-3.5 text-muted hidden lg:table-cell">{u.lastLogin}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-accent hover:text-accent-light transition">詳細</button>
                      {u.status === '有効' ? (
                        <button className="text-xs text-red-500 hover:text-red-700 transition">停止</button>
                      ) : (
                        <button className="text-xs text-emerald-600 hover:text-emerald-700 transition">有効化</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-ehaco-border text-sm text-muted">
          {filtered.length}件表示
        </div>
      </div>
    </div>
  );
}
