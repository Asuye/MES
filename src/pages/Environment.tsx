import React from 'react';

const Environment: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">环境监测</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">环境数据</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">区域</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">温度 (°C)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">湿度 (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">压差 (Pa)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">粒子数</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">记录时间</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">洁净区 A</td>
                <td className="px-6 py-4 whitespace-nowrap">22.5</td>
                <td className="px-6 py-4 whitespace-nowrap">45</td>
                <td className="px-6 py-4 whitespace-nowrap">10</td>
                <td className="px-6 py-4 whitespace-nowrap">1000</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 08:00</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">洁净区 B</td>
                <td className="px-6 py-4 whitespace-nowrap">23.0</td>
                <td className="px-6 py-4 whitespace-nowrap">50</td>
                <td className="px-6 py-4 whitespace-nowrap">8</td>
                <td className="px-6 py-4 whitespace-nowrap">1200</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 08:30</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">洁净区 C</td>
                <td className="px-6 py-4 whitespace-nowrap">25.0</td>
                <td className="px-6 py-4 whitespace-nowrap">60</td>
                <td className="px-6 py-4 whitespace-nowrap">5</td>
                <td className="px-6 py-4 whitespace-nowrap">2000</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 09:00</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">洁净区 A</td>
                <td className="px-6 py-4 whitespace-nowrap">22.6</td>
                <td className="px-6 py-4 whitespace-nowrap">46</td>
                <td className="px-6 py-4 whitespace-nowrap">9</td>
                <td className="px-6 py-4 whitespace-nowrap">950</td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 09:30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mt-4">
        <h2 className="text-xl font-semibold mb-3">环境报警</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">区域</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">消息</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">级别</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">洁净区 C</td>
                <td className="px-6 py-4 whitespace-nowrap">温度: 25.0°C, 湿度: 60%, 粒子数: 2000</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">错误</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">2024-04-01 09:00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Environment;