import { useState } from 'react'
import { FileText, Plus, CheckCircle, Clock, AlertCircle, Edit, Trash2, Eye, User, Shield, Activity } from 'lucide-react'

interface EBRRecord {
  id: string
  batchNo: string
  product: string
  status: '进行中' | '待审核' | '已完成' | '已拒绝'
  completeness: number
  operator: string
  inspector: string | null
  startTime: string
  endTime: string | null
  approvalTime: string | null
  notes: string
  steps: EBRStep[]
  signatures: EBRSignature[]
  auditTrail: AuditEntry[]
}

interface EBRStep {
  id: string
  name: string
  status: '待执行' | '进行中' | '已完成' | '已跳过'
  startTime: string | null
  endTime: string | null
  operator: string | null
  notes: string
}

interface EBRSignature {
  id: string
  step: string
  userId: string
  username: string
  timestamp: string
  reason: string
}

interface AuditEntry {
  id: string
  action: string
  user: string
  timestamp: string
  details: string
}

const initialEBRs: EBRRecord[] = [
  {
    id: 'EBR-2024-001',
    batchNo: 'BATCH-2024-001',
    product: '布洛芬片',
    status: '进行中',
    completeness: 65,
    operator: '张三',
    inspector: null,
    startTime: '2024-01-15 08:00',
    endTime: null,
    approvalTime: null,
    notes: '正常生产',
    steps: [
      { id: 'STEP-1', name: '原辅料预处理', status: '已完成', startTime: '2024-01-15 08:00', endTime: '2024-01-15 08:30', operator: '张三', notes: '正常' },
      { id: 'STEP-2', name: '称量配料', status: '已完成', startTime: '2024-01-15 08:30', endTime: '2024-01-15 09:15', operator: '李四', notes: '正常' },
      { id: 'STEP-3', name: '混合制粒', status: '进行中', startTime: '2024-01-15 09:15', endTime: null, operator: '王五', notes: '进行中' },
      { id: 'STEP-4', name: '干燥', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
      { id: 'STEP-5', name: '整粒总混', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
      { id: 'STEP-6', name: '压片', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
      { id: 'STEP-7', name: '内包装', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
      { id: 'STEP-8', name: '外包装', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
    ],
    signatures: [
      {
        id: 'SIG-1',
        step: '原辅料预处理',
        userId: 'user1',
        username: '张三',
        timestamp: '2024-01-15 08:30',
        reason: '操作完成',
      },
      {
        id: 'SIG-2',
        step: '称量配料',
        userId: 'user2',
        username: '李四',
        timestamp: '2024-01-15 09:15',
        reason: '操作完成',
      },
    ],
    auditTrail: [
      {
        id: 'AUD-1',
        action: '创建记录',
        user: '张三',
        timestamp: '2024-01-15 08:00',
        details: '创建电子批记录 EBR-2024-001',
      },
      {
        id: 'AUD-2',
        action: '开始步骤',
        user: '张三',
        timestamp: '2024-01-15 08:00',
        details: '开始步骤：原辅料预处理',
      },
      {
        id: 'AUD-3',
        action: '完成步骤',
        user: '张三',
        timestamp: '2024-01-15 08:30',
        details: '完成步骤：原辅料预处理',
      },
      {
        id: 'AUD-4',
        action: '电子签名',
        user: '张三',
        timestamp: '2024-01-15 08:30',
        details: '签名确认：原辅料预处理',
      },
    ],
  },
  {
    id: 'EBR-2024-002',
    batchNo: 'BATCH-2024-002',
    product: '阿莫西林胶囊',
    status: '待审核',
    completeness: 100,
    operator: '李四',
    inspector: null,
    startTime: '2024-01-14 10:30',
    endTime: '2024-01-15 16:30',
    approvalTime: null,
    notes: '常规生产',
    steps: [],
    signatures: [],
    auditTrail: [],
  },
  {
    id: 'EBR-2024-003',
    batchNo: 'BATCH-2024-003',
    product: '维C银翘片',
    status: '已完成',
    completeness: 100,
    operator: '王五',
    inspector: '赵六',
    startTime: '2024-01-13 09:00',
    endTime: '2024-01-14 12:00',
    approvalTime: '2024-01-14 14:00',
    notes: '质量合格',
    steps: [],
    signatures: [],
    auditTrail: [],
  },
]

export default function EBR() {
  const [ebrs, setEBRs] = useState<EBRRecord[]>(initialEBRs)
  const [selectedEBR, setSelectedEBR] = useState<EBRRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [formData, setFormData] = useState<Omit<EBRRecord, 'id' | 'completeness' | 'steps' | 'signatures' | 'auditTrail'>>({ 
    batchNo: '',
    product: '',
    status: '进行中',
    operator: '',
    inspector: null,
    startTime: '',
    endTime: null,
    approvalTime: null,
    notes: '',
  })

  const handleCreateEBR = () => {
    setSelectedEBR(null)
    setFormData({
      batchNo: '',
      product: '',
      status: '进行中',
      operator: '',
      inspector: null,
      startTime: new Date().toLocaleString('zh-CN'),
      endTime: null,
      approvalTime: null,
      notes: '',
    })
    setIsModalOpen(true)
  }

  const handleEditEBR = (ebr: EBRRecord) => {
    setSelectedEBR(ebr)
    setFormData({
      batchNo: ebr.batchNo,
      product: ebr.product,
      status: ebr.status,
      operator: ebr.operator,
      inspector: ebr.inspector,
      startTime: ebr.startTime,
      endTime: ebr.endTime,
      approvalTime: ebr.approvalTime,
      notes: ebr.notes,
    })
    setIsModalOpen(true)
  }

  const handleViewEBR = (ebr: EBRRecord) => {
    setSelectedEBR(ebr)
    setIsDetailModalOpen(true)
  }

  const handleDeleteEBR = (ebr: EBRRecord) => {
    setSelectedEBR(ebr)
    setIsDeleteModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedEBR) {
      // 编辑现有记录
      setEBRs(ebrs.map(ebr => 
        ebr.id === selectedEBR.id ? { ...ebr, ...formData } : ebr
      ))
    } else {
      // 创建新记录
      const newEBR: EBRRecord = {
        ...formData,
        id: `EBR-2024-${String(ebrs.length + 1).padStart(3, '0')}`,
        completeness: 0,
        steps: [
          { id: 'STEP-1', name: '原辅料预处理', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
          { id: 'STEP-2', name: '称量配料', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
          { id: 'STEP-3', name: '混合制粒', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
          { id: 'STEP-4', name: '干燥', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
          { id: 'STEP-5', name: '整粒总混', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
          { id: 'STEP-6', name: '压片/填充', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
          { id: 'STEP-7', name: '内包装', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
          { id: 'STEP-8', name: '外包装', status: '待执行', startTime: null, endTime: null, operator: null, notes: '' },
        ],
        signatures: [],
        auditTrail: [
          {
            id: `AUD-${Date.now()}`,
            action: '创建记录',
            user: formData.operator,
            timestamp: new Date().toLocaleString('zh-CN'),
            details: `创建电子批记录 ${`EBR-2024-${String(ebrs.length + 1).padStart(3, '0')}`}`,
          },
        ],
      }
      setEBRs([...ebrs, newEBR])
    }
    
    setIsModalOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (selectedEBR) {
      setEBRs(ebrs.filter(ebr => ebr.id !== selectedEBR.id))
      setIsDeleteModalOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">电子批记录 (EBR)</h2>
        <button 
          onClick={handleCreateEBR}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          新建记录
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">完成度</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作员</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">开始时间</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">最后更新</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ebrs.map((ebr) => (
                <tr key={ebr.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ebr.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ebr.batchNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ebr.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      ebr.status === '进行中' ? 'bg-blue-100 text-blue-800' :
                      ebr.status === '待审核' ? 'bg-yellow-100 text-yellow-800' :
                      ebr.status === '已完成' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {ebr.status === '进行中' ? <Clock className="w-3 h-3" /> :
                       ebr.status === '待审核' ? <AlertCircle className="w-3 h-3" /> :
                       <CheckCircle className="w-3 h-3" />}
                      {ebr.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-600"
                          style={{ width: `${ebr.completeness}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{ebr.completeness}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ebr.operator}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{ebr.startTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {ebr.approvalTime || ebr.endTime || ebr.startTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    <button 
                      onClick={() => handleViewEBR(ebr)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditEBR(ebr)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteEBR(ebr)}
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
      
      {/* 创建/编辑EBR模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedEBR ? '编辑电子批记录' : '新建电子批记录'}
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
                    状态 *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as '进行中' | '待审核' | '已完成' | '已拒绝' })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="进行中">进行中</option>
                    <option value="待审核">待审核</option>
                    <option value="已完成">已完成</option>
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
                    检验员
                  </label>
                  <input
                    type="text"
                    value={formData.inspector || ''}
                    onChange={(e) => setFormData({ ...formData, inspector: e.target.value || null })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    开始时间 *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.startTime.replace(' ', 'T')}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value.replace('T', ' ') })}
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
                  {selectedEBR ? '保存修改' : '创建记录'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* EBR详情模态框 */}
      {isDetailModalOpen && selectedEBR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">电子批记录详情</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">基本信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">记录编号</span>
                      <span className="font-medium">{selectedEBR.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">批次号</span>
                      <span className="font-medium">{selectedEBR.batchNo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">产品名称</span>
                      <span className="font-medium">{selectedEBR.product}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">状态</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        selectedEBR.status === '进行中' ? 'bg-blue-100 text-blue-800' :
                        selectedEBR.status === '待审核' ? 'bg-yellow-100 text-yellow-800' :
                        selectedEBR.status === '已完成' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedEBR.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">完成度</span>
                      <span className="font-medium">{selectedEBR.completeness}%</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">人员信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">操作员</span>
                      <span className="font-medium">{selectedEBR.operator}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">检验员</span>
                      <span className="font-medium">{selectedEBR.inspector || '未指定'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">开始时间</span>
                      <span className="font-medium">{selectedEBR.startTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">结束时间</span>
                      <span className="font-medium">{selectedEBR.endTime || '未完成'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">批准时间</span>
                      <span className="font-medium">{selectedEBR.approvalTime || '未批准'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">生产步骤</h4>
                <div className="space-y-4">
                  {selectedEBR.steps.map((step) => (
                    <div key={step.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            step.status === '已完成' ? 'bg-green-500 text-white' :
                            step.status === '进行中' ? 'bg-blue-500 text-white' :
                            step.status === '已跳过' ? 'bg-yellow-500 text-white' :
                            'bg-gray-200 text-gray-600'
                          }`}>
                            {step.status === '已完成' ? <CheckCircle className="w-4 h-4" /> :
                             step.status === '进行中' ? <Activity className="w-4 h-4" /> :
                             step.status === '已跳过' ? <AlertCircle className="w-4 h-4" /> :
                             step.id.split('-')[1]}
                          </div>
                          <h5 className="font-medium text-gray-900">{step.name}</h5>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          step.status === '已完成' ? 'bg-green-100 text-green-800' :
                          step.status === '进行中' ? 'bg-blue-100 text-blue-800' :
                          step.status === '已跳过' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {step.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">开始时间:</span>
                          <span className="ml-2">{step.startTime || '未开始'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">结束时间:</span>
                          <span className="ml-2">{step.endTime || '未完成'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">操作员:</span>
                          <span className="ml-2">{step.operator || '未指定'}</span>
                        </div>
                      </div>
                      {step.notes && (
                        <div className="mt-2 text-sm">
                          <span className="text-gray-600">备注:</span>
                          <span className="ml-2">{step.notes}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">电子签名</h4>
                <div className="space-y-3">
                  {selectedEBR.signatures.length > 0 ? (
                    selectedEBR.signatures.map((signature) => (
                      <div key={signature.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium">{signature.username}</div>
                            <div className="text-sm text-gray-600">{signature.step}</div>
                          </div>
                          <div className="ml-auto text-right">
                            <div className="text-sm">{signature.timestamp}</div>
                            <div className="text-xs text-gray-500">{signature.reason}</div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      暂无电子签名
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">审计追踪</h4>
                <div className="space-y-3">
                  {selectedEBR.auditTrail.length > 0 ? (
                    selectedEBR.auditTrail.map((entry) => (
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
              
              {selectedEBR.notes && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">备注</h4>
                  <p className="text-gray-700">{selectedEBR.notes}</p>
                </div>
              )}
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
      {isDeleteModalOpen && selectedEBR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">删除电子批记录</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                确定要删除记录 <span className="font-medium">{selectedEBR.id} - {selectedEBR.product}</span> 吗？
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
