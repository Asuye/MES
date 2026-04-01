import { useState } from 'react';
import { Search, Package, ArrowRight, Clock, Shield } from 'lucide-react';

const Traceability = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [traceData, setTraceData] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟追溯数据
    setTraceData({
      batchNumber: batchNumber,
      product: '阿司匹林片',
      quantity: 1000,
      startTime: '2024-04-01 08:00',
      endTime: '2024-04-01 16:00',
      materials: [
        { materialCode: 'MAT-001', materialName: '阿司匹林', supplier: 'XX化工', batch: 'MAT-BT-2024-001' },
        { materialCode: 'MAT-002', materialName: '淀粉', supplier: 'XX食品', batch: 'MAT-BT-2024-002' },
      ],
      equipment: [
        { equipmentCode: 'EQ-001', equipmentName: '混合机', operationTime: '2024-04-01 08:30-09:30' },
        { equipmentCode: 'EQ-002', equipmentName: '制粒机', operationTime: '2024-04-01 09:45-11:15' },
        { equipmentCode: 'EQ-003', equipmentName: '干燥机', operationTime: '2024-04-01 11:30-13:00' },
      ],
      qualityTests: [
        { testName: '含量测定', result: '合格', testTime: '2024-04-01 14:00' },
        { testName: '崩解时限', result: '合格', testTime: '2024-04-01 14:30' },
        { testName: '重量差异', result: '合格', testTime: '2024-04-01 15:00' },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">追溯查询</h1>
          <p className="mt-2 text-sm text-gray-600">批次全链条追溯</p>
        </div>

        {/* 搜索表单 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="batchNumber" className="block text-sm font-medium text-gray-700 mb-2">
                批次编号
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Package size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="batchNumber"
                  placeholder="请输入批次编号"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                查询
              </button>
            </div>
          </form>
        </div>

        {/* 追溯结果 */}
        {traceData && (
          <div className="space-y-6">
            {/* 基本信息 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">批次基本信息</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">批次编号</p>
                  <p className="font-medium text-gray-900">{traceData.batchNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">产品</p>
                  <p className="font-medium text-gray-900">{traceData.product}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">数量</p>
                  <p className="font-medium text-gray-900">{traceData.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">生产时间</p>
                  <p className="font-medium text-gray-900">{traceData.startTime} - {traceData.endTime}</p>
                </div>
              </div>
            </div>

            {/* 物料追溯 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">物料追溯</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        物料编码
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        物料名称
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        供应商
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        物料批次
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {traceData.materials.map((material: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {material.materialCode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {material.materialName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {material.supplier}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {material.batch}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 设备追溯 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">设备追溯</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        设备编码
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        设备名称
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作时间
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {traceData.equipment.map((eq: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {eq.equipmentCode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {eq.equipmentName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {eq.operationTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 质量检验追溯 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">质量检验追溯</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        检验项目
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        检验结果
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        检验时间
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {traceData.qualityTests.map((test: any, index: number) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {test.testName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {test.result}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {test.testTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Traceability;