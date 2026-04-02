import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BarChart3, Package, CheckCircle, AlertCircle, Play, Pause } from 'lucide-react';
import { productionService } from '../services/api';
import { ProductionBatch } from '../types';
import Table from '../components/Table';
import Button from '../components/Button';

const Production: React.FC = () => {
  const [batches, setBatches] = useState<ProductionBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 获取生产批次数据
  const fetchBatches = async () => {
    try {
      setLoading(true);
      const data = await productionService.getBatches();
      setBatches(data);
    } catch (error) {
      console.error('获取生产批次失败:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 开始生产批次
  const handleStartBatch = async (batchId: string) => {
    try {
      const updatedBatch = await productionService.startBatch(batchId);
      setBatches(prevBatches => 
        prevBatches.map(batch => batch.id === batchId ? updatedBatch : batch)
      );
    } catch (error) {
      console.error('开始生产批次失败:', error);
    }
  };

  // 完成生产批次
  const handleCompleteBatch = async (batchId: string, quantity: number) => {
    try {
      const updatedBatch = await productionService.completeBatch(batchId, quantity);
      setBatches(prevBatches => 
        prevBatches.map(batch => batch.id === batchId ? updatedBatch : batch)
      );
    } catch (error) {
      console.error('完成生产批次失败:', error);
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchBatches();
  }, []);

  // 刷新数据
  const handleRefresh = () => {
    setRefreshing(true);
    fetchBatches();
  };

  const getStatusColor = (status: ProductionBatch['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: ProductionBatch['status']) => {
    switch (status) {
      case 'pending':
        return '待开始';
      case 'running':
        return '进行中';
      case 'completed':
        return '已完成';
      case 'failed':
        return '失败';
      default:
        return '未知';
    }
  };

  // 表格列配置
  const columns = [
    { key: 'name', label: '批次号', sortable: true },
    { key: 'product', label: '产品', sortable: true },
    { 
      key: 'status', 
      label: '状态', 
      sortable: true,
      render: (row: ProductionBatch) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(row.status)}`}>
          {getStatusText(row.status)}
        </span>
      )
    },
    { key: 'startDate', label: '开始时间', sortable: true },
    { 
      key: 'endDate', 
      label: '结束时间', 
      sortable: true,
      render: (row: ProductionBatch) => row.endDate || '-'
    },
    { 
      key: 'quantity', 
      label: '产量', 
      sortable: true,
      render: (row: ProductionBatch) => `${row.quantity}/${row.targetQuantity}`
    },
    { 
      key: 'actions', 
      label: '操作',
      width: '200px',
      render: (row: ProductionBatch) => (
        <div className="flex items-center justify-end space-x-2">
          <Button 
            variant="primary" 
            size="sm"
            className="mr-2"
          >
            详情
          </Button>
          {row.status === 'pending' && (
            <Button 
              variant="success" 
              size="sm"
              onClick={() => handleStartBatch(row.id)}
            >
              <Play size={16} className="mr-1" />
              开始
            </Button>
          )}
          {row.status === 'running' && (
            <>
              <Button 
                variant="warning" 
                size="sm"
                className="mr-2"
              >
                <Pause size={16} className="mr-1" />
                暂停
              </Button>
              <Button 
                variant="success" 
                size="sm"
                onClick={() => handleCompleteBatch(row.id, row.quantity)}
              >
                <CheckCircle size={16} className="mr-1" />
                完成
              </Button>
            </>
          )}
        </div>
      )
    },
  ];

  // 计算统计数据
  const todayBatches = batches.filter(batch => batch.startDate.startsWith(new Date().toISOString().slice(0, 10))).length;
  const completedBatches = batches.filter(batch => batch.status === 'completed').length;
  const runningBatches = batches.filter(batch => batch.status === 'running').length;
  const failedBatches = batches.filter(batch => batch.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">生产管理</h1>
          <p className="text-gray-600">生产计划和批次管理</p>
        </div>
        <Button 
          variant="secondary" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          刷新
        </Button>
      </div>

      {/* 生产概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Package size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">今日批次</p>
              <p className="text-2xl font-bold text-gray-800">{todayBatches}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">已完成</p>
              <p className="text-2xl font-bold text-gray-800">{completedBatches}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <Clock size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">进行中</p>
              <p className="text-2xl font-bold text-gray-800">{runningBatches}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <AlertCircle size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">异常</p>
              <p className="text-2xl font-bold text-gray-800">{failedBatches}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 批次列表 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">生产批次</h2>
          <Button variant="primary">
            新增批次
          </Button>
        </div>

        <Table
          columns={columns}
          data={batches}
          loading={loading}
          emptyText="暂无生产批次"
        />
      </div>
    </div>
  );
};

export default Production;