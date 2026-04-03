export default function PrivacyPage(): React.ReactElement {
  return (
    <div className="min-h-screen bg-ehaco-bg fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-ehaco-text mb-10">個人情報の取り扱いについて</h1>
        <div className="bg-white rounded-2xl ring-1 ring-ehaco-border/50 p-6 md:p-8 text-base text-ehaco-text leading-relaxed space-y-8">

          <h2 className="text-xl font-black mt-0 border-l-4 border-accent pl-3">保有個人データに関する周知事項</h2>

          <div>
            <h3 className="font-bold text-base mb-2">1. 事業者の名称</h3>
            <p>株式会社フラグアウト</p>
          </div>

          <div>
            <h3 className="font-bold text-base mb-2">2. 管理者の氏名又は職名</h3>
            <p>個人情報保護管理責任者 梶原 正明（株式会社フラグアウト 代表取締役）</p>
          </div>

          <div>
            <h3 className="font-bold text-base mb-2">3. 個人情報の利用目的</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mt-2">
                <thead>
                  <tr className="bg-gray-50"><th className="border border-ehaco-border px-4 py-2 text-left font-bold">分類</th><th className="border border-ehaco-border px-4 py-2 text-left font-bold">利用目的</th></tr>
                </thead>
                <tbody>
                  <tr><td className="border border-ehaco-border px-4 py-2 align-top">各サービス利用者情報</td><td className="border border-ehaco-border px-4 py-2">マーケティング支援事業における、当社や当社運営サイト掲載企業のサービスの案内（電話、送付物などによる情報提供）およびメルマガ配信のため。当社や掲載企業等が提供しているサービス・広告等の改善、新規サービスの案内のため。</td></tr>
                  <tr><td className="border border-ehaco-border px-4 py-2 align-top">取引先情報</td><td className="border border-ehaco-border px-4 py-2">商談及び業務上の諸連絡、受発注業務、請求支払業務、メールマガジン配信のため</td></tr>
                  <tr><td className="border border-ehaco-border px-4 py-2 align-top">社員情報</td><td className="border border-ehaco-border px-4 py-2">社員の人事労務管理、業務管理、健康管理、セキュリティ管理のため</td></tr>
                  <tr><td className="border border-ehaco-border px-4 py-2 align-top">採用応募者情報</td><td className="border border-ehaco-border px-4 py-2">採用応募者への連絡と当社の採用業務管理のため</td></tr>
                  <tr><td className="border border-ehaco-border px-4 py-2 align-top">お問い合せ情報</td><td className="border border-ehaco-border px-4 py-2">お問い合せ対応のため</td></tr>
                  <tr><td className="border border-ehaco-border px-4 py-2 align-top">取材先情報</td><td className="border border-ehaco-border px-4 py-2">記事・原稿制作などの制作物制作のため</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base mb-2">5. 個人情報取扱いの委託</h3>
            <p>当社は事業運営上、業務の一部を外部に委託しています。業務委託先に対しては、個人情報を適切に取り扱っていると認められる委託先を選定し、契約等において個人情報の適正管理・機密保持などによる漏洩防止に必要な事項を取決め、適切な管理を実施させます。</p>
          </div>

          <div>
            <h3 className="font-bold text-base mb-2">6. 個人情報の開示等の請求</h3>
            <p>お客様は、当社に対してご自身の個人情報の開示等（利用目的の通知、開示、内容の訂正・追加・削除、利用の停止または消去、第三者への提供の停止）に関して、当社問合わせ窓口に申し出ることができます。その際、当社はお客様ご本人を確認させていただいたうえで、合理的な期間内に対応いたします。</p>
          </div>

          <div>
            <h3 className="font-bold text-base mb-2">7. 個人情報の保存期間</h3>
            <p>当社は、お客様にサービスを提供するために必要となる期間の間、個人情報を保持しますが、必要がなくなった場合には、速やかにこれを消去します。</p>
          </div>

          <div>
            <h3 className="font-bold text-base mb-2">8. 個人情報を提供されることの任意性について</h3>
            <p>お客様が当社に個人情報を提供されるかどうかは、お客様の任意によるものです。ただし、必要な項目をいただけない場合、各サービス等が適切な状態で提供できない場合があります。</p>
          </div>

          <div>
            <h3 className="font-bold text-base mb-2">9. クッキー（Cookies）について</h3>
            <p>クッキーは、お客様が当社のサイトに再度訪問された際、より便利にご利用いただくためのもので、お客様のプライバシーを侵害するものではありません。</p>
            <p className="mt-2">当社のサイトでは個人情報を入力していただく部分にはすべてSSLのデータ暗号化システムを利用しております。さらに、サイト内における情報の保護にもファイアウォールを設置するなどの方策を採っております。ただし、インターネット通信の性質上、セキュリティを完全に保証するものではありません。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
