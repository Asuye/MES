import React from 'react';

const System: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">系统管理</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">用户管理</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">admin</td>
                  <td className="px-6 py-4 whitespace-nowrap">系统管理员</td>
                  <td className="px-6 py-4 whitespace-nowrap">系统管理员</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">编辑</button>
                    <button className="text-red-600 hover:text-red-900">删除</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">prod_manager</td>
                  <td className="px-6 py-4 whitespace-nowrap">生产管理员</td>
                  <td className="px-6 py-4 whitespace-nowrap">生产管理员</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">编辑</button>
                    <button className="text-red-600 hover:text-red-900">删除</button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">operator</td>
                  <td className="px-6 py-4 whitespace-nowrap">生产操作员</td>
                  <td className="px-6 py-4 whitespace-nowrap">生产操作员</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">编辑</button>
                    <button className="text-red-600 hover:text-red-900">删除</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">添加用户</button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">系统设置</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="system-name" className="block text-sm font-medium text-gray-700 mb-1">系统名称</label>
              <input
                type="text"
                id="system-name"
                value="固体制剂车间 MES 系统"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="api-url" className="block text-sm font-medium text-gray-700 mb-1">API 地址</label>
              <input
                type="text"
                id="api-url"
                value="http://localhost:3001/api"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-700 mb-1">会话超时 (分钟)</label>
              <input
                type="number"
                id="session-timeout"
                value="30"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">保存设置</button>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">系统日志</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP地址</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">2024-04-01 08:00</td>
                  <td className="px-6 py-4 whitespace-nowrap">operator</td>
                  <td className="px-6 py-4 whitespace-nowrap">登录系统</td>
                  <td className="px-6 py-4 whitespace-nowrap">192.168.1.100</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">2024-04-01 08:30</td>
                  <td className="px-6 py-4 whitespace-nowrap">operator</td>
                  <td className="px-6 py-4 whitespace-nowrap">记录称量</td>
                  <td className="px-6 py-4 whitespace-nowrap">192.168.1.100</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">2024-04-01 16:00</td>
                  <td className="px-6 py-4 whitespace-nowrap">prod_manager</td>
                  <td className="px-6 py-4 whitespace-nowrap">批准批记录</td>
                  <td className="px-6 py-4 whitespace-nowrap">192.168.1.101</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">系统信息</h2>
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">系统版本</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">前端框架</span>
              <span className="font-medium">React 18 + TypeScript</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">后端框架</span>
              <span className="font-medium">Express.js</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">数据库</span>
              <span className="font-medium">PostgreSQL</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">最后更新</span>
              <span className="font-medium">2024-04-01</span>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">检查更新</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default System;