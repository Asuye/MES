import { useState } from 'react'
import { Scale, Plus, CheckCircle, AlertCircle, Edit, Trash2, Eye, Clock, FileText, Shield } from 'lucide-react'

interface WeighingRecord {
  id: string
  batchNo: string
  product: string
  material: string
  expectedWeight: number
  actualWeight: number
  tolerance: number
  status: '待称量' | '称量中' | '已完成' | '偏差'
  operator: string
  timestamp: string
  notes: string
  signature: {
    userId: string
    username: string
    timestamp: string
    reason: string
  } | null
  auditTrail: AuditEntry[]
}

interface AuditEntry {
  id: string
  action: string
  user: string
  timestamp: string
  details: string
}

const initialWeighingRecords: WeighingRecord[] = [
  {
    id: 'WEIGH-2024-001',
    batchNo: 'BATCH-2024-001',
    product: '布洛芬片',
    material: '布洛芬原料药',
    expectedWeight: 10.0,
    actualWeight: 10.05,
    tolerance: 0.5,
    status: '已完成',
    operator: '张三',
    timestamp: '2024-01-15 08:30',
    notes: '正常称量',
    signature: {
      userId: 'user1',
      username: '张三',
      timestamp: '2024-01-15 08:35',
      reason: '称量完成',
    },
    auditTrail: [
      {
        id: 'AUD-1',
        action: '创建记录',
        user: '张三',
        timestamp: '2024-01-15 08:30',
        details: '创建称量记录 WEIGH-2024-001',
      },
      {
        id: 'AUD-2',
        action: '开始称量',
        user: '张三',
        timestamp: '2024-01-15 08:30',
        details: '开始称量布洛芬原料药',
      },
      {
        id: 'AUD-3',
        action: '完成称量',
        user: '张三',
        timestamp: '2024-01-15 08:35',
        details: '完成称量，实际重量 10.05kg',
      },
      {
        id: 'AUD-4',
        action: '电子签名',
        user: '张三',
        timestamp: '2024-01-15 08:35',
        details: '签名确认称量结果',
      },
    ],
  },
  {
    id: 'WEIGH-2024-002',
    batchNo: 'BATCH-2024-001',
    product: '布洛芬片',
    material: '微晶纤维素',
    expectedWeight: 5.0,
    actualWeight: 4.98,
    tolerance: 0.5,
    status: '已完成',
    operator: '李四',
    timestamp: '2024-01-15 08:45',
    notes: '正常称量',
    signature: {
      userId: 'user2',
      username: '李四',
      timestamp: '2024-01-15 08:50',
      reason: '称量完成',
    },
    auditTrail: [],
  },
  {
    id: 'WEIGH-2024-003',
    batchNo: 'BATCH-2024-002',
    product: '阿莫西林胶囊',
    material: '阿莫西林原料药',
    expectedWeight: 8.0,
    actualWeight: 0,
    tolerance: 0.5,
    status: '待称量',
    operator: '王五',
    timestamp: '2024-01-14 10:30',
    notes: '',
    signature: null,
    auditTrail: [],
  },
]

export default function Weighing() {
  const [weighingRecords, setWeighingRecords] = useState<WeighingRecord[]>(initialWeighingRecords)
  const [selectedRecord, setSelectedRecord] = useState<WeighingRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [formData, setFormData] = useState<Omit<WeighingRecord, 'id' | 'status' | 'signature' | 'auditTrail'>>({ 
    batchNo: '',
    product: '',
    material: '',
    expectedWeight: 0,
    actualWeight: 0,
    tolerance: 0.5,
    operator: '',
    timestamp: '',
    notes: '',
  })

  const handleCreateWeighing = () => {
    setSelectedRecord(null)
    setFormData({
      batchNo: '',
      product: '',
      material: '',
      expectedWeight: 0,
      actualWeight: 0,
      tolerance: 0.5,
      operator: '',
      timestamp: new Date().toLocaleString('zh-CN'),
      notes: '',
    })
    setIsModalOpen(true)
  }

  const handleEditWeighing = (record: WeighingRecord) => {
    setSelectedRecord(record)
    setFormData({
      batchNo: record.batchNo,
      product: record.product,
      material: record.material,
      expectedWeight: record.expectedWeight,
      actualWeight: record.actualWeight,
      tolerance: record.tolerance,
      operator: record.operator,
      timestamp: record.timestamp,
      notes: record.notes,
    })
    setIsModalOpen(true)
  }

  const handleViewWeighing = (record: WeighingRecord) => {
    setSelectedRecord(record)
    setIsDetailModalOpen(true)
  }

  const handleDeleteWeighing = (record: WeighingRecord) => {
    setSelectedRecord(record)
    setIsDeleteModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const calculateStatus = (expected: number, actual: number, tolerance: number): '待称量' | '称量中' | '已完成' | '偏差' => {
      if (actual === 0) return '待称量'
      const diff = Math.abs(actual - expected)
      const tolerancePercent = (tolerance / 100) * expected
      return diff <= tolerancePercent ? '已完成' : '偏差'
    }
    
    if (selectedRecord) {
      // 编辑现有记录
      const updatedRecord = {
        ...selectedRecord,
        ...formData,
        status: calculateStatus(formData.expectedWeight, formData.actualWeight, formData.tolerance),
      }
      setWeighingRecords(weighingRecords.map(record => 
        record.id === selectedRecord.id ? updatedRecord : record
      ))
    } else {
      // 创建新记录
      const newRecord: WeighingRecord = {
        ...formData,
        id: `WEIGH-2024-${String(weighingRecords.length + 1).padStart(3, '0')}`,
        status: calculateStatus(formData.expectedWeight, formData.actualWeight, formData.tolerance),
        signature: null,
        auditTrail: [
          {
            id: `AUD-${Date.now()}`,
            action: '创建记录',
            user: formData.operator,
            timestamp: new Date().toLocaleString('zh-CN'),
            details: `创建称量记录 ${`WEIGH-2024-${String(weighingRecords.length + 1).padStart(3, '0')}`}`,
          },
        ],
      }
      setWeighingRecords([...weighingRecords, newRecord])
    }
    
    setIsModalOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (selectedRecord) {
      setWeighingRecords(weighingRecords.filter(record => record.id !== selectedRecord.id))
      setIsDeleteModalOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">称量配料</h2>
        <button 
          onClick={handleCreateWeighing}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          新建称量记录
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">记录编号</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">批次号</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">产品</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">物料</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">目标重量 (kg)</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">实际重量 (kg)</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">偏差</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作员</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">时间</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {weighingRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.batchNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.material}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.expectedWeight.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.actualWeight.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${Math.abs(record.actualWeight - record.expectedWeight) <= (record.tolerance / 100) * record.expectedWeight ? 'text-green-600' : 'text-red-600'}`}>
                      {(Math.abs(record.actualWeight - record.expectedWeight)).toFixed(2)} kg
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${ 
                      record.status === '已完成' ? 'bg-green-100 text-green-800' :
                      record.status === '偏差' ? 'bg-red-100 text-red-800' :
                      record.status === '称量中' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {record.status === '已完成' ? <CheckCircle className="w-3 h-3" /> :
                       record.status === '偏差' ? <AlertCircle className="w-3 h-3" /> :
                       <Clock className="w-3 h-3" />}
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.operator}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    <button 
                      onClick={() => handleViewWeighing(record)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditWeighing(record)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteWeighing(record)}
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
      
      {/* 创建/编辑称量记录模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedRecord ? '编辑称量记录' : '新建称量记录'}
              </h3>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    批次号 *
                  </label>
                  <input
                    type="text"
                    value={formData.batchNo}
                    onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
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
                    物料名称 *
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    目标重量 (kg) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.expectedWeight}
                    onChange={(e) => setFormData({ ...formData, expectedWeight: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    实际重量 (kg)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.actualWeight}
                    onChange={(e) => setFormData({ ...formData, actualWeight: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    容差 (%) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.tolerance}
                    onChange={(e) => setFormData({ ...formData, tolerance: parseFloat(e.target.value) || 0 })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    时间 *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.timestamp.replace(' ', 'T')}
                    onChange={(e) => setFormData({ ...formData, timestamp: e.target.value.replace('T', ' ') })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    备注
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
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
                  {selectedRecord ? '保存修改' : '创建记录'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* 称量记录详情模态框 */}
      {isDetailModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">称量记录详情</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">基本信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">记录编号</span>
                      <span className="font-medium">{selectedRecord.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">批次号</span>
                      <span className="font-medium">{selectedRecord.batchNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">产品名称</span>
                      <span className="font-medium">{selectedRecord.product}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">物料名称</span>
                      <span className="font-medium">{selectedRecord.material}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">称量信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">目标重量</span>
                      <span className="font-medium">{selectedRecord.expectedWeight.toFixed(2)} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">实际重量</span>
                      <span className="font-medium">{selectedRecord.actualWeight.toFixed(2)} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">偏差</span>
                      <span className={`font-medium ${Math.abs(selectedRecord.actualWeight - selectedRecord.expectedWeight) <= (selectedRecord.tolerance / 100) * selectedRecord.expectedWeight ? 'text-green-600' : 'text-red-600'}`}>
                        {(Math.abs(selectedRecord.actualWeight - selectedRecord.expectedWeight)).toFixed(2)} kg
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">容差</span>
                      <span className="font-medium">{selectedRecord.tolerance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">状态</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                        selectedRecord.status === '已完成' ? 'bg-green-100 text-green-800' :
                        selectedRecord.status === '偏差' ? 'bg-red-100 text-red-800' :
                        selectedRecord.status === '称量中' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {selectedRecord.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">人员信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">操作员</span>
                      <span className="font-medium">{selectedRecord.operator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">称量时间</span>
                      <span className="font-medium">{selectedRecord.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">电子签名</h4>
                  {selectedRecord.signature ? (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium">{selectedRecord.signature.username}</div>
                          <div className="text-sm text-gray-600">{selectedRecord.signature.timestamp}</div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="text-gray-600">签名原因:</span> {selectedRecord.signature.reason}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      暂无电子签名
                    </div>
                  )}
                </div>
              </div>
              
              {selectedRecord.notes && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">备注</h4>
                  <p className="text-gray-700">{selectedRecord.notes}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">审计追踪</h4>
                <div className="space-y-3">
                  {selectedRecord.auditTrail.length > 0 ? (
                    selectedRecord.auditTrail.map((entry) => (
                      <div key={entry.id} className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">{entry.action}</div>
                          <div className="text-sm text-gray-600">{entry.timestamp}</div>
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="text-gray-600">操作人:</span> {entry.user}
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                          {entry.details}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      暂无审计记录
                    </div>
                  )}
                </div>
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
      {isDeleteModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">删除称量记录</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                确定要删除记录 <span className="font-medium">{selectedRecord.id} - {selectedRecord.material}</span> 吗？
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
