import React, { useState } from 'react';
import { Container, Box, Stepper, Step, StepLabel, Paper, createTheme, ThemeProvider } from '@mui/material';
import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Company, AnalyzedCompany } from './data/demoData';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4F46E5',
      light: '#6366F1',
      dark: '#4338CA',
    },
    secondary: {
      main: '#7C3AED',
    },
    background: {
      default: '#F9FAFB',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Inter", "Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          },
          transition: 'box-shadow 0.3s ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [, setAnalyzedCompanies] = useState<AnalyzedCompany[]>([]);

  const steps = ['リスト選択', 'リスト分析', '送信処理'];

  const handleStep1Next = (companies: Company[], productId: string) => {
    setSelectedCompanies(companies);
    setSelectedProduct(productId);
    setActiveStep(1);
  };

  const handleStep2Next = (analyzed: AnalyzedCompany[]) => {
    setAnalyzedCompanies(analyzed);
    // STEP3は未実装のため、アラートを表示
    alert('送信処理は準備中です');
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Container maxWidth="xl" className="py-10">
          <Paper className="mb-10 p-6 bg-white/80 backdrop-blur-sm" elevation={0}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        '&.Mui-active': {
                          color: theme.palette.primary.main,
                        },
                        '&.Mui-completed': {
                          color: theme.palette.primary.main,
                        },
                      },
                    }}
                  >
                    <span className={`font-large ${index === activeStep ? 'text-indigo-600' : 'text-gray-500'}`}>
                      {label}
                    </span>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          <Box className="pb-24">
            {activeStep === 0 && (
              <Step1 onNext={handleStep1Next} />
            )}
            {activeStep === 1 && (
              <Step2
                companies={selectedCompanies}
                productId={selectedProduct}
                onNext={handleStep2Next}
                onBack={handleBack}
              />
            )}
            {activeStep === 2 && (
              <Box className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-2xl text-gray-500 font-medium">
                  送信処理は準備中です
                </h2>
                <p className="text-gray-400 mt-2">
                  この機能は現在開発中です
                </p>
              </Box>
            )}
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;