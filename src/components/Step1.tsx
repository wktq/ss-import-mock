import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack,
  IconButton,
  Fade,
  Grow,
  Badge,
  TableContainer,
  Collapse,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ListIcon from '@mui/icons-material/List';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { categories, companies, products, Company } from '../data/demoData';

interface Step1Props {
  onNext: (selectedCompanies: Company[], productId: string) => void;
}

interface CSVMapping {
  name: string;
  url?: string;
  description?: string;
}

export const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<Company[]>([]);
  const [showCSVDialog, setShowCSVDialog] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [csvData, setCSVData] = useState<any[]>([]);
  const [csvHeaders, setCSVHeaders] = useState<string[]>([]);
  const [csvMapping, setCSVMapping] = useState<CSVMapping>({
    name: '',
    url: '',
    description: '',
  });
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getParentCategories = () => categories.filter(cat => !cat.parentId);
  const getChildCategories = (parentId: string) => categories.filter(cat => cat.parentId === parentId);
  
  const handleCategoryToggle = (categoryId: string) => {
    // Update selected categories
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newSelectedCategories);
    
    // Automatically update selected companies based on checked categories
    const newCompanies = companies.filter(comp => 
      newSelectedCategories.includes(comp.categoryId)
    );
    setSelectedCompanies(newCompanies);
  };

  const handleParentToggle = (parentId: string) => {
    setExpandedCategories(prev => {
      if (prev.includes(parentId)) {
        return prev.filter(id => id !== parentId);
      } else {
        return [...prev, parentId];
      }
    });
  };

  // Remove handleAddToList as we're now adding automatically on checkbox selection

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          return headers.reduce((obj, header, index) => {
            obj[header] = values[index]?.trim() || '';
            return obj;
          }, {} as any);
        }).filter(row => Object.values(row).some(v => v));
        
        setCSVHeaders(headers);
        setCSVData(data);
        
        // 自動マッピング
        const mapping: CSVMapping = {
          name: headers.find(h => h.toLowerCase().includes('name') || h.toLowerCase().includes('企業')) || '',
          url: headers.find(h => h.toLowerCase().includes('url')) || '',
          description: headers.find(h => h.toLowerCase().includes('description') || h.toLowerCase().includes('説明')) || '',
        };
        setCSVMapping(mapping);
        setShowCSVDialog(true);
      };
      reader.readAsText(file);
    }
  };

  const handleCSVImport = () => {
    const importedCompanies: Company[] = csvData.map((row, index) => ({
      id: `csv-${index}`,
      name: row[csvMapping.name],
      url: csvMapping.url ? row[csvMapping.url] : undefined,
      description: csvMapping.description ? row[csvMapping.description] : undefined,
      categoryId: 'csv',
    }));
    setSelectedCompanies([...selectedCompanies, ...importedCompanies]);
    setShowCSVDialog(false);
  };

  const getSelectedCategoryCount = () => {
    return selectedCategories.reduce((sum, catId) => {
      const category = categories.find(c => c.id === catId);
      return sum + (category?.companyCount || 0);
    }, 0);
  };

  const getAddedCategoryNames = () => {
    // 追加済みの企業のカテゴリIDを取得
    const addedCategoryIds = Array.from(new Set(selectedCompanies.map(c => c.categoryId)));
    return addedCategoryIds.map(catId => {
      const category = categories.find(c => c.id === catId);
      return category?.name || (catId === 'csv' ? 'CSVインポート' : '');
    }).filter(name => name);
  };

  return (
    <Box>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />

      {/* 商材選択 */}
      <Grow in timeout={700}>
        <Card className="mb-6 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
          <CardContent className="p-4">
            <Box className="flex items-center gap-4">
              <BusinessIcon className="text-indigo-600" />
              <Typography variant="h6" className="font-semibold text-gray-800">
                営業商材の選択
              </Typography>
            </Box>
            <FormControl fullWidth className="mt-4">
              <InputLabel>営業したい商材を選択</InputLabel>
              <Select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                label="営業したい商材を選択"
                className="bg-white"
              >
                {products.map(product => (
                  <MenuItem key={product.id} value={product.id}>
                    <Box>
                      <Typography variant="body1" className="font-medium">
                        {product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {product.description}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grow>

      {/* カテゴリ選択 */}
      <Grow in timeout={900}>
        <Card className="mb-24">
          <CardContent className="p-6">
            <Box className="flex items-center justify-between mb-6">
              <Box className="flex items-center gap-2">
                <FolderIcon className="text-indigo-600" />
                <Typography variant="h6" className="font-semibold text-gray-800">
                  カテゴリから選択
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<UploadFileIcon />}
                onClick={() => fileInputRef.current?.click()}
              >
                CSVインポート
              </Button>
            </Box>
            
            <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getParentCategories().map(parent => {
                const childCategories = getChildCategories(parent.id);
                const isExpanded = expandedCategories.includes(parent.id);
                
                return (
                  <Box key={parent.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                    <Box 
                      className="flex items-center p-2 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                      onClick={() => handleCategoryToggle(parent.id)}
                    >
                      <Checkbox
                        checked={selectedCategories.includes(parent.id)}
                        color="primary"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Typography className="font-bold text-lg flex-1">
                        {parent.name}
                      </Typography>
                      <Chip 
                        label={`${parent.companyCount.toLocaleString()}件`}
                        className="bg-indigo-100 text-indigo-700 font-semibold mr-2"
                      />
                      {childCategories.length > 0 && (
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleParentToggle(parent.id);
                          }}
                        >
                          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      )}
                    </Box>
                    
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box className="mt-3 ml-4">
                        {childCategories.map(child => (
                          <Box 
                            key={child.id} 
                            className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                            onClick={() => handleCategoryToggle(child.id)}
                          >
                            <Checkbox
                              checked={selectedCategories.includes(child.id)}
                              size="small"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <Typography className="flex-1 text-gray-700">
                              {child.name}
                            </Typography>
                            <Typography variant="body2" className="text-gray-500">
                              {child.companyCount.toLocaleString()}件
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Collapse>
                  </Box>
                );
              })}
            </Box>
          </CardContent>
        </Card>
      </Grow>

      {/* 固定フッター */}
      <Paper
        elevation={8}
        className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200"
      >
        <Box className="container mx-auto flex justify-between items-center">
          <Box className="flex items-center gap-4 flex-1">
            <Badge badgeContent={selectedCompanies.length} color="primary" max={99999}>
              <BusinessIcon className="text-gray-600" />
            </Badge>
            <Box 
              className="flex-1 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              onClick={() => setShowListModal(true)}
            >
              <Typography variant="h6" className="font-semibold">
                追加済み: {selectedCompanies.length.toLocaleString()}件
              </Typography>
              {getAddedCategoryNames().length > 0 && (
                <Box className="flex gap-2 mt-1 flex-wrap">
                  {getAddedCategoryNames().slice(0, 3).map((name, index) => (
                    <Chip
                      key={index}
                      label={name}
                      size="small"
                      variant="outlined"
                      className="text-xs"
                    />
                  ))}
                  {getAddedCategoryNames().length > 3 && (
                    <Chip
                      label={`他${getAddedCategoryNames().length - 3}件`}
                      size="small"
                      variant="outlined"
                      className="text-xs"
                    />
                  )}
                </Box>
              )}
            </Box>
            <IconButton
              onClick={() => setShowListModal(true)}
              className="text-indigo-600"
            >
              <ListIcon />
            </IconButton>
          </Box>
          <Box className="flex gap-3">
            <Button
              variant="contained"
              size="large"
              onClick={() => onNext(selectedCompanies, selectedProduct)}
              disabled={selectedCompanies.length === 0 || !selectedProduct}
              endIcon={<CheckCircleIcon />}
              className="shadow-lg"
            >
              リスト分析へ進む
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* 選択中リストモーダル */}
      <Dialog 
        open={showListModal} 
        onClose={() => setShowListModal(false)} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          className: "max-h-[80vh]"
        }}
      >
        <DialogTitle className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex justify-between items-center">
          <Box className="flex items-center gap-2">
            <ListIcon />
            選択中のリスト（{selectedCompanies.length}件）
          </Box>
          <IconButton
            onClick={() => setShowListModal(false)}
            className="text-white"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="p-0">
          {selectedCompanies.length > 0 ? (
            <TableContainer className="max-h-[60vh]">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell className="font-semibold bg-gray-50">企業名</TableCell>
                    <TableCell className="font-semibold bg-gray-50">URL</TableCell>
                    <TableCell className="font-semibold bg-gray-50">説明</TableCell>
                    <TableCell className="font-semibold bg-gray-50" align="center">アクション</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedCompanies.map((company) => (
                    <TableRow key={company.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Typography variant="body2" className="font-medium">
                          {company.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {company.url ? (
                          <Chip 
                            label="あり" 
                            color="success" 
                            size="small"
                            icon={<CheckCircleIcon />}
                            className="font-medium"
                          />
                        ) : (
                          <Chip 
                            label="なし" 
                            color="warning" 
                            size="small"
                            icon={<WarningIcon />}
                            className="font-medium"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {company.description ? (
                          <Chip 
                            label="あり" 
                            color="success" 
                            size="small"
                            icon={<CheckCircleIcon />}
                            className="font-medium"
                          />
                        ) : (
                          <Chip 
                            label="なし" 
                            color="warning" 
                            size="small"
                            icon={<WarningIcon />}
                            className="font-medium"
                          />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => setSelectedCompanies(prev => prev.filter(c => c.id !== company.id))}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box className="text-center py-12">
              <BusinessIcon className="text-gray-300 text-6xl mb-4" />
              <Typography color="text.secondary">
                まだ企業が選択されていません
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions className="border-t">
          <Button onClick={() => setShowListModal(false)}>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>

      {/* CSVマッピングダイアログ */}
      <Dialog open={showCSVDialog} onClose={() => setShowCSVDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          CSVファイルのマッピング
        </DialogTitle>
        <DialogContent className="mt-4">
          <Typography className="mb-4">
            CSVファイルのヘッダーと必要な項目を紐付けてください
          </Typography>
          <Stack spacing={3}>
            <FormControl fullWidth>
              <InputLabel>企業名（必須）</InputLabel>
              <Select
                value={csvMapping.name}
                onChange={(e) => setCSVMapping({ ...csvMapping, name: e.target.value })}
                label="企業名（必須）"
              >
                {csvHeaders.map(header => (
                  <MenuItem key={header} value={header}>{header}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>URL（任意）</InputLabel>
              <Select
                value={csvMapping.url}
                onChange={(e) => setCSVMapping({ ...csvMapping, url: e.target.value })}
                label="URL（任意）"
              >
                <MenuItem value="">なし</MenuItem>
                {csvHeaders.map(header => (
                  <MenuItem key={header} value={header}>{header}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>企業説明（任意）</InputLabel>
              <Select
                value={csvMapping.description}
                onChange={(e) => setCSVMapping({ ...csvMapping, description: e.target.value })}
                label="企業説明（任意）"
              >
                <MenuItem value="">なし</MenuItem>
                {csvHeaders.map(header => (
                  <MenuItem key={header} value={header}>{header}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          {!csvMapping.url && (
            <Alert severity="warning" className="mt-4" icon={<WarningIcon />}>
              URLが指定されていません。次のステップで「企業名からURLを探す」機能を使用できます。
            </Alert>
          )}
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={() => setShowCSVDialog(false)}>キャンセル</Button>
          <Button 
            onClick={handleCSVImport} 
            variant="contained" 
            disabled={!csvMapping.name}
            startIcon={<CloudUploadIcon />}
          >
            インポート
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};