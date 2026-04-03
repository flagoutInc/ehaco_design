import { Link } from 'react-router-dom';

interface CompanyRow {
  label: string;
  value: string;
  link?: string;
}

export default function CompanyInfoPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-ehaco-bg fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text mb-10">運営会社</h1>

        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 overflow-hidden">
          <table className="w-full text-left">
            <tbody>
              {([
                { label: '運営会社', value: '株式会社フラグアウト', link: 'https://flagout.co.jp/' },
                { label: '代表者', value: '代表取締役 梶原 正明' },
                { label: '所在地', value: '〒160-0022\n東京都新宿区新宿5丁目14-12' },
                { label: '事業内容', value: 'ウェビナーマーケティング支援\nehaco!（エハコ）の運営' },
              ] as CompanyRow[]).map((row, i) => (
                <tr key={row.label} className={i > 0 ? 'border-t border-ehaco-border' : ''}>
                  <th className="px-6 py-5 text-sm font-bold text-ehaco-text bg-gray-50 w-36 md:w-44 align-top whitespace-nowrap">{row.label}</th>
                  <td className="px-6 py-5 text-base text-ehaco-text">
                    {row.link ? (
                      <a href={row.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{row.value}</a>
                    ) : (
                      row.value.split('\n').map((line, j) => <span key={j}>{line}{j < row.value.split('\n').length - 1 && <br />}</span>)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 text-center">
          <Link to="/" className="text-sm text-accent hover:text-accent-light font-medium transition">トップページへ戻る</Link>
        </div>
      </div>
    </div>
  );
}
