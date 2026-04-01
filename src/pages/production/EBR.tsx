import React from 'react';

const EBR: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">电子批记录</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">批记录列表</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">批次号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">版本</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">BT-2024-001</td>
                <td className="px-6 py-4 whitespace-nowrap">阿司匹林片</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">待审核</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">1.0</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 10:00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">查看</button>
                  <button className="text-green-600 hover:text-green-900">审核</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">BT-2024-003</td>
                <td className="px-6 py-4 whitespace-nowrap">对乙酰氨基酚片</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">已批准</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">1.0</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-03-15 16:30</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">查看</button>
                  <button className="text-green-600 hover:text-green-900" disabled>审核</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">创建批记录</button>
        </div>
      </div>
    </div>
  );
};

export default EBR;