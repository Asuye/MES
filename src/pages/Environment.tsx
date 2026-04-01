import { useState } from 'react';
import { Search, Thermometer, Droplets, Wind, AlertTriangle, Shield } from 'lucide-react';

const EnvironmentMonitoring = () => {
  const [environmentData, setEnvironmentData] = useState([
    { id: 1, area: '洁净区 A', temperature: 22.5, humidity: 45, pressureDifference: 10, particleCount: 1000, status: '正常' },
    { id: 2, area: '洁净区 B', temperature: 23.0, humidity: 50, pressureDifference: 8, particleCount: 1200, status: '正常' },
    { id: 3, area: '洁净区 C', temperature: 25.0, humidity: 60, pressureDifference: 5, particleCount: 2000, status: '异常' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = environmentData.filter(data => 
    data.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">环境监测</h1>
          <p className="mt-2 text-sm text-gray-600">洁净区环境参数监控</p>
        </div>

        {/* 搜索 */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索区域..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 环境数据列表 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    区域
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    温度 (°C)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    湿度 (%)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    压差 (Pa)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    粒子数
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((data) => (
                  <tr key={data.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.area}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Thermometer size={14} className="mr-1 text-gray-400" />
                        {data.temperature}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Droplets size={14} className="mr-1 text-gray-400" />
                        {data.humidity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Wind size={14} className="mr-1 text-gray-400" />
                        {data.pressureDifference}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.particleCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${data.status === '正常' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {data.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Shield size={16} />
                        </button>
                        {data.status === '异常' && (
                          <button className="text-yellow-600 hover:text-yellow-900">
                            <AlertTriangle size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 环境趋势图表 */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">环境参数趋势</h2>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <div className="text-center">
              <Thermometer size={48} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">环境参数趋势图表</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentMonitoring;