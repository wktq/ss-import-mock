export interface Company {
  id: string;
  name: string;
  url?: string;
  description?: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  parentId?: string;
  companyCount: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
}

export const products: Product[] = [
  { id: 'p1', name: 'AIチャットボット', description: 'カスタマーサポート自動化ソリューション' },
  { id: 'p2', name: 'SaaS営業支援ツール', description: 'セールスプロセス最適化プラットフォーム' },
  { id: 'p3', name: 'HRテック採用管理', description: '採用プロセス効率化システム' },
];

export const categories: Category[] = [
  // 親カテゴリ
  { id: 'c1', name: 'IT・ソフトウェア', companyCount: 50000 },
  { id: 'c2', name: '製造業', companyCount: 30000 },
  { id: 'c3', name: '小売・EC', companyCount: 40000 },
  { id: 'c4', name: '金融・保険', companyCount: 20000 },
  { id: 'c5', name: 'ヘルスケア', companyCount: 15000 },
  
  // 子カテゴリ - IT・ソフトウェア
  { id: 'c1-1', name: 'SaaS企業', parentId: 'c1', companyCount: 12000 },
  { id: 'c1-2', name: 'AIスタートアップ', parentId: 'c1', companyCount: 8000 },
  { id: 'c1-3', name: 'セキュリティ企業', parentId: 'c1', companyCount: 5000 },
  
  // 子カテゴリ - 製造業
  { id: 'c2-1', name: '自動車関連', parentId: 'c2', companyCount: 10000 },
  { id: 'c2-2', name: '電子部品', parentId: 'c2', companyCount: 8000 },
  { id: 'c2-3', name: '食品製造', parentId: 'c2', companyCount: 12000 },
  
  // 子カテゴリ - 小売・EC
  { id: 'c3-1', name: 'アパレルEC', parentId: 'c3', companyCount: 15000 },
  { id: 'c3-2', name: '食品EC', parentId: 'c3', companyCount: 10000 },
  { id: 'c3-3', name: '総合EC', parentId: 'c3', companyCount: 15000 },
];

export const companies: Company[] = [
  // SaaS企業
  { id: 'comp1', name: '株式会社クラウドワークス', url: 'https://crowdworks.co.jp', description: 'クラウドソーシングサービスを運営。フリーランスと企業をマッチング', categoryId: 'c1-1' },
  { id: 'comp2', name: 'Sansan株式会社', url: 'https://sansan.com', description: '名刺管理サービスの提供。ビジネスネットワークの可視化', categoryId: 'c1-1' },
  { id: 'comp3', name: '株式会社ラクス', url: 'https://rakus.co.jp', description: '経費精算システムなどのクラウドサービスを提供', categoryId: 'c1-1' },
  { id: 'comp10', name: '株式会社SmartHR', url: 'https://smarthr.jp', description: '人事労務管理クラウドサービス', categoryId: 'c1-1' },
  { id: 'comp11', name: 'freee株式会社', url: 'https://freee.co.jp', description: 'クラウド会計ソフトのパイオニア', categoryId: 'c1-1' },
  { id: 'comp12', name: '株式会社カオナビ', url: 'https://kaonavi.jp', description: '人材管理クラウドサービス', categoryId: 'c1-1' },
  { id: 'comp13', name: '株式会社ユーザベース', url: 'https://uzabase.com', description: 'ビジネス情報プラットフォーム', categoryId: 'c1-1' },
  { id: 'comp14', name: '株式会社マネーフォワード', url: 'https://moneyforward.com', description: '家計簿・会計クラウドサービス', categoryId: 'c1-1' },
  { id: 'comp15', name: '株式会社サイボウズ', url: 'https://cybozu.co.jp', description: 'グループウェアのパイオニア', categoryId: 'c1-1' },
  { id: 'comp16', name: '株式会社チームラボ', url: 'https://teamlab.art', description: 'デジタルアートとSaaS開発', categoryId: 'c1-1' },
  
  // AIスタートアップ
  { id: 'comp4', name: '株式会社PKSHA Technology', url: 'https://pkshatech.com', description: '自然言語処理技術を活用したAIソリューション', categoryId: 'c1-2' },
  { id: 'comp5', name: '株式会社Preferred Networks', url: 'https://preferred.jp', description: '深層学習技術の研究開発と実用化', categoryId: 'c1-2' },
  { id: 'comp17', name: '株式会社ABEJA', url: 'https://abeja.asia', description: 'AIプラットフォームサービス', categoryId: 'c1-2' },
  { id: 'comp18', name: '株式会社エクサウィザーズ', url: 'https://exawizards.com', description: 'AI活用コンサルティング', categoryId: 'c1-2' },
  { id: 'comp19', name: '株式会社AI inside', url: 'https://inside.ai', description: 'AI-OCRサービスの提供', categoryId: 'c1-2' },
  { id: 'comp20', name: '株式会社HACARUS', url: 'https://hacarus.com', description: '少量データAI開発', categoryId: 'c1-2' },
  { id: 'comp21', name: '株式会社Ridge-i', url: 'https://ridge-i.com', description: '画像認識AIソリューション', categoryId: 'c1-2' },
  { id: 'comp22', name: '株式会社HEROZ', url: 'https://heroz.co.jp', description: 'AI将棋エンジン開発', categoryId: 'c1-2' },
  
  // セキュリティ企業
  { id: 'comp23', name: '株式会社ラック', url: 'https://lac.co.jp', description: 'サイバーセキュリティサービス', categoryId: 'c1-3' },
  { id: 'comp24', name: '株式会社FFRI', url: 'https://ffri.jp', description: 'セキュリティソフトウェア開発', categoryId: 'c1-3' },
  { id: 'comp25', name: 'トレンドマイクロ株式会社', url: 'https://trendmicro.com', description: 'ウイルス対策ソフトウェア', categoryId: 'c1-3' },
  { id: 'comp26', name: '株式会社Blue Planet-works', url: 'https://blueplanet-works.com', description: 'セキュリティプラットフォーム', categoryId: 'c1-3' },
  { id: 'comp27', name: 'サイバートラスト株式会社', url: 'https://cybertrust.co.jp', description: 'PKI・認証サービス', categoryId: 'c1-3' },
  
  // 自動車関連
  { id: 'comp6', name: 'トヨタ自動車株式会社', url: 'https://toyota.jp', description: '日本最大手の自動車メーカー。ハイブリッド車のパイオニア', categoryId: 'c2-1' },
  { id: 'comp7', name: '日産自動車株式会社', url: 'https://nissan.co.jp', description: '電気自動車の開発に注力する大手自動車メーカー', categoryId: 'c2-1' },
  { id: 'comp28', name: '本田技研工業株式会社', url: 'https://honda.co.jp', description: '二輪車・四輪車の総合メーカー', categoryId: 'c2-1' },
  { id: 'comp29', name: 'マツダ株式会社', url: 'https://mazda.co.jp', description: 'ロータリーエンジンの技術', categoryId: 'c2-1' },
  { id: 'comp30', name: '株式会社SUBARU', url: 'https://subaru.co.jp', description: '水平対向エンジンの専門メーカー', categoryId: 'c2-1' },
  { id: 'comp31', name: 'スズキ株式会社', url: 'https://suzuki.co.jp', description: '軽自動車のリーディングカンパニー', categoryId: 'c2-1' },
  { id: 'comp32', name: '三菱自動車工業株式会社', url: 'https://mitsubishi-motors.co.jp', description: 'SUV・電動車の開発', categoryId: 'c2-1' },
  { id: 'comp33', name: 'ダイハツ工業株式会社', url: 'https://daihatsu.co.jp', description: '軽自動車専門メーカー', categoryId: 'c2-1' },
  
  // 電子部品
  { id: 'comp34', name: '株式会社村田製作所', url: 'https://murata.com', description: '電子部品の世界的メーカー', categoryId: 'c2-2' },
  { id: 'comp35', name: 'TDK株式会社', url: 'https://tdk.com', description: '電子部品・記録メディア', categoryId: 'c2-2' },
  { id: 'comp36', name: '京セラ株式会社', url: 'https://kyocera.co.jp', description: 'ファインセラミックス技術', categoryId: 'c2-2' },
  { id: 'comp37', name: '日本電産株式会社', url: 'https://nidec.com', description: '精密小型モーターの世界シェアNo.1', categoryId: 'c2-2' },
  { id: 'comp38', name: 'ローム株式会社', url: 'https://rohm.co.jp', description: '半導体メーカー', categoryId: 'c2-2' },
  { id: 'comp39', name: 'アルプスアルパイン株式会社', url: 'https://alpsalpine.com', description: '電子部品・車載機器', categoryId: 'c2-2' },
  { id: 'comp40', name: '太陽誘電株式会社', url: 'https://yuden.co.jp', description: 'コンデンサ・インダクタ製造', categoryId: 'c2-2' },
  
  // 食品製造
  { id: 'comp41', name: '日清食品ホールディングス', url: 'https://nissin.com', description: 'インスタントラーメンのパイオニア', categoryId: 'c2-3' },
  { id: 'comp42', name: '味の素株式会社', url: 'https://ajinomoto.co.jp', description: 'アミノ酸技術のリーディングカンパニー', categoryId: 'c2-3' },
  { id: 'comp43', name: 'キッコーマン株式会社', url: 'https://kikkoman.co.jp', description: '醤油の世界的ブランド', categoryId: 'c2-3' },
  { id: 'comp44', name: 'カゴメ株式会社', url: 'https://kagome.co.jp', description: 'トマト加工品のトップメーカー', categoryId: 'c2-3' },
  { id: 'comp45', name: '森永製菓株式会社', url: 'https://morinaga.co.jp', description: '菓子・食品メーカー', categoryId: 'c2-3' },
  { id: 'comp46', name: '明治ホールディングス', url: 'https://meiji.com', description: '乳製品・菓子の総合メーカー', categoryId: 'c2-3' },
  { id: 'comp47', name: 'カルビー株式会社', url: 'https://calbee.co.jp', description: 'スナック菓子のトップメーカー', categoryId: 'c2-3' },
  { id: 'comp48', name: '日本ハム株式会社', url: 'https://nipponham.co.jp', description: '食肉加工品メーカー', categoryId: 'c2-3' },
  
  // アパレルEC
  { id: 'comp8', name: '株式会社ZOZO', url: 'https://zozo.co.jp', description: 'ファッション通販サイトZOZOTOWNを運営', categoryId: 'c3-1' },
  { id: 'comp9', name: '株式会社ユナイテッドアローズ', url: 'https://united-arrows.co.jp', description: 'セレクトショップ運営とオンライン販売', categoryId: 'c3-1' },
  { id: 'comp49', name: '株式会社ストライプインターナショナル', url: 'https://stripe-intl.com', description: 'アパレルブランドの企画・販売', categoryId: 'c3-1' },
  { id: 'comp50', name: '株式会社ベイクルーズ', url: 'https://baycrews.co.jp', description: 'セレクトショップ・EC運営', categoryId: 'c3-1' },
  { id: 'comp51', name: '株式会社アダストリア', url: 'https://adastria.co.jp', description: 'カジュアルファッションブランド', categoryId: 'c3-1' },
  { id: 'comp52', name: '株式会社パルグループホールディングス', url: 'https://palgroup.co.jp', description: 'ファッションブランドの運営', categoryId: 'c3-1' },
  { id: 'comp53', name: '株式会社TSIホールディングス', url: 'https://tsi-holdings.com', description: 'アパレル企画・製造・販売', categoryId: 'c3-1' },
  
  // 食品EC
  { id: 'comp54', name: 'オイシックス・ラ・大地株式会社', url: 'https://oisixradaichi.co.jp', description: '有機野菜の宅配サービス', categoryId: 'c3-2' },
  { id: 'comp55', name: '株式会社コロワイド', url: 'https://colowide.co.jp', description: '外食チェーン・食品EC', categoryId: 'c3-2' },
  { id: 'comp56', name: 'BASE FOOD株式会社', url: 'https://basefood.co.jp', description: '完全栄養食のD2Cブランド', categoryId: 'c3-2' },
  { id: 'comp57', name: '株式会社スナックミー', url: 'https://snaq.me', description: 'おやつのサブスクリプション', categoryId: 'c3-2' },
  { id: 'comp58', name: '株式会社DELISH KITCHEN', url: 'https://delishkitchen.tv', description: 'レシピ動画・食材EC', categoryId: 'c3-2' },
  
  // 総合EC
  { id: 'comp59', name: '楽天グループ株式会社', url: 'https://rakuten.co.jp', description: '日本最大級のECモール運営', categoryId: 'c3-3' },
  { id: 'comp60', name: 'アマゾンジャパン合同会社', url: 'https://amazon.co.jp', description: '世界最大のECプラットフォーム', categoryId: 'c3-3' },
  { id: 'comp61', name: 'ヤフー株式会社', url: 'https://yahoo.co.jp', description: 'Yahoo!ショッピング運営', categoryId: 'c3-3' },
  { id: 'comp62', name: '株式会社メルカリ', url: 'https://mercari.com', description: 'フリマアプリのパイオニア', categoryId: 'c3-3' },
  { id: 'comp63', name: '株式会社ヨドバシカメラ', url: 'https://yodobashi.com', description: '家電量販店・EC運営', categoryId: 'c3-3' },
  { id: 'comp64', name: '株式会社ビックカメラ', url: 'https://biccamera.com', description: '家電量販店・オムニチャネル', categoryId: 'c3-3' },
  
  // 金融・保険
  { id: 'comp65', name: '株式会社三菱UFJフィナンシャル・グループ', url: 'https://mufg.jp', description: '日本最大のメガバンク', categoryId: 'c4' },
  { id: 'comp66', name: '株式会社みずほフィナンシャルグループ', url: 'https://mizuho-fg.co.jp', description: '総合金融グループ', categoryId: 'c4' },
  { id: 'comp67', name: '株式会社三井住友フィナンシャルグループ', url: 'https://smfg.co.jp', description: '大手金融グループ', categoryId: 'c4' },
  { id: 'comp68', name: '野村ホールディングス株式会社', url: 'https://nomura.com', description: '証券業界のリーディングカンパニー', categoryId: 'c4' },
  { id: 'comp69', name: '東京海上ホールディングス', url: 'https://tokiomarinehd.com', description: '損害保険大手', categoryId: 'c4' },
  { id: 'comp70', name: '第一生命ホールディングス', url: 'https://dai-ichi-life-hd.com', description: '生命保険大手', categoryId: 'c4' },
  { id: 'comp71', name: 'SBIホールディングス株式会社', url: 'https://sbigroup.co.jp', description: 'ネット金融グループ', categoryId: 'c4' },
  { id: 'comp72', name: '株式会社マネックスグループ', url: 'https://monexgroup.jp', description: 'オンライン証券', categoryId: 'c4' },
  { id: 'comp73', name: 'PayPay株式会社', url: 'https://paypay.ne.jp', description: 'QRコード決済サービス', categoryId: 'c4' },
  { id: 'comp74', name: '株式会社Paidy', url: 'https://paidy.com', description: '後払い決済サービス', categoryId: 'c4' },
  
  // ヘルスケア
  { id: 'comp75', name: '武田薬品工業株式会社', url: 'https://takeda.com', description: '日本最大の製薬会社', categoryId: 'c5' },
  { id: 'comp76', name: 'アステラス製薬株式会社', url: 'https://astellas.com', description: '新薬開発のグローバル企業', categoryId: 'c5' },
  { id: 'comp77', name: '第一三共株式会社', url: 'https://daiichisankyo.co.jp', description: '革新的医薬品の開発', categoryId: 'c5' },
  { id: 'comp78', name: 'エーザイ株式会社', url: 'https://eisai.co.jp', description: '認知症治療薬のパイオニア', categoryId: 'c5' },
  { id: 'comp79', name: 'テルモ株式会社', url: 'https://terumo.co.jp', description: '医療機器の総合メーカー', categoryId: 'c5' },
  { id: 'comp80', name: 'オリンパス株式会社', url: 'https://olympus.co.jp', description: '内視鏡の世界的メーカー', categoryId: 'c5' },
  { id: 'comp81', name: 'シスメックス株式会社', url: 'https://sysmex.co.jp', description: '臨床検査機器・試薬メーカー', categoryId: 'c5' },
  { id: 'comp82', name: '株式会社エムスリー', url: 'https://m3.com', description: '医療従事者向けポータルサイト', categoryId: 'c5' },
  { id: 'comp83', name: '株式会社JMDC', url: 'https://jmdc.co.jp', description: '医療ビッグデータ', categoryId: 'c5' },
  { id: 'comp84', name: '株式会社メドレー', url: 'https://medley.co.jp', description: '医療介護の求人・SaaS', categoryId: 'c5' },
  
  // その他の企業
  { id: 'comp85', name: 'ソフトバンクグループ株式会社', url: 'https://softbank.jp', description: '通信・投資の総合企業', categoryId: 'c1' },
  { id: 'comp86', name: '株式会社NTTドコモ', url: 'https://docomo.ne.jp', description: '日本最大の携帯電話事業者', categoryId: 'c1' },
  { id: 'comp87', name: 'KDDI株式会社', url: 'https://kddi.com', description: '総合通信事業者', categoryId: 'c1' },
  { id: 'comp88', name: '日本電気株式会社', url: 'https://jpn.nec.com', description: 'ITソリューション大手', categoryId: 'c1' },
  { id: 'comp89', name: '富士通株式会社', url: 'https://fujitsu.com', description: 'ICTサービス企業', categoryId: 'c1' },
  { id: 'comp90', name: '株式会社日立製作所', url: 'https://hitachi.co.jp', description: '総合電機メーカー', categoryId: 'c1' },
  { id: 'comp91', name: 'パナソニック株式会社', url: 'https://panasonic.com', description: '総合エレクトロニクスメーカー', categoryId: 'c2' },
  { id: 'comp92', name: 'ソニーグループ株式会社', url: 'https://sony.co.jp', description: 'エンタメ・エレクトロニクス', categoryId: 'c2' },
  { id: 'comp93', name: '株式会社ニトリホールディングス', url: 'https://nitori.co.jp', description: '家具・インテリア小売大手', categoryId: 'c3' },
  { id: 'comp94', name: '株式会社ファーストリテイリング', url: 'https://fastretailing.com', description: 'ユニクロを展開するアパレル大手', categoryId: 'c3' },
  { id: 'comp95', name: '株式会社良品計画', url: 'https://ryohin-keikaku.jp', description: '無印良品を展開', categoryId: 'c3' },
  { id: 'comp96', name: 'イオン株式会社', url: 'https://aeon.info', description: '総合小売業グループ', categoryId: 'c3' },
  { id: 'comp97', name: '株式会社セブン&アイ・ホールディングス', url: 'https://7andi.com', description: 'コンビニ・総合小売', categoryId: 'c3' },
  { id: 'comp98', name: '株式会社ローソン', url: 'https://lawson.co.jp', description: 'コンビニエンスストアチェーン', categoryId: 'c3' },
  { id: 'comp99', name: '株式会社ファミリーマート', url: 'https://family.co.jp', description: 'コンビニエンスストアチェーン', categoryId: 'c3' },
  { id: 'comp100', name: '株式会社ドンキホーテホールディングス', url: 'https://donki.com', description: 'ディスカウントストアチェーン', categoryId: 'c3' },
];

export interface AnalyzedCompany extends Company {
  compatibilityScore: number;
  recommendedApproach: 'email' | 'form' | 'teleapo' | 'referral' | 'sns';
  analysisReason?: string;
}

export const analyzeCompanies = (companies: Company[], productId: string): AnalyzedCompany[] => {
  // デモ用の分析ロジック
  return companies.map(company => {
    const score = Math.floor(Math.random() * 40) + 60; // 60-100のスコア
    const approaches = ['email', 'form', 'teleapo', 'referral', 'sns'] as const;
    const approach = approaches[Math.floor(Math.random() * approaches.length)];
    
    return {
      ...company,
      compatibilityScore: score,
      recommendedApproach: approach,
      analysisReason: `${company.name}は${productId === 'p1' ? 'カスタマーサポート' : productId === 'p2' ? '営業効率化' : '採用プロセス'}の課題を抱えている可能性が高いです。`
    };
  });
};