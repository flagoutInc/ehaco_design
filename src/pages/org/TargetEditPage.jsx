import { useState } from 'react';
import { orgTargets } from '../../data/orgDummy';

const industryOptions = ['IT・ソフトウェア', '製造業', '金融・保険', '小売・流通', '建設・不動産', 'コンサルティング', '医療・ヘルスケア', '教育', 'メディア・広告', 'その他'];
const employeeOptions = ['1〜49名', '50〜99名', '100名以上', '300名以上', '1000名以上'];
const revenueOptions = ['1億未満', '1億〜10億', '10億〜50億', '50億以上', '100億以上'];
const roleOptions = ['経営者・役員', '部長・課長', '経営企画', 'IT・情報システム', 'マーケティング', '営業', '人事・総務', 'エンジニアリング', 'DX推進', 'その他'];
const positionOptions = ['経営者・役員', 'マネージャー以上', '担当者以上', '指定なし'];

export default function TargetEditPage() {
  const target = orgTargets[0];
  const maxNameLength = 25;

  const [formData, setFormData] = useState({
    name: target.name,
    industry: target.industry,
    employees: target.employees,
    revenue: target.revenue,
    role: target.role,
    position: target.position,
  });

  const handleChange = (field) => (e) => {
    if (field === 'name' && e.target.value.length > maxNameLength) return;
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="fade-in">
      <div className="max-w-3xl">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-ehaco-text border-l-4 border-accent pl-4">
            ターゲット編集
          </h1>
        </div>

        {/* Target info card */}
        <div className="bg-white rounded-2xl shadow-sm ring-1 ring-ehaco-border/50 p-6 md:p-8 mb-6">
          <h2 className="text-lg font-bold tracking-tight text-ehaco-text mb-6">ターゲット情報</h2>

          <div className="space-y-5">
            {/* ターゲット名 */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">
                ターゲット名 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleChange('name')}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
                required
              />
              <p className="text-xs text-muted text-right mt-1">
                <span className={formData.name.length > maxNameLength * 0.9 ? 'text-red-500' : ''}>
                  {formData.name.length}
                </span>
                /{maxNameLength}
              </p>
            </div>

            {/* 業種 */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">業種</label>
              <select
                value={formData.industry}
                onChange={handleChange('industry')}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              >
                <option value="">選択してください</option>
                {industryOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* 従業員数 */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">従業員数</label>
              <select
                value={formData.employees}
                onChange={handleChange('employees')}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              >
                <option value="">選択してください</option>
                {employeeOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* 年商規模 */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">年商規模</label>
              <select
                value={formData.revenue}
                onChange={handleChange('revenue')}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              >
                <option value="">選択してください</option>
                {revenueOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* 職種 */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">職種</label>
              <select
                value={formData.role}
                onChange={handleChange('role')}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              >
                <option value="">選択してください</option>
                {roleOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* 立場 */}
            <div>
              <label className="block text-sm font-medium text-ehaco-text mb-1.5">立場</label>
              <select
                value={formData.position}
                onChange={handleChange('position')}
                className="w-full border border-ehaco-border rounded-lg px-3 py-2.5 text-sm text-ehaco-text bg-white focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
              >
                <option value="">選択してください</option>
                {positionOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <button className="border border-red-300 text-red-500 hover:bg-red-50 rounded-lg px-6 py-2.5 text-sm font-medium transition">
            削除
          </button>
          <button className="btn-gradient font-medium px-8 py-2.5 rounded-lg transition shadow-sm">
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
