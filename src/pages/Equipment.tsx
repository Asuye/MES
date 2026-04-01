import { useState } from 'react';
import { Search, Settings, Activity, AlertTriangle, Clock } from 'lucide-react';

const EquipmentManagement = () => {
  const [equipment, setEquipment] = useState([
    { id: 1, equipmentCode: 'EQ-001', equipmentName: '混合机', equipmentType: '生产设备', status: '运行中', lastMaintenance: '2024-03-15', nextMaintenance: '2024-06-15' },
    { id: 2, equipmentCode: 'EQ-002', equipmentName: '制粒机', equipmentType: '生产设备', status: '待机', lastMaintenance: '2024-02-20', nextMaintenance: '2024-05-20' },
    { id: 3, equipmentCode: 'EQ-003', equipmentName: '干燥机', equipmentType: '生产设备', status: '故障', lastMaintenance: '2024-01-10', nextMaintenance: '2024-04-10' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredEquipment = equipment.filter(eq => 
    eq.equipmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.equipmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">设备管理</h1>
          <p className="mt-2 text-sm text-gray-600">设备状态监控和维护管理</p>
        </div>

        {/* 搜索 */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="搜索设备..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* 设备列表 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                    设备类型
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    上次维护
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    下次维护
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEquipment.map((eq) => (
                  <tr key={eq.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {eq.equipmentCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {eq.equipmentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {eq.equipmentType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${eq.status === '运行中' ? 'bg-green-100 text-green-800' : eq.status === '待机' ? 'bg-gray-100 text-gray-800' : 'bg-red-100 text-red-800'}`}>
                        {eq.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-gray-400" />
                        {eq.lastMaintenance}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1 text-gray-400" />
                        {eq.nextMaintenance}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Settings size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Activity size={16} />
                        </button>
                        {eq.status === '故障' && (
                          <button className="text-red-600 hover:text-red-900">
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
      </div>
    </div>
  );
};

export default EquipmentManagement;