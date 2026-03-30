import { useState } from 'react';
import MypageSidebar from '../../components/MypageSidebar';

const notificationOptions = [
  {
    key: 'eventConfirm',
    label: '申込確認通知',
    description: 'イベントへの申込完了時に通知を受け取ります',
  },
  {
    key: 'eventReminder',
    label: 'イベントリマインダー',
    description: '申込済みイベントの開催前にリマインドを受け取ります',
  },
  {
    key: 'recommend',
    label: 'おすすめイベント',
    description: '興味に基づいたおすすめイベント情報を受け取ります',
  },
  {
    key: 'organizer',
    label: 'フォロー中の主催者',
    description: 'フォロー中の主催者の新着イベント情報を受け取ります',
  },
  {
    key: 'system',
    label: '運営からのお知らせ',
    description: 'ehaco!運営からの重要なお知らせを受け取ります',
  },
];

const frequencyOptions = [
  { key: 'realtime', label: 'リアルタイム', description: '通知をリアルタイムでメール送信します' },
  { key: 'daily', label: '1日1回まとめ', description: '1日分の通知をまとめて1通のメールで送信します' },
  { key: 'weekly', label: '週1回まとめ', description: '1週間分の通知をまとめて1通のメールで送信します' },
];

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${
        enabled ? 'bg-accent' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform shadow-sm ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function NotificationSettingsPage() {
  const [siteNotifs, setSiteNotifs] = useState({
    eventConfirm: true,
    eventReminder: true,
    recommend: true,
    organizer: true,
    system: true,
  });

  const [emailNotifs, setEmailNotifs] = useState({
    eventConfirm: true,
    eventReminder: true,
    recommend: false,
    organizer: false,
    system: true,
  });

  const [emailFrequency, setEmailFrequency] = useState('realtime');

  const toggleSiteNotif = (key) => {
    setSiteNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleEmailNotif = (key) => {
    setEmailNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      <MypageSidebar activePage="notification-settings" />
      <div className="mt-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl md:text-2xl font-black text-ehaco-text">お知らせ設定</h1>
            <div className="mt-2 h-1 w-12 bg-accent rounded-full" />
            <p className="text-sm text-gray-500 mt-3">
              受け取る通知の種類と配信方法を設定できます
            </p>
          </div>

          {/* Site notifications */}
          <div className="bg-white rounded-xl border border-ehaco-border p-6 mb-6">
            <h2 className="text-lg font-bold text-ehaco-text mb-4">
              サイト内通知
            </h2>
            <div className="divide-y divide-ehaco-border">
              {notificationOptions.map((option) => (
                <div
                  key={option.key}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-ehaco-text">
                      {option.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {option.description}
                    </p>
                  </div>
                  <Toggle
                    enabled={siteNotifs[option.key]}
                    onChange={() => toggleSiteNotif(option.key)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Email notifications */}
          <div className="bg-white rounded-xl border border-ehaco-border p-6 mb-6">
            <h2 className="text-lg font-bold text-ehaco-text mb-4">
              メール通知
            </h2>
            <div className="divide-y divide-ehaco-border">
              {notificationOptions.map((option) => (
                <div
                  key={option.key}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="text-sm font-medium text-ehaco-text">
                      {option.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {option.description}
                    </p>
                  </div>
                  <Toggle
                    enabled={emailNotifs[option.key]}
                    onChange={() => toggleEmailNotif(option.key)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Email frequency */}
          <div className="bg-white rounded-xl border border-ehaco-border p-6 mb-6">
            <h2 className="text-lg font-bold text-ehaco-text mb-4">
              メール通知の頻度
            </h2>
            <div className="space-y-3">
              {frequencyOptions.map((option) => (
                <label
                  key={option.key}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                    emailFrequency === option.key
                      ? 'border-accent bg-accent/5'
                      : 'border-ehaco-border hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="emailFrequency"
                    value={option.key}
                    checked={emailFrequency === option.key}
                    onChange={() => setEmailFrequency(option.key)}
                    className="sr-only"
                  />
                  <span
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      emailFrequency === option.key
                        ? 'border-accent'
                        : 'border-gray-300'
                    }`}
                  >
                    {emailFrequency === option.key && (
                      <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                    )}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-ehaco-text">
                      {option.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {option.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <button className="bg-accent hover:bg-accent-light text-white font-medium px-8 py-2.5 rounded-lg transition">
              設定を保存
            </button>
          </div>
      </div>
    </div>
  );
}
