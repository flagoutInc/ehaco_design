import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NewEventPage() {
  const [form, setForm] = useState({
    eventName: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    recruitStartDate: '',
    recruitStartTime: '',
    recruitEndDate: '',
    recruitEndTime: '',
    eventImage: null,
    eventImagePreview: '',
    eventDetail: '',
    isOffline: false,
    isOnline: false,
    venueName: '',
    venueAddress: '',
    onlineTool: '',
    streamUrl: '',
    ticketMode: 'ticket',
    externalTicketUrl: '',
    tickets: [{ name: '', price: '', quantity: '' }],
    companyName: '',
    privacyPolicyUrl: '',
    linkedEventsCount: 0,
    surveyId: '',
    targetId: '',
    tags: [],
    remind3days: true,
    remind1day: true,
    notifyFollowers: false,
    isPrivate: false,
    organizerMessage: '',
  });

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      set('eventImage', file);
      set('eventImagePreview', URL.createObjectURL(file));
    }
  };

  const addTicket = () => {
    setForm((prev) => ({
      ...prev,
      tickets: [...prev.tickets, { name: '', price: '', quantity: '' }],
    }));
  };

  const removeTicket = (index) => {
    setForm((prev) => ({
      ...prev,
      tickets: prev.tickets.filter((_, i) => i !== index),
    }));
  };

  const updateTicket = (index, field, value) => {
    setForm((prev) => {
      const tickets = [...prev.tickets];
      tickets[index] = { ...tickets[index], [field]: value };
      return { ...prev, tickets };
    });
  };

  const handleTagSelect = () => {
    // placeholder for tag selection modal
  };

  const sections = [
    { id: 'basic', label: '基本情報' },
    { id: 'hosting', label: '開催方法' },
    { id: 'tickets', label: 'チケット' },
    { id: 'privacy', label: 'プライバシー' },
    { id: 'survey', label: 'アンケート' },
    { id: 'target', label: 'ターゲット' },
    { id: 'tags', label: 'タグ' },
    { id: 'notify', label: '配信設定' },
    { id: 'publish', label: '公開方法' },
    { id: 'message', label: 'メッセージ' },
  ];

  const sectionClass =
    'bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-6 md:p-8 space-y-5';
  const labelClass = 'block text-sm font-semibold text-ehaco-text mb-1.5';
  const inputClass =
    'w-full rounded-lg border border-ehaco-border bg-white px-4 py-2.5 text-sm text-ehaco-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition';
  const selectClass =
    'w-full rounded-lg border border-ehaco-border bg-white px-4 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition appearance-none';
  const checkboxClass =
    'w-4 h-4 rounded border-ehaco-border text-accent focus:ring-accent/40';

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">
          イベント新規作成
        </h1>
        <p className="text-sm text-muted mt-2 pl-5">
          イベントの詳細情報を入力してください
        </p>
      </div>

      <div className="space-y-6">
        {/* ───────── 1. 基本情報 ───────── */}
        <section id="basic" className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text flex items-center gap-2">
            <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            基本情報
          </h2>

          {/* イベント名 */}
          <div>
            <label className={labelClass}>イベント名</label>
            <input
              type="text"
              className={inputClass}
              placeholder="例）第3回 DXセミナー"
              value={form.eventName}
              onChange={(e) => set('eventName', e.target.value)}
            />
          </div>

          {/* 開催日時 */}
          <div>
            <label className={labelClass}>開催日時</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted shrink-0">開始</span>
                <input
                  type="date"
                  className={inputClass}
                  value={form.startDate}
                  onChange={(e) => set('startDate', e.target.value)}
                />
                <input
                  type="time"
                  className={`${inputClass} max-w-[130px]`}
                  value={form.startTime}
                  onChange={(e) => set('startTime', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted shrink-0">終了</span>
                <input
                  type="date"
                  className={inputClass}
                  value={form.endDate}
                  onChange={(e) => set('endDate', e.target.value)}
                />
                <input
                  type="time"
                  className={`${inputClass} max-w-[130px]`}
                  value={form.endTime}
                  onChange={(e) => set('endTime', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 募集期間 */}
          <div>
            <label className={labelClass}>募集期間</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted shrink-0">開始</span>
                <input
                  type="date"
                  className={inputClass}
                  value={form.recruitStartDate}
                  onChange={(e) => set('recruitStartDate', e.target.value)}
                />
                <input
                  type="time"
                  className={`${inputClass} max-w-[130px]`}
                  value={form.recruitStartTime}
                  onChange={(e) => set('recruitStartTime', e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted shrink-0">終了</span>
                <input
                  type="date"
                  className={inputClass}
                  value={form.recruitEndDate}
                  onChange={(e) => set('recruitEndDate', e.target.value)}
                />
                <input
                  type="time"
                  className={`${inputClass} max-w-[130px]`}
                  value={form.recruitEndTime}
                  onChange={(e) => set('recruitEndTime', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* イベント画像 */}
          <div>
            <label className={labelClass}>イベント画像</label>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-ehaco-border rounded-xl py-10 cursor-pointer hover:border-accent/50 transition group">
              {form.eventImagePreview ? (
                <img
                  src={form.eventImagePreview}
                  alt="プレビュー"
                  className="max-h-40 rounded-lg object-contain"
                />
              ) : (
                <>
                  <svg
                    className="w-10 h-10 text-muted/50 group-hover:text-accent transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 16v-8m-4 4h8m5 4V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z"
                    />
                  </svg>
                  <span className="text-sm text-muted">
                    クリックして画像をアップロード
                  </span>
                </>
              )}
              <span className="text-xs text-muted/50">
                推奨サイズ: 1,100px × 339px
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* イベント詳細 */}
          <div>
            <label className={labelClass}>イベント詳細</label>
            <textarea
              className={`${inputClass} min-h-[160px]`}
              placeholder="イベントの詳細を入力してください"
              value={form.eventDetail}
              onChange={(e) => set('eventDetail', e.target.value)}
            />
            <p className="text-xs text-muted/50 mt-1">
              リッチテキスト（太字・リンク等）に対応しています
            </p>
          </div>
        </section>

        {/* ───────── 2. 開催方法 ───────── */}
        <section id="hosting" className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text flex items-center gap-2">
            <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            開催方法
          </h2>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer">
              <input
                type="checkbox"
                className={checkboxClass}
                checked={form.isOffline}
                onChange={(e) => set('isOffline', e.target.checked)}
              />
              オフライン開催
            </label>
            <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer">
              <input
                type="checkbox"
                className={checkboxClass}
                checked={form.isOnline}
                onChange={(e) => set('isOnline', e.target.checked)}
              />
              オンライン開催
            </label>
          </div>

          {/* Offline fields */}
          {form.isOffline && (
            <div className="space-y-4 pl-6 border-l-2 border-accent/20">
              <div>
                <label className={labelClass}>開催場所名</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="例）東京ビッグサイト"
                  value={form.venueName}
                  onChange={(e) => set('venueName', e.target.value)}
                />
              </div>
              <div>
                <label className={labelClass}>開催場所住所</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="例）東京都江東区有明3-11-1"
                  value={form.venueAddress}
                  onChange={(e) => set('venueAddress', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Online fields */}
          {form.isOnline && (
            <div className="space-y-4 pl-6 border-l-2 border-accent/20">
              <div>
                <label className={labelClass}>開催ツール</label>
                <select
                  className={selectClass}
                  value={form.onlineTool}
                  onChange={(e) => set('onlineTool', e.target.value)}
                >
                  <option value="">選択してください</option>
                  <option value="zoom">Zoom</option>
                  <option value="teams">Microsoft Teams</option>
                  <option value="meet">Google Meet</option>
                  <option value="webex">Webex</option>
                  <option value="other">その他</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>配信URL</label>
                <input
                  type="url"
                  className={inputClass}
                  placeholder="https://..."
                  value={form.streamUrl}
                  onChange={(e) => set('streamUrl', e.target.value)}
                />
              </div>
            </div>
          )}
        </section>

        {/* ───────── 3. イベントチケットの種類 ───────── */}
        <section id="tickets" className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text flex items-center gap-2">
            <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
            </svg>
            イベントチケットの種類
          </h2>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer">
              <input
                type="radio"
                name="ticketMode"
                className="w-4 h-4 text-accent focus:ring-accent/40"
                checked={form.ticketMode === 'ticket'}
                onChange={() => set('ticketMode', 'ticket')}
              />
              チケット設定
            </label>
            <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer">
              <input
                type="radio"
                name="ticketMode"
                className="w-4 h-4 text-accent focus:ring-accent/40"
                checked={form.ticketMode === 'url'}
                onChange={() => set('ticketMode', 'url')}
              />
              URL指定
            </label>
          </div>

          {form.ticketMode === 'url' && (
            <div>
              <label className={labelClass}>外部チケットURL</label>
              <input
                type="url"
                className={inputClass}
                placeholder="https://..."
                value={form.externalTicketUrl}
                onChange={(e) => set('externalTicketUrl', e.target.value)}
              />
            </div>
          )}

          {form.ticketMode === 'ticket' && (
            <div className="space-y-4">
              {form.tickets.map((ticket, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start sm:items-end gap-3 p-4 bg-white ring-1 ring-ehaco-border/50 rounded-xl"
                >
                  <div className="flex-1 w-full">
                    <label className="text-xs text-muted mb-1 block">
                      チケット名
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="例）一般チケット"
                      value={ticket.name}
                      onChange={(e) => updateTicket(i, 'name', e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-36">
                    <label className="text-xs text-muted mb-1 block">
                      価格（税込）
                    </label>
                    <input
                      type="number"
                      className={inputClass}
                      placeholder="0"
                      value={ticket.price}
                      onChange={(e) => updateTicket(i, 'price', e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-28">
                    <label className="text-xs text-muted mb-1 block">
                      チケットの種類数
                    </label>
                    <input
                      type="number"
                      className={inputClass}
                      placeholder="100"
                      value={ticket.quantity}
                      onChange={(e) =>
                        updateTicket(i, 'quantity', e.target.value)
                      }
                    />
                  </div>
                  {form.tickets.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTicket(i)}
                      className="text-sm text-red-500 hover:text-red-700 transition shrink-0 pb-2.5"
                    >
                      削除
                    </button>
                  )}
                </div>
              ))}

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={addTicket}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  チケットを追加
                </button>
                <span className="text-xs text-muted/50">
                  最大チケット数:{' '}
                  {form.tickets.reduce(
                    (sum, t) => sum + (Number(t.quantity) || 0),
                    0
                  )}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* ───────── 4. プライバシーポリシー情報 ───────── */}
        <section id="privacy" className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text flex items-center gap-2">
            <svg className="w-5 h-5 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            プライバシーポリシー情報
          </h2>

          <div>
            <label className={labelClass}>会社名</label>
            <input
              type="text"
              className={inputClass}
              placeholder="例）株式会社ehaco"
              value={form.companyName}
              onChange={(e) => set('companyName', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>プライバシーポリシーURL</label>
            <input
              type="url"
              className={inputClass}
              placeholder="https://..."
              value={form.privacyPolicyUrl}
              onChange={(e) => set('privacyPolicyUrl', e.target.value)}
            />
          </div>
          <p className="text-xs text-muted/50">
            関連付けされたイベント数: {form.linkedEventsCount}件
          </p>
        </section>

        {/* ───────── 5. アンケート ───────── */}
        <section id="survey" className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text">アンケート</h2>

          <div>
            <label className={labelClass}>アンケートを選択</label>
            <select
              className={selectClass}
              value={form.surveyId}
              onChange={(e) => set('surveyId', e.target.value)}
            >
              <option value="">既存のアンケートから選択</option>
              <option value="1">参加者満足度アンケート</option>
              <option value="2">セミナーフィードバック</option>
            </select>
          </div>
          <Link
            to="/org/surveys/new"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            新しいアンケートを作成
          </Link>
        </section>

        {/* ───────── 6. ターゲット ───────── */}
        <section id="target" className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text">ターゲット</h2>

          <div>
            <label className={labelClass}>ターゲットを選択</label>
            <select
              className={selectClass}
              value={form.targetId}
              onChange={(e) => set('targetId', e.target.value)}
            >
              <option value="">既存のターゲットから選択</option>
              <option value="1">IT企業 経営者・役員</option>
              <option value="2">マーケティング担当者</option>
            </select>
          </div>
          <Link
            to="/org/targets"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80 transition"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            新しいターゲットを作成
          </Link>
        </section>

        {/* ───────── 7. 興味のある分野タグ ───────── */}
        <section id="tags" className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text">
            興味のある分野タグ
          </h2>

          <div className="flex flex-wrap gap-2">
            {form.tags.length === 0 && (
              <span className="text-sm text-muted/50">
                タグが選択されていません
              </span>
            )}
            {form.tags.map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-lg"
              >
                {tag}
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      tags: prev.tags.filter((_, idx) => idx !== i),
                    }))
                  }
                  className="hover:text-accent/70"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={handleTagSelect}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent border border-accent/30 rounded-lg px-4 py-2 hover:bg-accent/5 transition"
          >
            一覧から選択
          </button>
        </section>

        {/* ───────── 8. 配信設定 ───────── */}
        <section id="notify" className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text">配信設定</h2>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer">
              <input
                type="checkbox"
                className={checkboxClass}
                checked={form.remind3days}
                onChange={(e) => set('remind3days', e.target.checked)}
              />
              開催日3日前リマインド
            </label>
            <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer">
              <input
                type="checkbox"
                className={checkboxClass}
                checked={form.remind1day}
                onChange={(e) => set('remind1day', e.target.checked)}
              />
              開催日1日前リマインド
            </label>
          </div>

          <div className="border-t border-ehaco-border pt-4">
            <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer">
              <input
                type="checkbox"
                className={checkboxClass}
                checked={form.notifyFollowers}
                onChange={(e) => set('notifyFollowers', e.target.checked)}
              />
              フォロワーに通知する
            </label>
          </div>
        </section>

        {/* ───────── 9. 公開方法 ───────── */}
        <section id="publish" className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text">公開方法</h2>

          <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer">
            <input
              type="checkbox"
              className={checkboxClass}
              checked={form.isPrivate}
              onChange={(e) => set('isPrivate', e.target.checked)}
            />
            プライベート公開
          </label>
          {form.isPrivate && (
            <p className="text-xs text-muted/50 pl-6">
              URLを知っている人のみがイベントを閲覧できます
            </p>
          )}
        </section>

        {/* ───────── 10. 主催者からのメッセージ ───────── */}
        <section id="message" className={sectionClass}>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-ehaco-text">
            主催者からのメッセージ
          </h2>

          <div>
            <textarea
              className={`${inputClass} min-h-[120px]`}
              placeholder="参加者へのメッセージを入力してください"
              maxLength={1000}
              value={form.organizerMessage}
              onChange={(e) => set('organizerMessage', e.target.value)}
            />
            <p className="text-xs text-muted/50 text-right mt-1">
              {form.organizerMessage.length} / 1,000
            </p>
          </div>
        </section>

        {/* ───────── Bottom actions ───────── */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 pb-8">
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-3 border border-ehaco-border hover:border-accent hover:text-accent rounded-lg shadow-sm text-sm font-semibold text-ehaco-text transition"
          >
            下書き保存
          </button>
          <button
            type="button"
            className="w-full sm:w-auto px-8 py-3 btn-gradient shadow-sm rounded-lg text-sm font-semibold transition"
          >
            保存して公開
          </button>
        </div>
      </div>
    </div>
  );
}

