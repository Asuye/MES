import React, { useState } from 'react';
import { 
  Settings, User, Lock, Database, 
  Bell, LogOut, Plus, Edit, Trash2
} from 'lucide-react';

interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'operator' | 'quality' | 'maintenance';
  status: 'active' | 'inactive';
}

interface SystemLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  ip: string;
}

const System: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      username: 'admin',
      name: '管理员',
      role: 'admin',
      status: 'active',
    },
    {
      id: '2',
      username: 'operator',
      name: '操作员',
      role: 'operator',
      status: 'active',
    },
    {
      id: '3',
      username: 'quality',
      name: '质量员',
      role: 'quality',
      status: 'active',
    },
    {
      id: '4',
      username: 'maintenance',
      name: '维护员',
      role: 'maintenance',
      status: 'inactive',
    },
  ]);

  const [logs, setLogs] = useState<SystemLog[]>([
    {
      id: '1',
      timestamp: '2024-01-16 10:00:00',
      user: 'admin',
      action: '登录系统',
      ip: '192.168.1.100',
    },
    {
      id: '2',
      timestamp: '2024-01-16 09:30:00',
      user: 'operator',
      action: '开始生产批次 BATCH-2024-002',
      ip: '192.168.1.101',
    },
    {
      id: '3',
      timestamp: '2024-01-16 09:00:00',
      user: 'quality',
      action: '审核质量检验记录 QC-2024-001',
      ip: '192.168.1.102',
    },
  ]);

  const [activeTab, setActiveTab] = useState('users');

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'operator':
        return 'bg-blue-100 text-blue-800';
      case 'quality':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">系统管理</h1>
        <p className="text-gray-600">系统配置和用户管理</p>
      </div>

      {/* 标签页 */}
      <div className="bg-white p-1 rounded-md shadow-sm">
        <div className="flex space-x-1">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            用户管理
          </button>
          <button 
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'logs' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            系统日志
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            系统设置
          </button>
        </div>
      </div>

      {/* 用户管理 */}
      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-lg shadow card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">用户管理</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
              <Plus size={18} className="mr-2" />
              添加用户
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    姓名
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    角色
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
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role === 'admin' && '管理员'}
                        {user.role === 'operator' && '操作员'}
                        {user.role === 'quality' && '质量员'}
                        {user.role === 'maintenance' && '维护员'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status === 'active' && '活跃'}
                        {user.status === 'inactive' && '非活跃'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit size={18} />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 系统日志 */}
      {activeTab === 'logs' && (
        <div className="bg-white p-6 rounded-lg shadow card-shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">系统日志</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    用户
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP 地址
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 系统设置 */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 rounded-lg shadow card-shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">系统设置</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">基本设置</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    系统名称
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="GMP 合规 MES 系统"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    系统版本
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="1.0.0"
                    readOnly
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">数据库设置</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    数据库地址
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="localhost:5432"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    数据库名称
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="mes_db"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">通知设置</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotification"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    defaultChecked
                  />
                  <label htmlFor="emailNotification" className="ml-2 block text-sm text-gray-700">
                    启用邮件通知
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="smsNotification"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="smsNotification" className="ml-2 block text-sm text-gray-700">
                    启用短信通知
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                保存设置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default System;
