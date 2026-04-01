import { useState } from 'react';
import { Activity, Clock, Package, TrendingUp, AlertTriangle, Shield, BarChart3, Users } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBatches: 12,
    inProgress: 3,
    completed: 9,
    qualityIssues: 0,
  });

  const recentBatches = [
    { id: 1, batchNumber: 'BT-2024-001', product: '阿司匹林片', status: '进行中', progress: 65 },
    { id: 2, batchNumber: 'BT-2024-002', product: '布洛芬胶囊', status: '待开始', progress: 0 },
    { id: 3, batchNumber: 'BT-2024-003', product: '对乙酰氨基酚片', status: '已完成', progress: 100 },
  ];

  const alerts = [
    { id: 1, message: '设备 EQ-001 需要维护', level: 'warning' },
    { id: 2, message: '环境温湿度正常', level: 'info' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">仪表盘</h1>
          <p className="mt-2 text-sm text-gray-600">生产状态概览</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Package size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">总批次数</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBatches}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <Activity size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">进行中</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <TrendingUp size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">已完成</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">质量问题</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.qualityIssues}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 最近批次和报警 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 最近批次 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">最近批次</h2>
              <a href="/production/batch" className="text-sm text-blue-600 hover:text-blue-500">查看全部</a>
            </div>
            <div className="space-y-4">
              {recentBatches.map((batch) => (
                <div key={batch.id} className="p-4 border rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{batch.batchNumber}</h3>
                      <p className="text-sm text-gray-600">{batch.product}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${batch.status === '进行中' ? 'bg-yellow-100 text-yellow-800' : batch.status === '已完成' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {batch.status}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${batch.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 系统报警 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">系统报警</h2>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">查看全部</a>
            </div>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 border rounded-md ${alert.level === 'warning' ? 'border-yellow-300 bg-yellow-50' : 'border-blue-300 bg-blue-50'}`}>
                  <div className="flex items-start">
                    <div className={`mt-1 mr-3 ${alert.level === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`}>
                      {alert.level === 'warning' ? <AlertTriangle size={18} /> : <Shield size={18} />}
                    </div>
                    <p className="text-sm text-gray-700">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 生产趋势 */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">生产趋势</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-md">日</button>
              <button className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-md">周</button>
              <button className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-md">月</button>
            </div>
          </div>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">生产趋势图表</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;