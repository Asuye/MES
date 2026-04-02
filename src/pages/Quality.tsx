import React, { useState } from 'react';
import { CheckCircle, AlertCircle, FileText, BarChart3, Shield, Edit } from 'lucide-react';

interface QualityInspection {
  id: string;
  batchId: string;
  product: string;
  inspector: string;
  date: string;
  status: 'pass' | 'fail' | 'pending';
  testResults: {
    name: string;
    value: string;
    standard: string;
    pass: boolean;
  }[];
}

const Quality: React.FC = () => {
  const [inspections, setInspections] = useState<QualityInspection[]>([
    {
      id: '1',
      batchId: 'BATCH-2024-001',
      product: '阿司匹林片',
      inspector: '质量员',
      date: '2024-01-15 16:30:00',
      status: 'pass',
      testResults: [
        { name: '含量', value: '99.8%', standard: '95.0%-105.0%', pass: true },
        { name: '崩解时限', value: '15分钟', standard: '≤30分钟', pass: true },
        { name: '溶出度', value: '98.5%', standard: '≥80.0%', pass: true },
      ],
    },
    {
      id: '2',
      batchId: 'BATCH-2024-002',
      product: '布洛芬片',
      inspector: '质量员',
      date: '2024-01-16 14:00:00',
      status: 'pending',
      testResults: [
        { name: '含量', value: '98.2%', standard: '95.0%-105.0%', pass: true },
        { name: '崩解时限', value: '22分钟', standard: '≤30分钟', pass: true },
        { name: '溶出度', value: '', standard: '≥80.0%', pass: false },
      ],
    },
    {
      id: '3',
      batchId: 'BATCH-2023-12-001',
      product: '对乙酰氨基酚片',
      inspector: '质量员',
      date: '2023-12-30 10:00:00',
      status: 'fail',
      testResults: [
        { name: '含量', value: '94.5%', standard: '95.0%-105.0%', pass: false },
        { name: '崩解时限', value: '25分钟', standard: '≤30分钟', pass: true },
        { name: '溶出度', value: '85.2%', standard: '≥80.0%', pass: true },
      ],
    },
  ]);

  const getStatusColor = (status: QualityInspection['status']) => {
    switch (status) {
      case 'pass':
        return 'bg-green-100 text-green-800';
      case 'fail':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: QualityInspection['status']) => {
    switch (status) {
      case 'pass':
        return '合格';
      case 'fail':
        return '不合格';
      case 'pending':
        return '待检验';
      default:
        return '未知';
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">质量管理</h1>
        <p className="text-gray-600">质量检验和合规管理</p>
      </div>

      {/* 质量概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <FileText size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">检验批次</p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">合格</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <AlertCircle size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">不合格</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <Edit size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">待检验</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* 检验列表 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">质量检验记录</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            新增检验
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  检验编号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  批次号
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  产品
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  检验员
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  检验日期
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
              {inspections.map((inspection) => (
                <tr key={inspection.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    QC-{inspection.date.substring(0, 10).replace(/-/g, '')}-{inspection.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {inspection.batchId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {inspection.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {inspection.inspector}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {inspection.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(inspection.status)}`}>
                      {getStatusText(inspection.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      详情
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      报告
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Quality;