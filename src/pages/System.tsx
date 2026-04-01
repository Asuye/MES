import { useState } from 'react';
import { Search, Users, Settings, Shield, LogOut } from 'lucide-react';

const SystemManagement = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([
    { id: 1, username: 'admin', name: '系统管理员', role: '系统管理员', status: '活跃' },
    { id: 2, username: 'prod_manager', name: '生产管理员', role: '生产管理员', status: '活跃' },
    { id: 3, username: 'process_eng', name: '工艺工程师', role: '工艺工程师', status: '活跃' },
    { id: 4, username: 'operator', name: '生产操作员', role: '生产操作员', status: '活跃' },
    { id: 5, username: 'qa_inspector', name: '质量检验员', role: '质量检验员', status: '活跃' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">系统管理</h1>
          <p className="mt-2 text-sm text-gray-600">用户管理和系统配置</p>
        </div>

        {/* 标签页 */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('users')}
            >
              用户管理
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'roles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('roles')}
            >
              角色权限
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              onClick={() => setActiveTab('settings')}
            >
              系统设置
            </button>
          </nav>
        </div>

        {/* 用户管理 */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* 搜索和添加 */}
            <div className="flex items-center justify-between">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="搜索用户..."
                  className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <Users size={18} className="mr-2" />
                添加用户
              </button>
            </div>

            {/* 用户列表 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        用户名
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        姓名
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        角色
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
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Settings size={16} />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <LogOut size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 角色权限 */}
        {activeTab === 'roles' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">角色权限管理</h2>
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-gray-900 mb-2">系统管理员</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    <span className="text-sm text-gray-700">用户管理</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    <span className="text-sm text-gray-700">角色管理</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    <span className="text-sm text-gray-700">系统配置</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    <span className="text-sm text-gray-700">生产管理</span>
                  </div>
                </div>
              </div>
              <div className="border rounded-md p-4">
                <h3 className="font-medium text-gray-900 mb-2">生产管理员</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    <span className="text-sm text-gray-700">生产计划</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    <span className="text-sm text-gray-700">批次管理</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    <span className="text-sm text-gray-700">报表查看</span>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm text-gray-700">用户管理</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 系统设置 */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">系统设置</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  系统名称
                </label>
                <input
                  type="text"
                  defaultValue="固体制剂车间 MES 系统"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  数据库连接
                </label>
                <input
                  type="text"
                  defaultValue="postgresql://username:password@localhost:5432/mes_db"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  设备集成配置
                </label>
                <input
                  type="text"
                  defaultValue="opcua://localhost:4840"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  保存设置
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemManagement;