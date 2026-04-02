import React, { useState, useEffect } from 'react';
import { Wrench, Activity, AlertCircle, CheckCircle, Clock, BarChart3, Settings } from 'lucide-react';
import { equipmentService } from '../services/api';
import { Equipment } from '../types';
import Table from '../components/Table';
import Button from '../components/Button';

const EquipmentPage: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 获取设备数据
  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const data = await equipmentService.getEquipment();
      setEquipmentList(data);
    } catch (error) {
      console.error('获取设备数据失败:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // 更新设备状态
  const handleUpdateStatus = async (id: string, status: Equipment['status']) => {
    try {
      const updatedEquipment = await equipmentService.updateStatus(id, status);
      setEquipmentList(prevList => 
        prevList.map(equipment => equipment.id === id ? updatedEquipment : equipment)
      );
    } catch (error) {
      console.error('更新设备状态失败:', error);
    }
  };

  // 记录设备维护
  const handleRecordMaintenance = async (id: string) => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const updatedEquipment = await equipmentService.recordMaintenance(id, today);
      setEquipmentList(prevList => 
        prevList.map(equipment => equipment.id === id ? updatedEquipment : equipment)
      );
    } catch (error) {
      console.error('记录设备维护失败:', error);
    }
  };

  // 初始化数据
  useEffect(() => {
    fetchEquipment();
  }, []);

  // 刷新数据
  const handleRefresh = () => {
    setRefreshing(true);
    fetchEquipment();
  };

  const getStatusColor = (status: Equipment['status']) => {
    switch (status) {
      case 'running':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'idle':
        return 'bg-blue-100 text-blue-800';
      case 'fault':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Equipment['status']) => {
    switch (status) {
      case 'running':
        return '运行中';
      case 'maintenance':
        return '维护中';
      case 'idle':
        return '闲置';
      case 'fault':
        return '故障';
      default:
        return '未知';
    }
  };

  // 表格列配置
  const columns = [
    { key: 'name', label: '设备名称', sortable: true },
    { key: 'type', label: '类型', sortable: true },
    { 
      key: 'status', 
      label: '状态', 
      sortable: true,
      render: (row: Equipment) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(row.status)}`}>
          {getStatusText(row.status)}
        </span>
      )
    },
    { key: 'lastMaintenance', label: '上次维护', sortable: true },
    { key: 'nextMaintenance', label: '下次维护', sortable: true },
    { key: 'location', label: '位置', sortable: true },
    { key: 'model', label: '型号', sortable: true },
    { 
      key: 'actions', 
      label: '操作',
      width: '200px',
      render: (row: Equipment) => (
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
            onClick={() => handleRecordMaintenance(row.id)}
          >
            维护记录
          </Button>
        </div>
      )
    },
  ];

  // 计算统计数据
  const totalEquipment = equipmentList.length;
  const runningEquipment = equipmentList.filter(equipment => equipment.status === 'running').length;
  const maintenanceEquipment = equipmentList.filter(equipment => equipment.status === 'maintenance').length;
  const faultEquipment = equipmentList.filter(equipment => equipment.status === 'fault').length;

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">设备管理</h1>
          <p className="text-gray-600">设备状态和维护管理</p>
        </div>
        <Button 
          variant="secondary" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          刷新
        </Button>
      </div>

      {/* 设备概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Wrench size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">设备总数</p>
              <p className="text-2xl font-bold text-gray-800">{totalEquipment}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <Activity size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">运行中</p>
              <p className="text-2xl font-bold text-gray-800">{runningEquipment}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <Wrench size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">维护中</p>
              <p className="text-2xl font-bold text-gray-800">{maintenanceEquipment}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <AlertCircle size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">故障</p>
              <p className="text-2xl font-bold text-gray-800">{faultEquipment}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 设备列表 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">设备列表</h2>
          <Button variant="primary">
            新增设备
          </Button>
        </div>

        <Table
          columns={columns}
          data={equipmentList}
          loading={loading}
          emptyText="暂无设备数据"
        />
      </div>
    </div>
  );
};

export default EquipmentPage;