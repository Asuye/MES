import React, { useState } from 'react';
import { Package, BarChart3, AlertCircle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  code: string;
  type: string;
  stock: number;
  unit: string;
  minStock: number;
  status: 'normal' | 'low' | 'out';
}

const Material: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: '1',
      name: '阿司匹林原料',
      code: 'MAT-001',
      type: '原料',
      stock: 1000,
      unit: 'kg',
      minStock: 500,
      status: 'normal',
    },
    {
      id: '2',
      name: '布洛芬原料',
      code: 'MAT-002',
      type: '原料',
      stock: 300,
      unit: 'kg',
      minStock: 400,
      status: 'low',
    },
    {
      id: '3',
      name: '对乙酰氨基酚原料',
      code: 'MAT-003',
      type: '原料',
      stock: 0,
      unit: 'kg',
      minStock: 300,
      status: 'out',
    },
    {
      id: '4',
      name: '包装材料',
      code: 'MAT-004',
      type: '辅料',
      stock: 5000,
      unit: '个',
      minStock: 1000,
      status: 'normal',
    },
  ]);

  const getStatusColor = (status: Material['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'out':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Material['status']) => {
    switch (status) {
      case 'normal':
        return '正常';
      case 'low':
        return '库存不足';
      case 'out':
        return '缺货';
      default:
        return '未知';
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">物料管理</h1>
        <p className="text-gray-600">物料库存和采购管理</p>
      </div>

      {/* 物料概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Package size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">物料种类</p>
              <p className="text-2xl font-bold text-gray-800">4</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">库存正常</p>
              <p className="text-2xl font-bold text-gray-800">2</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full mr-4">
              <AlertCircle size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">库存不足</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <TrendingDown size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">缺货</p>
              <p className="text-2xl font-bold text-gray-800">1</p>
            </div>
          </div>
        </div>
      </div>

      {/* 物料列表 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">物料列表</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            新增物料
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  物料名称
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  物料编码
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  类型
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  库存
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  单位
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  最低库存
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
              {materials.map((material) => (
                <tr key={material.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {material.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {material.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {material.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {material.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {material.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {material.minStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(material.status)}`}>
                      {getStatusText(material.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      详情
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      采购
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

export default Material;