import { useState } from 'react';
import MypageSidebar from '../../components/MypageSidebar';
import { user } from '../../data/dummy';

const externalAccounts = [
  {
    name: 'Google',
    connected: true,
    color: 'text-red-500',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    connected: false,
    color: 'text-blue-600',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    connected: false,
    color: 'text-blue-700',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2" />
      </svg>
    ),
  },
];

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

export default function SettingsPage() {
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
      <MypageSidebar activePage="settings" />
      <div className="mt-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-xl md:text-2xl font-black text-ehaco-text">設定</h1>
            <div className="mt-2 h-1 w-12 bg-accent rounded-full" />
          </div>

          {/* ===== Section 1: アカウント ===== */}
          <div className="mb-12">
            <h2 className="text-lg font-bold text-ehaco-text mb-6">アカウント</h2>

            {/* Email */}
            <div className="bg-white rounded-xl border border-ehaco-border p-6 mb-6">
              <h3 className="text-base font-bold text-ehaco-text mb-4">
                メールアドレス
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">現在のメールアドレス</p>
                  <p className="text-sm font-medium text-ehaco-text mt-1">
                    {user.email}
                  </p>
                </div>
                <button className="text-sm font-medium text-accent hover:text-accent-light transition border border-accent hover:border-accent-light px-4 py-2 rounded-lg">
                  変更する
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="bg-white rounded-xl border border-ehaco-border p-6 mb-6">
              <h3 className="text-base font-bold text-ehaco-text mb-4">
                パスワード
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">現在のパスワード</p>
                  <p className="text-sm font-medium text-ehaco-text mt-1 tracking-widest">
                    ••••••••••
                  </p>
                </div>
                <button className="text-sm font-medium text-accent hover:text-accent-light transition border border-accent hover:border-accent-light px-4 py-2 rounded-lg">
                  変更する
                </button>
              </div>
            </div>

            {/* External accounts */}
            <div className="bg-white rounded-xl border border-ehaco-border p-6 mb-6">
              <h3 className="text-base font-bold text-ehaco-text mb-4">
                外部アカウント連携
              </h3>
              <div className="divide-y divide-ehaco-border">
                {externalAccounts.map((account) => (
                  <div
                    key={account.name}
                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className={account.color}>{account.icon}</span>
                      <div>
                        <p className="text-sm font-medium text-ehaco-text">
                          {account.name}
                        </p>
                        {account.connected && (
                          <p className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                            連携済み
                          </p>
                        )}
                      </div>
                    </div>
                    {account.connected ? (
                      <button className="text-sm text-gray-500 hover:text-red-500 transition">
                        連携を解除
                      </button>
                    ) : (
                      <button className="text-sm font-medium text-accent hover:text-accent-light transition border border-accent hover:border-accent-light px-4 py-2 rounded-lg">
                        連携する
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Account deletion */}
            <div className="bg-white rounded-xl border-2 border-red-200 p-6">
              <h3 className="text-lg font-bold text-red-600 mb-2">
                アカウント削除
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                アカウントを削除すると、すべてのデータ（申込履歴、お気に入り、プロフィール情報など）が完全に削除され、復元することはできません。この操作は取り消せません。
              </p>
              <button className="text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition px-6 py-2.5 rounded-lg">
                アカウントを削除する
              </button>
            </div>
          </div>

          {/* ===== Section 2: 通知設定 ===== */}
          <div>
            <h2 className="text-lg font-bold text-ehaco-text mb-6">通知設定</h2>
            <p className="text-sm text-gray-500 mb-6">
              受け取る通知の種類と配信方法を設定できます
            </p>

            {/* Site notifications */}
            <div className="bg-white rounded-xl border border-ehaco-border p-6 mb-6">
              <h3 className="text-base font-bold text-ehaco-text mb-4">
                サイト内通知
              </h3>
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
              <h3 className="text-base font-bold text-ehaco-text mb-4">
                メール通知
              </h3>
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
              <h3 className="text-base font-bold text-ehaco-text mb-4">
                メール通知の頻度
              </h3>
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
    </div>
  );
}
