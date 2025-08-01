import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Fade,
  Grow,
  Rating,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  IconButton,
  Alert,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import PhoneIcon from '@mui/icons-material/Phone';
import GroupIcon from '@mui/icons-material/Group';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import BusinessIcon from '@mui/icons-material/Business';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ShareIcon from '@mui/icons-material/Share';
import { Company, analyzeCompanies, AnalyzedCompany, products } from '../data/demoData';

interface Step2Props {
  companies: Company[];
  productId: string;
  onNext: (analyzedCompanies: AnalyzedCompany[]) => void;
  onBack: () => void;
}

const approachIcons = {
  email: <EmailIcon />,
  form: <DescriptionIcon />,
  teleapo: <PhoneIcon />,
  referral: <GroupIcon />,
  sns: <ShareIcon />,
};

const approachNames = {
  email: 'メール',
  form: 'フォーム',
  teleapo: 'テレアポ',
  referral: 'リファラル',
  sns: 'SNS',
};

const approachColors = {
  email: 'info',
  form: 'success',
  teleapo: 'warning',
  referral: 'secondary',
  sns: 'primary',
} as const;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const Step2: React.FC<Step2Props> = ({ companies, productId, onNext, onBack }) => {
  const [analyzedCompanies, setAnalyzedCompanies] = useState<AnalyzedCompany[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [sortBy, setSortBy] = useState<'score' | 'name'>('score');
  const [previewCompany, setPreviewCompany] = useState<AnalyzedCompany | null>(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // 分析のシミュレーション
    const analyzeData = async () => {
      setIsAnalyzing(true);
      setProgress(0);
      
      // プログレスバーのアニメーション
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // 2秒後に分析完了
      setTimeout(() => {
        const analyzed = analyzeCompanies(companies, productId);
        setAnalyzedCompanies(analyzed.sort((a, b) => b.compatibilityScore - a.compatibilityScore));
        setProgress(100);
        setTimeout(() => {
          setIsAnalyzing(false);
        }, 500);
      }, 2000);
    };

    analyzeData();
  }, [companies, productId]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const sortedCompanies = [...analyzedCompanies].sort((a, b) => {
    if (sortBy === 'score') {
      return b.compatibilityScore - a.compatibilityScore;
    }
    return a.name.localeCompare(b.name);
  });

  const selectedProduct = products.find(p => p.id === productId);

  const getApproachStats = () => {
    const stats = analyzedCompanies.reduce((acc, company) => {
      acc[company.recommendedApproach] = (acc[company.recommendedApproach] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  const approachStats = getApproachStats();

  const generateEmailContent = (company: AnalyzedCompany) => {
    return `件名: ${company.name}様｜${selectedProduct?.name}のご提案

${company.name}
ご担当者様

突然のご連絡失礼いたします。
${selectedProduct?.name}を提供しております〇〇会社の△△と申します。

貴社のウェブサイトを拝見し、${company.analysisReason}

弊社の${selectedProduct?.name}は、${selectedProduct?.description}を実現するソリューションです。

【導入効果】
・効果1: 業務効率を平均40%向上
・効果2: コスト削減を実現
・効果3: 顧客満足度の向上

もし興味をお持ちいただけましたら、詳細な資料をお送りさせていただきます。
また、オンラインでの製品デモも可能です。

お忙しいところ恐れ入りますが、ご検討いただけますと幸いです。

よろしくお願いいたします。`;
  };

  const generateTeleapoScript = (company: AnalyzedCompany) => {
    return `【導入トーク】
お忙しいところ恐れ入ります。${selectedProduct?.name}を提供しております〇〇会社の△△と申します。

【確認】
${company.name}様の〇〇部門のご担当者様でいらっしゃいますでしょうか。

【要件説明】
実は本日は、${company.analysisReason?.split('。')[0]}という課題を解決するソリューションのご案内でお電話させていただきました。

【興味喚起】
同業他社様では、弊社のサービスを導入いただき、業務効率が40%向上した事例もございます。

【クロージング】
もしよろしければ、15分程度のオンラインミーティングで詳細をご説明させていただけませんでしょうか。
来週のご都合はいかがでしょうか。

【反論処理】
- 忙しい → 資料だけでもお送りさせていただけませんか
- 必要ない → 将来的な課題として情報収集されている企業様も多いです
- 検討中 → 現在ご検討中のサービスとの比較資料もございます`;
  };

  const generateReferralApproach = (company: AnalyzedCompany) => {
    return `【リファラルアプローチ戦略】

1. 共通の知人を探す
   - LinkedIn で${company.name}の従業員を検索
   - 業界の交流会やイベントでの接点を探す
   - 取引先企業との関係性を調査

2. イベント・セミナーでの接触
   - ${company.name}が参加しそうな業界イベントをリストアップ
   - ウェビナーや勉強会を主催し、招待する
   - 業界団体や協会での活動を通じた接点作り

3. コンテンツマーケティング
   - ${company.name}の課題に関連する事例記事を作成
   - SNSで有益な情報を発信し、認知を獲得
   - ホワイトペーパーやebookでリード獲得

4. パートナー企業経由
   - ${company.name}と取引のある企業との連携
   - 相互紹介プログラムの活用
   - 共同セミナーやイベントの開催`;
  };

  const generateSNSContent = (company: AnalyzedCompany) => {
    return `【SNSアプローチ戦略】

1. LinkedIn での直接アプローチ
   - ${company.name}の決裁者・担当者を特定
   - 共通の知人や興味をもとにコネクションリクエスト
   - 価値ある情報提供からの関係構築

2. X (Twitter) での接触
   - ${company.name}の公式アカウントをフォロー
   - 関連する投稿にいいね・リプライで存在感を示す
   - 業界の話題に関する有益な情報を発信

3. Facebook ビジネスページ
   - ${company.name}のページにいいね・フォロー
   - イベントや投稿へのエンゲージメント
   - Messengerでの丁寧なアプローチ

【SNS投稿例】
「${selectedProduct?.name}を活用して業務効率を40%改善した事例をブログにまとめました。
${company.analysisReason?.split('。')[0]}という課題をお持ちの企業様の参考になれば幸いです。
詳細はこちら→ [URL]
#業務効率化 #DX推進 #${selectedProduct?.name}」`;
  };

  if (isAnalyzing) {
    return (
      <Box className="flex flex-col items-center justify-center min-h-[60vh]">
        <Box className="relative mb-8">
          <CircularProgress 
            size={120} 
            thickness={1.5}
            className="text-indigo-600"
          />
          <Box className="absolute inset-0 flex items-center justify-center">
            <AssessmentIcon className="text-indigo-600 text-5xl" />
          </Box>
        </Box>
        <Typography variant="h4" className="mb-4 font-bold text-gray-800">
          リストを分析中...
        </Typography>
        <Box className="w-full max-w-md">
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            className="mb-2 h-2 rounded-full"
            sx={{
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#6366F1',
              },
            }}
          />
          <Typography variant="body2" color="text.secondary" align="center" className="font-medium">
            {progress}%
          </Typography>
        </Box>
        {companies.filter(c => !c.description).length > 0 && (
          <Fade in timeout={1000}>
            <Typography variant="body1" color="text.secondary" className="mt-6 text-center">
              <TrendingUpIcon className="inline mr-2" />
              URLから企業説明を生成しています...
            </Typography>
          </Fade>
        )}
      </Box>
    );
  }

  return (
    <Box>

      {/* ソートオプションとアプローチ方法の内訳 */}
      <Grow in timeout={700}>
        <Box className="mb-4 flex justify-between items-center">
          {/* アプローチ方法の内訳（コンパクト版） */}
          <Box className="flex items-center gap-2">
            <Typography variant="body2" className="text-gray-600 mr-2">
              推奨アプローチ:
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {Object.entries(approachStats).map(([approach, count]) => (
                <Chip
                  key={approach}
                  icon={approachIcons[approach as keyof typeof approachIcons]}
                  label={`${count}`}
                  color={approachColors[approach as keyof typeof approachColors]}
                  size="small"
                />
              ))}
            </Box>
          </Box>

          {/* ソートオプション */}
          <ToggleButtonGroup
            value={sortBy}
            exclusive
            onChange={(_, value) => value && setSortBy(value)}
            size="small"
          >
            <ToggleButton value="score" className="px-4">
              <StarIcon className="mr-1" fontSize="small" />
              スコア順
            </ToggleButton>
            <ToggleButton value="name" className="px-4">
              <BusinessIcon className="mr-1" fontSize="small" />
              企業名順
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Grow>

      {/* 分析結果テーブル */}
      <Grow in timeout={1100}>
        <TableContainer component={Paper} className="mb-24 shadow-lg">
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell className="font-semibold text-gray-700">企業名</TableCell>
                <TableCell align="center" className="font-semibold text-gray-700">相性スコア</TableCell>
                <TableCell align="center" className="font-semibold text-gray-700">推奨アプローチ</TableCell>
                <TableCell className="font-semibold text-gray-700">分析理由</TableCell>
                <TableCell align="center" className="font-semibold text-gray-700">アクション</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCompanies.slice(0, 20).map((company, index) => (
                <TableRow key={company.id} hover className="transition-colors">
                  <TableCell>
                    <Box>
                      <Typography variant="body1" className="font-medium text-gray-900">
                        {company.name}
                      </Typography>
                      {company.url && (
                        <Typography variant="caption" className="text-blue-600">
                          {company.url}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box className="flex flex-col items-center gap-1">
                      <Box className="flex items-center gap-2">
                        <Typography variant="h6" className="font-bold">
                          {company.compatibilityScore}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          / 100
                        </Typography>
                      </Box>
                      <Rating
                        value={company.compatibilityScore / 20}
                        readOnly
                        size="small"
                        precision={0.1}
                      />
                      <Chip
                        label={
                          company.compatibilityScore >= 80 ? '非常に高い' :
                          company.compatibilityScore >= 60 ? '高い' : '中程度'
                        }
                        color={getScoreColor(company.compatibilityScore)}
                        size="small"
                        className="mt-1"
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={`${approachNames[company.recommendedApproach]}による営業を推奨`}>
                      <Chip
                        icon={approachIcons[company.recommendedApproach]}
                        label={approachNames[company.recommendedApproach]}
                        color={approachColors[company.recommendedApproach]}
                        className="font-medium"
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" className="text-gray-600 leading-relaxed">
                      {company.analysisReason}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setPreviewCompany(company);
                        setTabValue(0);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {sortedCompanies.length > 20 && (
            <Box className="p-6 text-center bg-gray-50 border-t">
              <Typography color="text.secondary" className="font-medium">
                他 {sortedCompanies.length - 20} 件の企業があります
              </Typography>
            </Box>
          )}
        </TableContainer>
      </Grow>

      {/* 固定フッター */}
      <Paper
        elevation={8}
        className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200"
      >
        <Box className="container mx-auto flex justify-between items-center">
          <Button
            variant="outlined"
            onClick={onBack}
            size="large"
            startIcon={<ArrowBackIcon />}
          >
            戻る
          </Button>
          <Box className="flex items-center gap-4">
            <AssessmentIcon className="text-gray-600" />
            <Typography variant="h6" className="font-semibold">
              分析済み企業数: {analyzedCompanies.length.toLocaleString()}件
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={() => onNext(analyzedCompanies)}
            endIcon={<SendIcon />}
            className="shadow-lg"
          >
            送信処理へ（準備中）
          </Button>
        </Box>
      </Paper>

      {/* プレビューモーダル */}
      <Dialog
        open={!!previewCompany}
        onClose={() => setPreviewCompany(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex justify-between items-center">
          <Box>
            <Typography variant="h6">{previewCompany?.name}</Typography>
            <Typography variant="caption">1to1メッセージプレビュー</Typography>
          </Box>
          <IconButton
            onClick={() => setPreviewCompany(null)}
            className="text-white"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="p-0">
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            className="border-b"
          >
            <Tab label="メール" icon={<EmailIcon />} iconPosition="start" />
            <Tab label="フォーム" icon={<DescriptionIcon />} iconPosition="start" />
            <Tab label="テレアポ" icon={<PhoneIcon />} iconPosition="start" />
            <Tab label="リファラル" icon={<GroupIcon />} iconPosition="start" />
            <Tab label="SNS" icon={<ShareIcon />} iconPosition="start" />
          </Tabs>
          
          <TabPanel value={tabValue} index={0}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="subtitle2" className="font-bold mb-2 text-gray-700">
                メール営業文面
              </Typography>
              <Box className="bg-white p-4 rounded border border-gray-200">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                  {previewCompany && generateEmailContent(previewCompany)}
                </pre>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="subtitle2" className="font-bold mb-2 text-gray-700">
                フォーム営業文面
              </Typography>
              <Box className="bg-white p-4 rounded border border-gray-200">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                  {previewCompany && generateEmailContent(previewCompany)}
                </pre>
              </Box>
              <Alert severity="info" className="mt-4">
                フォーム営業では文字数制限があるため、より簡潔な文面に調整されます。
              </Alert>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="subtitle2" className="font-bold mb-2 text-gray-700">
                テレアポトークスクリプト
              </Typography>
              <Box className="bg-white p-4 rounded border border-gray-200">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                  {previewCompany && generateTeleapoScript(previewCompany)}
                </pre>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="subtitle2" className="font-bold mb-2 text-gray-700">
                リファラルアプローチ戦略
              </Typography>
              <Box className="bg-white p-4 rounded border border-gray-200">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                  {previewCompany && generateReferralApproach(previewCompany)}
                </pre>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={4}>
            <Box className="bg-gray-50 p-4 rounded-lg">
              <Typography variant="subtitle2" className="font-bold mb-2 text-gray-700">
                SNSアプローチ戦略
              </Typography>
              <Box className="bg-white p-4 rounded border border-gray-200">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                  {previewCompany && generateSNSContent(previewCompany)}
                </pre>
              </Box>
            </Box>
          </TabPanel>
        </DialogContent>
        <DialogActions className="border-t p-4">
          <Button onClick={() => setPreviewCompany(null)}>
            閉じる
          </Button>
          <Button variant="contained" startIcon={<CheckCircleIcon />}>
            このアプローチを採用
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};