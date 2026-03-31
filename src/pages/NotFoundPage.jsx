import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 fade-in">
      <Link to="/" className="mb-8">
        <img src="/ehaco_design/ehaco-logo.png" alt="ehaco!" className="h-8 object-contain" />
      </Link>

      <h1 className="text-8xl font-black text-gradient">404</h1>

      <p className="mt-4 text-xl text-muted">ページが見つかりません</p>

      <p className="mt-2 text-sm text-muted">
        お探しのページは移動または削除された可能性があります
      </p>

      <Link
        to="/"
        className="mt-8 btn-gradient px-8 py-3 rounded-lg font-medium"
      >
        トップページに戻る
      </Link>
    </div>
  );
}
