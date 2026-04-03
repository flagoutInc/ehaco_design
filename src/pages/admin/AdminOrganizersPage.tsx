import { useState } from 'react';
import StatusBadge from '../../components/StatusBadge';
import PageHeader from '../../components/PageHeader';
import TabControl from '../../components/TabControl';

type Organizer = {
  id: number;
  name: string;
  representative: string;
  email: string;
  industry: string;
  appliedAt: string;
  status: '審査待ち' | '承認済み' | '却下';
  eventCount: number;
};

const dummyOrganizers: Organizer[] = [
  { id: 1, name: '株式会社デジタルHR', representative: '山本一郎', email: 'yamamoto@digital-hr.co.jp', industry: '人材・HR', appliedAt: '2026-04-02', status: '審査待ち', eventCount: 0 },
  { id: 2, name: 'エナジーテック合同会社', representative: '松田美紀', email: 'matsuda@energytech.jp', industry: 'エネルギー', appliedAt: '2026-04-01', status: '審査待ち', eventCount: 0 },
  { id: 3, name: '合同会社フューチャーラボ', representative: '川島健太', email: 'kawashima@futurelab.jp', industry: 'コンサルティング', appliedAt: '2026-03-30', status: '審査待ち', eventCount: 0 },
  { id: 4, name: 'テックファーム株式会社', representative: '田中慎一', email: 'tanaka@techfarm.co.jp', industry: 'IT・テクノロジー', appliedAt: '2025-10-01', status: '承認済み', eventCount: 12 },
  { id: 5, name: 'AIソリューションズ株式会社', representative: '伊藤真理', email: 'ito@ai-solutions.co.jp', industry: 'AI・機械学習', appliedAt: '2025-11-15', status: '承認済み', eventCount: 8 },
  { id: 6, name: '不明な団体', representative: '不明', email: 'spam@test.com', industry: '不明', appliedAt: '2026-03-28', status: '却下', eventCount: 0 },
];

const statusColors: Record<string, string> = {
  '審査待ち': 'bg-amber-100 text-amber-700',
  '承認済み': 'bg-emerald-100 text-emerald-700',
  '却下': 'bg-red-100 text-red-700',
};

export default function AdminOrganizersPage() {
  const [tab, setTab] = useState<string>('審査待ち');
  const filtered = dummyOrganizers.filter((o) => o.status === tab);

  return (
    <div className="fade-in">
      <div className="mb-6">
        <PageHeader title="主催者審査" subtitle="主催者登録申請の審査" />
      </div>

      <div className="mb-6">
        <TabControl
          tabs={['審査待ち', '承認済み', '却下']}
          activeTab={tab}
          onTabChange={setTab}
          renderSuffix={(t) =>
            t === '審査待ち' ? (
              <span className="ml-1.5 bg-amber-500 text-white text-xs font-bold w-5 h-5 rounded-full inline-flex items-center justify-center">
                {dummyOrganizers.filter((o) => o.status === '審査待ち').length}
              </span>
            ) : null
          }
        />
      </div>

      <div className="space-y-4">
        {filtered.map((org) => (
          <div key={org.id} className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">{org.industry}</span>
                  <StatusBadge label={org.status} colorMap={statusColors} />
                </div>
                <h3 className="text-base font-bold text-ehaco-text">{org.name}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted">
                  <span>代表: {org.representative}</span>
                  <span>{org.email}</span>
                  <span>申請日: {org.appliedAt}</span>
                  {org.eventCount > 0 && <span>開催実績: {org.eventCount}件</span>}
                </div>
              </div>
              {org.status === '審査待ち' && (
                <div className="flex items-center gap-2 shrink-0">
                  <button className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition">
                    承認
                  </button>
                  <button className="px-4 py-2 text-sm font-medium bg-white border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition">
                    却下
                  </button>
                  <button className="px-4 py-2 text-sm font-medium bg-white border border-ehaco-border text-muted rounded-xl hover:bg-gray-50 transition">
                    詳細
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 shadow-sm p-12 text-center">
            <p className="text-muted">該当する主催者はありません</p>
          </div>
        )}
      </div>
    </div>
  );
}
