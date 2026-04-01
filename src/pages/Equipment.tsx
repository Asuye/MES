import React from 'react';

const Equipment: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">设备管理</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">设备列表</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">设备代码</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">设备名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">设备类型</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后维护</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">下次维护</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">EQ-001</td>
                <td className="px-6 py-4 whitespace-nowrap">混合机</td>
                <td className="px-6 py-4 whitespace-nowrap">生产设备</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">运行中</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2024-03-15</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-06-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">查看</button>
                  <button className="text-green-600 hover:text-green-900">维护</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">EQ-002</td>
                <td className="px-6 py-4 whitespace-nowrap">制粒机</td>
                <td className="px-6 py-4 whitespace-nowrap">生产设备</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">待机</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2024-02-20</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-05-20</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">查看</button>
                  <button className="text-green-600 hover:text-green-900">维护</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">EQ-003</td>
                <td className="px-6 py-4 whitespace-nowrap">干燥机</td>
                <td className="px-6 py-4 whitespace-nowrap">生产设备</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">故障</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2024-01-10</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-10</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">查看</button>
                  <button className="text-green-600 hover:text-green-900">维护</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">EQ-004</td>
                <td className="px-6 py-4 whitespace-nowrap">压片机</td>
                <td className="px-6 py-4 whitespace-nowrap">生产设备</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">运行中</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2024-03-05</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-06-05</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">查看</button>
                  <button className="text-green-600 hover:text-green-900">维护</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">添加设备</button>
        </div>
      </div>
    </div>
  );
};

export default Equipment;