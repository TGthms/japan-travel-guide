/**
 * Privacy Policy & Terms of Use renderer (EN / JA / zh-CN)
 *
 * Localization notes (aligned with USA Travel Guide legal i18n):
 * - English is the source of legal meaning.
 * - ja / zh-CN aim for native legal register (clear, direct, region-appropriate
 *   wording inspired by polished privacy/legal voice) while preserving the same
 *   section structure and substance as English.
 */
(function (global) {
  "use strict";

  const LEGAL = {
    privacy: {
      en: {
        title: "Privacy Policy",
        updated: "Updated July 11, 2026",
        lead: "Your privacy matters. This Privacy Policy explains clearly how <strong>Japan Travel Guide</strong> (the “Site,” “we,” “us”) collects, uses, discloses, transfers, and stores information when you visit or use this website — including the guide, city pages, photo gallery, and travel tools. We designed the Site to work well with as little personal data as possible.",
        toc: "On this page",
        sections: [
          {
            title: "Overview",
            html: `<p>The Site is an editorial travel guide for Japan. It is primarily a <strong>static website</strong>: most content is delivered as pages and files, and core browsing does not require an account.</p>
<p>We treat as “personal data” any information that identifies you or can reasonably be linked to you. Aggregated or purely technical data that cannot reasonably identify you is not personal data for this policy.</p>`,
          },
          {
            title: "What we collect",
            html: `<p>Depending on how you use the Site, the following may be involved:</p>
<ul>
<li><strong>Preferences you choose.</strong> Language, units (km/mi, °C/°F), theme, motion preference, packing checklist, gallery quality, and similar settings may be saved on your device with browser storage (e.g. <code>localStorage</code>). These settings stay on your device unless you clear site data.</li>
<li><strong>Technical data processed by your browser or host.</strong> Like most websites, standard request information (for example IP address, browser type, and requested URLs) may be processed by the service that hosts or delivers the Site (for example a static host or CDN) for delivery, security, and reliability. We do not operate a separate advertising profile from this Site.</li>
<li><strong>Information you send voluntarily.</strong> If you contact us (for example by email), we receive what you choose to include in that message.</li>
<li><strong>No account system.</strong> The Site does not require registration, passwords, or payment information for normal use of the guide, gallery, or tools.</li>
</ul>`,
          },
          {
            title: "How we use information",
            html: `<ul>
<li>To remember your display and accessibility preferences between visits on the same browser.</li>
<li>To provide interactive tools (for example currency conversion, which may call a third-party rate API).</li>
<li>To operate, secure, and improve delivery of the Site through hosting infrastructure.</li>
<li>To respond if you contact us.</li>
</ul>
<p>We do <strong>not</strong> sell your personal data. We do not use the Site’s preference storage for cross-site advertising.</p>`,
          },
          {
            title: "Where information is stored",
            html: `<p>Preference data is stored <strong>locally on your device</strong> by your browser. Hosting providers may process connection logs in the regions where their infrastructure is located. If the Site is served from a public repository or static host (for example GitHub Pages), their respective privacy terms also apply to that hosting.</p>`,
          },
          {
            title: "Third-party services",
            html: `<p>The Site may load or contact third-party services necessary for features you use:</p>
<ul>
<li><strong>Fonts.</strong> Web fonts may be loaded from Google Fonts so Japanese, Chinese, and Latin text display correctly. That request may include technical data such as your IP address, subject to Google’s policies.</li>
<li><strong>Exchange rates (Tools).</strong> The currency converter may request rates from a public API (for example Frankfurter). Only the currency codes needed for the conversion are sent for that request.</li>
<li><strong>Weather (Tools).</strong> Forecasts, geocoding, and air quality are requested from Open-Meteo. Queries include a city name or coordinates for the place you look up.</li>
<li><strong>Maps / reverse geocode (Gallery Manager only).</strong> The private local gallery manager may contact OpenStreetMap Nominatim when auto-detecting photo locations on your machine. That tool is not part of the public Site for visitors.</li>
<li><strong>External / outbound links.</strong> For convenience, the Site includes links to third-party websites—including railways, tourism bureaus, and similar resources. Clicking such a link leaves the Site and takes you to a service we do not operate. Those operators may collect information under their own privacy policies; this policy does not cover them. We do not receive your activity on those external sites by virtue of the link alone, and a link does not mean we endorse or control that third party.</li>
</ul>`,
          },
          {
            title: "Cookies & similar technologies",
            html: `<p>The Site primarily uses <strong>local browser storage</strong> for preferences rather than advertising cookies. Your browser or host may still use cookies or similar technologies for security, load balancing, or session continuity. You can clear site data or block storage in your browser settings; some preferences (language, units, packing lists, and similar) will then reset on each visit.</p>`,
          },
          {
            title: "Your choices",
            html: `<ul>
<li>Change language, units, theme, and motion anytime in <strong>Settings</strong>.</li>
<li>Clear site data in your browser to remove locally stored preferences and packing lists.</li>
<li>Disable network access to third-party font or API hosts if you prefer; some features may degrade.</li>
<li>Contact us (below) with privacy questions about this Site.</li>
</ul>`,
          },
          {
            title: "Children",
            html: `<p>The Site is a general travel information resource and is not directed at children under 13 (or the equivalent minimum age in your jurisdiction). We do not knowingly collect personal data from children through this Site. If you believe a child has provided personal data, please contact us so we can take appropriate steps.</p>`,
          },
          {
            title: "Changes to this policy",
            html: `<p>We may update this Privacy Policy from time to time. When we do, we will revise the “Updated” date at the top of this page. Continued use of the Site after changes means you acknowledge the updated policy. Material changes may be highlighted on the Site when practical.</p>`,
          },
          {
            title: "Contact",
            html: `<p>For questions about this Privacy Policy or privacy practices related to the Site, please reach out via:</p>
<ul>
<li><a href="mailto:contact.timg@icloud.com">contact.timg@icloud.com</a></li>
</ul>
<p class="legal-note">This policy is provided for transparency about a personal project website. It is not legal advice.</p>`,
          },
        ],
      },
      ja: {
        title: "プライバシーポリシー",
        updated: "更新日: 2026年7月11日",
        lead: "お客様のプライバシーを大切にしています。本プライバシーポリシーでは、<strong>Japan Travel Guide</strong>（以下「本サイト」）が、ガイド・都市ページ・フォトギャラリー・旅行ツールを含む本ウェブサイトのご利用時に、情報をどのように収集、利用、開示、移転、保存するかを明確にご説明します。本サイトは、できるだけ少ない個人データで快適にご利用いただけるよう設計されています。",
        toc: "このページの内容",
        sections: [
          {
            title: "概要",
            html: `<p>本サイトは、日本向けの編集型旅行ガイドです。主に<strong>静的サイト</strong>として提供され、大半のコンテンツはページとファイルとして配信されます。基本的な閲覧にアカウントは不要です。</p>
<p>本ポリシーでは、お客様を識別できる情報、または合理的にお客様に結び付けられる情報を「個人データ」として扱います。個人を合理的に特定できない集計データや、純粋に技術的なデータは、個人データには含めません。</p>`,
          },
          {
            title: "収集する情報",
            html: `<p>ご利用の状況に応じて、次のような情報が関わる場合があります。</p>
<ul>
<li><strong>お客様が選択する設定。</strong>言語、単位（km／マイル、℃／°F）、テーマ、モーション設定、パッキングリスト、ギャラリーの画質などは、ブラウザの保存領域（例：<code>localStorage</code>）によりお客様の端末に保存されることがあります。サイトデータを消去しない限り、端末上に残ります。</li>
<li><strong>ブラウザまたはホストが処理する技術データ。</strong>多くのウェブサイトと同様、配信・セキュリティ・安定稼働のため、ホストや CDN 等が標準的なリクエスト情報（IP アドレス、ブラウザの種類、要求 URL など）を処理する場合があります。本サイトから別途の広告プロフィールを構築することはありません。</li>
<li><strong>任意で送信される情報。</strong>メール等でご連絡いただいた場合、そのメッセージに含まれる内容を受領します。</li>
<li><strong>アカウント不要。</strong>ガイド・ギャラリー・ツールの通常のご利用に、登録・パスワード・お支払い情報は不要です。</li>
</ul>`,
          },
          {
            title: "情報の利用目的",
            html: `<ul>
<li>同一ブラウザでの表示およびアクセシビリティ設定の記憶</li>
<li>インタラクティブなツールの提供（例：通貨換算。第三者の為替 API を利用する場合があります）</li>
<li>ホスティング基盤を通じた本サイトの運用、保護、配信の改善</li>
<li>お問い合わせへの対応</li>
</ul>
<p>個人データの<strong>販売は行いません</strong>。本サイトの設定保存をクロスサイト広告に使用することもありません。</p>`,
          },
          {
            title: "情報の保存場所",
            html: `<p>設定データは、ブラウザにより<strong>お客様の端末上にローカル保存</strong>されます。ホスティング事業者は、そのインフラが所在する地域で接続ログを処理する場合があります。公開リポジトリや静的ホスト（例：GitHub Pages）経由で提供される場合、当該ホストのプライバシー条件もホスティングに適用されます。</p>`,
          },
          {
            title: "第三者サービス",
            html: `<p>ご利用機能のため、次のような第三者サービスを読み込んだり接続したりする場合があります。</p>
<ul>
<li><strong>フォント。</strong>日本語・中国語・ラテン文字を正しく表示するため、Google Fonts からウェブフォントを読み込むことがあります。その際、IP アドレス等の技術データが含まれる場合があり、Google の方針が適用されます。</li>
<li><strong>為替（ツール）。</strong>通貨換算は、公開 API（例：Frankfurter）にレートを問い合わせることがあります。換算に必要な通貨コードのみを送信します。</li>
<li><strong>地図／逆ジオコーディング（ギャラリーマネージャのみ）。</strong>作者向けのプライベートなローカル・ギャラリーマネージャは、端末上で写真の位置を自動検出する際、OpenStreetMap Nominatim に接続する場合があります。このツールは訪問者向けの公開サイトの一部ではありません。</li>
<li><strong>外部サイトへのリンク。</strong>便宜のため、本サイトは鉄道事業者、観光局、その他第三者ウェブサイトへのリンクを含みます。そのようなリンクをクリックすると本サイトを離れ、当方が運営していないサービスへ移動します。各運営者は独自のプライバシーポリシーに基づき情報を取り扱う場合があり、本ポリシーの対象外です。リンクがあること自体により、外部サイト上でのお客様の行動を当方が受け取ることはなく、リンクは当該第三者の推奨や管理を意味しません。</li>
</ul>`,
          },
          {
            title: "Cookie 等の技術",
            html: `<p>本サイトは主に設定のために<strong>ブラウザのローカル保存</strong>を用い、広告を目的とした Cookie の利用を主眼としていません。ただし、ブラウザやホストは、セキュリティ、負荷分散、セッション維持などのために Cookie 等を用いる場合があります。ブラウザでサイトデータを消去したり、保存を制限したりできます（その場合、言語・単位・パッキングリストなどの一部設定は訪問のたびにリセットされます）。</p>`,
          },
          {
            title: "お客様の選択",
            html: `<ul>
<li><strong>設定</strong>から、言語・単位・テーマ・モーションをいつでも変更できます。</li>
<li>ブラウザでサイトデータを消去し、端末に保存された設定やパッキングリストを削除できます。</li>
<li>第三者フォントや API への通信を制限することもできます（一部機能が制限される場合があります）。</li>
<li>本サイトのプライバシーに関するご質問は、下記までお問い合わせください。</li>
</ul>`,
          },
          {
            title: "お子様について",
            html: `<p>本サイトは一般的な旅行情報であり、13 歳未満（またはお住まいの法域で定められる同等の最低年齢）のお子様を対象としていません。本サイトを通じて故意にお子様の個人データを収集することはありません。お子様の個人データが提供されたと思われる場合は、適切な対応ができるようご連絡ください。</p>`,
          },
          {
            title: "ポリシーの変更",
            html: `<p>本プライバシーポリシーは、必要に応じて更新されることがあります。更新する際は、ページ上部の「更新日」を改めます。変更後も本サイトをご利用いただくことは、更新後のポリシーを認識したものとみなします。重要な変更については、可能な範囲でサイト上でもお知らせします。</p>`,
          },
          {
            title: "お問い合わせ",
            html: `<p>本プライバシーポリシー、または本サイトのプライバシーに関するご質問は、次の方法でご連絡ください。</p>
<ul>
<li><a href="mailto:contact.timg@icloud.com">contact.timg@icloud.com</a></li>
</ul>
<p class="legal-note">本ポリシーは個人プロジェクトのウェブサイトの透明性のためのものであり、法的助言ではありません。</p>`,
          },
        ],
      },
      "zh-CN": {
        title: "隐私政策",
        updated: "更新日期：2026年7月11日",
        lead: "我们重视你的隐私。本《隐私政策》清楚说明<strong>Japan Travel Guide</strong>（以下简称“本网站”“我们”）在你访问或使用本网站（包括指南、城市页、相册与旅行工具）时，如何收集、使用、披露、传输与保存相关信息。我们尽量在少处理个人数据的前提下，让本网站顺畅可用。",
        toc: "本页内容",
        sections: [
          {
            title: "概述",
            html: `<p>本网站是面向日本的编辑型旅行指南，内容以<strong>静态页面与文件</strong>为主；浏览指南、城市页与相册等核心功能无需注册账户。</p>
<p>我们将任何可识别你身份、或可合理关联到你的信息视为“个人数据”。无法合理识别个人的汇总信息，或纯粹的技术性数据，在本政策中不作为个人数据对待。</p>`,
          },
          {
            title: "我们收集的信息",
            html: `<p>取决于你如何使用本网站，可能涉及以下信息：</p>
<ul>
<li><strong>你选择的偏好。</strong>语言、单位（公里／英里、℃／°F）、主题、动效偏好、行李清单、相册画质等，可能通过浏览器本地存储（例如 <code>localStorage</code>）保存在你的设备上。除非你清除本网站数据，这些设置会留在本机。</li>
<li><strong>浏览器或托管方处理的技术数据。</strong>与多数网站一样，托管或分发本网站的服务（例如静态托管或 CDN）可能处理常规请求信息（如 IP 地址、浏览器类型、请求 URL），用于内容交付、安全与稳定运行。我们不会基于本网站建立独立的广告画像。</li>
<li><strong>你主动提供的信息。</strong>若你通过邮件等方式与我们联系，我们会收到你在消息中自愿填写的内容。</li>
<li><strong>无需账户。</strong>正常使用指南、相册或工具时，不需要注册、密码或支付信息。</li>
</ul>`,
          },
          {
            title: "我们如何使用信息",
            html: `<ul>
<li>在同一浏览器中记住你的显示与无障碍相关偏好。</li>
<li>提供互动工具（例如货币换算；该功能可能调用第三方汇率接口）。</li>
<li>通过托管基础设施运营、保护并改进网站访问体验。</li>
<li>在你联系我们时作出回复。</li>
</ul>
<p>我们<strong>不会出售</strong>你的个人数据，也不会把本网站的偏好存储用于跨站广告。</p>`,
          },
          {
            title: "信息如何保存",
            html: `<p>偏好数据由浏览器<strong>保存在你的本地设备</strong>。托管服务商可能在其基础设施所在地区处理连接日志。若本网站通过公共代码仓库或静态托管（例如 GitHub Pages）提供访问，则该托管方的隐私政策也适用于相应的托管服务。</p>`,
          },
          {
            title: "第三方服务",
            html: `<p>为实现你使用的功能，本网站可能加载或访问第三方服务：</p>
<ul>
<li><strong>字体。</strong>为正确显示日文、中文与拉丁文字，可能从 Google Fonts 加载网络字体。相关请求可能包含 IP 地址等技术数据，并受 Google 相关政策约束。</li>
<li><strong>汇率（工具页）。</strong>货币换算器可能向公开接口（例如 Frankfurter）请求汇率，且仅发送完成换算所需的货币代码。</li>
<li><strong>地图／反向地理编码（仅图库管理工具）。</strong>面向作者的私有本地图库管理器，在本机自动识别照片位置时，可能会访问 OpenStreetMap Nominatim。该工具不是面向访客的公开网站的一部分。</li>
<li><strong>站外链接。</strong>为方便规划行程，本网站会提供指向铁路公司、旅游局及其他第三方网站的链接。点击此类链接即离开本网站，进入我们不运营的服务。那些运营方可能按其自身隐私政策处理信息；本政策不适用于它们。链接本身并不会让我们获知你在外部网站上的活动，也不表示我们认可或控制该第三方。</li>
</ul>`,
          },
          {
            title: "Cookie 与类似技术",
            html: `<p>本网站主要使用<strong>浏览器本地存储</strong>保存偏好，而不是以广告 Cookie 为目的。你的浏览器或托管方仍可能出于安全、负载均衡或会话连续性等原因使用 Cookie 或类似技术。你可以在浏览器中清除本网站数据，或限制存储；之后语言、单位、行李清单等部分偏好会在每次访问时恢复为默认。</p>`,
          },
          {
            title: "你的选择",
            html: `<ul>
<li>随时在<strong>设置</strong>中更改语言、单位、主题与动效。</li>
<li>在浏览器中清除本网站数据，以删除保存在本机的偏好与行李清单。</li>
<li>如有需要，可限制对第三方字体或接口的网络访问；部分功能可能因此受限。</li>
<li>如对本网站隐私事宜有疑问，欢迎通过下方方式联系我们。</li>
</ul>`,
          },
          {
            title: "儿童",
            html: `<p>本网站提供一般性旅行信息，并非面向 13 岁以下儿童（或以你所在地区法律规定的同等最低年龄为准）。我们不会通过本网站有意收集儿童的个人数据。若你认为儿童向我们提供了个人数据，请与我们联系，以便我们采取适当措施。</p>`,
          },
          {
            title: "政策更新",
            html: `<p>我们可能会不时更新本《隐私政策》。更新时，我们会修改本页顶部的“更新日期”。更新后你如继续使用本网站，即表示你知悉更新后的政策。如有重大变更，我们会在可行时在网站上予以提示。</p>`,
          },
          {
            title: "联系我们",
            html: `<p>如对本《隐私政策》或本网站的隐私实践有疑问，请通过以下方式联系：</p>
<ul>
<li><a href="mailto:contact.timg@icloud.com">contact.timg@icloud.com</a></li>
</ul>
<p class="legal-note">本政策旨在提高个人项目网站的透明度，不构成法律意见。</p>`,
          },
        ],
      },
    },
    terms: {
      en: {
        title: "Terms of Use",
        updated: "Updated July 11, 2026",
        lead: "These Terms of Use (“Terms”) govern your access to and use of <strong>Japan Travel Guide</strong> (the “Site”), including the main guide, city pages, photo gallery, travel tools, and related pages. By using the Site, you agree to these Terms. If you do not agree, please do not use the Site.",
        toc: "On this page",
        sections: [
          {
            title: "The Site",
            html: `<p>The Site provides editorial travel information about Japan, including city guides, itineraries, tools, and an optional photo gallery. It is a personal project for informational and educational purposes.</p>
<p>As long as you comply with these Terms, we grant you a personal, non-exclusive, non-transferable, limited right to access and use the Site for your own personal, non-commercial purposes.</p>`,
          },
          {
            title: "Not professional advice",
            html: `<p>Content on the Site is provided for <strong>general informational and educational purposes</strong> only. It is <strong>not</strong> professional travel, legal, medical, visa, immigration, financial, or safety advice.</p>
<ul>
<li>Transport, prices, hours, regulations, and entry rules change frequently.</li>
<li>Always verify critical details with official sources (rail operators, embassies, local authorities) before you travel.</li>
<li>Interactive tools (budget, JR Pass, rail fares, tax, currency) produce estimates only and may be incomplete or outdated.</li>
</ul>
<p>You assume full responsibility for decisions you make based on the Site. We are not liable for losses arising from reliance on Site content.</p>`,
          },
          {
            title: "Accuracy & changes",
            html: `<p>Japan’s transport, prices, hours, and regulations change often. We aim for usefulness but do <strong>not guarantee</strong> completeness or accuracy. Information on the Site may change without notice. We have no obligation to update any particular page or tool.</p>`,
          },
          {
            title: "Intellectual property",
            html: `<p>Unless otherwise noted, text, layout, design, and original editorial materials on the Site are protected by copyright and other intellectual property laws. You may browse and use the Site for personal, non-commercial purposes. Do not copy large portions, scrape, or republish the Site without permission.</p>
<p>Photos you upload via the private Gallery Manager remain subject to your rights and responsibilities; only add photos you are allowed to use.</p>`,
          },
          {
            title: "Acceptable use",
            html: `<p>You agree not to:</p>
<ul>
<li>Disrupt, reverse-engineer, or misuse the Site or local tools;</li>
<li>Use the Site for any unlawful purpose;</li>
<li>Misuse third-party APIs contacted by the Site (for example rate flooding); or</li>
<li>Use content in a way that infringes intellectual property or privacy rights of others.</li>
</ul>`,
          },
          {
            title: "Third-party links & tools",
            html: `<p>The Site may link to third-party websites or call third-party APIs (for example exchange rates or font delivery). Those services are not under our control.</p>
<ul>
<li><strong>Outbound links.</strong> Links to railways, tourism bureaus, and similar resources are provided solely for convenience and planning reference. They do <strong>not</strong> create a partnership, sponsorship, agency, or endorsement relationship unless we expressly say so in writing.</li>
<li><strong>No control or warranty.</strong> We do not operate, monitor, or guarantee the accuracy, safety, availability, or privacy practices of third-party sites or APIs. Content, URLs, and policies on those sites may change without notice.</li>
<li><strong>Your responsibility.</strong> When you leave the Site via an external link, you do so at your own risk and become subject to that third party’s terms and privacy policy.</li>
</ul>`,
          },
          {
            title: "Privacy",
            html: `<p>Our <a href="privacy.html">Privacy Policy</a> explains how the Site handles information. It is incorporated into these Terms by reference. By using the Site, you also acknowledge that internet transmissions are never completely private or secure.</p>`,
          },
          {
            title: "Disclaimer of warranties",
            html: `<p>THE SITE AND ALL CONTENT ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS, OR THAT ANY DEFECTS WILL BE CORRECTED.</p>`,
          },
          {
            title: "Limitation of liability",
            html: `<p>To the fullest extent permitted by law, we will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of (or inability to use) the Site or reliance on its content—including travel decisions or tool estimates—even if advised of the possibility of such damages.</p>`,
          },
          {
            title: "Changes",
            html: `<p>We may update these Terms by posting a revised version on this page and updating the “Updated” date. Your continued use after changes constitutes acceptance of the revised Terms. We may also modify, suspend, or discontinue any part of the Site at any time without notice (including for maintenance or redesign).</p>`,
          },
          {
            title: "Contact",
            html: `<p>Questions about these Terms:</p>
<ul>
<li><a href="mailto:contact.timg@icloud.com">contact.timg@icloud.com</a></li>
</ul>
<p class="legal-note">These Terms are written for a personal travel-guide project and are not a substitute for legal advice.</p>`,
          },
        ],
      },
      ja: {
        title: "利用規約",
        updated: "更新日: 2026年7月11日",
        lead: "本利用規約（以下「本規約」）は、<strong>Japan Travel Guide</strong>（以下「本サイト」）へのアクセスおよびご利用（メインガイド、都市ページ、フォトギャラリー、旅行ツールおよび関連ページを含みます）について定めるものです。本サイトをご利用いただくことにより、本規約に同意したものとみなします。同意いただけない場合は、ご利用をお控えください。",
        toc: "このページの内容",
        sections: [
          {
            title: "本サイトについて",
            html: `<p>本サイトは、日本に関する編集型の旅行情報（都市ガイド、行程、ツール、任意のフォトギャラリー等）を、情報提供および教育を目的として提供する個人プロジェクトです。</p>
<p>本規約を遵守していただける限り、個人的かつ非商業的な目的で本サイトにアクセスし利用するための、個人的・非独占的・譲渡不能・限定的な権利を付与します。</p>`,
          },
          {
            title: "専門的助言ではないこと",
            html: `<p>本サイトのコンテンツは<strong>一般的な情報・教育目的</strong>のみであり、旅行、法律、医療、ビザ、入国管理、金融、安全に関する専門的助言ではありません。</p>
<ul>
<li>交通、運賃、営業時間、規制、入国条件などは頻繁に変わります。</li>
<li>ご出発前に、鉄道事業者、大使館・領事館、地方自治体などの<strong>公式情報</strong>で必ず確認してください。</li>
<li>予算、JRパス、運賃、税、為替などのツールによる試算は目安にすぎず、不完全または古い場合があります。</li>
</ul>
<p>本サイトに基づく判断はお客様ご自身の責任で行ってください。内容への依拠から生じた損失について、当方は責任を負いません。</p>`,
          },
          {
            title: "正確性と変更",
            html: `<p>日本の交通・価格・時間・規制は変わりやすいため、有用な情報を目指しますが、完全性・正確性は<strong>保証しません</strong>。本サイトの情報は予告なく変更される場合があり、特定のページやツールを更新する義務を負いません。</p>`,
          },
          {
            title: "知的財産",
            html: `<p>特段の表示がない限り、本サイトのテキスト、レイアウト、デザイン、オリジナルの編集素材は著作権その他の知的財産法により保護されています。個人的かつ非商業的な閲覧・利用は可能ですが、事前の許可なく本サイトの大部分を複製、スクレイピング、再公開しないでください。</p>
<p>プライベートなギャラリーマネージャ経由で追加する写真については、お客様ご自身の権利と責任が適用されます。利用権限のある写真のみを追加してください。</p>`,
          },
          {
            title: "禁止事項",
            html: `<p>次の行為を行わないことに同意していただきます。</p>
<ul>
<li>本サイトまたはローカルツールを妨害し、または不正に解析・利用すること</li>
<li>違法な目的で本サイトを利用すること</li>
<li>本サイトが利用する第三者 API を濫用すること（過度なリクエスト等）</li>
<li>他者の知的財産権またはプライバシーを侵害する形でコンテンツを利用すること</li>
</ul>`,
          },
          {
            title: "第三者リンクとツール",
            html: `<p>本サイトは、第三者ウェブサイトへのリンクや、第三者 API（例：為替レート、フォント配信）の呼び出しを含む場合があります。これらのサービスは当方の管理下にありません。</p>
<ul>
<li><strong>外部リンク。</strong>鉄道・観光局などのリンクは便宜および行程計画の参考のために提供されます。パートナーシップ、スポンサー、代理、推奨を意味するものではありません（書面で明示した場合を除く）。</li>
<li><strong>管理・保証なし。</strong>第三者サイトや API の正確性、安全性、可用性、プライバシー慣行を保証しません。内容・URL・方針は予告なく変わることがあります。</li>
<li><strong>お客様の責任。</strong>外部リンクで本サイトを離れる場合、そのリスクはお客様が負い、当該第三者の規約・プライバシーポリシーが適用されます。</li>
</ul>`,
          },
          {
            title: "プライバシー",
            html: `<p>本サイトにおける情報の取り扱いは、<a href="privacy.html">プライバシーポリシー</a> に記載されており、参照により本規約の一部を構成します。本サイトのご利用により、インターネット通信が完全に私的・安全ではないこともご認識いただいたものとみなします。</p>`,
          },
          {
            title: "免責事項",
            html: `<p>本サイトおよびすべてのコンテンツは、「現状有姿」かつ「提供可能な範囲」で提供されます。法律で認められる最大限の範囲において、商品性、特定目的適合性、権原、非侵害を含む明示・黙示の保証をすべて否認します。本サイトが中断なく、誤りがなく、有害な要素がなく、欠陥が修正されることを保証するものではありません。</p>`,
          },
          {
            title: "責任の制限",
            html: `<p>法律で認められる最大限の範囲において、当方は、本サイトの利用（または利用できないこと）、あるいは掲載内容への依拠（旅行の判断やツールの試算を含む）に関連して生じた間接的・付随的・特別・結果的・懲罰的損害について、たとえその可能性を知らされていたとしても、責任を負いません。</p>`,
          },
          {
            title: "規約および本サイトの変更",
            html: `<p>当方は、本ページに改訂版を掲載し「更新日」を改めることにより、本規約を随時更新できます。変更後も本サイトを継続してご利用いただく場合、改訂後の規約に同意したものとみなします。また、保守や再設計などのため、予告なく本サイトの一部を変更・停止・終了することができます。</p>`,
          },
          {
            title: "お問い合わせ",
            html: `<p>本規約に関するご質問は、次までご連絡ください。</p>
<ul>
<li><a href="mailto:contact.timg@icloud.com">contact.timg@icloud.com</a></li>
</ul>
<p class="legal-note">本規約は個人の旅行ガイドプロジェクト向けに作成されたものであり、法的助言に代わるものではありません。</p>`,
          },
        ],
      },
      "zh-CN": {
        title: "使用条款",
        updated: "更新日期：2026年7月11日",
        lead: "本《使用条款》（以下简称“本条款”）规范你对<strong>Japan Travel Guide</strong>（以下简称“本网站”）的访问与使用，包括主指南、城市页、相册、旅行工具及相关页面。使用本网站，即表示你同意本条款。若不同意，请勿使用本网站。",
        toc: "本页内容",
        sections: [
          {
            title: "关于本站",
            html: `<p>本网站是面向日本的编辑型旅行信息项目（包括城市指南、行程、工具与可选相册等），供<strong>信息与教育用途</strong>的个人项目。</p>
<p>在你遵守本条款的前提下，我们授予你一项个人、非独占、不可转让的有限权利，仅可出于个人、非商业目的访问和使用本网站。</p>`,
          },
          {
            title: "非专业建议",
            html: `<p>本网站内容仅供<strong>一般性信息与教育用途</strong>，<strong>不构成</strong>专业旅行、法律、医疗、签证、移民、财务或安全建议。</p>
<ul>
<li>交通、价格、开放时间、规定与入境要求等经常变化。</li>
<li>出行前，请务必向铁路运营商、使领馆、地方当局等<strong>官方来源</strong>核实关键信息。</li>
<li>预算、JR Pass、票价、税费与汇率等工具估算仅为约数，可能不完整或已过时。</li>
</ul>
<p>你须对依据本网站所作决定自行承担责任。我们不对因依赖本网站内容而产生的损失负责。</p>`,
          },
          {
            title: "准确性与变更",
            html: `<p>日本的交通、价格、时刻与规定经常变化。我们力求信息有用，但<strong>不保证</strong>完整或准确。本网站信息可能不经通知而变更；我们没有义务更新任何特定页面或工具。</p>`,
          },
          {
            title: "知识产权",
            html: `<p>除另有说明外，本网站的文字、版式、设计与原创编辑内容受著作权及其他知识产权法律保护。可供个人非商业浏览与使用；请勿未经许可大量复制、抓取或再发布本网站。</p>
<p>你通过私有图库管理工具上传的照片，适用你自身的权利与责任；请仅添加你有权使用的照片。</p>`,
          },
          {
            title: "使用规范",
            html: `<p>你同意不得：</p>
<ul>
<li>干扰、滥用或试图逆向解析本网站或本地工具；</li>
<li>将本网站用于任何非法目的；</li>
<li>滥用本网站调用的第三方 API（例如过度请求）；</li>
<li>以侵害他人知识产权或隐私权的方式使用内容。</li>
</ul>`,
          },
          {
            title: "第三方链接与工具",
            html: `<p>本网站可能链接至第三方网站，或调用第三方接口（例如汇率、字体分发）。这些服务不在我们控制之下。</p>
<ul>
<li><strong>外链。</strong>指向铁路公司、旅游局等的链接仅为方便与行程规划参考而提供，并不构成合伙、赞助、代理或背书关系（书面明确说明的除外）。</li>
<li><strong>无控制或保证。</strong>我们不保证第三方网站或接口的准确性、安全性、可用性或其隐私实践。其内容、链接地址与政策可能不经通知而变更。</li>
<li><strong>你的责任。</strong>通过外链离开本网站时，风险由你自行承担，并适用该第三方的条款与隐私政策。</li>
</ul>`,
          },
          {
            title: "隐私",
            html: `<p>我们的<a href="privacy.html">隐私政策</a>说明本网站如何处理信息，并构成本条款的一部分。使用本网站，即表示你亦知悉：互联网传输并非完全私密或绝对安全。</p>`,
          },
          {
            title: "免责声明",
            html: `<p>本网站及全部内容按“现状”和“可供使用”的基础提供。在法律允许的最大范围内，我们不作任何明示或默示保证，包括适销性、特定用途适用性、权属及不侵权。我们不保证本网站不会中断、没有错误、不含有害成分，也不保证缺陷一定会被修复。</p>`,
          },
          {
            title: "责任限制",
            html: `<p>在法律允许的最大范围内，我们不对因你使用（或无法使用）本网站，或依赖其内容（包括旅行决策或工具估算）而产生的任何间接、附带、特殊、后果性或惩罚性损害承担责任——即使已被告知可能发生此类损害。</p>`,
          },
          {
            title: "条款与网站变更",
            html: `<p>我们可能通过在本页发布修订版本并更新“更新日期”的方式更新本条款。更新后如你继续使用本网站，即表示你接受修订后的条款。我们亦可随时不经通知修改、暂停或终止本网站的任何部分（例如出于维护或改版需要）。</p>`,
          },
          {
            title: "联系我们",
            html: `<p>如对本条款有疑问，请联系：</p>
<ul>
<li><a href="mailto:contact.timg@icloud.com">contact.timg@icloud.com</a></li>
</ul>
<p class="legal-note">本条款为个人旅行指南项目而撰写，不能替代法律意见。</p>`,
          },
        ],
      },
    },
  };

  function lang() {
    const L =
      (global.JTG && global.JTG.Settings && global.JTG.Settings.get("lang")) ||
      "en";
    if (L === "ja" || L === "zh-CN") return L;
    return "en";
  }

  function render() {
    const root = document.getElementById("legal-doc");
    if (!root) return;
    const page = document.body.dataset.legal || "privacy";
    const pack = LEGAL[page] || LEGAL.privacy;
    const data = pack[lang()] || pack.en;

    const tocId = "legal-toc";
    let html = `<h1>${data.title}</h1>`;
    html += `<p class="legal-meta">${data.updated}</p>`;
    html += `<p class="legal-lead">${data.lead}</p>`;
    html += `<nav class="legal-toc" aria-label="TOC"><strong>${data.toc}</strong><ol>`;
    data.sections.forEach((s, i) => {
      const id = `sec-${i}`;
      html += `<li><a href="#${id}">${s.title}</a></li>`;
    });
    html += `</ol></nav>`;
    data.sections.forEach((s, i) => {
      html += `<section id="sec-${i}"><h2>${s.title}</h2>${s.html}</section>`;
    });
    root.innerHTML = html;

    const top = document.getElementById("legal-top-title");
    if (top) top.textContent = data.title;
    document.title = data.title + " · Japan Travel Guide";
  }

  function init() {
    if (!document.getElementById("legal-doc")) return;
    render();
    window.addEventListener("jtg:i18n", render);
    window.addEventListener("jtg:settings", (e) => {
      if (!e.detail || !e.detail.key || e.detail.key === "lang") render();
    });
  }

  global.JTG = global.JTG || {};
  global.JTG.Legal = { init, render, LEGAL };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
