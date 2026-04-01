import React from 'react';

const Process: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">工艺监控</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">工艺记录</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">批次号</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">工艺步骤</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">设备</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">参数名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">目标值</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">实际值</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">单位</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">记录时间</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">BT-2024-001</td>
                <td className="px-6 py-4 whitespace-nowrap">混合</td>
                <td className="px-6 py-4 whitespace-nowrap">混合机</td>
                <td className="px-6 py-4 whitespace-nowrap">转速</td>
                <td className="px-6 py-4 whitespace-nowrap">100 rpm</td>
                <td className="px-6 py-4 whitespace-nowrap">102 rpm</td>
                <td className="px-6 py-4 whitespace-nowrap">rpm</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 09:30</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看</button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">BT-2024-001</td>
                <td className="px-6 py-4 whitespace-nowrap">制粒</td>
                <td className="px-6 py-4 whitespace-nowrap">制粒机</td>
                <td className="px-6 py-4 whitespace-nowrap">温度</td>
                <td className="px-6 py-4 whitespace-nowrap">60 °C</td>
                <td className="px-6 py-4 whitespace-nowrap">65 °C</td>
                <td className="px-6 py-4 whitespace-nowrap">°C</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 10:45</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">查看</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">记录工艺参数</button>
        </div>
      </div>
    </div>
  );
};

export default Process;