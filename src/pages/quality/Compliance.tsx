import { useState } from 'react'
import { Shield, Plus, Edit, Trash2, Eye, CheckCircle, AlertCircle, FileText, User, Clock, BarChart3 } from 'lucide-react'

interface ComplianceRecord {
  id: string
  batchNo: string
  product: string
  testType: string
  testDate: string
  tester: string
  status: '待检测' | '检测中' | '已完成'
  result: '合格' | '不合格' | '待判定'
  testItems: TestItem[]
  note: string
  signature: {
    userId: string
    username: string
    timestamp: string
    reason: string
  } | null
  auditTrail: AuditEntry[]
}

interface TestItem {
  id: string
  name: string
  specification: string
  result: string
  status: '合格' | '不合格' | '待判定'
  unit: string
}

interface AuditEntry {
  id: string
  action: string
  user: string
  timestamp: string
  details: string
}

const initialComplianceRecords: ComplianceRecord[] = [
  {
    id: 'COMP-2024-001',
    batchNo: 'BATCH-2024-001',
    product: '布洛芬片',
    testType: '成品检验',
    testDate: '2024-01-15',
    tester: '张三',
    status: '已完成',
    result: '合格',
    testItems: [
      {
        id: 'TEST-001',
        name: '含量',
        specification: '95.0-105.0%',
        result: '98.5%',
        status: '合格',
        unit: '%',
      },
      {
        id: 'TEST-002',
        name: '溶出度',
        specification: '≥75%',
        result: '85.2%',
        status: '合格',
        unit: '%',
      },
      {
        id: 'TEST-003',
        name: '有关物质',
        specification: '≤1.0%',
        result: '0.5%',
        status: '合格',
        unit: '%',
      },
      {
        id: 'TEST-004',
        name: '水分',
        specification: '≤5.0%',
        result: '3.2%',
        status: '合格',
        unit: '%',
      },
    ],
    note: '检验结果合格',
    signature: {
      userId: 'user1',
      username: '张三',
      timestamp: '2024-01-15 16:30',
      reason: '检验完成',
    },
    auditTrail: [
      {
        id: 'AUD-001',
        action: '创建记录',
        user: '张三',
        timestamp: '2024-01-15 09:00',
        details: '创建质量检验记录 COMP-2024-001',
      },
      {
        id: 'AUD-002',
        action: '开始检验',
        user: '张三',
        timestamp: '2024-01-15 09:30',
        details: '开始检验布洛芬片 BATCH-2024-001',
      },
      {
        id: 'AUD-003',
        action: '完成检验',
        user: '张三',
        timestamp: '2024-01-15 16:00',
        details: '完成检验，结果合格',
      },
      {
        id: 'AUD-004',
        action: '电子签名',
        user: '张三',
        timestamp: '2024-01-15 16:30',
        details: '签名确认检验结果',
      },
    ],
  },
  {
    id: 'COMP-2024-002',
    batchNo: 'BATCH-2024-002',
    product: '阿莫西林胶囊',
    testType: '中间体检验',
    testDate: '2024-01-14',
    tester: '李四',
    status: '已完成',
    result: '合格',
    testItems: [
      {
        id: 'TEST-005',
        name: '含量',
        specification: '90.0-110.0%',
        result: '95.8%',
        status: '合格',
        unit: '%',
      },
      {
        id: 'TEST-006',
        name: '粒度',
        specification: 'D90≤100μm',
        result: '85μm',
        status: '合格',
        unit: 'μm',
      },
    ],
    note: '检验结果合格',
    signature: {
      userId: 'user2',
      username: '李四',
      timestamp: '2024-01-14 15:00',
      reason: '检验完成',
    },
    auditTrail: [],
  },
  {
    id: 'COMP-2024-003',
    batchNo: 'BATCH-2024-003',
    product: '维C银翘片',
    testType: '原料检验',
    testDate: '2024-01-13',
    tester: '王五',
    status: '已完成',
    result: '合格',
    testItems: [
      {
        id: 'TEST-007',
        name: '含量',
        specification: '98.0-102.0%',
        result: '99.5%',
        status: '合格',
        unit: '%',
      },
      {
        id: 'TEST-008',
        name: '重金属',
        specification: '≤10ppm',
        result: '5ppm',
        status: '合格',
        unit: 'ppm',
      },
    ],
    note: '检验结果合格',
    signature: {
      userId: 'user3',
      username: '王五',
      timestamp: '2024-01-13 14:00',
      reason: '检验完成',
    },
    auditTrail: [],
  },
  {
    id: 'COMP-2024-004',
    batchNo: 'BATCH-2024-004',
    product: '布洛芬片',
    testType: '成品检验',
    testDate: '2024-01-12',
    tester: '张三',
    status: '已完成',
    result: '不合格',
    testItems: [
      {
        id: 'TEST-009',
        name: '含量',
        specification: '95.0-105.0%',
        result: '92.5%',
        status: '不合格',
        unit: '%',
      },
      {
        id: 'TEST-010',
        name: '溶出度',
        specification: '≥75%',
        result: '80.5%',
        status: '合格',
        unit: '%',
      },
    ],
    note: '含量不符合规定',
    signature: {
      userId: 'user1',
      username: '张三',
      timestamp: '2024-01-12 16:00',
      reason: '检验完成',
    },
    auditTrail: [],
  },
  {
    id: 'COMP-2024-005',
    batchNo: 'BATCH-2024-005',
    product: '阿莫西林胶囊',
    testType: '成品检验',
    testDate: '2024-01-11',
    tester: '李四',
    status: '检测中',
    result: '待判定',
    testItems: [
      {
        id: 'TEST-011',
        name: '含量',
        specification: '90.0-110.0%',
        result: '98.2%',
        status: '合格',
        unit: '%',
      },
      {
        id: 'TEST-012',
        name: '有关物质',
        specification: '≤2.0%',
        result: '1.8%',
        status: '合格',
        unit: '%',
      },
      {
        id: 'TEST-013',
        name: '溶出度',
        specification: '≥80%',
        result: '',
        status: '待判定',
        unit: '%',
      },
    ],
    note: '检验进行中',
    signature: null,
    auditTrail: [],
  },
]

export default function Compliance() {
  const [complianceRecords, setComplianceRecords] = useState<ComplianceRecord[]>(initialComplianceRecords)
  const [selectedRecord, setSelectedRecord] = useState<ComplianceRecord | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [formData, setFormData] = useState<Omit<ComplianceRecord, 'id' | 'testItems' | 'signature' | 'auditTrail'>>({ 
    batchNo: '',
    product: '',
    testType: '成品检验',
    testDate: '',
    tester: '',
    status: '待检测',
    result: '待判定',
    note: '',
  })

  const handleCreateCompliance = () => {
    setSelectedRecord(null)
    setFormData({
      batchNo: '',
      product: '',
      testType: '成品检验',
      testDate: new Date().toISOString().split('T')[0],
      tester: '',
      status: '待检测',
      result: '待判定',
      note: '',
    })
    setIsModalOpen(true)
  }

  const handleEditCompliance = (record: ComplianceRecord) => {
    setSelectedRecord(record)
    setFormData({
      batchNo: record.batchNo,
      product: record.product,
      testType: record.testType,
      testDate: record.testDate,
      tester: record.tester,
      status: record.status,
      result: record.result,
      note: record.note,
    })
    setIsModalOpen(true)
  }

  const handleViewCompliance = (record: ComplianceRecord) => {
    setSelectedRecord(record)
    setIsDetailModalOpen(true)
  }

  const handleDeleteCompliance = (record: ComplianceRecord) => {
    setSelectedRecord(record)
    setIsDeleteModalOpen(true)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedRecord) {
      // 编辑现有记录
      const updatedRecord = {
        ...selectedRecord,
        ...formData,
      }
      setComplianceRecords(complianceRecords.map(record => 
        record.id === selectedRecord.id ? updatedRecord : record
      ))
    } else {
      // 创建新记录
      const newRecord: ComplianceRecord = {
        ...formData,
        id: `COMP-2024-${String(complianceRecords.length + 1).padStart(3, '0')}`,
        testItems: [],
        signature: null,
        auditTrail: [
          {
            id: `AUD-${Date.now()}`,
            action: '创建记录',
            user: formData.tester,
            timestamp: new Date().toLocaleString('zh-CN'),
            details: `创建质量检验记录 ${`COMP-2024-${String(complianceRecords.length + 1).padStart(3, '0')}`}`,
          },
        ],
      }
      setComplianceRecords([...complianceRecords, newRecord])
    }
    
    setIsModalOpen(false)
  }

  const handleDeleteConfirm = () => {
    if (selectedRecord) {
      setComplianceRecords(complianceRecords.filter(record => record.id !== selectedRecord.id))
      setIsDeleteModalOpen(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">质量合规</h2>
        <button 
          onClick={handleCreateCompliance}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
        >
          <Plus className="w-4 h-4" />
          新建检验记录
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">检验类型</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">检验日期</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">检验员</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">结果</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complianceRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.batchNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.testType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.testDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.tester}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                      record.status === '已完成' ? 'bg-green-100 text-green-800' :
                      record.status === '检测中' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                      record.result === '合格' ? 'bg-green-100 text-green-800' :
                      record.result === '不合格' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.result}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    <button 
                      onClick={() => handleViewCompliance(record)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEditCompliance(record)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteCompliance(record)}
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
      
      {/* 创建/编辑检验记录模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedRecord ? '编辑检验记录' : '新建检验记录'}
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
                    检验类型 *
                  </label>
                  <select
                    value={formData.testType}
                    onChange={(e) => setFormData({ ...formData, testType: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="成品检验">成品检验</option>
                    <option value="中间体检验">中间体检验</option>
                    <option value="原料检验">原料检验</option>
                    <option value="包装材料检验">包装材料检验</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    检验日期 *
                  </label>
                  <input
                    type="date"
                    value={formData.testDate}
                    onChange={(e) => setFormData({ ...formData, testDate: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    检验员 *
                  </label>
                  <input
                    type="text"
                    value={formData.tester}
                    onChange={(e) => setFormData({ ...formData, tester: e.target.value })}
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
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as '待检测' | '检测中' | '已完成' })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="待检测">待检测</option>
                    <option value="检测中">检测中</option>
                    <option value="已完成">已完成</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    结果 *
                  </label>
                  <select
                    value={formData.result}
                    onChange={(e) => setFormData({ ...formData, result: e.target.value as '合格' | '不合格' | '待判定' })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="待判定">待判定</option>
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
                  {selectedRecord ? '保存修改' : '创建记录'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* 检验记录详情模态框 */}
      {isDetailModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">检验记录详情</h3>
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
                      <span className="text-gray-600">检验类型</span>
                      <span className="font-medium">{selectedRecord.testType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">检验日期</span>
                      <span className="font-medium">{selectedRecord.testDate}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">状态信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">检验员</span>
                      <span className="font-medium">{selectedRecord.tester}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">检验状态</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                        selectedRecord.status === '已完成' ? 'bg-green-100 text-green-800' :
                        selectedRecord.status === '检测中' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedRecord.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">检验结果</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                        selectedRecord.result === '合格' ? 'bg-green-100 text-green-800' :
                        selectedRecord.result === '不合格' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedRecord.result}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">检验项目</h4>
                <div className="space-y-4">
                  {selectedRecord.testItems.map((item) => (
                    <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{item.name}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                          item.status === '合格' ? 'bg-green-100 text-green-800' :
                          item.status === '不合格' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">规格:</span> {item.specification}
                        </div>
                        <div>
                          <span className="text-gray-600">结果:</span> {item.result} {item.unit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedRecord.note && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">备注</h4>
                  <p className="text-gray-700">{selectedRecord.note}</p>
                </div>
              )}
              
              {selectedRecord.signature && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">电子签名</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">{selectedRecord.signature.username}</div>
                        <div className="text-sm text-gray-600">{selectedRecord.signature.timestamp}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-gray-600">签名原因:</span> {selectedRecord.signature.reason}
                    </div>
                  </div>
                </div>
              )}
              
              {selectedRecord.auditTrail.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">审计追踪</h4>
                  <div className="space-y-3">
                    {selectedRecord.auditTrail.map((entry) => (
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
                    ))}
                  </div>
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
      {isDeleteModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">删除检验记录</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                确定要删除记录 <span className="font-medium">{selectedRecord.id} - {selectedRecord.product}</span> 吗？
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
