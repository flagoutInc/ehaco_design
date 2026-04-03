import { useState } from 'react';

interface NotificationSetting {
  key: string;
  icon: string;
  title: string;
  freq: string;
}

const notifications: NotificationSetting[] = [
  { key: 'newEvents', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z', title: '新着イベント', freq: '毎週月曜 7:00' },
  { key: 'recommended', icon: 'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z', title: 'おすすめイベント', freq: '不定期' },
];

export default function NotificationSettingsPage() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ newEvents: true, recommended: true });

  const toggle = (key: string): void => setEnabled((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="fade-in">
      <div className="max-w-xl">
        <div className="mb-10">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text">お知らせ設定</h1>
        </div>

        <div className="space-y-4">
          {notifications.map((n) => {
            const on = enabled[n.key];
            return (
              <button key={n.key} onClick={() => toggle(n.key)}
                className={`w-full text-left rounded-2xl p-5 md:p-6 flex items-center gap-5 transition-all cursor-pointer ${
                  on
                    ? 'bg-white ring-2 ring-accent/30 shadow-sm'
                    : 'bg-gray-50 ring-1 ring-ehaco-border/50 opacity-60'
                }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition ${
                  on ? 'bg-accent/10' : 'bg-gray-100'
                }`}>
                  <svg className={`w-6 h-6 transition ${on ? 'text-accent' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={n.icon} />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-lg transition ${on ? 'text-ehaco-text' : 'text-gray-400'}`}>{n.title}</p>
                  <p className={`text-sm mt-0.5 transition ${on ? 'text-muted' : 'text-gray-400'}`}>{n.freq}</p>
                </div>
                <div className={`relative shrink-0 w-14 h-8 rounded-full transition-colors ${on ? 'bg-accent' : 'bg-gray-300'}`}>
                  <span className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${on ? 'left-7' : 'left-1'}`} />
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-end mt-10 pb-8">
          <button className="btn-gradient font-medium px-10 py-3.5 rounded-xl text-base shadow-sm transition cursor-pointer active:scale-[0.97]">保存</button>
        </div>
      </div>
    </div>
  );
}
