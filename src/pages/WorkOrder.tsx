import React, { useState, useEffect } from 'react';
import { workOrderService } from '../services/api';
import { WorkOrder } from '../types';
import Table from '../components/Table';
import Button from '../components/Button';
import Input from '../components/Input';

const WorkOrderPage: React.FC = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    productId: '',
    quantity: 0,
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
  });

  const fetchWorkOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await workOrderService.getWorkOrders();
      setWorkOrders(data);
    } catch (err) {
      setError('获取工作订单列表失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      await workOrderService.createWorkOrder(newOrder);
      setIsModalOpen(false);
      setNewOrder({
        productId: '',
        quantity: 0,
        priority: 'medium',
        dueDate: '',
      });
      fetchWorkOrders();
    } catch (err) {
      setError('创建工作订单失败');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: WorkOrder['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'orderNumber', label: '订单编号' },
    { key: 'productId', label: '产品ID' },
    { key: 'quantity', label: '数量' },
    {
      key: 'priority',
      label: '优先级',
      render: (order: WorkOrder) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          order.priority === 'high' ? 'bg-red-100 text-red-800' :
          order.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {order.priority === 'high' ? '高' : order.priority === 'medium' ? '中' : '低'}
        </span>
      ),
    },
    {
      key: 'status',
      label: '状态',
      render: (order: WorkOrder) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {order.status === 'pending' ? '待处理' :
           order.status === 'in_progress' ? '进行中' :
           order.status === 'completed' ? '已完成' : '已取消'}
        </span>
      ),
    },
    { key: 'dueDate', label: '截止日期' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">工作订单管理</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          创建订单
        </Button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <Table
        columns={columns}
        data={workOrders}
        loading={loading}
        onRefresh={fetchWorkOrders}
      />

      {/* 创建工作订单模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">创建工作订单</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="产品ID"
                value={newOrder.productId}
                onChange={(e) => setNewOrder({ ...newOrder, productId: e.target.value })}
                required
              />
              <Input
                label="数量"
                type="number"
                value={newOrder.quantity.toString()}
                onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) || 0 })}
                required
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">优先级</label>
                <select
                  value={newOrder.priority}
                  onChange={(e) => setNewOrder({ ...newOrder, priority: e.target.value as 'high' | 'medium' | 'low' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
              </div>
              <Input
                label="截止日期"
                type="date"
                value={newOrder.dueDate}
                onChange={(e) => setNewOrder({ ...newOrder, dueDate: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
                disabled={loading}
              >
                取消
              </Button>
              <Button
                onClick={handleCreateOrder}
                loading={loading}
              >
                创建
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrderPage;