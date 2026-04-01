import React from 'react';

const Compliance: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">质量合规</h1>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-xl font-semibold mb-3">偏差记录</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">批次号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">偏差类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">严重程度</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">报告时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">BT-2024-001</td>
                <td className="px-6 py-4 whitespace-nowrap">物料偏差</td>
                <td className="px-6 py-4 whitespace-nowrap">物料称量超出允许范围</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">轻微</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">已关闭</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 10:00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">BT-2024-002</td>
                <td className="px-6 py-4 whitespace-nowrap">设备偏差</td>
                <td className="px-6 py-4 whitespace-nowrap">制粒机温度异常</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">中度</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">处理中</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-02 14:30</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">BT-2024-003</td>
                <td className="px-6 py-4 whitespace-nowrap">环境偏差</td>
                <td className="px-6 py-4 whitespace-nowrap">洁净区湿度超标</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">严重</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">待处理</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-03 09:15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">记录偏差</button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">审计追踪</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">实体类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP地址</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">生产操作员</td>
                <td className="px-6 py-4 whitespace-nowrap">创建批次</td>
                <td className="px-6 py-4 whitespace-nowrap">批次</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 08:00</td>
                <td className="px-6 py-4 whitespace-nowrap">192.168.1.100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">生产操作员</td>
                <td className="px-6 py-4 whitespace-nowrap">记录称量</td>
                <td className="px-6 py-4 whitespace-nowrap">称量记录</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 08:30</td>
                <td className="px-6 py-4 whitespace-nowrap">192.168.1.100</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">生产管理员</td>
                <td className="px-6 py-4 whitespace-nowrap">批准批记录</td>
                <td className="px-6 py-4 whitespace-nowrap">批记录</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 16:00</td>
                <td className="px-6 py-4 whitespace-nowrap">192.168.1.101</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Compliance;