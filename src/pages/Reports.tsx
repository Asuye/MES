import { useState } from 'react';
import { Search, FileText, Download, BarChart3, PieChart, Calendar } from 'lucide-react';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('production');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">报表中心</h1>
          <p className="mt-2 text-sm text-gray-600">生产、质量和合规报表</p>
        </div>

        {/* 标签页 */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'production' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('production')}
            >
              生产报表
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'quality' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('quality')}
            >
              质量报表
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'compliance' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('compliance')}
            >
              合规报表
            </button>
          </nav>
        </div>

        {/* 报表内容 */}
        <div className="space-y-6">
          {/* 生产报表 */}
          {activeTab === 'production' && (
            <div className="space-y-6">
              {/* 报表筛选 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">报表筛选</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      开始日期
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      结束日期
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="date"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      产品
                    </label>
                    <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option value="all">全部产品</option>
                      <option value="aspirin">阿司匹林片</option>
                      <option value="ibuprofen">布洛芬胶囊</option>
                      <option value="paracetamol">对乙酰氨基酚片</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    生成报表
                  </button>
                </div>
              </div>

              {/* 生产数据 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">生产数据</h2>
                  <button className="flex items-center text-blue-600 hover:text-blue-900">
                    <Download size={16} className="mr-1" />
                    下载
                  </button>
                </div>
                <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">生产数据图表</p>
                  </div>
                </div>
              </div>

              {/* 批次统计 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">批次统计</h2>
                  <button className="flex items-center text-blue-600 hover:text-blue-900">
                    <Download size={16} className="mr-1" />
                    下载
                  </button>
                </div>
                <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="text-center">
                    <PieChart size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">批次状态分布</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 质量报表 */}
          {activeTab === 'quality' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">质量检验结果</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          批次编号
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          产品
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          检验项目
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          结果
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          检验时间
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BT-2024-001</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">阿司匹林片</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">含量测定</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">合格</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-04-01 14:00</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BT-2024-001</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">阿司匹林片</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">崩解时限</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">合格</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-04-01 14:30</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">BT-2024-002</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">布洛芬胶囊</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">含量测定</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">合格</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-04-02 15:00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 合规报表 */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">合规记录</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          类型
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          描述
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          状态
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          日期
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">偏差</td>
                        <td className="px-6 py-4 text-sm text-gray-500">物料称量超出允许范围</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">已关闭</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-04-01</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">审计</td>
                        <td className="px-6 py-4 text-sm text-gray-500">月度GMP审计</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">通过</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-03-31</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;