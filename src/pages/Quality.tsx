import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, FileText, BarChart3, Shield, Edit, FileDown } from 'lucide-react';
import { qualityService } from '../services/api';
import { QualityInspection, TestResult } from '../types';
import Table from '../components/Table';
import Button from '../components/Button';

const Quality: React.FC = () => {
  const [inspections, setInspections] = useState<QualityInspection[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 获取质量检验数据
  const fetchInspections = async () => {
    try {
      setLoading(true);
      const data = await qualityService.getInspections();
      setInspections(data);
    } catch (error) {
      console.error('获取质量检验数据失败:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchInspections();
  }, []);

  // 刷新数据
  const handleRefresh = () => {
    setRefreshing(true);
    fetchInspections();
  };

  const getStatusColor = (status: QualityInspection['status']) => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 text-green-800';
      case 'fail':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: QualityInspection['status']) => {
    switch (status) {
      case 'pass':
        return '合格';
      case 'fail':
        return '不合格';
      case 'pending':
        return '待检验';
      default:
        return '未知';
    }
  };

  // 表格列配置
  const columns = [
    { 
      key: 'id', 
      label: '检验编号', 
      sortable: true,
      render: (row: QualityInspection) => `QC-${row.date.substring(0, 10).replace(/-/g, '')}-${row.id}`
    },
    { key: 'batchId', label: '批次号', sortable: true },
    { key: 'product', label: '产品', sortable: true },
    { key: 'inspector', label: '检验员', sortable: true },
    { key: 'date', label: '检验日期', sortable: true },
    { 
      key: 'status', 
      label: '状态', 
      sortable: true,
      render: (row: QualityInspection) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(row.status)}`}>
          {getStatusText(row.status)}
        </span>
      )
    },
    { 
      key: 'actions', 
      label: '操作',
      width: '180px',
      render: (row: QualityInspection) => (
        <div className="flex items-center justify-end space-x-2">
          <Button 
            variant="primary" 
            size="sm"
            className="mr-2"
          >
            详情
          </Button>
          <Button 
            variant="success" 
            size="sm"
          >
            <FileDown size={16} className="mr-1" />
            报告
          </Button>
        </div>
      )
    },
  ];

  // 计算统计数据
  const totalInspections = inspections.length;
  const passedInspections = inspections.filter(inspection => inspection.status === 'pass').length;
  const failedInspections = inspections.filter(inspection => inspection.status === 'fail').length;
  const pendingInspections = inspections.filter(inspection => inspection.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">质量管理</h1>
          <p className="text-gray-600">质量检验和合规管理</p>
        </div>
        <Button 
          variant="secondary" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          刷新
        </Button>
      </div>

      {/* 质量概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <FileText size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">检验批次</p>
              <p className="text-2xl font-bold text-gray-800">{totalInspections}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">合格</p>
              <p className="text-2xl font-bold text-gray-800">{passedInspections}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <AlertCircle size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">不合格</p>
              <p className="text-2xl font-bold text-gray-800">{failedInspections}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <Edit size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">待检验</p>
              <p className="text-2xl font-bold text-gray-800">{pendingInspections}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 检验列表 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">质量检验记录</h2>
          <Button variant="primary">
            新增检验
          </Button>
        </div>

        <Table
          columns={columns}
          data={inspections}
          loading={loading}
          emptyText="暂无质量检验记录"
        />
      </div>
    </div>
  );
};

export default Quality;