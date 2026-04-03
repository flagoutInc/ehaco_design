import { useState } from 'react';
import { orgTargets } from '../../data/orgDummy';

const industryOptions = ['IT・ソフトウェア', '製造業', '金融・保険', '小売・流通', '建設・不動産', 'コンサルティング', '医療・ヘルスケア', '教育', 'メディア・広告', 'その他'];
const employeeOptions = ['1〜49名', '50〜99名', '100名以上', '300名以上', '1000名以上'];
const revenueOptions = ['1億未満', '1億〜10億', '10億〜50億', '50億以上', '100億以上'];
const roleOptions = ['経営者・役員', '部長・課長', '経営企画', 'IT・情報システム', 'マーケティング', '営業', '人事・総務', 'エンジニアリング', 'DX推進', 'その他'];
const positionOptions = ['経営者・役員', 'マネージャー以上', '担当者以上', '指定なし'];

const maxNameLength = 25;

interface CheckboxGroupProps {
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
}

function CheckboxGroup({ options, selected, onChange }: CheckboxGroupProps) {
  const toggle = (opt: string) => {
    onChange(selected.includes(opt) ? selected.filter((v) => v !== opt) : [...selected, opt]);
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((opt) => (
        <label key={opt} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition text-sm ${
          selected.includes(opt) ? 'border-accent bg-accent/5 text-accent font-medium' : 'border-ehaco-border text-ehaco-text hover:border-accent/30'
        }`}>
          <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)}
            className="w-4 h-4 rounded border-ehaco-border text-accent focus:ring-accent" />
          {opt}
        </label>
      ))}
    </div>
  );
}

interface RadioGroupProps {
  options: string[];
  selected: string;
  onChange: (value: string) => void;
}

function RadioGroup({ options, selected, onChange }: RadioGroupProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {options.map((opt) => (
        <label key={opt} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition text-sm ${
          selected === opt ? 'border-accent bg-accent/5 text-accent font-medium' : 'border-ehaco-border text-ehaco-text hover:border-accent/30'
        }`}>
          <input type="radio" checked={selected === opt} onChange={() => onChange(opt)}
            className="w-4 h-4 border-ehaco-border text-accent focus:ring-accent" />
          {opt}
        </label>
      ))}
    </div>
  );
}

export default function TargetEditPage() {
  const target = orgTargets[0];

  const [formData, setFormData] = useState({
    name: target.name,
    industry: target.industry ? [target.industry] : [] as string[],
    employees: target.employees,
    revenue: target.revenue,
    role: target.role ? [target.role] : [] as string[],
    position: target.position ? [target.position] : [] as string[],
  });

  const isUsed = false; // mock: ターゲットがイベントで使用中かどうか

  const selectClass = 'w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition';

  return (
    <div className="fade-in">
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">
            ターゲット編集
          </h1>
        </div>

        {isUsed && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800 flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p>このターゲットはイベントで使用中のため編集できません。新しいターゲットを作成してください。</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-6 md:p-8 mb-6">
          <h2 className="text-lg font-bold tracking-tight text-ehaco-text mb-6">ターゲット情報</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                ターゲット名 <span className="text-red-500">*</span>
              </label>
              <input type="text" value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.value.length <= maxNameLength) setFormData((prev) => ({ ...prev, name: e.target.value })); }}
                disabled={isUsed} className={selectClass} />
              <p className="text-xs text-muted text-right mt-1">
                <span className={formData.name.length > maxNameLength * 0.9 ? 'text-red-500' : ''}>{formData.name.length}</span>/{maxNameLength}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-2">業種</label>
              <CheckboxGroup options={industryOptions} selected={formData.industry}
                onChange={(v) => setFormData((prev) => ({ ...prev, industry: v }))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-2">従業員数</label>
              <RadioGroup options={employeeOptions} selected={formData.employees}
                onChange={(v) => setFormData((prev) => ({ ...prev, employees: v }))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-2">年商規模</label>
              <RadioGroup options={revenueOptions} selected={formData.revenue}
                onChange={(v) => setFormData((prev) => ({ ...prev, revenue: v }))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-2">職種</label>
              <CheckboxGroup options={roleOptions} selected={formData.role}
                onChange={(v) => setFormData((prev) => ({ ...prev, role: v }))} />
            </div>

            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-2">立場</label>
              <CheckboxGroup options={positionOptions} selected={formData.position}
                onChange={(v) => setFormData((prev) => ({ ...prev, position: v }))} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button className="border border-red-300 text-red-500 hover:bg-red-50 rounded-lg px-6 py-2.5 text-sm font-medium transition cursor-pointer" disabled={isUsed}>
            削除
          </button>
          <button className="btn-gradient font-medium px-8 py-2.5 rounded-lg transition shadow-sm cursor-pointer active:scale-[0.97]" disabled={isUsed} onClick={() => alert('保存しました')}>
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
