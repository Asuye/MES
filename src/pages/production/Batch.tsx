import { useState } from 'react'
import { Package, Plus, Eye, FileText, CheckCircle, Edit, Trash2, Clock, AlertTriangle } from 'lucide-react'

interface Batch {
  id: string
  batchNo: string
  product: string
  size: string
  status: '待配料' | '生产中' | '待审核' | '已放行' | '已拒绝'
  progress: number
  operator: string
  startTime: string
  endTime: string | null
  planId: string
  qualityStatus: '待检验' | '检验中' | '合格' | '不合格'
  releaseStatus: '待放行' | '已放行' | '已拒绝'
  note: string
}

const initialBatches: Batch[] = [
  { 
    id: 'BATCH-2024-001', 
    batchNo: 'IBU-2401001', 
    product: '布洛芬片', 
    size: '100万片', 
    status: '生产中', 
    progress: 65, 
    operator: '张三', 
    startTime: '2024-01-15 08:00', 
    endTime: null, 
    planId: 'PLAN-001',
    qualityStatus: '检验中',
    releaseStatus: '待放行',
    note: '加急订单'
  },
  { 
    id: 'BATCH-2024-002', 
    batchNo: 'AMX-2401001', 
    product: '阿莫西林胶囊', 
    size: '50万粒', 
    status: '待审核', 
    progress: 100, 
    operator: '李四', 
    startTime: '2024-01-14 10:30', 
    endTime: '2024-01-15 16:30', 
    planId: 'PLAN-002',
    qualityStatus: '待检验',
    releaseStatus: '待放行',
    note: '常规生产'
  },
  { 
    id: 'BATCH-2024-003', 
    batchNo: 'VCY-2401001', 
    product: '维C银翘片', 
    size: '80万片', 
    status: '已放行', 
    progress: 100, 
    operator: '王五', 
    startTime: '2024-01-13 09:00', 
    endTime: '2024-01-14 12:00', 
    planId: 'PLAN-003',
    qualityStatus: '合格',
    releaseStatus: '已放行',
    note: '库存补充'
  },
  { 
    id: 'BATCH-2024-004', 
    batchNo: 'CMP-2401001', 
    product: '复方氨酚烷胺', 
    size: '60万片', 
    status: '待配料', 
    progress: 10, 
    operator: '赵六', 
    startTime: '2024-01-15 14:00', 
    endTime: null, 
    planId: 'PLAN-004',
    qualityStatus: '待检验',
    releaseStatus: '待放行',
    note: '季节性备货'
  },
]

export default function Batch() {
  const [batches, setBatches] = useState<Batch[]>(initialBatches)
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [formData, setFormData] = useState<Omit<Batch, 'id' | 'batchNo' | 'progress' | 'startTime' | 'endTime'>>({ 
    product: '',
    size: '',
    status: '待配料',
    operator: '',
    planId: '',
    qualityStatus: '待检验',
    releaseStatus: '待放行',
    note: '',
  })

  const handleCreateBatch = () => {
    setSelectedBatch(null)
    setFormData({
      product: '',
      size: '',
      status: '待配料',
      operator: '',
      planId: '',
      qualityStatus: '待检验',
      releaseStatus: '待放行',
      note: '',
    })
    setIsModalOpen(true)
  }

  const handleEditBatch = (batch: Batch) => {
    setSelectedBatch(batch)
    setFormData({
      product: batch.product,
      size: batch.size,
      status: batch.status,
      operator: batch.operator,
      planId: batch.planId,
      qualityStatus: batch.qualityStatus,
      releaseStatus: batch.releaseStatus,
      note: batch.note,
    })
    setIsModalOpen(true)
  }

  const handleViewBatch = (batch: Batch) => {
    setSelectedBatch(batch)
    setIsDetailModalOpen(true)
  }

  const handleDeleteBatch = (batch: Batch) => {
    setSelectedBatch(batch)
    setIsDeleteModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedBatch) {
      // 编辑现有批次
      setBatches(batches.map(batch => 
        batch.id === selectedBatch.id ? { ...batch, ...formData } : batch
      ))
    } else {
      // 创建新批次
      const newBatch: Batch = {
        ...formData,
        id: `BATCH-2024-${String(batches.length + 1).padStart(3, '0')}`,
        batchNo: `${formData.product.substring(0, 3).toUpperCase()}-2401${String(batches.length + 1).padStart(3, '0')}`,
        progress: 0,
        startTime: new Date().toLocaleString('zh-CN'),
        endTime: null,
      }
      setBatches([...batches, newBatch])
    }
    
    setIsModalOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (selectedBatch) {
      setBatches(batches.filter(batch => batch.id !== selectedBatch.id))
      setIsDeleteModalOpen(false)
    }
  }

  const handleStatusChange = (batch: Batch, newStatus: Batch['status']) => {
    const updatedBatch = {
      ...batch,
      status: newStatus,
      progress: newStatus === '已放行' || newStatus === '已拒绝' ? 100 : batch.progress,
      endTime: (newStatus === '已放行' || newStatus === '已拒绝') && !batch.endTime ? new Date().toLocaleString('zh-CN') : batch.endTime,
    }
    setBatches(batches.map(b => b.id === batch.id ? updatedBatch : b))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">批次管理</h2>
        <button 
          onClick={handleCreateBatch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          新建批次
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {batches.map((batch) => (
          <div key={batch.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{batch.product}</h3>
                <p className="text-sm text-gray-600">{batch.batchNo}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                batch.status === '生产中' ? 'bg-blue-100 text-blue-800' :
                batch.status === '待审核' ? 'bg-yellow-100 text-yellow-800' :
                batch.status === '已放行' ? 'bg-green-100 text-green-800' :
                batch.status === '已拒绝' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {batch.status}
              </span>
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">批量</span>
                <span className="font-medium">{batch.size}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">操作员</span>
                <span className="font-medium">{batch.operator}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">生产计划</span>
                <span className="font-medium">{batch.planId}</span>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">进度</span>
                  <span className="font-medium">{batch.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 transition-all"
                    style={{ width: `${batch.progress}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleViewBatch(batch)}
                className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors"
              >
                <Eye className="w-4 h-4" />
                查看
              </button>
              <button 
                onClick={() => handleEditBatch(batch)}
                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1 hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
                编辑
              </button>
              <button 
                onClick={() => handleDeleteBatch(batch)}
                className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1 hover:bg-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                删除
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* 创建/编辑批次模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedBatch ? '编辑批次' : '新建批次'}
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
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    状态 *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Batch['status'] })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="待配料">待配料</option>
                    <option value="生产中">生产中</option>
                    <option value="待审核">待审核</option>
                    <option value="已放行">已放行</option>
                    <option value="已拒绝">已拒绝</option>
                  </select>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    生产计划 *
                  </label>
                  <input
                    type="text"
                    value={formData.planId}
                    onChange={(e) => setFormData({ ...formData, planId: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    质量状态 *
                  </label>
                  <select
                    value={formData.qualityStatus}
                    onChange={(e) => setFormData({ ...formData, qualityStatus: e.target.value as Batch['qualityStatus'] })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="待检验">待检验</option>
                    <option value="检验中">检验中</option>
                    <option value="合格">合格</option>
                    <option value="不合格">不合格</option>
                  </select>
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
                  {selectedBatch ? '保存修改' : '创建批次'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* 批次详情模态框 */}
      {isDetailModalOpen && selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">批次详情</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">基本信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">批次编号</span>
                      <span className="font-medium">{selectedBatch.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">批次号</span>
                      <span className="font-medium">{selectedBatch.batchNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">产品名称</span>
                      <span className="font-medium">{selectedBatch.product}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">批量</span>
                      <span className="font-medium">{selectedBatch.size}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">生产计划</span>
                      <span className="font-medium">{selectedBatch.planId}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">状态信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">生产状态</span>
                      <select
                        value={selectedBatch.status}
                        onChange={(e) => handleStatusChange(selectedBatch, e.target.value as Batch['status'])}
                        className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="待配料">待配料</option>
                        <option value="生产中">生产中</option>
                        <option value="待审核">待审核</option>
                        <option value="已放行">已放行</option>
                        <option value="已拒绝">已拒绝</option>
                      </select>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">质量状态</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedBatch.qualityStatus === '合格' ? 'bg-green-100 text-green-800' :
                        selectedBatch.qualityStatus === '不合格' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedBatch.qualityStatus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">放行状态</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedBatch.releaseStatus === '已放行' ? 'bg-green-100 text-green-800' :
                        selectedBatch.releaseStatus === '已拒绝' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedBatch.releaseStatus}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">进度</span>
                      <span className="font-medium">{selectedBatch.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">时间信息</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">开始时间</span>
                    <span className="font-medium">{selectedBatch.startTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">结束时间</span>
                    <span className="font-medium">{selectedBatch.endTime || '未完成'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">操作员</span>
                    <span className="font-medium">{selectedBatch.operator}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">备注</h4>
                <p className="text-gray-700">{selectedBatch.note}</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 删除确认模态框 */}
      {isDeleteModalOpen && selectedBatch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">删除批次</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                确定要删除批次 <span className="font-medium">{selectedBatch.id} - {selectedBatch.product}</span> 吗？
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
