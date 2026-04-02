import React, { useState, useEffect } from 'react';
import { BarChart3, LineChart, PieChart, FileText, Download, Filter, FileDown, FileUp } from 'lucide-react';
import { reportService } from '../services/api';
import { Report } from '../types';
import Table from '../components/Table';
import Button from '../components/Button';

const Report: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [generating, setGenerating] = useState(false);

  // 获取报表数据
  const fetchReports = async () => {
    try {
      setLoading(true);
      const data = await reportService.getReports();
      setReports(data);
    } catch (error) {
      console.error('获取报表数据失败:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 生成报表
  const handleGenerateReport = async (type: string) => {
    try {
      setGenerating(true);
      const newReport = await reportService.generateReport(type, { date: new Date().toISOString().slice(0, 10) });
      setReports(prevReports => [newReport, ...prevReports]);
    } catch (error) {
      console.error('生成报表失败:', error);
    } finally {
      setGenerating(false);
    }
  };

  // 下载报表
  const handleDownloadReport = (fileUrl: string) => {
    // 模拟下载
    console.log('下载报表:', fileUrl);
    alert('报表下载开始');
  };

  // 初始化数据
  useEffect(() => {
    fetchReports();
  }, []);

  // 刷新数据
  const handleRefresh = () => {
    setRefreshing(true);
    fetchReports();
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'generated':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Report['status']) => {
    switch (status) {
      case 'generated':
        return '已生成';
      case 'pending':
        return '生成中';
      default:
        return '未知';
    }
  };

  // 表格列配置
  const columns = [
    { key: 'name', label: '报表名称', sortable: true },
    { key: 'type', label: '类型', sortable: true },
    { key: 'date', label: '日期', sortable: true },
    { key: 'generatedBy', label: '生成人', sortable: true },
    { 
      key: 'status', 
      label: '状态', 
      sortable: true,
      render: (row: Report) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(row.status)}`}>
          {getStatusText(row.status)}
        </span>
      )
    },
    { 
      key: 'actions', 
      label: '操作',
      width: '180px',
      render: (row: Report) => (
        <div className="flex items-center justify-end space-x-2">
          {row.status === 'generated' && (
            <>
              <Button 
                variant="primary" 
                size="sm"
                className="mr-2"
              >
                查看
              </Button>
              <Button 
                variant="success" 
                size="sm"
                onClick={() => handleDownloadReport(row.fileUrl)}
              >
                <FileDown size={16} className="mr-1" />
                下载
              </Button>
            </>
          )}
          {row.status === 'pending' && (
            <Button 
              variant="warning" 
              size="sm"
            >
              取消
            </Button>
          )}
        </div>
      )
    },
  ];

  // 计算统计数据
  const productionReports = reports.filter(report => report.type === '生产报表').length;
  const qualityReports = reports.filter(report => report.type === '质量报表').length;
  const equipmentReports = reports.filter(report => report.type === '设备报表').length;

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">报表分析</h1>
          <p className="text-gray-600">生产和质量报表管理</p>
        </div>
        <Button 
          variant="secondary" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          刷新
        </Button>
      </div>

      {/* 报表概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <BarChart3 size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">生产报表</p>
              <p className="text-2xl font-bold text-gray-800">{productionReports}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <PieChart size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">质量报表</p>
              <p className="text-2xl font-bold text-gray-800">{qualityReports}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <LineChart size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">设备报表</p>
              <p className="text-2xl font-bold text-gray-800">{equipmentReports}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 报表列表 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">报表列表</h2>
          <div className="space-x-2">
            <Button 
              variant="primary" 
              onClick={() => handleGenerateReport('生产')}
              disabled={generating}
            >
              <FileUp size={16} className="mr-1" />
              生成生产报表
            </Button>
            <Button 
              variant="primary" 
              onClick={() => handleGenerateReport('质量')}
              disabled={generating}
            >
              <FileUp size={16} className="mr-1" />
              生成质量报表
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          data={reports}
          loading={loading}
          emptyText="暂无报表数据"
        />
      </div>

      {/* 数据可视化 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">生产趋势</h3>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <LineChart size={48} className="text-gray-400" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">质量分布</h3>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <PieChart size={48} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;