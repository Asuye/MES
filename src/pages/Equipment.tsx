import React, { useState } from 'react';
import { Wrench, Activity, AlertCircle, CheckCircle, Clock, BarChart3 } from 'lucide-react';

interface Equipment {
  id: string;
  name: string;
  type: string;
  status: 'running' | 'maintenance' | 'idle' | 'fault';
  lastMaintenance: string;
  nextMaintenance: string;
  location: string;
}

const Equipment: React.FC = () => {
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([
    {
      id: '1',
      name: '压片机',
      type: '生产设备',
      status: 'running',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10',
      location: '生产车间A区',
    },
    {
      id: '2',
      name: '包装机',
      type: '生产设备',
      status: 'idle',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-02-05',
      location: '生产车间B区',
    },
    {
      id: '3',
      name: '混合机',
      type: '生产设备',
      status: 'maintenance',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15',
      location: '生产车间A区',
    },
    {
      id: '4',
      name: '检测仪器',
      type: '检测设备',
      status: 'fault',
      lastMaintenance: '2024-01-01',
      nextMaintenance: '2024-02-01',
      location: '质量检验室',
    },
  ]);

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

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">设备管理</h1>
        <p className="text-gray-600">设备状态和维护管理</p>
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
              <p className="text-2xl font-bold text-gray-800">4</p>
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
              <p className="text-2xl font-bold text-gray-800">1</p>
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
              <p className="text-2xl font-bold text-gray-800">1</p>
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
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* 设备列表 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">设备列表</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            新增设备
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  设备名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  上次维护
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  下次维护
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  位置
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {equipmentList.map((equipment) => (
                <tr key={equipment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {equipment.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(equipment.status)}`}>
                      {getStatusText(equipment.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.lastMaintenance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.nextMaintenance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {equipment.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      详情
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      维护记录
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Equipment;