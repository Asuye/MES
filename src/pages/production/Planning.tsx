import React from 'react';

const Planning: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">生产计划管理</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">生产计划列表</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">计划名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">开始日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">结束日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">2024年Q1生产计划</td>
                <td className="px-6 py-4 whitespace-nowrap">阿司匹林片</td>
                <td className="px-6 py-4 whitespace-nowrap">10000</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-01-01</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-01-31</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">已完成</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">编辑</button>
                  <button className="text-gray-600 hover:text-gray-900">查看</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">2024年Q2生产计划</td>
                <td className="px-6 py-4 whitespace-nowrap">布洛芬胶囊</td>
                <td className="px-6 py-4 whitespace-nowrap">15000</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-06-30</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">进行中</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">编辑</button>
                  <button className="text-gray-600 hover:text-gray-900">查看</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">2024年Q3生产计划</td>
                <td className="px-6 py-4 whitespace-nowrap">对乙酰氨基酚片</td>
                <td className="px-6 py-4 whitespace-nowrap">12000</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-07-01</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-09-30</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">待开始</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">编辑</button>
                  <button className="text-gray-600 hover:text-gray-900">查看</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">创建生产计划</button>
        </div>
      </div>
    </div>
  );
};

export default Planning;