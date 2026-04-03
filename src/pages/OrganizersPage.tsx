import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { events } from '../data/dummy';
import type { Event } from '../data/dummy';

interface Organizer {
  id: number;
  name: string;
  logo: string;
  eventsCount: number;
  categories: string[];
  latestEvent: Event;
  followers: number;
}

// eventsデータからユニークな主催者を抽出
function buildOrganizers(): Organizer[] {
  const map = new Map<string, {
    name: string;
    logo: string;
    events: Event[];
    categories: Set<string>;
  }>();
  events.forEach((e) => {
    if (!map.has(e.organizer)) {
      map.set(e.organizer, {
        name: e.organizer,
        logo: e.organizerLogo,
        events: [],
        categories: new Set(),
      });
    }
    const org = map.get(e.organizer)!;
    org.events.push(e);
    org.categories.add(e.category);
  });
  return [...map.values()].map((org, i) => ({
    id: i + 1,
    name: org.name,
    logo: org.logo.replace('size=40', 'size=80'),
    eventsCount: org.events.length,
    categories: [...org.categories],
    latestEvent: org.events[0],
    followers: Math.floor(Math.random() * 3000) + 200,
  }));
}

const allOrganizers = buildOrganizers();

// カテゴリ一覧を抽出
const allCategories = [...new Set(allOrganizers.flatMap((o) => o.categories))].sort();

const PER_PAGE = 12;

export default function OrganizersPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState<'events' | 'followers' | 'name'>('events');
  const [page, setPage] = useState(1);
  const [following, setFollowing] = useState<Set<number>>(new Set());

  const toggleFollow = (id: number) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = allOrganizers;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((o) => o.name.toLowerCase().includes(q) || o.categories.some((c) => c.includes(q)));
    }
    if (category) {
      list = list.filter((o) => o.categories.includes(category));
    }
    if (sort === 'events') {
      list = [...list].sort((a, b) => b.eventsCount - a.eventsCount);
    } else if (sort === 'followers') {
      list = [...list].sort((a, b) => b.followers - a.followers);
    } else {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, 'ja'));
    }
    return list;
  }, [search, category, sort]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const changePage = (p: number) => { setPage(p); window.scrollTo(0, 0); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-ehaco-text">主催者を探す</h1>
        <p className="text-sm text-muted mt-1">イベントを主催している企業・団体の一覧です</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="主催者名・カテゴリで検索"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-ehaco-border bg-white text-sm text-ehaco-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
          />
        </div>
        <select
          value={category}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setCategory(e.target.value); setPage(1); }}
          className="rounded-xl border border-ehaco-border bg-white px-4 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition appearance-none"
        >
          <option value="">すべてのカテゴリ</option>
          {allCategories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={sort}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setSort(e.target.value as 'events' | 'followers' | 'name'); setPage(1); }}
          className="rounded-xl border border-ehaco-border bg-white px-4 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition appearance-none"
        >
          <option value="events">イベント数順</option>
          <option value="followers">フォロワー数順</option>
          <option value="name">名前順</option>
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted mb-4">{filtered.length}件の主催者</p>

      {/* Grid */}
      {paged.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paged.map((org) => {
            const isFollowing = following.has(org.id);
            return (
              <Link key={org.id} to={`/organizer/${org.id}`} className="block bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 hover:shadow-lg hover:ring-accent/20 transition-all">
                <div className="flex items-start gap-4">
                    <img src={org.logo} alt={org.name} loading="lazy" className="w-14 h-14 rounded-xl shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base text-ehaco-text line-clamp-1">
                      {org.name}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {org.categories.slice(0, 2).map((c) => (
                        <span key={c} className="text-[11px] text-accent bg-accent/10 px-2 py-0.5 rounded-md font-medium">{c}</span>
                      ))}
                      {org.categories.length > 2 && (
                        <span className="text-[11px] text-muted bg-gray-100 px-2 py-0.5 rounded-md">+{org.categories.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                    {org.eventsCount}イベント
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    {org.followers.toLocaleString()}フォロワー
                  </span>
                </div>

                {/* Latest event */}
                <div className="mt-3 pt-3 border-t border-ehaco-border/50">
                  <p className="text-[11px] text-muted mb-1">最新イベント</p>
                  <span onClick={(e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); window.location.hash = `/event/${org.latestEvent.id}`; }} className="text-sm text-ehaco-text hover:text-accent transition line-clamp-1 font-medium cursor-pointer">
                    {org.latestEvent.title}
                  </span>
                </div>

                {/* Follow button */}
                <button
                  onClick={(e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); toggleFollow(org.id); }}
                  className={`w-full mt-3 px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer ${
                    isFollowing
                      ? 'border border-ehaco-border text-muted hover:border-red-300 hover:text-red-500'
                      : 'btn-gradient'
                  }`}
                >
                  {isFollowing ? 'フォロー中' : 'フォローする'}
                </button>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-12 text-center">
          <p className="font-bold text-lg text-ehaco-text mb-2">該当する主催者が見つかりませんでした</p>
          <p className="text-sm text-muted">検索条件を変更してお試しください</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button onClick={() => changePage(page - 1)} disabled={page === 1}
            className="px-3 py-2 rounded-lg text-sm font-medium transition disabled:opacity-30 disabled:cursor-not-allowed text-muted hover:bg-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => changePage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition ${p === page ? 'bg-accent text-white shadow-sm' : 'text-muted hover:bg-gray-100'}`}>
              {p}
            </button>
          ))}
          <button onClick={() => changePage(page + 1)} disabled={page === totalPages}
            className="px-3 py-2 rounded-lg text-sm font-medium transition disabled:opacity-30 disabled:cursor-not-allowed text-muted hover:bg-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
