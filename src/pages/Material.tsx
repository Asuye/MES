import React, { useState, useEffect } from 'react';
import { Package, BarChart3, AlertCircle, CheckCircle, TrendingUp, TrendingDown, ShoppingCart } from 'lucide-react';
import { materialService } from '../services/api';
import { Material } from '../types';
import Table from '../components/Table';
import Button from '../components/Button';

const Material: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 获取物料数据
  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const data = await materialService.getMaterials();
      setMaterials(data);
    } catch (error) {
      console.error('获取物料数据失败:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 更新物料库存
  const handleUpdateStock = async (id: string, quantity: number) => {
    try {
      const updatedMaterial = await materialService.updateStock(id, quantity);
      setMaterials(prevMaterials => 
        prevMaterials.map(material => material.id === id ? updatedMaterial : material)
      );
    } catch (error) {
      console.error('更新物料库存失败:', error);
    }
  };

  // 创建采购订单
  const handleCreatePurchaseOrder = async (id: string, quantity: number) => {
    try {
      await materialService.createPurchaseOrder(id, quantity);
      // 这里可以添加采购订单创建成功的提示
      alert('采购订单创建成功');
    } catch (error) {
      console.error('创建采购订单失败:', error);
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchMaterials();
  }, []);

  // 刷新数据
  const handleRefresh = () => {
    setRefreshing(true);
    fetchMaterials();
  };

  const getStatusColor = (status: Material['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'out':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Material['status']) => {
    switch (status) {
      case 'normal':
        return '正常';
      case 'low':
        return '库存不足';
      case 'out':
        return '缺货';
      default:
        return '未知';
    }
  };

  // 表格列配置
  const columns = [
    { key: 'name', label: '物料名称', sortable: true },
    { key: 'code', label: '物料编码', sortable: true },
    { key: 'type', label: '类型', sortable: true },
    { key: 'stock', label: '库存', sortable: true },
    { key: 'unit', label: '单位', sortable: true },
    { key: 'minStock', label: '最低库存', sortable: true },
    { 
      key: 'status', 
      label: '状态', 
      sortable: true,
      render: (row: Material) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(row.status)}`}>
          {getStatusText(row.status)}
        </span>
      )
    },
    { key: 'supplier', label: '供应商', sortable: true },
    { 
      key: 'actions', 
      label: '操作',
      width: '200px',
      render: (row: Material) => (
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
            onClick={() => handleCreatePurchaseOrder(row.id, row.minStock * 2)}
          >
            <ShoppingCart size={16} className="mr-1" />
            采购
          </Button>
        </div>
      )
    },
  ];

  // 计算统计数据
  const totalMaterials = materials.length;
  const normalMaterials = materials.filter(material => material.status === 'normal').length;
  const lowMaterials = materials.filter(material => material.status === 'low').length;
  const outMaterials = materials.filter(material => material.status === 'out').length;

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">物料管理</h1>
          <p className="text-gray-600">物料库存和采购管理</p>
        </div>
        <Button 
          variant="secondary" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          刷新
        </Button>
      </div>

      {/* 物料概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Package size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">物料种类</p>
              <p className="text-2xl font-bold text-gray-800">{totalMaterials}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">库存正常</p>
              <p className="text-2xl font-bold text-gray-800">{normalMaterials}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <AlertCircle size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">库存不足</p>
              <p className="text-2xl font-bold text-gray-800">{lowMaterials}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <TrendingDown size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">缺货</p>
              <p className="text-2xl font-bold text-gray-800">{outMaterials}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 物料列表 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">物料列表</h2>
          <Button variant="primary">
            新增物料
          </Button>
        </div>

        <Table
          columns={columns}
          data={materials}
          loading={loading}
          emptyText="暂无物料数据"
        />
      </div>
    </div>
  );
};

export default Material;