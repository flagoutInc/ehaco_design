import { Link, useParams } from 'react-router-dom';
import { orgSurveys } from '../../data/orgDummy';

const mockResults = {
  totalResponses: 89,
  responseRate: 72,
  questions: [
    {
      question: '本セミナーの満足度を教えてください',
      type: 'radio',
      answers: [
        { label: '非常に満足', count: 34, pct: 38 },
        { label: '満足', count: 31, pct: 35 },
        { label: 'ふつう', count: 15, pct: 17 },
        { label: 'やや不満', count: 6, pct: 7 },
        { label: '不満', count: 3, pct: 3 },
      ],
    },
    {
      question: '今後参加したいテーマを教えてください（複数選択可）',
      type: 'checkbox',
      answers: [
        { label: 'AI・機械学習', count: 52, pct: 58 },
        { label: 'データ分析', count: 45, pct: 51 },
        { label: 'クラウド', count: 38, pct: 43 },
        { label: 'セキュリティ', count: 29, pct: 33 },
        { label: 'マーケティング', count: 22, pct: 25 },
        { label: 'マネジメント', count: 18, pct: 20 },
      ],
    },
    {
      question: 'ご意見・ご感想をお聞かせください',
      type: 'text',
      answers: [
        { text: '非常に実践的な内容で参考になりました。特にデータ活用の事例が具体的で分かりやすかったです。', date: '2026-04-15' },
        { text: 'もう少し質疑応答の時間が欲しかったです。内容自体は大変満足です。', date: '2026-04-15' },
        { text: '業界特化の事例があるとさらに良いと思います。次回も参加したいです。', date: '2026-04-15' },
      ],
    },
  ],
};

const barColors = ['bg-accent', 'bg-accent-light', 'bg-indigo-300', 'bg-indigo-200', 'bg-gray-300'];

export default function SurveyResultsPage() {
  const { id } = useParams();
  const survey = orgSurveys.find((s) => s.id === Number(id)) || orgSurveys[0];

  return (
    <div className="fade-in">
      <div className="mb-6">
        <Link to="/org/surveys" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          アンケート一覧に戻る
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text border-l-4 border-accent pl-4">
          {survey.name} — 集計結果
        </h1>
        <button className="shrink-0 border border-ehaco-border text-ehaco-text text-sm font-medium px-4 py-2 rounded-lg hover:border-accent hover:text-accent transition cursor-pointer flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          CSV出力
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 text-center">
          <p className="text-3xl font-black text-accent">{mockResults.totalResponses}</p>
          <p className="text-xs text-muted mt-1">回答数</p>
        </div>
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 text-center">
          <p className="text-3xl font-black text-ehaco-text">{mockResults.responseRate}%</p>
          <p className="text-xs text-muted mt-1">回答率</p>
        </div>
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-5 text-center col-span-2 sm:col-span-1">
          <p className="text-3xl font-black text-green-600">4.0</p>
          <p className="text-xs text-muted mt-1">平均満足度（5段階）</p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {mockResults.questions.map((q, qi) => (
          <div key={qi} className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6">
            <div className="flex items-start gap-3 mb-5">
              <span className="shrink-0 w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-xs font-bold text-accent">Q{qi + 1}</span>
              <h3 className="font-bold text-ehaco-text">{q.question}</h3>
            </div>

            {q.type !== 'text' ? (
              <div className="space-y-3">
                {q.answers.map((a, ai) => (
                  <div key={ai}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-ehaco-text">{a.label}</span>
                      <span className="text-muted">{a.count}件 ({a.pct}%)</span>
                    </div>
                    <div className="w-full h-6 bg-gray-100 rounded-lg overflow-hidden">
                      <div
                        className={`h-full rounded-lg ${barColors[ai % barColors.length]} transition-all`}
                        style={{ width: `${a.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {q.answers.map((a, ai) => (
                  <div key={ai} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-ehaco-text">{a.text}</p>
                    <p className="text-xs text-muted mt-2">{a.date}</p>
                  </div>
                ))}
                <p className="text-xs text-muted text-center pt-2">他 {mockResults.totalResponses - q.answers.length}件の回答があります</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
