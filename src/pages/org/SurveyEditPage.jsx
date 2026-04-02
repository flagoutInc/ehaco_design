import { useState } from 'react';

const SURVEY_NAME_MAX = 25;
const QUESTION_TEXT_MAX = 50;
const MAX_QUESTIONS = 3;
const MAX_OPTIONS = 10;

const FORMAT_OPTIONS = [
  { value: 'single', label: '単一回答式' },
  { value: 'multiple', label: '複数回答式' },
];

export default function SurveyEditPage() {
  const [surveyName, setSurveyName] = useState('参加者満足度アンケート');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      format: 'multiple',
      text: 'イベントの満足度を教えてください',
      options: ['大変満足', '満足', '普通', '不満'],
    },
  ]);

  const addQuestion = () => {
    if (questions.length >= MAX_QUESTIONS) return;
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        format: 'single',
        text: '',
        options: [''],
      },
    ]);
  };

  const removeQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestion = (id, field, value) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const addOption = (questionId) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId || q.options.length >= MAX_OPTIONS) return q;
        return { ...q, options: [...q.options, ''] };
      })
    );
  };

  const removeOption = (questionId, optionIndex) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId || q.options.length <= 1) return q;
        return {
          ...q,
          options: q.options.filter((_, i) => i !== optionIndex),
        };
      })
    );
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId) return q;
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      })
    );
  };

  return (
    <div className="fade-in">
      <div className="max-w-3xl">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4 mb-8">
          アンケート編集
        </h1>

        {/* Survey Info Card */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-6 md:p-8 mb-6">
          <h2 className="text-base font-bold tracking-tight text-ehaco-text mb-4">アンケート情報</h2>
          <div>
            <label className="block text-sm font-medium text-ehaco-text mb-1.5">
              アンケート名
            </label>
            <div className="relative">
              <input
                type="text"
                value={surveyName}
                onChange={(e) => {
                  if (e.target.value.length <= SURVEY_NAME_MAX) {
                    setSurveyName(e.target.value);
                  }
                }}
                maxLength={SURVEY_NAME_MAX}
                className="w-full px-4 py-2.5 rounded-lg border border-ehaco-border text-ehaco-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                placeholder="アンケート名を入力"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
                {surveyName.length}/{SURVEY_NAME_MAX}
              </span>
            </div>
          </div>
        </div>

        {/* Question Cards */}
        {questions.map((question, qIndex) => (
          <div
            key={question.id}
            className="bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-6 mb-4"
          >
            {/* Question Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-ehaco-text">
                アンケート{qIndex + 1}
              </h3>
              <button
                onClick={() => removeQuestion(question.id)}
                className="text-xs font-medium text-red-500 hover:text-red-700 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50 transition"
              >
                削除
              </button>
            </div>

            {/* Format Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                回答形式
              </label>
              <select
                value={question.format}
                onChange={(e) =>
                  updateQuestion(question.id, 'format', e.target.value)
                }
                className="w-full px-4 py-2.5 rounded-lg border border-ehaco-border text-ehaco-text text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition appearance-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23475569' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                }}
              >
                {FORMAT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Question Text */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                設問
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) => {
                    if (e.target.value.length <= QUESTION_TEXT_MAX) {
                      updateQuestion(question.id, 'text', e.target.value);
                    }
                  }}
                  maxLength={QUESTION_TEXT_MAX}
                  className="w-full px-4 py-2.5 rounded-lg border border-ehaco-border text-ehaco-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                  placeholder="設問を入力"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted">
                  {question.text.length}/{QUESTION_TEXT_MAX}
                </span>
              </div>
            </div>

            {/* Answer Options */}
            {(
              <div>
                <label className="block text-sm font-medium text-muted mb-2">
                  選択肢（最大10問まで）
                </label>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updateOption(question.id, oIndex, e.target.value)
                        }
                        className="flex-1 px-4 py-2.5 rounded-lg border border-ehaco-border text-ehaco-text text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                        placeholder={`回答${oIndex + 1}`}
                      />
                      <button
                        onClick={() => removeOption(question.id, oIndex)}
                        disabled={question.options.length <= 1}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-ehaco-border text-muted hover:text-red-500 hover:border-red-300 transition disabled:opacity-30 disabled:cursor-not-allowed"
                        title="選択肢を削除"
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
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => addOption(question.id)}
                        disabled={question.options.length >= MAX_OPTIONS}
                        className="w-9 h-9 flex items-center justify-center rounded-lg border border-ehaco-border text-muted hover:text-accent hover:border-accent transition disabled:opacity-30 disabled:cursor-not-allowed"
                        title="選択肢を追加"
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
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Question Button */}
        {questions.length < MAX_QUESTIONS && (
          <button
            onClick={addQuestion}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-accent/40 text-accent font-medium text-sm hover:border-accent hover:text-accent hover:bg-accent/5 transition mb-8"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            アンケート（{questions.length}/{MAX_QUESTIONS}）追加
          </button>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col items-center gap-4 mt-8">
          <button onClick={() => { alert('保存しました'); window.location.hash = '/org/surveys'; }}
            className="w-full max-w-xs py-3 rounded-xl btn-gradient font-bold text-sm transition shadow-sm cursor-pointer active:scale-[0.97]">
            保存
          </button>
        </div>

        <div className="mt-6">
          <button className="px-5 py-2.5 rounded-lg border border-red-300 text-red-500 text-sm font-medium hover:bg-red-50 transition">
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
