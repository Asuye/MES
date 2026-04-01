import { useState } from 'react'
import { Search, Plus, Eye, FileText, Package, Factory, User, Clock, BarChart3 } from 'lucide-react'

interface TraceabilityRecord {
  id: string
  batchNo: string
  product: string
  material: string
  supplier: string
  quantity: number
  unit: string
  manufacturingDate: string
  expiryDate: string
  location: string
  status: '在库' | '生产中' | '已使用' | '已出库'
  equipmentId: string
  equipmentName: string
  operator: string
  qualityStatus: '合格' | '待检' | '不合格'
  note: string
  history: TraceabilityHistory[]
}

interface TraceabilityHistory {
  id: string
  action: string
  timestamp: string
  user: string
  details: string
  location: string
}

const initialTraceabilityRecords: TraceabilityRecord[] = [
  {
    id: 'TRAC-2024-001',
    batchNo: 'BATCH-2024-001',
    product: '布洛芬片',
    material: '布洛芬原料药',
    supplier: '上海医药',
    quantity: 10.0,
    unit: 'kg',
    manufacturingDate: '2024-01-01',
    expiryDate: '2025-01-01',
    location: '生产车间A区',
    status: '生产中',
    equipmentId: 'EQ-001',
    equipmentName: '混合机',
    operator: '张三',
    qualityStatus: '合格',
    note: '正常使用',
    history: [
      {
        id: 'HIST-001',
        action: '入库',
        timestamp: '2024-01-05 09:00',
        user: '王五',
        details: '布洛芬原料药入库',
        location: '仓库',
      },
      {
        id: 'HIST-002',
        action: '出库',
        timestamp: '2024-01-15 08:00',
        user: '张三',
        details: '布洛芬原料药出库用于生产',
        location: '生产车间A区',
      },
      {
        id: 'HIST-003',
        action: '使用',
        timestamp: '2024-01-15 08:30',
        user: '张三',
        details: '布洛芬原料药用于混合',
        location: '生产车间A区',
      },
    ],
  },
  {
    id: 'TRAC-2024-002',
    batchNo: 'BATCH-2024-001',
    product: '布洛芬片',
    material: '微晶纤维素',
    supplier: '山东寿光',
    quantity: 5.0,
    unit: 'kg',
    manufacturingDate: '2023-12-15',
    expiryDate: '2024-12-15',
    location: '生产车间A区',
    status: '生产中',
    equipmentId: 'EQ-001',
    equipmentName: '混合机',
    operator: '李四',
    qualityStatus: '合格',
    note: '正常使用',
    history: [
      {
        id: 'HIST-004',
        action: '入库',
        timestamp: '2023-12-20 10:00',
        user: '王五',
        details: '微晶纤维素入库',
        location: '仓库',
      },
      {
        id: 'HIST-005',
        action: '出库',
        timestamp: '2024-01-15 08:30',
        user: '李四',
        details: '微晶纤维素出库用于生产',
        location: '生产车间A区',
      },
      {
        id: 'HIST-006',
        action: '使用',
        timestamp: '2024-01-15 09:00',
        user: '李四',
        details: '微晶纤维素用于混合',
        location: '生产车间A区',
      },
    ],
  },
  {
    id: 'TRAC-2024-003',
    batchNo: 'BATCH-2024-002',
    product: '阿莫西林胶囊',
    material: '阿莫西林原料药',
    supplier: '华北制药',
    quantity: 8.0,
    unit: 'kg',
    manufacturingDate: '2024-01-10',
    expiryDate: '2025-01-10',
    location: '仓库',
    status: '在库',
    equipmentId: '',
    equipmentName: '',
    operator: '',
    qualityStatus: '待检',
    note: '新入库',
    history: [
      {
        id: 'HIST-007',
        action: '入库',
        timestamp: '2024-01-12 14:00',
        user: '赵六',
        details: '阿莫西林原料药入库',
        location: '仓库',
      },
    ],
  },
  {
    id: 'TRAC-2024-004',
    batchNo: 'BATCH-2023-050',
    product: '维C银翘片',
    material: '维生素C',
    supplier: '东北制药',
    quantity: 2.0,
    unit: 'kg',
    manufacturingDate: '2023-11-01',
    expiryDate: '2024-11-01',
    location: '生产车间C区',
    status: '已使用',
    equipmentId: 'EQ-003',
    equipmentName: '干燥机',
    operator: '王五',
    qualityStatus: '合格',
    note: '已全部使用',
    history: [
      {
        id: 'HIST-008',
        action: '入库',
        timestamp: '2023-11-05 09:00',
        user: '赵六',
        details: '维生素C入库',
        location: '仓库',
      },
      {
        id: 'HIST-009',
        action: '出库',
        timestamp: '2024-01-10 08:00',
        user: '王五',
        details: '维生素C出库用于生产',
        location: '生产车间C区',
      },
      {
        id: 'HIST-010',
        action: '使用',
        timestamp: '2024-01-10 09:00',
        user: '王五',
        details: '维生素C用于混合',
        location: '生产车间C区',
      },
      {
        id: 'HIST-011',
        action: '消耗',
        timestamp: '2024-01-11 16:00',
        user: '王五',
        details: '维生素C全部消耗完毕',
        location: '生产车间C区',
      },
    ],
  },
]

export default function Traceability() {
  const [traceabilityRecords, setTraceabilityRecords] = useState<TraceabilityRecord[]>(initialTraceabilityRecords)
  const [selectedRecord, setSelectedRecord] = useState<TraceabilityRecord | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('batchNo')

  const filteredRecords = traceabilityRecords.filter(record => {
    if (!searchTerm) return true
    switch (searchType) {
      case 'batchNo':
        return record.batchNo.toLowerCase().includes(searchTerm.toLowerCase())
      case 'product':
        return record.product.toLowerCase().includes(searchTerm.toLowerCase())
      case 'material':
        return record.material.toLowerCase().includes(searchTerm.toLowerCase())
      case 'supplier':
        return record.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      default:
        return true
    }
  })

  const handleViewRecord = (record: TraceabilityRecord) => {
    setSelectedRecord(record)
    setIsDetailModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">追溯查询</h2>
      </div>
      
      {/* 搜索栏 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              搜索类型
            </label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="batchNo">批次号</option>
              <option value="product">产品名称</option>
              <option value="material">物料名称</option>
              <option value="supplier">供应商</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              搜索关键词
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`请输入${searchType === 'batchNo' ? '批次号' : searchType === 'product' ? '产品名称' : searchType === 'material' ? '物料名称' : '供应商'}`}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search className="w-4 h-4" />
              </div>
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('')
                setSearchType('batchNo')
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              重置
            </button>
          </div>
        </div>
      </div>
      
      {/* 追溯记录列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">追溯编号</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">批次号</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">产品</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">物料</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">供应商</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">数量</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">位置</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">质量状态</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.batchNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.material}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{record.quantity} {record.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                      record.status === '在库' ? 'bg-blue-100 text-blue-800' :
                      record.status === '生产中' ? 'bg-green-100 text-green-800' :
                      record.status === '已使用' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                      record.qualityStatus === '合格' ? 'bg-green-100 text-green-800' :
                      record.qualityStatus === '待检' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {record.qualityStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleViewRecord(record)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 记录详情模态框 */}
      {isDetailModalOpen && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">追溯详情</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">基本信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">追溯编号</span>
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
                    <div className="flex justify-between">
                      <span className="text-gray-600">供应商</span>
                      <span className="font-medium">{selectedRecord.supplier}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">数量信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">数量</span>
                      <span className="font-medium">{selectedRecord.quantity} {selectedRecord.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">生产日期</span>
                      <span className="font-medium">{selectedRecord.manufacturingDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">有效期至</span>
                      <span className="font-medium">{selectedRecord.expiryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">当前位置</span>
                      <span className="font-medium">{selectedRecord.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">生产信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">设备编号</span>
                      <span className="font-medium">{selectedRecord.equipmentId || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">设备名称</span>
                      <span className="font-medium">{selectedRecord.equipmentName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">操作员</span>
                      <span className="font-medium">{selectedRecord.operator || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">状态信息</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">物料状态</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                        selectedRecord.status === '在库' ? 'bg-blue-100 text-blue-800' :
                        selectedRecord.status === '生产中' ? 'bg-green-100 text-green-800' :
                        selectedRecord.status === '已使用' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {selectedRecord.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">质量状态</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${ 
                        selectedRecord.qualityStatus === '合格' ? 'bg-green-100 text-green-800' :
                        selectedRecord.qualityStatus === '待检' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedRecord.qualityStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedRecord.note && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">备注</h4>
                  <p className="text-gray-700">{selectedRecord.note}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">追溯历史</h4>
                <div className="space-y-4">
                  {selectedRecord.history.map((history) => (
                    <div key={history.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{history.action}</div>
                        <div className="text-sm text-gray-600">{history.timestamp}</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">操作人:</span> {history.user}
                        </div>
                        <div>
                          <span className="text-gray-600">位置:</span> {history.location}
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <span className="text-gray-600">详情:</span> {history.details}
                      </div>
                    </div>
                  ))}
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
    </div>
  )
}
