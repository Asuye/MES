import React, { useState, useEffect } from 'react';
import { 
  Settings, User as UserIcon, Lock, Database, 
  Bell, LogOut, Plus, Edit, Trash2
} from 'lucide-react';
import { systemService } from '../services/api';
import { User, SystemLog } from '../types';
import Button from '../components/Button';
import Table from '../components/Table';

const System: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('users');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await systemService.getUsers();
      setUsers(data);
    } catch (err) {
      setError('获取用户列表失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await systemService.getLogs();
      setLogs(data);
    } catch (err) {
      setError('获取系统日志失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'logs') {
      fetchLogs();
    }
  }, [activeTab]);

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
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">用户管理</h2>
            <Button variant="primary" className="flex items-center">
              <Plus size={18} className="mr-2" />
              添加用户
            </Button>
          </div>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <Table
            columns={[
              { key: 'username', label: '用户名' },
              { key: 'name', label: '姓名' },
              {
                key: 'role',
                label: '角色',
                render: (user: User) => (
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleColor(user.role)}`}>
                    {user.role === 'admin' && '管理员'}
                    {user.role === 'operator' && '操作员'}
                    {user.role === 'quality' && '质量员'}
                    {user.role === 'maintenance' && '维护员'}
                  </span>
                ),
              },
              {
                key: 'status',
                label: '状态',
                render: (user: User) => (
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                    {user.status === 'active' && '活跃'}
                    {user.status === 'inactive' && '非活跃'}
                  </span>
                ),
              },
              {
                key: 'actions',
                label: '操作',
                render: (user: User) => (
                  <div className="flex items-center justify-end space-x-2">
                    <Button size="sm" variant="secondary">
                      <Edit size={16} />
                    </Button>
                    <Button size="sm" variant="danger">
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ),
              },
            ]}
            data={users}
            loading={loading}
            onRefresh={fetchUsers}
          />
        </div>
      )}

      {/* 系统日志 */}
      {activeTab === 'logs' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">系统日志</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          <Table
            columns={[
              { key: 'timestamp', label: '时间' },
              { key: 'user', label: '用户' },
              { key: 'action', label: '操作' },
              { key: 'ip', label: 'IP 地址' },
            ]}
            data={logs}
            loading={loading}
            onRefresh={fetchLogs}
          />
        </div>
      )}

      {/* 系统设置 */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 rounded-lg shadow">
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
              <Button variant="primary" onClick={async () => {
                try {
                  setLoading(true);
                  setError(null);
                  await systemService.updateSettings({
                    systemName: "GMP 合规 MES 系统",
                    database: { host: "localhost:5432", name: "mes_db" },
                    notifications: { email: true, sms: false }
                  });
                  alert('设置保存成功');
                } catch (err) {
                  setError('保存设置失败');
                  console.error(err);
                } finally {
                  setLoading(false);
                }
              }} loading={loading}>
                保存设置
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default System;
