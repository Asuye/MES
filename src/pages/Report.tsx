import React, { useState } from 'react';
import { BarChart3, LineChart, PieChart, FileText, Download, Filter } from 'lucide-react';

interface Report {
  id: string;
  name: string;
  type: string;
  date: string;
  generatedBy: string;
  status: 'generated' | 'pending';
}

const Report: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      name: '生产日报',
      type: '生产报表',
      date: '2024-01-16',
      generatedBy: 'admin',
      status: 'generated',
    },
    {
      id: '2',
      name: '质量月报',
      type: '质量报表',
      date: '2024-01-31',
      generatedBy: 'quality',
      status: 'pending',
    },
    {
      id: '3',
      name: '设备维护报告',
      type: '设备报表',
      date: '2024-01-15',
      generatedBy: 'maintenance',
      status: 'generated',
    },
  ]);

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'generated':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Report['status']) => {
    switch (status) {
      case 'generated':
        return '已生成';
      case 'pending':
        return '生成中';
      default:
        return '未知';
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">报表分析</h1>
        <p className="text-gray-600">生产和质量报表管理</p>
      </div>

      {/* 报表概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <BarChart3 size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">生产报表</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <PieChart size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">质量报表</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <LineChart size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">设备报表</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* 报表列表 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">报表列表</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            生成报表
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  报表名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  日期
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  生成人
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.generatedBy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {getStatusText(report.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {report.status === 'generated' && (
                      <>
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          查看
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          下载
                        </button>
                      </>
                    )}
                    {report.status === 'pending' && (
                      <button className="text-yellow-600 hover:text-yellow-900">
                        取消
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 数据可视化 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">生产趋势</h3>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <LineChart size={48} className="text-gray-400" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">质量分布</h3>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <PieChart size={48} className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;