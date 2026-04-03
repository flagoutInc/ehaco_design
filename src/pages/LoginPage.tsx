import { useState } from 'react';
import { Link } from 'react-router-dom';

interface LoginErrors {
  email?: string;
  password?: string;
}

export default function LoginPage(): React.ReactElement {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(true);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showEmailLogin, setShowEmailLogin] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validate = (): LoginErrors => {
    const errs: LoginErrors = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = '正しい形式でメールアドレスを入力してください。';
    }
    if (!password || password.length < 8) {
      errs.password = '8文字以上の半角英数字記号を入力してください。';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
  };

  const isValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 8;

  return (
    <div className="min-h-screen flex flex-col bg-ehaco-bg fade-in">
      {/* Logo */}
      <div className="pt-12 pb-4 text-center">
        <Link to="/">
          <img
            src="/ehaco_design/ehaco-logo.png"
            alt="ehaco!"
            className="mx-auto h-12 object-contain"
          />
        </Link>
        <p className="mt-1 text-sm text-muted">ウェビナー・イベント検索サイト</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-start justify-center px-4 pt-4 pb-16">
        <div className="w-full max-w-md">
          <h1 className="text-center text-3xl font-black text-accent mb-8">
            マイページ ログイン
          </h1>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 rounded-lg border border-ehaco-border bg-white py-3 text-base font-medium text-ehaco-text hover:bg-gray-50 transition active:scale-[0.97]">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Googleでログイン
            </button>
            <button className="w-full flex items-center justify-center gap-3 rounded-lg border border-ehaco-border bg-white py-3 text-base font-medium text-ehaco-text hover:bg-gray-50 transition active:scale-[0.97]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebookでログイン
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-ehaco-border" />
            <span className="text-xs text-muted">または</span>
            <div className="flex-1 h-px bg-ehaco-border" />
          </div>

          {/* Email login toggle */}
          {!showEmailLogin ? (
            <button
              onClick={() => setShowEmailLogin(true)}
              className="w-full rounded-lg border border-ehaco-border bg-white py-3 text-sm font-medium text-ehaco-text hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              メールアドレスでログイン
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-base font-medium text-ehaco-text mb-2">
                  登録しているメールアドレス
                </label>
                <input
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  className={`w-full rounded-md border px-4 py-3.5 text-sm outline-none transition
                    ${errors.email
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-ehaco-border focus:border-accent focus:ring-2 focus:ring-accent/20'
                    }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-base font-medium text-ehaco-text mb-2">
                  パスワード
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className={`w-full rounded-md border px-4 py-3.5 pr-12 text-sm outline-none transition
                      ${errors.password
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                        : 'border-ehaco-border focus:border-accent focus:ring-2 focus:ring-accent/20'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-ehaco-text hover:bg-gray-100 transition"
                    aria-label={showPassword ? 'パスワードを隠す' : 'パスワードを表示'}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Remember */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded border-ehaco-border text-accent focus:ring-accent/30"
                />
                <span className="text-sm text-ehaco-text">ログイン状態を保持する</span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isValid}
                className={`w-full rounded-md py-3.5 text-sm font-semibold transition
                  ${isValid
                    ? 'btn-gradient cursor-pointer active:scale-[0.97]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                ログイン
              </button>
            </form>
          )}

          {/* Forgot password */}
          <div className="mt-5 text-center">
            <Link to="/password-reset" className="text-sm text-accent hover:text-accent-light transition">
              パスワードをお忘れの方はこちら
            </Link>
          </div>

          {/* Register CTA */}
          <div className="mt-12 text-center">
            <p className="text-sm text-ehaco-text leading-relaxed">
              会員登録がまだお済みでない方は、
              <br />
              以下のボタンより新規会員登録をお願いいたします。
            </p>
            <Link
              to="/register"
              className="mt-4 inline-block w-full max-w-xs rounded-md btn-gradient py-3.5 text-sm font-semibold transition active:scale-[0.97]"
            >
              会員登録（無料）
            </Link>
          </div>
        </div>
      </div>

      {/* Simple footer */}
    </div>
  );
}
