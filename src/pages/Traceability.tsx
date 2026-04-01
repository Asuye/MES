import React from 'react';

const Traceability: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">追溯查询</h1>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-xl font-semibold mb-3">批次追溯</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">批次号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">产品</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">数量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">开始时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">结束时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">BT-2024-001</td>
                <td className="px-6 py-4 whitespace-nowrap">阿司匹林片</td>
                <td className="px-6 py-4 whitespace-nowrap">1000</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 08:00</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 16:00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看详情</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">BT-2024-002</td>
                <td className="px-6 py-4 whitespace-nowrap">布洛芬胶囊</td>
                <td className="px-6 py-4 whitespace-nowrap">1500</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-02 08:00</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-02 16:30</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看详情</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h2 className="text-xl font-semibold mb-3">物料追溯</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">物料代码</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">物料名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">供应商</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">批次</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">有效期至</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">MAT-001</td>
                <td className="px-6 py-4 whitespace-nowrap">阿司匹林</td>
                <td className="px-6 py-4 whitespace-nowrap">XX化工</td>
                <td className="px-6 py-4 whitespace-nowrap">MAT-BT-2024-001</td>
                <td className="px-6 py-4 whitespace-nowrap">2026-01-14</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看详情</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">MAT-002</td>
                <td className="px-6 py-4 whitespace-nowrap">淀粉</td>
                <td className="px-6 py-4 whitespace-nowrap">XX食品</td>
                <td className="px-6 py-4 whitespace-nowrap">MAT-BT-2024-002</td>
                <td className="px-6 py-4 whitespace-nowrap">2026-02-09</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看详情</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">追溯搜索</h2>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label htmlFor="search-query" className="block text-sm font-medium text-gray-700 mb-1">搜索关键词</label>
            <input
              type="text"
              id="search-query"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="批次号、物料代码或产品名称"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="search-type" className="block text-sm font-medium text-gray-700 mb-1">搜索类型</label>
            <select
              id="search-type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="batch">批次</option>
              <option value="material">物料</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">搜索</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Traceability;