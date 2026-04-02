import { useState } from 'react';
import { Link } from 'react-router-dom';

const stepLabels = ['基本情報', '開催・チケット', '設定', '公開', '確認'];

function Progress({ current }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8">
      {stepLabels.map((label, i) => (
        <div key={label} className="flex items-center gap-1 sm:gap-2">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition ${
              i < current ? 'bg-green-500 text-white' : i === current ? 'bg-accent text-white shadow-lg shadow-accent/30' : 'bg-gray-100 text-gray-400'
            }`}>
              {i < current ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              ) : i + 1}
            </div>
            <span className={`text-[10px] mt-1 hidden sm:block ${i === current ? 'text-accent font-bold' : 'text-muted'}`}>{label}</span>
          </div>
          {i < 4 && <div className={`w-6 sm:w-8 h-0.5 mb-4 sm:mb-0 ${i < current ? 'bg-green-500' : 'bg-gray-200'}`} />}
        </div>
      ))}
    </div>
  );
}

export default function NewEventPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    eventName: '', startDate: '', startTime: '', endDate: '', endTime: '',
    recruitStartDate: '', recruitStartTime: '', recruitEndDate: '', recruitEndTime: '',
    eventImage: null, eventImagePreview: '', eventDetail: '',
    isOffline: false, isOnline: false, venueName: '', venueAddress: '', onlineTool: '', streamUrl: '',
    ticketMode: 'ticket', externalTicketUrl: '', tickets: [{ name: '', quantity: '' }],
    companyName: '', privacyPolicyUrl: '',
    surveyId: '', targetId: '', tags: [],
    remind3days: true, remind1day: true, notifyFollowers: false, isPrivate: false, organizerMessage: '',
  });

  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const handleImageUpload = (e) => { const f = e.target.files?.[0]; if (f) { set('eventImage', f); set('eventImagePreview', URL.createObjectURL(f)); } };
  const addTicket = () => setForm((prev) => ({ ...prev, tickets: [...prev.tickets, { name: '', quantity: '' }] }));
  const removeTicket = (i) => setForm((prev) => ({ ...prev, tickets: prev.tickets.filter((_, idx) => idx !== i) }));
  const updateTicket = (i, field, value) => { setForm((prev) => { const t = [...prev.tickets]; t[i] = { ...t[i], [field]: value }; return { ...prev, tickets: t }; }); };

  const next = () => { if (step < 4) { setStep(step + 1); window.scrollTo(0, 0); } };
  const back = () => { if (step > 0) { setStep(step - 1); window.scrollTo(0, 0); } };

  const sectionClass = 'bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-6 md:p-8 space-y-5';
  const labelClass = 'block text-sm font-semibold text-ehaco-text mb-1.5';
  const inputClass = 'w-full rounded-lg border border-ehaco-border bg-white px-4 py-2.5 text-sm text-ehaco-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition';
  const selectClass = 'w-full rounded-lg border border-ehaco-border bg-white px-4 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition appearance-none';
  const checkboxClass = 'w-4 h-4 rounded border-ehaco-border text-accent focus:ring-accent/40';

  return (
    <div className="fade-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">イベント作成</h1>
      </div>

      <Progress current={step} />

      <div className="space-y-6">
        {/* ═══ Step 0: 基本情報 ═══ */}
        {step === 0 && (
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-ehaco-text">基本情報</h2>
            <div><label className={labelClass}>イベント名 <span className="text-red-500">*</span></label><input type="text" className={inputClass} placeholder="例）第3回 DXセミナー" value={form.eventName} onChange={(e) => set('eventName', e.target.value)} /></div>
            <div>
              <label className={labelClass}>開催日時 <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2"><span className="text-xs text-muted shrink-0">開始</span><input type="date" className={inputClass} value={form.startDate} onChange={(e) => set('startDate', e.target.value)} /><input type="time" className={`${inputClass} max-w-[130px]`} value={form.startTime} onChange={(e) => set('startTime', e.target.value)} /></div>
                <div className="flex items-center gap-2"><span className="text-xs text-muted shrink-0">終了</span><input type="date" className={inputClass} value={form.endDate} onChange={(e) => set('endDate', e.target.value)} /><input type="time" className={`${inputClass} max-w-[130px]`} value={form.endTime} onChange={(e) => set('endTime', e.target.value)} /></div>
              </div>
            </div>
            <div>
              <label className={labelClass}>募集期間 <span className="text-red-500">*</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2"><span className="text-xs text-muted shrink-0">開始</span><input type="date" className={inputClass} value={form.recruitStartDate} onChange={(e) => set('recruitStartDate', e.target.value)} /><input type="time" className={`${inputClass} max-w-[130px]`} value={form.recruitStartTime} onChange={(e) => set('recruitStartTime', e.target.value)} /></div>
                <div className="flex items-center gap-2"><span className="text-xs text-muted shrink-0">終了</span><input type="date" className={inputClass} value={form.recruitEndDate} onChange={(e) => set('recruitEndDate', e.target.value)} /><input type="time" className={`${inputClass} max-w-[130px]`} value={form.recruitEndTime} onChange={(e) => set('recruitEndTime', e.target.value)} /></div>
              </div>
            </div>
            <div>
              <label className={labelClass}>イベント画像 <span className="text-red-500">*</span></label>
              <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-ehaco-border rounded-xl py-10 cursor-pointer hover:border-accent/50 transition group">
                {form.eventImagePreview ? <img src={form.eventImagePreview} alt="プレビュー" className="max-h-40 rounded-lg object-contain" /> : (
                  <><svg className="w-10 h-10 text-muted/50 group-hover:text-accent transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-8m-4 4h8m5 4V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2z" /></svg><span className="text-sm text-muted">クリックして画像をアップロード</span></>
                )}
                <span className="text-xs text-muted/50">推奨: 1,100px × 339px</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>
            <div><label className={labelClass}>イベント詳細 <span className="text-red-500">*</span></label><textarea className={`${inputClass} min-h-[160px]`} placeholder="イベントの詳細を入力" value={form.eventDetail} onChange={(e) => set('eventDetail', e.target.value)} /></div>
          </section>
        )}

        {/* ═══ Step 1: 開催・チケット ═══ */}
        {step === 1 && (<>
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-ehaco-text">開催方法</h2>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer"><input type="checkbox" className={checkboxClass} checked={form.isOffline} onChange={(e) => set('isOffline', e.target.checked)} />オフライン</label>
              <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer"><input type="checkbox" className={checkboxClass} checked={form.isOnline} onChange={(e) => set('isOnline', e.target.checked)} />オンライン</label>
            </div>
            {form.isOffline && (<div className="space-y-4 pl-6 border-l-2 border-accent/20"><div><label className={labelClass}>開催場所名</label><input type="text" className={inputClass} placeholder="例）東京ビッグサイト" value={form.venueName} onChange={(e) => set('venueName', e.target.value)} /></div><div><label className={labelClass}>開催場所住所</label><input type="text" className={inputClass} placeholder="例）東京都江東区有明3-11-1" value={form.venueAddress} onChange={(e) => set('venueAddress', e.target.value)} /></div></div>)}
            {form.isOnline && (<div className="space-y-4 pl-6 border-l-2 border-accent/20"><div><label className={labelClass}>開催ツール</label><select className={selectClass} value={form.onlineTool} onChange={(e) => set('onlineTool', e.target.value)}><option value="">選択してください</option><option value="zoom">Zoom</option><option value="teams">Microsoft Teams</option><option value="meet">Google Meet</option><option value="webex">Webex</option><option value="other">その他</option></select></div><div><label className={labelClass}>配信URL</label><input type="url" className={inputClass} placeholder="https://..." value={form.streamUrl} onChange={(e) => set('streamUrl', e.target.value)} /></div></div>)}
          </section>
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-ehaco-text">チケット</h2>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="ticketMode" className="w-4 h-4 text-accent" checked={form.ticketMode === 'ticket'} onChange={() => set('ticketMode', 'ticket')} />チケット設定</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="radio" name="ticketMode" className="w-4 h-4 text-accent" checked={form.ticketMode === 'url'} onChange={() => set('ticketMode', 'url')} />URL指定</label>
            </div>
            {form.ticketMode === 'url' && <div><label className={labelClass}>外部チケットURL</label><input type="url" className={inputClass} placeholder="https://..." value={form.externalTicketUrl} onChange={(e) => set('externalTicketUrl', e.target.value)} /></div>}
            {form.ticketMode === 'ticket' && (<div className="space-y-4">
              {form.tickets.map((ticket, i) => (<div key={i} className="flex flex-col sm:flex-row items-start sm:items-end gap-3 p-4 ring-1 ring-ehaco-border/50 rounded-xl"><div className="flex-1 w-full"><label className="text-xs text-muted mb-1 block">チケット名</label><input type="text" className={inputClass} placeholder="例）一般チケット" value={ticket.name} onChange={(e) => updateTicket(i, 'name', e.target.value)} /></div><div className="w-full sm:w-28"><label className="text-xs text-muted mb-1 block">定員数</label><input type="number" className={inputClass} placeholder="100" value={ticket.quantity} onChange={(e) => updateTicket(i, 'quantity', e.target.value)} /></div>{form.tickets.length > 1 && <button type="button" onClick={() => removeTicket(i)} className="text-sm text-red-500 hover:text-red-700 transition shrink-0 pb-2.5">削除</button>}</div>))}
              <button type="button" onClick={addTicket} className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>チケットを追加</button>
            </div>)}
          </section>
        </>)}

        {/* ═══ Step 2: 設定 ═══ */}
        {step === 2 && (<>
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-ehaco-text">プライバシーポリシー</h2>
            <div><label className={labelClass}>会社名 <span className="text-red-500">*</span></label><input type="text" className={inputClass} placeholder="例）株式会社ehaco" value={form.companyName} onChange={(e) => set('companyName', e.target.value)} /></div>
            <div><label className={labelClass}>プライバシーポリシーURL <span className="text-red-500">*</span></label><input type="url" className={inputClass} placeholder="https://..." value={form.privacyPolicyUrl} onChange={(e) => set('privacyPolicyUrl', e.target.value)} /></div>
          </section>
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-ehaco-text">アンケート</h2>
            <div><label className={labelClass}>アンケートを選択</label><select className={selectClass} value={form.surveyId} onChange={(e) => set('surveyId', e.target.value)}><option value="">既存のアンケートから選択</option><option value="1">参加者満足度アンケート</option><option value="2">セミナーフィードバック</option></select></div>
            <Link to="/org/surveys/new" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>新しいアンケートを作成</Link>
          </section>
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-ehaco-text">ターゲット</h2>
            <div><label className={labelClass}>ターゲットを選択</label><select className={selectClass} value={form.targetId} onChange={(e) => set('targetId', e.target.value)}><option value="">既存のターゲットから選択</option><option value="1">IT企業 経営者・役員</option><option value="2">マーケティング担当者</option></select></div>
            <Link to="/org/targets" className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:text-accent/80"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>新しいターゲットを作成</Link>
          </section>
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-ehaco-text">興味のある分野タグ</h2>
            <div className="flex flex-wrap gap-2">
              {form.tags.length === 0 && <span className="text-sm text-muted/50">タグが選択されていません</span>}
              {form.tags.map((tag, i) => (<span key={i} className="inline-flex items-center gap-1 text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-lg">{tag}<button type="button" onClick={() => setForm((p) => ({ ...p, tags: p.tags.filter((_, idx) => idx !== i) }))} className="hover:text-accent/70"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></span>))}
            </div>
            <button type="button" className="inline-flex items-center gap-1.5 text-sm font-medium text-accent border border-accent/30 rounded-lg px-4 py-2 hover:bg-accent/5 transition">一覧から選択</button>
          </section>
        </>)}

        {/* ═══ Step 3: 公開 ═══ */}
        {step === 3 && (<>
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-ehaco-text">配信設定</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer"><input type="checkbox" className={checkboxClass} checked={form.remind3days} onChange={(e) => set('remind3days', e.target.checked)} />開催日3日前リマインド</label>
              <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer"><input type="checkbox" className={checkboxClass} checked={form.remind1day} onChange={(e) => set('remind1day', e.target.checked)} />開催日1日前リマインド</label>
            </div>
            <div className="border-t border-ehaco-border pt-4">
              <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer"><input type="checkbox" className={checkboxClass} checked={form.notifyFollowers} onChange={(e) => set('notifyFollowers', e.target.checked)} />フォロワーに通知する</label>
            </div>
          </section>
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-ehaco-text">公開方法</h2>
            <label className="flex items-center gap-2 text-sm text-ehaco-text cursor-pointer"><input type="checkbox" className={checkboxClass} checked={form.isPrivate} onChange={(e) => set('isPrivate', e.target.checked)} />プライベート公開</label>
            {form.isPrivate && <p className="text-xs text-muted/50 pl-6">URLを知っている人のみがイベントを閲覧できます</p>}
          </section>
          <section className={sectionClass}>
            <h2 className="text-lg font-bold text-ehaco-text">主催者からのメッセージ</h2>
            <div><textarea className={`${inputClass} min-h-[120px]`} placeholder="参加者へのメッセージを入力" maxLength={1000} value={form.organizerMessage} onChange={(e) => set('organizerMessage', e.target.value)} /><p className="text-xs text-muted/50 text-right mt-1">{form.organizerMessage.length} / 1,000</p></div>
          </section>
        </>)}

        {/* ═══ Step 4: 確認 ═══ */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-6 md:p-8">
            <h2 className="text-lg font-bold text-ehaco-text mb-6">入力内容の確認</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-accent">基本情報</h3><button onClick={() => setStep(0)} className="text-xs text-accent hover:underline cursor-pointer">編集</button></div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                  <dt className="text-muted">イベント名</dt><dd className="text-ehaco-text font-medium">{form.eventName || '—'}</dd>
                  <dt className="text-muted">開催日時</dt><dd className="text-ehaco-text">{form.startDate} {form.startTime} 〜 {form.endDate} {form.endTime}</dd>
                  <dt className="text-muted">募集期間</dt><dd className="text-ehaco-text">{form.recruitStartDate} {form.recruitStartTime} 〜 {form.recruitEndDate} {form.recruitEndTime}</dd>
                  <dt className="text-muted">画像</dt><dd className="text-ehaco-text">{form.eventImagePreview ? '設定済み' : '未設定'}</dd>
                  <dt className="text-muted">詳細</dt><dd className="text-ehaco-text line-clamp-2">{form.eventDetail || '—'}</dd>
                </dl>
              </div>
              <div className="border-t border-ehaco-border" />
              <div>
                <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-accent">開催・チケット</h3><button onClick={() => setStep(1)} className="text-xs text-accent hover:underline cursor-pointer">編集</button></div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                  <dt className="text-muted">開催方法</dt><dd className="text-ehaco-text">{[form.isOffline && 'オフライン', form.isOnline && 'オンライン'].filter(Boolean).join(' / ') || '未選択'}</dd>
                  {form.isOffline && <><dt className="text-muted">場所</dt><dd className="text-ehaco-text">{form.venueName || '—'}</dd></>}
                  {form.isOnline && <><dt className="text-muted">ツール</dt><dd className="text-ehaco-text">{form.onlineTool || '—'}</dd></>}
                  <dt className="text-muted">チケット</dt><dd className="text-ehaco-text">{form.ticketMode === 'url' ? '外部URL' : `${form.tickets.length}種類`}</dd>
                </dl>
              </div>
              <div className="border-t border-ehaco-border" />
              <div>
                <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-accent">設定</h3><button onClick={() => setStep(2)} className="text-xs text-accent hover:underline cursor-pointer">編集</button></div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                  <dt className="text-muted">会社名</dt><dd className="text-ehaco-text">{form.companyName || '—'}</dd>
                  <dt className="text-muted">アンケート</dt><dd className="text-ehaco-text">{form.surveyId ? `ID: ${form.surveyId}` : '未選択'}</dd>
                  <dt className="text-muted">ターゲット</dt><dd className="text-ehaco-text">{form.targetId ? `ID: ${form.targetId}` : '未選択'}</dd>
                  <dt className="text-muted">タグ</dt><dd className="text-ehaco-text">{form.tags.length > 0 ? form.tags.join(', ') : '未選択'}</dd>
                </dl>
              </div>
              <div className="border-t border-ehaco-border" />
              <div>
                <div className="flex items-center justify-between mb-3"><h3 className="text-sm font-bold text-accent">公開</h3><button onClick={() => setStep(3)} className="text-xs text-accent hover:underline cursor-pointer">編集</button></div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                  <dt className="text-muted">リマインド</dt><dd className="text-ehaco-text">{[form.remind3days && '3日前', form.remind1day && '1日前'].filter(Boolean).join(', ') || 'なし'}</dd>
                  <dt className="text-muted">フォロワー通知</dt><dd className="text-ehaco-text">{form.notifyFollowers ? 'する' : 'しない'}</dd>
                  <dt className="text-muted">公開方法</dt><dd className="text-ehaco-text">{form.isPrivate ? 'プライベート' : '一般公開'}</dd>
                  <dt className="text-muted">メッセージ</dt><dd className="text-ehaco-text line-clamp-2">{form.organizerMessage || '—'}</dd>
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 pb-8">
        {step > 0 ? (
          <button onClick={back} className="flex items-center gap-1.5 text-sm text-muted hover:text-ehaco-text transition cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            戻る
          </button>
        ) : (
          <a href="#/org/events" className="text-sm text-muted hover:text-ehaco-text transition">キャンセル</a>
        )}
        <div className="flex gap-3">
          {step === 4 && (
            <button onClick={() => { alert('下書きを保存しました'); window.location.hash = '/org/events'; }}
              className="px-6 py-2.5 border border-ehaco-border hover:border-accent hover:text-accent rounded-lg text-sm font-semibold text-ehaco-text transition cursor-pointer">
              下書き
            </button>
          )}
          <button onClick={step === 4 ? () => { alert('イベントを保存しました'); window.location.hash = '/org/events'; } : next}
            className="btn-gradient px-8 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer active:scale-[0.97]">
            {step === 4 ? '保存' : '次へ'}
          </button>
        </div>
      </div>
    </div>
  );
}
