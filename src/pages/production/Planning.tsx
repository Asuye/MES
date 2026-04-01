import { useState, useEffect } from 'react'
import { Calendar, Plus, Edit, Trash2, Clock, CheckCircle, AlertTriangle } from 'lucide-react'

interface ProductionPlan {
  id: string
  product: string
  batchSize: string
  priority: '高' | '中' | '低'
  status: '计划中' | '进行中' | '已完成' | '已取消'
  startDate: string
  endDate: string
  operator: string
  note: string
}

const initialPlans: ProductionPlan[] = [
  { id: 'PLAN-001', product: '布洛芬片', batchSize: '100万片', priority: '高', status: '进行中', startDate: '2024-01-15', endDate: '2024-01-18', operator: '张三', note: '加急订单' },
  { id: 'PLAN-002', product: '阿莫西林胶囊', batchSize: '50万粒', priority: '中', status: '待生产', startDate: '2024-01-18', endDate: '2024-01-20', operator: '李四', note: '常规生产' },
  { id: 'PLAN-003', product: '维C银翘片', batchSize: '80万片', priority: '低', status: '计划中', startDate: '2024-01-22', endDate: '2024-01-25', operator: '王五', note: '库存补充' },
  { id: 'PLAN-004', product: '复方氨酚烷胺', batchSize: '60万片', priority: '中', status: '计划中', startDate: '2024-01-25', endDate: '2024-01-28', operator: '赵六', note: '季节性备货' },
  { id: 'PLAN-005', product: '阿司匹林肠溶片', batchSize: '70万片', priority: '高', status: '计划中', startDate: '2024-01-28', endDate: '2024-01-31', operator: '张三', note: '医院订单' },
]

export default function Planning() {
  const [plans, setPlans] = useState<ProductionPlan[]>(initialPlans)
  const [selectedPlan, setSelectedPlan] = useState<ProductionPlan | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [formData, setFormData] = useState<Omit<ProductionPlan, 'id'>>({
    product: '',
    batchSize: '',
    priority: '中',
    status: '计划中',
    startDate: '',
    endDate: '',
    operator: '',
    note: '',
  })

  const handleCreatePlan = () => {
    setSelectedPlan(null)
    setFormData({
      product: '',
      batchSize: '',
      priority: '中',
      status: '计划中',
      startDate: '',
      endDate: '',
      operator: '',
      note: '',
    })
    setIsModalOpen(true)
  }

  const handleEditPlan = (plan: ProductionPlan) => {
    setSelectedPlan(plan)
    setFormData({
      product: plan.product,
      batchSize: plan.batchSize,
      priority: plan.priority,
      status: plan.status,
      startDate: plan.startDate,
      endDate: plan.endDate,
      operator: plan.operator,
      note: plan.note,
    })
    setIsModalOpen(true)
  }

  const handleDeletePlan = (plan: ProductionPlan) => {
    setSelectedPlan(plan)
    setIsDeleteModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedPlan) {
      // 编辑现有计划
      setPlans(plans.map(plan => 
        plan.id === selectedPlan.id ? { ...plan, ...formData } : plan
      ))
    } else {
      // 创建新计划
      const newPlan: ProductionPlan = {
        ...formData,
        id: `PLAN-${String(plans.length + 1).padStart(3, '0')}`,
      }
      setPlans([...plans, newPlan])
    }
    
    setIsModalOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (selectedPlan) {
      setPlans(plans.filter(plan => plan.id !== selectedPlan.id))
      setIsDeleteModalOpen(false)
    }
  }

  const handleStatusChange = (plan: ProductionPlan, newStatus: ProductionPlan['status']) => {
    setPlans(plans.map(p => 
      p.id === plan.id ? { ...p, status: newStatus } : p
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">生产计划管理</h2>
        <button 
          onClick={handleCreatePlan}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          新建计划
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">计划编号</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">产品名称</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">批量</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">优先级</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">开始日期</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">结束日期</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作员</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">备注</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plan.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.batchSize}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      plan.priority === '高' ? 'bg-red-100 text-red-800' :
                      plan.priority === '中' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {plan.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={plan.status}
                      onChange={(e) => handleStatusChange(plan, e.target.value as ProductionPlan['status'])}
                      className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="计划中">计划中</option>
                      <option value="进行中">进行中</option>
                      <option value="已完成">已完成</option>
                      <option value="已取消">已取消</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.operator}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{plan.note}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    <button 
                      onClick={() => handleEditPlan(plan)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeletePlan(plan)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 创建/编辑计划模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedPlan ? '编辑生产计划' : '新建生产计划'}
              </h3>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    产品名称 *
                  </label>
                  <input
                    type="text"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    批量 *
                  </label>
                  <input
                    type="text"
                    value={formData.batchSize}
                    onChange={(e) => setFormData({ ...formData, batchSize: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    优先级 *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as '高' | '中' | '低' })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="高">高</option>
                    <option value="中">中</option>
                    <option value="低">低</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    状态 *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as '计划中' | '进行中' | '已完成' | '已取消' })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="计划中">计划中</option>
                    <option value="进行中">进行中</option>
                    <option value="已完成">已完成</option>
                    <option value="已取消">已取消</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    开始日期 *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    结束日期 *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    操作员 *
                  </label>
                  <input
                    type="text"
                    value={formData.operator}
                    onChange={(e) => setFormData({ ...formData, operator: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    备注
                  </label>
                  <textarea
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {selectedPlan ? '保存修改' : '创建计划'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* 删除确认模态框 */}
      {isDeleteModalOpen && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">删除生产计划</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                确定要删除计划 <span className="font-medium">{selectedPlan.id} - {selectedPlan.product}</span> 吗？
              </p>
              <p className="text-sm text-gray-500 mb-6">
                此操作无法撤销，删除后将无法恢复。
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  确认删除
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
