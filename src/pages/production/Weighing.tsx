import React from 'react';

const Weighing: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">称量配料</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">称量记录</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">批次号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">物料代码</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">物料名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">目标重量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">实际重量</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">偏差</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">BT-2024-001</td>
                <td className="px-6 py-4 whitespace-nowrap">MAT-001</td>
                <td className="px-6 py-4 whitespace-nowrap">阿司匹林</td>
                <td className="px-6 py-4 whitespace-nowrap">10.0</td>
                <td className="px-6 py-4 whitespace-nowrap">10.05</td>
                <td className="px-6 py-4 whitespace-nowrap">0.05</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">合格</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 08:30</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">BT-2024-001</td>
                <td className="px-6 py-4 whitespace-nowrap">MAT-002</td>
                <td className="px-6 py-4 whitespace-nowrap">淀粉</td>
                <td className="px-6 py-4 whitespace-nowrap">5.0</td>
                <td className="px-6 py-4 whitespace-nowrap">5.10</td>
                <td className="px-6 py-4 whitespace-nowrap">0.10</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">偏差</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 08:45</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">记录称量</button>
        </div>
      </div>
    </div>
  );
};

export default Weighing;